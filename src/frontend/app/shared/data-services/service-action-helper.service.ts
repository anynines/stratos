import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app-state';
import { ConfirmationDialogService } from '../components/confirmation-dialog.service';
import { ConfirmationDialogConfig } from '../components/confirmation-dialog.config';
import { DeleteServiceBinding } from '../../store/actions/service-bindings.actions';
import { DeleteServiceInstance } from '../../store/actions/service-instances.actions';
import { IServiceBinding } from '../../core/cf-api-svc.types';
import { APIResource } from '../../store/types/api.types';
import { RouterNav, RouterQueryParams } from '../../store/actions/router.actions';
import { SERVICE_INSTANCE_TYPES } from '../components/add-service-instance/add-service-instance-base-step/add-service-instance.types';
import { DeleteUserProvidedInstance } from '../../store/actions/user-provided-service.actions';

@Injectable()
export class ServiceActionHelperService {

  constructor(
    private confirmDialog: ConfirmationDialogService,
    private store: Store<AppState>,

  ) { }

  detachServiceBinding = (
    serviceBindings: APIResource<IServiceBinding>[],
    serviceInstanceGuid: string,
    endpointGuid: string,
    noConfirm = false,
    userProvided = false
  ) => {

    if (serviceBindings.length > 1) {
      this.store.dispatch(new RouterNav({
        path: ['/services/', this.getRouteKey(userProvided), endpointGuid, serviceInstanceGuid, 'detach']
      }));
      return;
    }
    const action = userProvided ? new DeleteUserProvidedInstance(endpointGuid, serviceInstanceGuid) :
      new DeleteServiceInstance(endpointGuid, serviceInstanceGuid);
    if (!noConfirm) {

      const confirmation = new ConfirmationDialogConfig(
        'Detach Service Instance',
        'Are you sure you want to detach the application from the service?',
        'Detach',
        true
      );
      this.confirmDialog.open(confirmation, () =>
        this.store.dispatch(action)
      );
    } else {
      this.store.dispatch(action);
    }
  }

  deleteServiceInstance = (
    serviceInstanceGuid: string,
    serviceInstanceName: string,
    endpointGuid: string,
    userProvided = false
  ) => {
    const action = userProvided ? new DeleteUserProvidedInstance(endpointGuid, serviceInstanceGuid) :
      new DeleteServiceInstance(endpointGuid, serviceInstanceGuid);
    const confirmation = new ConfirmationDialogConfig(
      'Delete Service Instance',
      {
        textToMatch: serviceInstanceName
      },
      'Delete',
      true
    );
    this.confirmDialog.open(confirmation, () => this.store.dispatch(action));
  }


  editServiceBinding = (guid: string, endpointGuid: string, query: RouterQueryParams = {}, userProvided = false) =>
    this.store.dispatch(new RouterNav(
      {
        path: [
          '/services/', this.getRouteKey(userProvided), endpointGuid, guid, 'edit'
        ], query: query
      }
    ))

  private getRouteKey(userProvided: boolean) {
    return userProvided ? SERVICE_INSTANCE_TYPES.USER_SERVICE : SERVICE_INSTANCE_TYPES.SERVICE;
  }
}
