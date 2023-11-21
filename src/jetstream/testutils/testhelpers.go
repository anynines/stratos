package testutils

import (
	"net/url"
	"time"

	"github.com/cloudfoundry-incubator/stratos/src/jetstream/api"
	"github.com/cloudfoundry-incubator/stratos/src/jetstream/crypto"
	"github.com/cloudfoundry-incubator/stratos/src/jetstream/datastore"
	"gopkg.in/DATA-DOG/go-sqlmock.v1"
)

var (
	MockCFGUID          = "some-cf-guid-1234"
	MockCFName          = "Some fancy CF Cluster"
	MockHCEGUID         = "some-hce-guid-1234"
	MockHCEName         = "Some fancy HCE Cluster"
	MockAPIEndpoint     = "https://api.127.0.0.1"
	MockAuthEndpoint    = "https://login.127.0.0.1"
	MockDopplerEndpoint = "https://doppler.127.0.0.1"
	MockClientId        = "stratos_clientid"
	MockClientSecret    = "stratos_secret"
	MockAccount         = "asd-gjfg-bob"
	MockTokenExpiry     = time.Now().AddDate(0, 0, 1).Unix()

	MockEncryptionKey = make([]byte, 32)

	MockCipherClientSecret = make([]byte, 0)
)

func ExpectNoRows() *sqlmock.Rows {
	return sqlmock.NewRows([]string{"COUNT(*)"}).AddRow("0")
}

func ExpectOneRow() *sqlmock.Rows {
	return sqlmock.NewRows([]string{"COUNT(*)"}).AddRow("1")
}

func init() {
	MockCipherClientSecret, _ = crypto.EncryptToken(MockEncryptionKey, MockClientSecret)
}

// Gets an empty sqlmock.Rows with all the columns of the cnsis table, except the ones passed as exclude
func GetEmptyCNSIRows(exclude ...string) *sqlmock.Rows {
	return sqlmock.NewRows(datastore.GetColumnNamesForCSNIs(exclude...))
}

// Gets the default CNSI Record for testing
func GetTestCNSIRecord() *api.CNSIRecord {
	u, _ := url.Parse(MockAPIEndpoint)

	return &api.CNSIRecord{
		GUID:                   MockCFGUID,
		Name:                   MockCFName,
		CNSIType:               "cf",
		APIEndpoint:            u,
		AuthorizationEndpoint:  MockAuthEndpoint,
		TokenEndpoint:          MockAuthEndpoint,
		DopplerLoggingEndpoint: MockDopplerEndpoint,
		SkipSSLValidation:      true,
		ClientId:               MockClientId,
		ClientSecret:           MockClientSecret,
		SSOAllowed:             false,
		SubType:                "",
		Metadata:               "",
		Local:                  false,
		Creator:                "",
	}
}

// Gets a prefilled sqlmock.Rows with all the columns of the cnsis table. It contains entries corresponding to the records passed in
func GetCNSIRows(records ...*api.CNSIRecord) *sqlmock.Rows {
	rows := sqlmock.NewRows(datastore.GetColumnNames("cnsis"))

	for _, record := range records {
		rows.AddRow(
			/* guid */ record.GUID,
			/* name */ record.Name,
			/* cnsi_type */ record.CNSIType,
			/* api_endpoint */ record.APIEndpoint.String(),
			/* auth_endpoint */ record.AuthorizationEndpoint,
			/* token_endpoint */ record.TokenEndpoint,
			/* doppler_logging_endpoint */ record.DopplerLoggingEndpoint,
			/* skip_ssl_validation */ record.SkipSSLValidation,
			/* client_id */ record.ClientId,
			/* client_secret */ MockCipherClientSecret,
			/* allow_sso */ record.SSOAllowed,
			/* sub_type */ record.SubType,
			/* meta_data */ record.Metadata,
			/* creator */ record.Creator,
		)
	}

	return rows
}

// Gets an empty sqlmock.Rows with all the columns of the cnsis + token (connected endpoints) table, except the ones passed as exclude
func GetEmptyConnectedEndpointsRows(exclude ...string) *sqlmock.Rows {
	return sqlmock.NewRows(datastore.GetColumnNamesForConnectedEndpoints(exclude...))
}

// Gets a prefilled sqlmock.Rows with all the columns of the cnsis + tokens (connected endpoints) table. It contains entries corresponding to the records passed in
func GetConnectedEndpointsRows(records ...*api.ConnectedEndpoint) *sqlmock.Rows {
	rows := GetEmptyConnectedEndpointsRows(
		"auth_endpoint",
		"token_endpoint",
		"client_id",
		"client_secret",
		"allow_sso",
		"token_guid",
		"auth_token",
		"refresh_token",
		"auth_type",
		"user_guid",
		"linked_token",
	)

	for _, record := range records {
		rows.AddRow(
			/* guid */ record.GUID,
			/* name */ record.Name,
			/* cnsi_type */ record.CNSIType,
			/* api_endpoint */ record.APIEndpoint.String(),
			/* doppler_logging_endpoint */ record.DopplerLoggingEndpoint,
			/* account */ record.Account,
			/* token_expiry */ record.TokenExpiry,
			/* skip_ssl_validation */ record.SkipSSLValidation,
			/* disconnected */ false,
			/* meta_data */ record.TokenMetadata,
			/* sub_type */ record.SubType,
			/* endpoint_metadata */ record.EndpointMetadata,
			/* creator */ record.Creator,
		)
	}

	return rows
}

// Gets the default Connected Enpoint Record for testing
func GetTestConnectedEndpoint() *api.ConnectedEndpoint {
	u, _ := url.Parse(MockAPIEndpoint)

	return &api.ConnectedEndpoint{
		GUID:                   MockCFGUID,
		Name:                   MockCFName,
		CNSIType:               "cf",
		APIEndpoint:            u,
		Account:                MockAccount,
		TokenExpiry:            MockTokenExpiry,
		DopplerLoggingEndpoint: MockDopplerEndpoint,
		AuthorizationEndpoint:  "",
		SkipSSLValidation:      true,
		TokenMetadata:          "",
		SubType:                "",
		EndpointMetadata:       "",
		Local:                  false,
		Creator:                "",
	}
}

func GetEmptyTokenRows(exclude ...string) *sqlmock.Rows {
	return sqlmock.NewRows(datastore.GetColumnNamesForTokens(exclude...))
}
