// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ngIOS9UIWebViewPatch','ionic','ngResource', 'starter.controllers', 'starter.services', 'starter.filters','ngCordova', 'ngMap'])

.run(function($ionicPlatform, $state, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
      StatusBar.style(1)
    }
  });
    var user = localStorage.getItem('user');
    if(user) {
      $rootScope.isLoggedIn = JSON.parse(user);
    }
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
//      if(toState.url === "/tripcard" && !$rootScope.isLoggedIn) {
//        event.preventDefault();
//        $rootScope.login();
//      }
    });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

 
    .state('app.locations', {
      url: '/locations',
      views: {
        'menuContent': {
          templateUrl: 'templates/locations.html',
          controller: 'LocationCtrl'
        }
      }
    })
    .state('app.locationslist', {
      url: '/locationslist',
      views: {
        'menuContent': {
          templateUrl: 'templates/locations_list.html',
          controller: 'LocationCtrl'
        }
      }
    })
    
    .state('app.filter', {
      url: '/filter',
      views: {
        'menuContent': {
          templateUrl: 'templates/filter.html',
          controller: 'FilterCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/locations/:location_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/categories.html',
        controller: 'CategoryCtrl'
      }
    }
  })
   .state('app.favorite', {
    url: '/favorite',
    views: {
      'menuContent': {
        templateUrl: 'templates/favorite.html',
        controller: 'ListCtrl'
      }
    }
  })
    .state('app.list', {
      url: '/locations/:location_id/:business_category_id',
      views: {
        'menuContent': {
          templateUrl: 'templates/list.html',
          controller: 'ListCtrl'
        }
      }
    })
     .state('app.search', {
      url: '/search/search/:keyword',
      views: {
        'menuContent': {
          templateUrl: 'templates/list.html',
          controller: 'ListCtrl'
        }
      }
    })
  .state('app.tripcard', {
    url: '/tripcard',
    views: {
      'menuContent': {
        templateUrl: 'templates/tripcard.html',
        controller: 'TripCardCtrl'
      }
    }
  })
  .state('app.detail', {
    url: '/locations/:location_id/:business_category_id/:listing_id/detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/detail.html',
        controller: 'DetailCtrl'
      }
    }
  })
  .state('app.mapview', {
    url: '/locations/:location_id/:business_category_id/mapview',
    views: {
      'menuContent': {
        templateUrl: 'templates/mapview.html',
        controller: 'MapViewCtrl'
      }
    }
  })
    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
          controller: 'AboutCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/locations');
    $ionicConfigProvider.navBar.alignTitle('center');
}).value("ServiceURL", "http://tn.tnsvr1.com/work");
