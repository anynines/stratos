/* DO NOT EDIT: This code has been generated by the cf-dotnet-sdk-builder */

(function () {
  'use strict';

  angular
    .module('cloud-foundry.api')
    .run(registerApi);

  function registerApi($http, apiManager) {
    apiManager.register('cloud-foundry.api.ServiceBrokers', new ServiceBrokersApi($http));
  }

  function ServiceBrokersApi($http) {
    this.$http = $http;
  }

  /* eslint-disable camelcase */
  angular.extend(ServiceBrokersApi.prototype, {

    /*
    * Create a Service Broker
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/service_brokers/create_a_service_broker.html
    */
    CreateServiceBroker: function (value, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/service_brokers';
      config.method = 'POST';
      config.data = value;

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

    /*
    * Delete a Particular Service Broker
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/service_brokers/delete_a_particular_service_broker.html
    */
    DeleteServiceBroker: function (guid, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/service_brokers/' + guid + '';
      config.method = 'DELETE';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

    /*
    * List all Service Brokers
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/service_brokers/list_all_service_brokers.html
    */
    ListAllServiceBrokers: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/service_brokers';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

    /*
    * Retrieve a Particular Service Broker
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/service_brokers/retrieve_a_particular_service_broker.html
    */
    RetrieveServiceBroker: function (guid, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/service_brokers/' + guid + '';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    },

    /*
    * Update a Service Broker
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/service_brokers/update_a_service_broker.html
    */
    UpdateServiceBroker: function (guid, value, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v1/proxy/v2/service_brokers/' + guid + '';
      config.method = 'PUT';
      config.data = value;

      for (var option in httpConfigOptions) {
        if (!httpConfigOptions.hasOwnProperty(option)) { continue; }
        config[option] = httpConfigOptions[option];
      }
      return this.$http(config);
    }

  });
  /* eslint-enable camelcase */

})();
