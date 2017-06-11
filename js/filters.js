/**
 * Created by zippo on 29/9/15.
 */
angular.module('starter.filters', [])
  .filter('formatDistance', function(){
    return function(item) {
      return parseFloat(item).toFixed(1) + "";
    }
  });
