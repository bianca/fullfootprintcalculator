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
        $scope.calculate()
    });

    $rootScope.chosenTips = []

    $scope.tabulate = {
      land: {
        housing : 0,
        mobility : 0,
        holidays : 0,
        foodDrink : 0,
        otherGoods : 0,
        healthEducation : 0,
        otherInfrastructure : 0
      },
      air: {
        housing : 0,
        mobility : 0,
        holidays : 0,
        foodDrink : 0,
        otherGoods : 0,
        healthEducation : 0,
        otherInfrastructure : 0
      },
      water: {
        housing : 0,
        mobility : 0,
        holidays : 0,
        foodDrink : 0,
        otherGoods : 0,
        healthEducation : 0,
        otherInfrastructure : 0
      }
    }

    //$rootScope.basesizes = {
    //  "air": Math.min(Math.max(15,$rootScope.talley.air/10000),100),
    //  "water" : Math.min(Math.max(15,$rootScope.talley.water/10000),100),
    //  "land" : Math.min(Math.max(15,$rootScope.talley.land/10000),100)
    //}
    $rootScope.basesizes = {
      land: {
        max: 1399.8807736253,
        min: 85.7812153379
      },
      air: {
        max: 2429.8742477161,
        min: 192.4701422197
      },
      water: {
        max: 349775, //197766.770503565,
        min: 48125.0102803738
      }
    }

    $scope.sum = {
      land: 0,
      air: 0,
      water: 0
    }

    $scope.relativeTotal = {
      land: 0,
      air: 0,
      water: 0
    }

    $scope.relativeOffset = {
      land: 0,
      air: 0,
      water: 0
    }

    $scope.relativeLine = {
      land: 0,
      air: 0,
      water: 0
    }

    $scope.proportions = {
      housing: {
        land: 0.16,
        air: 0.23,
        water: {
          eu: 0.04,
          na: 0.09,
          rotw: 0.07
        },
      },
      mobility : 0.13,    
      foodDrink: {
        land: 0.25,
        air: 0.05,
        water: {
          eu: 0.66,
          na: 0.52,
          rotw: 0.83
        }  
      },
      healthEducation : {
        land: 0.02,
        air: 0.02
      },      
      holidays : {
        land: 0.04,
        air: 0.01      
      },
      otherGoods : {
        land: 0.22,
        air: 0.38,
        water: {
          eu: 0.3,
          na: 0.39,
          rotw: 0.1
        }
      },
      otherInfrastructure : 0.18     
    }

    $scope.multipliers = {
        land: {
          housing : [2,3,4],
          mobility : [5],
          holidays : [6],
          foodDrink : [7],
          otherGoods : [9],
          healthEducation : [],
          otherInfrastructure : []
        },
        air: {
          housing : [2,3],
          mobility : [5],
          holidays : [6],
          foodDrink : [7],
          otherGoods : [9],
          healthEducation : [],
          otherInfrastructure : []
        },
        water: {
          housing : [2,3],
          mobility : [5],
          holidays : [6],
          foodDrink : [7],
          otherGoods : [9],
          healthEducation : [],
          otherInfrastructure : []
        }
      } 

      $scope.convert = {
        "air":5.192,
        "land": 1.709,
        "water": 2500
      }
      $scope.convertedValues = {
        "air": 0,
        "land": 0,
        "water": 0
      }

    $rootScope.chooseTips = function () {
      /*
      var count = 0;
      for (var i = 1; i<5; i++) {
        for (var m in $rootScope.basesizes) {
          if ($rootScope.basesizes[m] > 25*(i-1) && $rootScope.basesizes[m] <= 25*(i) ) {
            //$rootScope.chosenTips[count] = 
            break;
          }
        }
      }
       */     
      for (var i=0; i<3; i++) {
        var r = (Math.floor((Math.random())*100)%15)

        $rootScope.chosenTips[i] = $scope.tips[r]
        console.log(r, $scope.tips[r])
      }

    }
    
    $scope.calculate = function () {
      var q = $rootScope.questions
      var p = $scope.proportions
      /*
      $scope.tabulate = {
        land: {
          housing : p.housing.land*q[1].answer.land*q[2].answer.land*q[3].answer.land*q[4].answer.land,
          mobility : p.mobility*q[1].answer.land*q[5].answer.land,
          holidays : p.holidays.land*q[1].answer.land*q[6].answer.land,
          foodDrink : p.foodDrink.land*q[1].answer.land*q[7].answer.land,
          otherGoods : p.otherGoods.land*q[1].answer.land*q[9].answer.land,
          healthEducation : p.healthEducation.land*q[1].answer.land,
          otherInfrastructure : p.otherInfrastructure*q[1].answer.land
        },
        air: {
          housing : p.housing.air*q[1].answer.air*q[2].answer.air*q[3].answer.air,
          mobility : p.mobility*q[1].answer.air*q[5].answer.air,
          holidays : p.holidays.air*q[1].answer.air*q[6].answer.air,
          foodDrink : p.foodDrink.air*q[1].answer.air*q[7].answer.air,
          otherGoods : p.otherGoods.air*q[1].answer.air*q[9].answer.air,
          healthEducation : p.healthEducation.air*q[1].answer.air,
          otherInfrastructure : p.otherInfrastructure*q[1].answer.air
        },
        water: {
          housing : p.housing.water[q[1].answer.shortanswer]*q[1].answer.water*q[2].answer.water*q[3].answer.water,
          mobility : p.mobility*q[1].answer.water*q[5].answer.water,
          holidays : p.holidays.water*q[1].answer.water*q[6].answer.water,
          foodDrink : p.foodDrink.water[q[1].answer.shortanswer]*q[1].answer.water*q[7].answer.water,
          otherGoods : p.otherGoods.water[q[1].answer.shortanswer]*q[1].answer.water*q[9].answer.water,
          healthEducation : p.healthEducation.water*q[1].answer.water,
          otherInfrastructure : p.otherInfrastructure*q[1].answer.water
        }
      } 
      */
      for (var metric in $scope.multipliers) {
        var addup = 0;
        for (var category in $scope.multipliers[metric]) {
          if (!!isNaN(p[category]) ) {
            if (!!(metric in p[category])) {
              if (!!isNaN(p[category][metric])) {
                var addupCategory = p[category][metric][q[1].answer.shortanswer]*q[1].answer[metric]
              } else {
                var addupCategory = p[category][metric]*q[1].answer[metric]
              }
            }
          } else {
            var addupCategory = p[category]*q[1].answer[metric]
          }
          console.log("base", addupCategory)
          for (var a in $scope.multipliers[metric][category]) {
           var questionNumber = $scope.multipliers[metric][category][a]
            if (!!(metric in q[questionNumber].answer)) {
              if (!!isNaN(q[questionNumber].answer[metric])) {
                addupCategory = addupCategory * q[questionNumber].answer[metric][q[1].answer.shortanswer]
              } else {
                addupCategory = addupCategory * q[questionNumber].answer[metric]
              }
            }
          }
          console.log("changed", addupCategory)
          addup += addupCategory
        }
        console.log(addup)
        $scope.sum[metric] = Math.floor(addup)
      }


      for (var metric in $scope.relativeTotal) {
         $scope.convertedValues[metric] = Math.floor($scope.sum[metric]/$scope.convert[metric])

         $scope.relativeTotal[metric] = Math.max(Math.floor(150*$scope.sum[metric]/$rootScope.basesizes[metric].max),50)
         console.log($scope.relativeTotal[metric])
         console.log($scope.sum[metric],$rootScope.basesizes[metric].max, ($scope.sum[metric]/$rootScope.basesizes[metric].max), $scope.relativeTotal[metric])
         $scope.relativeOffset[metric] = $scope.relativeTotal[metric] > 100 ? (($scope.relativeTotal[metric])-100)/2 : 0
         $scope.relativeLine[metric] = Math.min($scope.relativeTotal[metric]*2.95,295)
      }
      $rootScope.chooseTips();
    }



  });
