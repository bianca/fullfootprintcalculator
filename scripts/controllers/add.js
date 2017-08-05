 'use strict';

/**
 * @ngdoc function
 * @name goodfellowsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the goodfellowsApp
 */
angular.module('goodfellowsApp')
  .controller('AddCtrl', function ($scope, $resource, Store) {
  	$scope.add = new Store()
  	$scope.submit = function () {
  		$scope.add.$save()
	 }

  });
