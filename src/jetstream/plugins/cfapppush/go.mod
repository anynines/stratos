module github.com/cloudfoundry-incubator/stratos/src/jetstream/plugins/cfapppush

go 1.21.0

replace (
	code.cloudfoundry.org/cli => code.cloudfoundry.org/cli v6.45.0+incompatible
	github.com/cloudfoundry/cli-plugin-repo => code.cloudfoundry.org/cli-plugin-repo v0.0.0-20230525012251-b9c89116786e
	github.com/moby/moby => github.com/moby/moby v20.10.25+incompatible
	github.com/vito/go-interact => github.com/vito/go-interact v1.0.0
)

require (
	code.cloudfoundry.org/cli v7.1.0+incompatible
	github.com/cloudfoundry-incubator/stratos/src/jetstream/repository/interfaces v0.0.0-20191015083202-4c24d26ae1ec
	github.com/gorilla/websocket v1.5.0
	github.com/labstack/echo/v4 v4.11.1
	github.com/mholt/archiver v3.1.1+incompatible
	github.com/sirupsen/logrus v1.9.3
	gopkg.in/yaml.v2 v2.4.0
)

require (
	code.cloudfoundry.org/bytefmt v0.0.0-20230612151507-41ef4d1f67a4 // indirect
	code.cloudfoundry.org/cfnetworking-cli-api v0.0.0-20190103195135-4b04f26287a6 // indirect
	code.cloudfoundry.org/diego-ssh v0.0.0-20230810200140-af9d79fe9c82 // indirect
	code.cloudfoundry.org/gofileutils v0.0.0-20170111115228-4d0c80011a0f // indirect
	code.cloudfoundry.org/lager v2.0.0+incompatible // indirect
	code.cloudfoundry.org/lager/v3 v3.0.2 // indirect
	code.cloudfoundry.org/ykk v0.0.0-20170424192843-e4df4ce2fd4d // indirect
	github.com/Azure/go-ansiterm v0.0.0-20210617225240-d185dfc1b5a1 // indirect
	github.com/SermoDigital/jose v0.9.1 // indirect
	github.com/apoydence/eachers v0.0.0-20181020210610-23942921fe77 // indirect
	github.com/blang/semver v3.5.1+incompatible // indirect
	github.com/bmatcuk/doublestar v1.3.4 // indirect
	github.com/bmizerany/pat v0.0.0-20210406213842-e4b6760bdd6f // indirect
	github.com/charlievieth/fs v0.0.3 // indirect
	github.com/cloudfoundry-community/go-cfenv v1.17.0 // indirect
	github.com/cloudfoundry/bosh-cli v6.4.1+incompatible // indirect
	github.com/cloudfoundry/bosh-utils v0.0.384 // indirect
	github.com/cloudfoundry/cli-plugin-repo v0.0.0-00010101000000-000000000000 // indirect
	github.com/cloudfoundry/noaa v2.1.0+incompatible // indirect
	github.com/cloudfoundry/sonde-go v0.0.0-20230710164515-a0a43d1dbbf8 // indirect
	github.com/cppforlife/go-patch v0.2.0 // indirect
	github.com/cyphar/filepath-securejoin v0.2.3 // indirect
	github.com/docker/distribution v2.8.2+incompatible // indirect
	github.com/dsnet/compress v0.0.1 // indirect
	github.com/elazarl/goproxy v0.0.0-20230808193330-2592e75ae04a // indirect
	github.com/elazarl/goproxy/ext v0.0.0-20230808193330-2592e75ae04a // indirect
	github.com/fatih/color v1.15.0 // indirect
	github.com/frankban/quicktest v1.14.6 // indirect
	github.com/gogo/protobuf v1.3.2 // indirect
	github.com/golang/snappy v0.0.4 // indirect
	github.com/google/go-querystring v1.1.0 // indirect
	github.com/gorilla/context v1.1.1 // indirect
	github.com/gorilla/securecookie v1.1.1 // indirect
	github.com/gorilla/sessions v1.1.3 // indirect
	github.com/govau/cf-common v0.0.7 // indirect
	github.com/jessevdk/go-flags v1.5.0 // indirect
	github.com/kr/pty v1.1.8 // indirect
	github.com/labstack/echo v3.3.10+incompatible // indirect
	github.com/labstack/gommon v0.4.0 // indirect
	github.com/lunixbochs/vtclean v1.0.0 // indirect
	github.com/mattn/go-colorable v0.1.13 // indirect
	github.com/mattn/go-isatty v0.0.19 // indirect
	github.com/mattn/go-runewidth v0.0.15 // indirect
	github.com/mitchellh/mapstructure v1.1.2 // indirect
	github.com/moby/moby v0.0.0-00010101000000-000000000000 // indirect
	github.com/moby/term v0.5.0 // indirect
	github.com/nwaples/rardecode v1.1.3 // indirect
	github.com/onsi/ginkgo v1.16.5 // indirect
	github.com/onsi/gomega v1.27.10 // indirect
	github.com/opencontainers/go-digest v1.0.0 // indirect
	github.com/pierrec/lz4 v2.6.1+incompatible // indirect
	github.com/rivo/uniseg v0.2.0 // indirect
	github.com/sabhiram/go-gitignore v0.0.0-20210923224102-525f6e181f06 // indirect
	github.com/tedsuo/rata v1.0.0 // indirect
	github.com/ulikunitz/xz v0.5.11 // indirect
	github.com/valyala/bytebufferpool v1.0.0 // indirect
	github.com/valyala/fasttemplate v1.2.2 // indirect
	github.com/vito/go-interact v0.0.0-00010101000000-000000000000 // indirect
	github.com/xi2/xz v0.0.0-20171230120015-48954b6210f8 // indirect
	golang.org/x/crypto v0.12.0 // indirect
	golang.org/x/net v0.14.0 // indirect
	golang.org/x/sys v0.11.0 // indirect
	golang.org/x/term v0.11.0 // indirect
	golang.org/x/text v0.12.0 // indirect
	google.golang.org/protobuf v1.31.0 // indirect
	gopkg.in/cheggaaa/pb.v1 v1.0.28 // indirect
)
