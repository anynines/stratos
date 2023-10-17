package errorz

import "errors"

var ErrDialTcp = errors.New("dial tcp")
var ErrNoSuchTable = errors.New("no such table")
var ErrNoDatabaseVersionsFound = errors.New("no database versions found")
var Err509Certificate = errors.New("x509: certificate")
