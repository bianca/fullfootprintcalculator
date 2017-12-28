'use strict';

/**
 * @ngdoc function
 * @name goodfellowsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the goodfellowsApp
 */
angular.module('ffpApp')
  .controller('ResultsCtrl', function ($scope, $http, $location, $rootScope, $window, $uibModal, $document, $cookies) {

	$http.get(host+'/json/tips.json').success(function(response) {
        $scope.tips = response.tips;
        $scope.calculate()
    });

    $rootScope.chosenTips = []


    var offseturls = {
      air: "http://www.fullfootprint.org/store/p18/kgcarbon",
      land: "http://www.fullfootprint.org/store/p19/10m2",
      water: "http://www.fullfootprint.org/store/p20/10gallons"
    }

    var offsetitemids = {
      air: 18,
      land: 19,
      water: 20
    }
    var offsetmultiplicationfactors = {
      air: 1,
      land: 10,
      water: 10
    }
    $scope.grow = false
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


//      $scope.convert = {
//        "air":5.192,
//        "land": 1.709,
//        "water": 2500
//      }
      $scope.convert = {
        "air": 1000,
        "land": 1000,
        "water": 220
      }
      $scope.convertedValues = {
        "air": 0,
        "land": 0,
        "water": 0
      }
      $scope.tipvalues = 0

   var postorder = ['air','water','land']
    var offsettypes = ['air','land','water']
  var percentage = {
    day: (1/365),
    week: (7/365),
    month: ((365/12)/365)
  }

  var costperunit = {
    air: 0.02,
    land: 0.04,
    water: 0.02
  }
  $scope.cost = {
    day: {
      total: 0
    },
    week: {
      total: 0
    },
    month: {
      total: 0
    }
  }
  var setCost = function () {
    for (var partofyear in $scope.cost) {
      $scope.cost[partofyear].total = 0
      for (var offsettype in offsettypes) {
        $scope.cost[partofyear][offsettypes[offsettype]] = Math.floor($scope.sum[ offsettypes[offsettype] ]/72*percentage[partofyear]*offsetmultiplicationfactors[offsettypes[offsettype]])*costperunit[offsettypes[offsettype]]
        $scope.cost[partofyear].total += $scope.cost[partofyear][offsettypes[offsettype]]
      }
      $scope.cost[partofyear].total = ($scope.cost[partofyear].total).toFixed(2)
    }

  }

    $rootScope.chooseTips = function () {
       $rootScope.chosenTips = []
       var whitelist = []
       var blacklist = []
       var q = $rootScope.questions
       for (var qs in q) {
        if ("blacklist" in q[qs].answer) {
          blacklist = blacklist.concat(q[qs].answer.blacklist)
        }
        if ("whitelist" in q[qs].answer) {
          whitelist = whitelist.concat(q[qs].answer.whitelist)
        }
       }
       console.log($scope.tips)
       for (var i in whitelist) {
        if ($rootScope.chosenTips.length < 3) {
          $rootScope.chosenTips.push($scope.tips[whitelist[i]])
          delete $scope.tips[whitelist[i]]
        }
       }
       console.log($scope.tips)
       console.log(whitelist, $rootScope.chosenTips)
       if ($rootScope.chosenTips.length < 3) {

          for (var i in blacklist) {
            delete $scope.tips[blacklist[i]]
          }
          while ($rootScope.chosenTips.length < 3) {
            var r = (Math.floor((Math.random())*100)%15)
            console.log(r, $rootScope.chosenTips)
            if (r in $scope.tips) {
              $rootScope.chosenTips.push($scope.tips[r])
            }
          }
       }

       for (var i in $rootScope.chosenTips) {
          $rootScope.chosenTips[i].checked = false
       }
       console.log($rootScope.chosenTips)

    }
    
    $scope.calculate = function () {
      var q = $rootScope.questions
      var p = $scope.proportions
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

      // $scope.sum is in the calculator units: gha, tCO2 and, m3
      // we use $scope.convert to m2, kg, and gallons
      // we display $scope.convertedValues

      for (var metric in $scope.relativeTotal) {
         //$scope.convertedValues[metric] = Math.floor($scope.sum[metric]/$scope.convert[metric])
         $scope.convertedValues[metric] = Math.floor($scope.sum[metric]*$scope.convert[metric])
         $scope.relativeTotal[metric] = Math.max(Math.floor(150*$scope.sum[metric]/$rootScope.basesizes[metric].max),50)         
         $scope.relativeOffset[metric] = $scope.relativeTotal[metric] > 100 ? (($scope.relativeTotal[metric])-100)/2 : 0
         $scope.relativeLine[metric] = Math.min($scope.relativeTotal[metric]*2.95,295)
      }
      setCost()
      $rootScope.chooseTips();
    }

    $scope.checktoggle = function (tip) {
        tip.checked=!tip.checked
        if (!tip.checked) {
          $scope.tipvalues = $scope.tipvalues - 20
        } else {
          $scope.tipvalues = $scope.tipvalues + 20
        }
    }

    $scope.openCart = function () {
        var p =angular.element($document[0].querySelector('#calculator'))
        $scope.a = true
        $scope.s = 'lg'
        var modalInstance = $uibModal.open({
              animation: $scope.a,
              appendTo: p,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'http://calculator.fullfootprint.org/views/partials/modal.html',
              controller: 'ModalCtrl',
              //controllerAs: '$ctrl'
              size: $scope.s

            });
    }

//    $scope.iterate = 0;
//    $scope.offsetbypercentage = 0;
//    var checkifloaded = function(){ 
//        var u = $("#offsetwindowframe").attr('src')
//        var tp = "";
//        if (u == offseturls['air']) {
//          tp = 'air'
//        }
//        if (u == offseturls['land']) {
//          tp = 'land'
//        }
//        if (u == offseturls['water']) {
//          tp = 'water'
//        }
//        if (tp != "") {
//          var amt = Math.floor($scope.sum[ tp ]*$scope.offsetbypercentage)
//          console.log(tp, amt)
//          $("#offsetwindowframe").contents().find("#wsite-com-product-quantity-input").val(amt)
//          $("#offsetwindowframe").contents().find("#wsite-com-product-add-to-cart")[0].click()  
//          if ($scope.iterate+1 in offsettypes) {
//            //$( "#offsetwindowframe" ).unbind("load")
//            $scope.iterate++
//            console.log("offset more")
//            $scope.offsetEach()
//          } else {
//            console.log("opencart")
//            $scope.openCart()
//          }
//          return;
//
//        }
//    }
    //$('#offsetwindowframe').bind("load",checkifloaded);
//    $scope.offsetEachold = function (num, percentage) {    
//      $("#offsetwindowframe").attr('src', offseturls[Object.keys($scope.sum)[$scope.iterate]]); 
 //   }

//    $scope.offsetold = function (percentage) {
//      console.log("offset...");
//      $scope.iterate = 0
//      $scope.offsetbypercentage = percentage
//      angular.forEach($cookies, function (v, k) {
//          $cookies.remove(k);
//      });
//      $scope.offsetEach((percentage/365))
//    }
  $rootScope.storeurl = "";
  $rootScope.urltouse = "http://calculator.fullfootprint.org/views/loading.html"

   $scope.offsetEach = function (num, percentage) {
          console.log(num, postorder[num])
          console.log(Object.keys($scope.sum)[num])
          console.log(percentage, "percentage")
          console.log($scope.sum[ postorder[num] ] , "lifetime amount")
          console.log($scope.sum[ postorder[num] ]/72 , "yearly amount")
          console.log($scope.sum[ postorder[num] ]/72*percentage, "")

          // buyunites calculates the number of units to be purchased
          // divide the lifetime calculated amount by 72 years to get the impact per year
          // multiply that by the percentage of the year the user is offsetting
          // $scope.sum is in the calculator units: gha, tCO2 and, m3
          // multiply that by the factor that adjusts for the unit of measure used in the cart. while CO2 is by the kg, water is by the tens of gallons and land is by the tens of hectares
          //var buyunits = Math.floor($scope.sum[ postorder[num] ]/72*percentage*offsetmultiplicationfactors[postorder[num]])
          var buyunits = $scope.cost[percentage][postorder[num]]
          var data = {jsonrpc: "2.0", method: "Checkout::addItem", params: [offsetitemids[postorder[num]], "1", buyunits, {}], id: 0}
          $http.post('http://www.fullfootprint.org/ajax/api/JsonRPC/Commerce/?Commerce[Checkout::addItem]', data).success(function(response) {
            $rootScope.storeurl = response.result.data.checkout_url
            console.log($rootScope.storeurl)
            if ((num+1) in postorder) {
              $scope.offsetEach(num+1, percentage)
            } else {  
              $rootScope.urltouse = angular.copy($rootScope.storeurl)
              // $window.open('https://www-fullfootprint-org.checkout.weebly.com/#cart', '_blank');
            }
          });
    }

    //$("#offsetwindowframe").load(function() { 
    //      console.log("#offsetwindowframe loaded");
    //      $rootScope.urltouse = $("#offsetwindowframe").contents().find("#wsite-com-minicart-checkout-button").attr("href")
    //      $rootScope.safeApply()
    //      console.log($rootScope.urltouse)
    //  })

    $scope.offset = function (percentage) {
      $scope.openCart()
      var getdata = {
          id:0,
          jsonrpc: "2.0",
          method : "Checkout::getCurrentOrder",
          params:[]
        }
      $http.post("http://www.fullfootprint.org/ajax/api/JsonRPC/Commerce/?Commerce[Checkout::getCurrentOrder]",getdata).success(function (response) {
          
          if (response.result.data != null) {
              var items = response.result.data.order.items
              angular.forEach(items, function (item, key) {
                  var data = {
                    id:0,
                    jsonrpc: "2.0",
                    method : "OrderItem::updateQuantity",
                    params:[{site_order_id: item.site_order_id, site_order_item_id: item.site_order_item_id, quantity: 0}]
                  }
                  $http.post("http://www.fullfootprint.org/ajax/api/JsonRPC/Commerce/?Commerce[OrderItem::updateQuantity]", data).success(function (resp) {
                    console.log((items.length-1), key, items.length-1 == key)
                    if (items.length-1 == key) {
                      $scope.offsetEach(0, percentage)
                    } 
                  })
              })
        } else {
          $scope.offsetEach(0, (percentage/365))
        }
      })


      //$("#offsetwindowframe").attr('src', "http://www.fullfootprint.org/store/p18/kgcarbon"); 

    }


  });
