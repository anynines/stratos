package custom_error

import "errors"

const (
	ERR_DIAL_TCP                   = "dial"
	ERR_NO_DATABASE_VERSIONS_FOUND = "no database versions found"
	ERR_NO_SUCH_TABLE              = "no such table"
	ERR_X509_CERTIFICATE           = "x509: certificate"
)

var ErrDialTcp = errors.New(ERR_DIAL_TCP)
var ErrNoDatabaseVersionsFound = errors.New(ERR_NO_DATABASE_VERSIONS_FOUND)
var ErrNoSuchTable = errors.New(ERR_NO_SUCH_TABLE)
var Err509Certificate = errors.New(ERR_X509_CERTIFICATE)
