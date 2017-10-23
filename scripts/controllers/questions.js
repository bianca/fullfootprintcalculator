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

	$http.get('/json/questions.json').success(function(response) {
        $rootScope.questions = response.questions;
        $scope.currentquestion = $rootScope.questions[$scope.pointer]

    });

    $scope.next = function (answer) {
    	$scope.currentquestion.answer = answer
    	answer.selectedAnswer = true;
	    $scope.pointer++
	    if ($scope.pointer in $scope.questions) {
	    	$scope.currentquestion = $rootScope.questions[$scope.pointer]
	    } else {
	    	$location.path("results");
	    }
    }

  });
