package kubernetes

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/url"
	"os"
	"os/user"
	"path/filepath"

	"github.com/cloudfoundry/stratos/src/jetstream/api"
	log "github.com/sirupsen/logrus"

	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

// CFConfigFile represents the data we need for CF config file
type CFConfigFile struct {
	APIEndpoint            string `json:"Target"`
	AuthorizationEndpoint  string `json:"AuthorizationEndpoint"`
	TokenEndpoint          string `json:"UaaEndpoint"`
	DopplerLoggingEndpoint string `json:"DopplerEndPoint"`
	SkipSSLValidation      bool   `json:"SSLDisabled"`
	ClientID               string `json:"UAAOAuthClient"`
	ClientSecret           string `json:"UAAOAuthClientSecret"`
	AccessToken            string `json:"AccessToken"`
	RefreshToken           string `json:"RefreshToken"`
}

// ListKubernetes will list Cloud Foundry endpoints configured locally (can be only one)
func ListKubernetes() ([]*api.CNSIRecord, *clientcmdapi.Config, error) {

	cfg, err := readKubeConfigFile()
	if err != nil {
		log.Errorf("Could not read kube config file: %s", err)
		return nil, nil, err
	}

	// Add an endpoint for each cluster
	var eps []*api.CNSIRecord
	for name, cluster := range cfg.Clusters {
		apiEndpoint, err := url.Parse(cluster.Server)
		if err == nil {
			eps = append(eps, &api.CNSIRecord{
				GUID:                   getEndpointGUID(cluster.Server),
				Name:                   name,
				CNSIType:               "k8s",
				APIEndpoint:            apiEndpoint,
				AuthorizationEndpoint:  "",
				DopplerLoggingEndpoint: "",
				TokenEndpoint:          "",
				SkipSSLValidation:      true,
				SSOAllowed:             false,
				ClientId:               "",
				ClientSecret:           "",
				Local:                  true,
			})
		}
	}

	return eps, cfg, nil
}

// ListConnectedCloudFoundry will list Cloud Foundry endpoints configured locally (can be only one)
func ListConnectedKubernetes() ([]*api.ConnectedEndpoint, error) {

	cfg, err := readKubeConfigFile()
	if err != nil {
		log.Errorf("Could not read kube config file: %s", err)
		return nil, err
	}

	// Add an endpoint for each cluster
	var eps []*api.ConnectedEndpoint
	for name, cluster := range cfg.Clusters {
		apiEndpoint, err := url.Parse(cluster.Server)
		if err == nil {
			eps = append(eps, &api.ConnectedEndpoint{
				GUID:                   getEndpointGUID(cluster.Server),
				Name:                   name,
				CNSIType:               "k8s",
				APIEndpoint:            apiEndpoint,
				AuthorizationEndpoint:  "",
				DopplerLoggingEndpoint: "",
				Account:                "local",
				TokenExpiry:            20000,
				SkipSSLValidation:      true,
				Local:                  true,
			})
		}
	}

	return eps, nil
}

func getKubeConfigUser(config *clientcmdapi.Config, endpoint *api.CNSIRecord) (*clientcmdapi.AuthInfo, bool) {

	// Find the first context for this endpoint
	for _, context := range config.Contexts {
		if context.Cluster == endpoint.Name {
			auth := config.AuthInfos[context.AuthInfo]
			if auth != nil {
				return auth, true
			}
		}
	}

	return nil, false
}

func readKubeConfigFile() (*clientcmdapi.Config, error) {

	// Use the KUBECONFIG env var if set, otherwise use default
	kcFile := os.Getenv("KUBECONFIG")
	if len(kcFile) == 0 {
		usr, err := user.Current()
		if err != nil {
			return nil, err
		}
		kcFile = filepath.Join(usr.HomeDir, ".kube", "config")
	}

	// Check we can unmarshall the request
	data, err := ioutil.ReadFile(kcFile)
	if err != nil {
		return nil, fmt.Errorf("Can not read Kubeconfig file: %s", err)
	}

	cfg, err := clientcmd.NewClientConfigFromBytes(data)
	if err != nil {
		return nil, fmt.Errorf("Can not parse Kubeconfig file: %+v", err)
	}

	kc, err := cfg.RawConfig()
	if err != nil {
		return nil, fmt.Errorf("Can not parse Kubeconfig file: %+v", err)
	}

	return &kc, nil
}

func updateCFFIle(updates map[string]string) error {
	usr, err := user.Current()
	if err != nil {
		return err
	}

	cfFile := filepath.Join(usr.HomeDir, ".cf", "config.json")

	// Check we can unmarshall the request
	data, err := ioutil.ReadFile(cfFile)
	if err != nil {
		return fmt.Errorf("Can not read Cloud Foundry config file: %s", err)
	}

	file, err := os.Open(cfFile)
	if err != nil {
		return err
	}
	defer file.Close()
	stats, err := file.Stat()
	if err != nil {
		return err
	}

	var config map[string]interface{}
	if err = json.Unmarshal(data, &config); err != nil {
		return fmt.Errorf("Can not parse Cloud Foundry config file: %s", err)
	}

	for k, v := range updates {
		config[k] = v
	}

	data, err = json.Marshal(config)
	if err != nil {
		return err
	}

	ioutil.WriteFile(cfFile, data, stats.Mode())
	return nil
}
