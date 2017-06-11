/**
 * Created by zippo on 14/9/15.
 */
angular.module('starter.services', [])
.service('API', function($resource){
    return $resource('http://tn.tnsvr1.com/work/app/:req',{}, {
      getLocations: {
        method: 'GET',
        params: {
          req: 'get_listings'//'get_locations'
        },
        transformResponse: function(data) {
          var response = angular.fromJson(data);
          if(angular.isArray(response)) {
            return {
              success: true,
              locations: response
            };
          } else {
            return response;
          }
        }
      },
      getCategories: {
        method: 'GET',
        params: {
          req: 'get_categories'
        },
        transformResponse: function(data) {
          var response = angular.fromJson(data);
          if(angular.isArray(response)) {
            return {
              success: true,
              categories: response
            };
          } else {
            return response;
          }
        }
      },
    getSubcategories: {
      method: 'GET',
      params: {
        req: 'get_subcategories'
      },
      transformResponse: function(data) {
        var response = angular.fromJson(data);
        if(angular.isArray(response)) {
          return {
            success: true,
            subCategories: response
          };
        } else {
          return response;
        }
      }
    },
    getDetail: {
      method: 'GET',
      params: {
        req: 'get_listing'
      },
      transformResponse: function(data) {
        var response = angular.fromJson(data);
        if(angular.isArray(response)) {
          return {
            success: true,
            subCategories: response
          };
        } else {
          return response;
        }
      }
    },
      getAttributes: {
        method: 'GET',
        params: {
          req: 'get_attributes'
        },
        transformResponse: function(data) {
          var response = angular.fromJson(data);
          if(angular.isArray(response)) {
            return {
              success: true,
              attributes: response
            };
          } else {
            return response;
          }
        }
      },//get_listing_reviews
      getListings: {
        method: 'GET',
        params: {
          req: 'get_listings'
        },
        
        transformResponse: function(data) {
          var response = angular.fromJson(data);
          if(response.listings != undefined) {
            return {
              success: true,
              listings: response.listings,
              pagination: response.pagination
            };
          } else {
            return response;
          }
        }
      },
      getListingsReviews: {
        method: 'POST',
        params: {
          req: 'get_listing_reviews'
        },
        transformResponse: function(data) {
          var response = angular.fromJson(data);
          if(angular.isArray(response)) {
              console.log(response);
            return {
              success: true,
//              attributes: response
            };
          } else {
            return response;
          }
        }
      },
      postReview: {
        method: 'POST',
        params: {
          req: 'post_review'
        }
      },
      contact: {
        method: 'POST',
        params: {
          req: 'contact'
        }
      },
      login: {
        method: 'POST',
        params: {
          req: 'login'
        }
      },
    getAbout: {
      method: 'GET',
      params: {
        req: 'get_about'
      }
    },
      getTripcard: {
        method: 'GET',
        params: {
          req: 'get_tripcard'
        }
      }
    })
  }).factory('SessionData', function(){
    var SessionData = {};

    SessionData.set = function(key, val) {
      if(typeof key === "string") {
        SessionData[key] = val;
      }
    }
    SessionData.get = function(key) {
      if(typeof key === "string") {
        if(SessionData[key] != undefined) {
          return SessionData[key];
        } else {
          return null;
        }
      }
    }
    return SessionData;
  })
  .service('WeatherOnline', function($resource){
    return $resource("http://api.worldweatheronline.com/free/v2/weather.ashx", {}, {
      get: {
        method: 'GET',
        params: {
          format: 'json',
          num_of_days: 1,
          date: 'today',
          fx: 'no',
          mca: 'no',
          fx24: 'no',
          showlocaltime: 'yes',
          key: '8803c57dc1e2fb1f47595f5300838'
        }
      }
    })
  });
