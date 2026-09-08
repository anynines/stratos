import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { HttpOptions } from '../../../../core/src/core/core.types';
import { environment } from '../../../../core/src/environments/environment';
import { EndpointModel } from '../../../../store/src/public-api';
import { stratosEntityCatalog } from '../../../../store/src/stratos-entity-catalog';


const { proxyAPIVersion } = environment;
const commonPrefix = `/api/${proxyAPIVersion}/proxy`;
const defaultGitHubUrl = 'https://api.github.com';

export interface GitApiRequest {
  url: string;
  requestArgs: HttpOptions;
}

export abstract class BaseSCM {

  public endpointGuid: string;

  constructor(public publicApiUrl: string) { }

  public setPublicApi(url: string) {
    this.publicApiUrl = url
  }

  public getPublicApi(): string {
    return this.publicApiUrl;
  }

  public getAPI(options: HttpOptions = new HttpOptions()): Observable<GitApiRequest> {
    return this.getEndpoint(this.endpointGuid).pipe(
      map(endpoint => {
        if (!endpoint) {
          // No endpoint registered - proxy via backend to avoid CORS
          // Only use direct URL for default GitHub.com (which has CORS headers)
          const publicApi = this.getPublicApi();
          if (publicApi !== defaultGitHubUrl) {
            return {
              url: `${commonPrefix}/url`,
              requestArgs: {
                ...options,
                headers: {
                  ...options.headers,
                  'x-cap-no-token': 'true',
                  'x-cap-target-url': publicApi
                }
              }
            };
          }
          return {
            url: publicApi,
            requestArgs: options
          };
        }
        // We have an endpoint so always proxy via backend
        return {
          url: `${commonPrefix}/${endpoint.guid}`,
          requestArgs: {
            ... options,
            headers: {
              'x-cap-no-token': `${!endpoint.user}`
            }
          }
        };
      }),
      first()
    );
  }

  protected resolveUrl(api: GitApiRequest, path: string): string {
    return `${api.url}${path}`;
  }

  protected getEndpoint(endpointGuid: string): Observable<EndpointModel> {
    if (!endpointGuid) {
      return of(null);
    }
    // Ensure that we have fetched the endpoints before attempting to get the required endpoint.
    // Why this way instead of just fetching the endpoint directly?
    // There are cases where we have an endpoint guid but the endpoint won't be in the store (user views an app deployed from private github
    // endpoint that has since been removed).
    // Normally we'd get the entity directly and use a waitForEntity here... but that blocks and will fire again if the endpoint is added
    // We can't just use a entityObs$ because that fires a null for genuine endpoints on refresh
    return stratosEntityCatalog.endpoint.store.getAll.getPaginationMonitor().currentPage$.pipe(
      map(endpoints => endpoints?.find(e => e.guid === endpointGuid))
    );
  }

  protected parseErrorAsString(res: any): string {
    const response = this.parseHttpPipeError(res);
    return response.message || '';
  }

  private parseHttpPipeError(res: any): { message?: string; } {
    if (!res.status) {
      return res;
    }
    try {
      return res.json ? res.json() : res;
    } catch (e) {
      console.warn('Failed to parse response body', e);
    }
    return {};
  }
}
