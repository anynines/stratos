module github.com/cloudfoundry-incubator/stratos/src/jetstream/plugins/kubernetes

go 1.20

require (
	github.com/SermoDigital/jose v0.9.1
	github.com/aws/aws-sdk-go v1.17.5
	github.com/ghodss/yaml v1.0.0
	github.com/gorilla/websocket v1.4.0
	github.com/kubernetes-sigs/aws-iam-authenticator v0.3.0
	github.com/labstack/echo v3.3.10+incompatible
	github.com/sirupsen/logrus v1.9.0
	github.com/smartystreets/goconvey v1.6.4
	gopkg.in/yaml.v2 v2.4.0
	helm.sh/helm/v3 v3.12.3
	k8s.io/api v0.27.3
	k8s.io/apimachinery v0.28.0
	k8s.io/client-go v0.27.3
)

require (
	github.com/Masterminds/semver v1.4.2 // indirect
	github.com/Masterminds/sprig v2.18.0+incompatible // indirect
	github.com/chai2010/gettext-go v1.0.2 // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/docker/docker v23.0.1+incompatible // indirect
	github.com/elazarl/goproxy v0.0.0-20191011121108-aa519ddbe484 // indirect
	github.com/gregjones/httpcache v0.0.0-20190212212710-3befbb6ad0cc // indirect
	github.com/heptio/authenticator v0.3.0 // indirect
	github.com/russross/blackfriday v2.0.0+incompatible // indirect
	github.com/satori/go.uuid v1.2.0 // indirect
	github.com/shurcooL/sanitized_anchor_name v1.0.0 // indirect
	github.com/technosophos/moniker v0.0.0-20180509230615-a5dbd03a2245 // indirect
	gopkg.in/DATA-DOG/go-sqlmock.v1 v1.3.0 // indirect
)

replace (
	github.com/SermoDigital/jose => github.com/SermoDigital/jose v0.9.2-0.20180104203859-803625baeddc
	github.com/cloudfoundry-incubator/stratos/src/jetstream => ../../../jetstream
	github.com/cloudfoundry-incubator/stratos/src/jetstream/plugins/kubernetes/auth => ./auth
	github.com/docker/docker => github.com/moby/moby v0.7.3-0.20190826074503-38ab9da00309
	github.com/kubernetes-sigs/aws-iam-authenticator => github.com/kubernetes-sigs/aws-iam-authenticator v0.3.1-0.20190111160901-390d9087a4bc
	github.com/russross/blackfriday v2.0.0+incompatible => github.com/russross/blackfriday v1.5.2
	github.com/sergi/go-diff => github.com/sergi/go-diff v1.0.0
	github.com/spf13/cobra => github.com/spf13/cobra v0.0.3
)
