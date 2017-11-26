'use strict';

/**
 * @ngdoc overview
 * @name goodfellowsApp
 * @description
 * # goodfellowsApp
 *
 * Main module of the application.
 */
var host = window.location.hostname;
if (host == "localhost") {
  host = ""
} else if (host == "www.fullfootprint.org") {
  host = "http://calculator.fullfootprint.org"
}
var App = angular
  .module('ffpApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($locationProvider, $routeProvider, $httpProvider, $sceDelegateProvider) {
    //$httpProvider.defaults.useXDomain = true;
    //$sceDelegateProvider.resourceUrlWhitelist(['http://calculator.fullfootprint.org/*']);
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/questions', {
        templateUrl: 'views/questions.html',
        controller: 'QuestionsCtrl'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function ($rootScope) {
    $rootScope.live = host
    $rootScope.buyOffsets = false
    $rootScope.calculatorHeight = $window.innerHeight - 100
  });



