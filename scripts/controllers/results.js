'use strict';

/**
 * @ngdoc function
 * @name goodfellowsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the goodfellowsApp
 */
angular.module('ffpApp')
  .controller('ResultsCtrl', function ($scope, $http, $location, $rootScope) {

	$http.get('/json/tips.json').success(function(response) {
        $scope.tips = response.tips;
    });

    $rootScope.basesizes = {
      "air": $rootScope.talley.air/1000,
      "water" : $rootScope.talley.water/1000,
      "land" : $rootScope.talley.land/1000
    }

    console.log($rootScope.basesizes)
  });
