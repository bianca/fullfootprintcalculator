'use strict';

/**
 * @ngdoc function
 * @name goodfellowsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the goodfellowsApp
 */
angular.module('ffpApp')
  .controller('QuestionsCtrl', function ($scope, $http, $location, $rootScope) {

  	$scope.pointer = 1
  	$scope.currentquestion = null
  	$rootScope.talley = {
  		"air": null,
  		"water" : null,
  		"land" : null
  	}

	$http.get('/json/questions.json').success(function(response) {
        $scope.questions = response.questions;
        $scope.currentquestion = $scope.questions[$scope.pointer]

    });

    $scope.next = function (answer) {
    	for (var i in $rootScope.talley) {
	    	if (i in answer) {
	    		if ($rootScope.talley[i] == null) {
	    			$rootScope.talley[i] = answer[i]
	    		} else {
	    			$rootScope.talley[i] = answer[i]*$rootScope.talley[i]
	    		}  		
	    	}
	    }
	    $scope.pointer++
	    if ($scope.pointer in $scope.questions) {
	    	$scope.currentquestion = $scope.questions[$scope.pointer]
	    } else {
	    	$location.path("results");
	    }
    }

  });
