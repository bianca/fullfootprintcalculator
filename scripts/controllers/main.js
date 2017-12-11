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
 	var check = window.location.hostname
 	console.log(check)
 	if (check != "www.fullfootprint.org") {
	  $rootScope.localhref = ""
	} else {
	  $rootScope.localhref = "http://www.fullfootprint.org/calculator"	
	}
	console.log($rootScope.localhref)
  });
