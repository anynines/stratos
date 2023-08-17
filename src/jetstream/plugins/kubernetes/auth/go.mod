module github.com/cloudfoundry-incubator/stratos/src/jetstream/plugins/kubernetes/auth

go 1.21.0

replace (
	github.com/cloudfoundry-incubator/stratos/src/jetstream/plugins/kubernetes => ../../kubernetes
	github.com/kubernetes-sigs/aws-iam-authenticator => github.com/kubernetes-sigs/aws-iam-authenticator v0.3.1-0.20190111160901-390d9087a4bc
	k8s.io/client-go => k8s.io/client-go v0.23.17
)

require (
	github.com/SermoDigital/jose v0.9.1
	github.com/aws/aws-sdk-go v1.44.324
	github.com/cloudfoundry-incubator/stratos/src/jetstream/plugins/kubernetes v0.0.0-00010101000000-000000000000
	github.com/cloudfoundry-incubator/stratos/src/jetstream/repository/interfaces v0.0.0-20191015083202-4c24d26ae1ec
	sigs.k8s.io/aws-iam-authenticator v0.6.11
	github.com/labstack/echo/v4 v4.11.1
	github.com/sirupsen/logrus v1.9.3
	k8s.io/client-go v0.23.17
)

require (
	github.com/cloudfoundry-community/go-cfenv v1.17.0 // indirect
	github.com/go-logr/logr v1.2.0 // indirect
	github.com/gogo/protobuf v1.3.2 // indirect
	github.com/google/go-cmp v0.5.5 // indirect
	github.com/google/gofuzz v1.1.0 // indirect
	github.com/gorilla/context v1.1.1 // indirect
	github.com/gorilla/securecookie v1.1.1 // indirect
	github.com/gorilla/sessions v1.1.3 // indirect
	github.com/gorilla/websocket v1.4.0 // indirect
	github.com/govau/cf-common v0.0.7 // indirect
	github.com/jmespath/go-jmespath v0.4.0 // indirect
	github.com/json-iterator/go v1.1.12 // indirect
	github.com/labstack/echo v3.3.10+incompatible // indirect
	github.com/labstack/gommon v0.4.0 // indirect
	github.com/mattn/go-colorable v0.1.13 // indirect
	github.com/mattn/go-isatty v0.0.19 // indirect
	github.com/mitchellh/mapstructure v1.1.2 // indirect
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.2 // indirect
	github.com/valyala/bytebufferpool v1.0.0 // indirect
	github.com/valyala/fasttemplate v1.2.2 // indirect
	golang.org/x/crypto v0.11.0 // indirect
	golang.org/x/net v0.12.0 // indirect
	golang.org/x/sys v0.10.0 // indirect
	golang.org/x/text v0.11.0 // indirect
	gopkg.in/inf.v0 v0.9.1 // indirect
	gopkg.in/tomb.v1 v1.0.0-20141024135613-dd632973f1e7 // indirect
	gopkg.in/yaml.v2 v2.4.0 // indirect
	k8s.io/apimachinery v0.23.17 // indirect
	k8s.io/klog/v2 v2.30.0 // indirect
	k8s.io/utils v0.0.0-20211116205334-6203023598ed // indirect
	sigs.k8s.io/json v0.0.0-20211020170558-c049b76a60c6 // indirect
	sigs.k8s.io/structured-merge-diff/v4 v4.2.3 // indirect
)
