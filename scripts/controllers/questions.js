'use strict';

/**
 * @ngdoc function
 * @name goodfellowsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the goodfellowsApp
 */
angular.module('ffpApp')
  .controller('QuestionsCtrl', function ($scope, $http, $location, $rootScope,$window) {

  	$scope.pointer = 1
  	$scope.currentquestion = null
    $scope.fl = false

	$http.get(host+'/json/questions.json').success(function(response) {
        $rootScope.questions = response.questions;
        $scope.currentquestion = $rootScope.questions[$scope.pointer]

    });
    
    $scope.next = function (answer) {
    	$scope.currentquestion.answer = answer
    	answer.selectedAnswer = true;
	    $scope.pointer++
	    if ($scope.pointer in $scope.questions) {
	    	$scope.currentquestion = $rootScope.questions[$scope.pointer]
        $scope.fl = !$scope.fl
	    } else {
	    	//$location.url("http://www.fullfootprint.org/measure1.html#/results")
        //$location.href = "http://www.fullfootprint.org/measure1.html#/results"
        $location.path("/results")
        //$scope.$apply()
	    }
    }

  });
