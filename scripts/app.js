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
  host = "http://calculator.fullfootprint.org/"
}
var App = angular
  .module('ffpApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ]);



  App.config(function ($locationProvider, $routeProvider, $httpProvider, $sceDelegateProvider) {
    //$httpProvider.defaults.useXDomain = true;
    //$sceDelegateProvider.resourceUrlWhitelist(['http://calculator.fullfootprint.org/*']);
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: host+'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/questions', {
        templateUrl: host+'views/questions.html',
        controller: 'QuestionsCtrl'
      })
      .when('/results', {
        templateUrl: host+'views/results.html',
        controller: 'ResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function ($rootScope, $window) {
    $rootScope.live = host
    $rootScope.hideshow = {
      buyOffsets : false
    }
    $rootScope.calculatorHeight = $window.innerHeight - 100
    $rootScope.appHeight = $window.innerHeight
    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){
       event.preventDefault();
       //window.history.forward();
    });
  });



