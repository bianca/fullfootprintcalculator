'use strict';

/**
 * @ngdoc function
 * @name goodfellowsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the goodfellowsApp
 */
angular.module('ffpApp')
  .controller('MainCtrl', function ($scope, $resource, $filter, $rootScope) {

 	$rootScope.localhref = window.location.href

 	if (host != "www.fullfootprint.org") {
	  $rootScope.localhref = ""
	} 
  });
