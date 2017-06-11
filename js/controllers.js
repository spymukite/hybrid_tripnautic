angular.module('starter.controllers', [])

        .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout, $ionicSlideBoxDelegate, SessionData, API, $cordovaDialogs, $state, $ionicPopover) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            // Form data for the login modal
            $rootScope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $rootScope
            }).then(function (modal) {
                $rootScope.modal = modal;
            });

            // Triggered in the login modal to close it
            $rootScope.closeLogin = function () {
                $rootScope.modal.hide();
            };

            // Open the login modal
            $rootScope.login = function () {
                $rootScope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $rootScope.doLogin = function () {
//                console.log("ddd");
//                console.log($rootScope.loginData);
                var login = API.login($rootScope.loginData, function (data) {
                    if (!data.success) {
                        $cordovaDialogs.alert("Login failed. Please try later.", "Error", "OK");
                    } else {
                        $rootScope.isLoggedIn = data.user_data;

                        localStorage.setItem('user', JSON.stringify(data.user_data));
                        console.log(localStorage.getItem('user'));
                        console.log(data.user_data);
                        $state.go('app.locations');
                        $rootScope.closeLogin();

                    }
                });

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
            };

            $rootScope.doLogout = function () {
                $rootScope.isLoggedIn = null;
                localStorage.removeItem('user');
            };

            $ionicPopover.fromTemplateUrl('templates/forgetPassword.html', {
                scope: $rootScope
            }).then(function (popover) {
                $rootScope.popover = popover;
            });


            $rootScope.openPopover = function ($event) {
                $rootScope.popover.show($event);
            };
            $rootScope.closePopover = function () {
                $rootScope.popover.hide();
            };

            $rootScope.openURL = function (url) {
                window.open(url, '_blank', 'location=yes');
            }

            $scope.logoTitle = '<img src="img/logo.png">';

            $scope.filterData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/filters.html', {
                scope: $scope,
                animation: 'slide-in-right'
            }).then(function (modal) {
                $scope.filterModal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeFilter = function () {
                $scope.filterModal.hide();
            };

            // Open the login modal
            $scope.filter = function () {
                console.log(SessionData.get('categories'));
                $scope.filterModal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.applyFilter = function () {
                console.log('Applying Filter', $scope.filterData);

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
                    $scope.closeFilter();
                }, 1000);
            };
            $scope.clearFilter = function () {
                $scope.filterData = {};
                console.log('Clearing Filter', $scope.filterData);

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
                    $scope.closeFilter();
                }, 1000);
            }

            $scope.disableSwipeHandle = function (handle) {
                $ionicSlideBoxDelegate.$getByHandle(handle).enableSlide(false);
            };
            $scope.showAttributes = function (subCategory) {
                $scope.subCategoryTitle = angular.copy(subCategory);
                var key = subCategory.replace(' ', '_');
                console.log(SessionData.get('attributes')[key]);
                $scope.attributes = SessionData.get('attributes')[key]

                $ionicSlideBoxDelegate.next();
            };
            $scope.subCategories = function (category) {
                $scope.categoryTitle = angular.copy(category);
                var key = category.replace(' ', '_');
                console.log(SessionData.get('subcategories')[key]);
                $scope.subCategories = SessionData.get('subcategories')[key]
                console.log($scope.subCategories);
                console.log($ionicSlideBoxDelegate.currentIndex())
                $ionicSlideBoxDelegate.next();
            };
            $scope.showCategories = function () {
//                alert(JSON.stringify(SessionData.get('categories')));
                $scope.categories = SessionData.get('categories');
                $ionicSlideBoxDelegate.next();
            }
            $scope.showLocations = function(){
                console.log(SessionData.get('locations'));
                $scope.locations = SessionData.get('locations');
                $ionicSlideBoxDelegate.slide(4);
            }
            $scope.goBack = function (index) {
                console.log($ionicSlideBoxDelegate.currentIndex())
//                $ionicSlideBoxDelegate.slide($ionicSlideBoxDelegate.currentIndex() - 1);
                $ionicSlideBoxDelegate.previous();
            }
            $scope.goBackmenu = function(index){
                $ionicSlideBoxDelegate.slide(0);
            }
            $scope.$on('UpdatedSubCategories', function () {
                $scope.subCategories = SessionData.get('sub-categories');
            });
            $scope.$on('categories', function () {
                $scope.categories = SessionData.get('categories');
            });

            //==========

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/gallery.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.galleryModal = modal;
            });

            $scope.gallery = [1, 2];
            // Triggered in the login modal to close it
            $scope.closeGallery = function () {
                $scope.galleryModal.hide();
            };

            // Open the login modal
            $scope.openGallery = function (gallery) {
                if (_.isEmpty(gallery))
                    return;
                $scope.gallery = gallery;
                $scope.galleryModal.show();
            };




            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/review.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.readReviewmodal = modal;
            });
            // Triggered in the login modal to close it
            $scope.closeReview = function () {
                $scope.readReviewmodal.hide();
            };

            // Open the login modal
            $scope.openReview = function (reviews) {
                if (_.isEmpty(reviews))
                    return;
//                $scope.gallery = gallery;
                $scope.readReviewmodal.show();
            };







            // Perform the login action when the user submits the login form

            $scope.shareImage = function () {
                console.log('Share Image');
            };

            //  =============

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/review-form.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.reviewModal = modal;
            });

            $scope.reviewData = {};
            // Triggered in the login modal to close it
            $scope.doneReview = function () {
                $scope.reviewModal.hide();
            };

            // Open the login modal
            $scope.addReview = function (detail) {
                $scope.reviewLocation = detail
                $scope.reviewData.listing_id = detail.id;
                $scope.reviewData.review_stars = 0;
                $scope.reviewModal.show();
            };

            $scope.postReview = function () {
                var postReq = API.postReview($scope.reviewData, function (data) {
                    if (!data.success) {
                        $cordovaDialogs.alert("Your review could not be add. Please try later.", "Error", "OK");
                    } else {
                        $cordovaDialogs.alert("Thanks for your review.", "Success", "OK").then(function () {
                            $scope.doneReview();
                        })
                    }
                })
            }

            //  =============

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/contact-form.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.contactModal = modal;
            });

            $scope.contactData = {};
            // Triggered in the login modal to close it
            $scope.closeContactForm = function () {
                $scope.contactModal.hide();
            };

            // Open the login modal
            $scope.openContactForm = function (detail) {
                $scope.contactModal.show();
            };

            $scope.send = function () {
                console.log($scope.contactData);
                var postReq = API.contact($scope.contactData, function (data) {
//                    console.log(data);
//                    alert(data);
                    if (!data.success) {
                        $cordovaDialogs.alert("Failed to send enquiry. Please try later.", "Error", "OK");
                    } else {
                        $cordovaDialogs.alert("Thanks for your enquiry.", "Success", "OK").then(function () {
                            $scope.closeContactForm();
                        })
                    }
                })
            }
            // Perform the login action when the user submits the login form

            $scope.shareImage = function () {
                console.log('Share Image');
            }
        })

        .controller('LocationCtrl', function ($scope, $state, API, $ionicLoading, ServiceURL, SessionData, $ionicPopup, $cordovaGeolocation) {

            var posOptions = {enableHighAccuracy: false};
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                var currentposition = {latitude: lat, longitude: long};
                console.log(currentposition);

                localStorage.setItem('currentLocations', currentposition);
//                    var latlng = new google.maps.LatLng(lat, long);
//                    var marker = new google.maps.Marker({
//                        position: latlng
//                    });
//                    marker.setMap($scope.map);
//                    $scope.map.setCenter(new google.maps.LatLng(lat, long));
            }, function (err) {
                // error
            });
            var categories = API.getCategories(function (data) {
                console.log(data.categories);
                if (!data.success) {
                    $ionicLoading.hide();
                    return;
                }
                $scope.categories = _.toArray(_.groupBy(data.categories, function (element, index) {
                    return Math.floor(index / 3);
                }));

                $ionicLoading.hide();
                if (!SessionData.get('categories')) {
                    SessionData.set('categories', {});
                }
                SessionData.set('categories', data.categories);
                $scope.$emit("categories");
                if (!SessionData.get('subcategories')) {
                    SessionData.set('subcategories', {});
                }
                _.each(data.categories, function (Category) {
//                    getSubcategories({business_category_id: $scope.params.business_category_id}
                    var subcategories = API.getSubcategories({business_category_id: Category.id}, function (data) {
                        var key = Category.title.replace(' ', '_');
                        if (!data.success) {
                            SessionData.subcategories[key] = []
                        } else {
                            SessionData.subcategories[key] = data.subCategories;
                        }
                        if (!SessionData.get('attributes')) {
                            SessionData.set('attributes', {});
                        }
                        _.each(data.subCategories, function (subCategory) {
                            var attributes = API.getAttributes({business_subcategory_id: subCategory.id}, function (data) {
                                var key = subCategory.title.replace(' ', '_');
                                if (!data.success) {
                                    SessionData.attributes[key] = []
                                } else {
                                    SessionData.attributes[key] = data.attributes
                                }
                            })
                        });
                    })
                });



            });
//                console.log(localStorage.getItem('currentLocations'));
            $scope.params = angular.copy(localStorage.getItem('currentLocations'));
            console.log($scope.params);
            $scope.serviceUrl = ServiceURL;
            $scope.playlists = [];
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            if (!SessionData.get('locations')) {
                    SessionData.set('locations', {});
                }
            var locations = API.getLocations($scope.params, function (data) {
                
                console.log(data);
                if (!data.listings) {
                    $ionicLoading.hide();
                    return;
                }
                SessionData.set('locations', data.listings);

//                $scope.locations = data.locations;
                $ionicLoading.hide();
//                SessionData.set('locations', data.locations);
                $scope.searchItem = function () {
                    console.log("sd");
                }
                $scope.showInfoWindow = function (event, p) {
                    var infowindow = new google.maps.InfoWindow();
                    var center = new google.maps.LatLng(p.google_latitude, p.google_longitude);

                    infowindow.setContent(
                            '<div class="infowindow"><p class="listingname">' + p.listing_name + '</p><a href="" class="Ellipse_2"><i class="fa fa-chevron-right"></i></a></div>');

                    infowindow.setPosition(center);
                    infowindow.open($scope.map);
                };
                $scope.listings = data.listings;
                $scope.position = data.listings;
                console.log($scope.position);
            });
            console.log(SessionData.get('position'));
            $scope.pos = SessionData.get('position');
            var latLng = new google.maps.LatLng(24.6669, -81.5442);
//            $scope.map = {
//                center: [39, -121],
//                options: function () {
//                    return {
//                        streetViewControl: false,
//                        scrollwheel: false
//                    }
//                },
//                events: {
//                    click: function (e, map) {
//                        alert(e.latLng.lat() + " " + e.latLng.lng());
//                    }
//                }
//            };
//            var map;
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.marker = {
                position: [39, -121],
                decimals: 4,
                options: function () {
                    return {draggable: true};
                }
            }
            $scope.focusCurrentlocation = function () {
                var posOptions = {enableHighAccuracy: false};
                $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;
                    var latlng = new google.maps.LatLng(lat, long);
                    var marker = new google.maps.Marker({
                        position: latlng
                    });
                    marker.setMap($scope.map);
                    $scope.map.setCenter(new google.maps.LatLng(lat, long));
                }, function (err) {
                    // error
                });

            }
//            
//            map = new google.maps.Map(document.getElementById("map_details_canvas"), mapOptions);

            $scope.$on('mapInitialized', function (event, map) {

                if (!$scope.pos) {
                    console.log("here");
                    map.setCenter(new google.maps.LatLng(24.6669, -81.5442))
//                    $scope.pos = {'coords':{}}
                } else {
                    map.setCenter(new google.maps.LatLng($scope.position.coords.latitude, $scope.position.coords.longitude))
                }
                $scope.map = map;
            });
        })
        .controller('FilterCtrl', function ($scope, API, $ionicLoading, ServiceURL, SessionData, $ionicPopup) {
            var s;

            $scope.showAlert = function () {
                console.log("ssdsdsd");
                var locations = API.getLocations(function (data) {
                    s = data.listings;
                    var alertPopup = $ionicPopup.alert({
                        title: 'Don\'t eat that!',
                        template: s//'<ion-list><ion-radio ng-model="choice" ng-value="A">Choose A</ion-radio><ion-radio ng-model="choice" ng-value="B">Choose B</ion-radio></ion-list>'
                    });
                    alertPopup.then(function (res) {
                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                })

            };

//
//            $scope.serviceUrl = ServiceURL;
//            $scope.playlists = [];
//            $ionicLoading.show({
//                content: 'Loading',
//                animation: 'fade-in',
//                showBackdrop: true,
//                maxWidth: 200,
//                showDelay: 0
//            });
//             
//            var locations = API.getLocations(function (data) {
//                if (!data.success) {
//                    $ionicLoading.hide();
//                    return;
//                }
//
//                $scope.locations = data.locations;
//                $ionicLoading.hide();
//                SessionData.set('locations', data.locations);
//                $scope.searchItem = function () {
//                    console.log("sd");
//                }
//            });
//            $scope.position = SessionData.get('position');
//            $scope.$on('mapInitialized', function (event, map) {
//
//                if (!$scope.position) {
//                    map.setCenter(new google.maps.LatLng(24.6669, -81.5442))
//                } else {
//                    map.setCenter(new google.maps.LatLng($scope.position.coords.latitude, $scope.position.coords.longitude))
//                }
//                $scope.map = map;
//            });
        })

        .controller('CategoryCtrl', function ($scope, API, $state, $ionicLoading, ServiceURL, SessionData) {
            $scope.params = angular.copy($state.params);
            var location = _.findWhere(SessionData.get('locations'), {id: $scope.params.location_id});
            $scope.title = !location ? "Categories" : location.city;
            $scope.serviceUrl = ServiceURL;
            $scope.categories = [];
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            var categories = API.getCategories(function (data) {
                console.log(data.categories);
                if (!data.success) {
                    $ionicLoading.hide();
                    return;
                }
                $scope.categories = _.toArray(_.groupBy(data.categories, function (element, index) {
                    return Math.floor(index / 3);
                }));

                $ionicLoading.hide();
                SessionData.set('categories', data.categories);
            });
        })
        .controller('ListCtrl', function ($scope, API, $state, $ionicLoading, ServiceURL, SessionData, $cordovaGeolocation, $cordovaDialogs) {
            $scope.params = angular.copy($state.params);
            console.log($scope.params.keyword);
            $scope.order = "";
            if ($scope.params.keyword) {
                var listings = API.getListings($scope.params, function (data) {
//                    console.log(data);
                    if (!data.success) {
                        $ionicLoading.hide();
                        if (typeof data.error === "string") {
                            if (data.error.indexOf("latitude") != -1 || data.error.indexOf("longitude") != -1) {
                                $cordovaDialogs.alert("Please turn on the location service and retry.", "Location Unavailable", "OK");
                            }
                        }
                        return;
                    }
                    $scope.listings = data.listings;
//                console.log()
//                console.log(data.listings);
                    $scope.moredata = data.pagination.page == data.pagination.total_pages;
                    $scope.params['page'] = !$scope.moredata ? parseInt(data.pagination.page) + 1 : "";
                    SessionData.set('listings', data.listings);
                    SessionData.set('pagination', data.pagination);
                    $ionicLoading.hide();
                });
            }

            $scope.orderByFavorite = function () {

//                 var listings = API.getListings($scope.params, function (data) {
//                            if (!data.success) {
//                                $ionicLoading.hide();
//                                if (typeof data.error === "string") {
//                                    if (data.error.indexOf("latitude") != -1 || data.error.indexOf("longitude") != -1) {
//                                        $cordovaDialogs.alert("Please turn on the location service and retry.", "Location Unavailable", "OK");
//                                    }
//                                }
//                                return;
//                            }
//                            $scope.listings = data.listings;
//                            console.log(data.listings);
//                            $scope.moredata = data.pagination.page == data.pagination.total_pages;
//                            $scope.params['page'] = !$scope.moredata ? parseInt(data.pagination.page) + 1 : "";
//                            SessionData.set('listings', data.listings);
//                            SessionData.set('pagination', data.pagination);
//                            $ionicLoading.hide();
//                        });



                if ($scope.order === "listing_ratings") {
                    $scope.order = "-listing_ratings"
                } else {
                    $scope.order = "listing_ratings"
                }
            };
            $scope.orderByDistance = function () {
                if ($scope.order === "listing_distance") {
                    $scope.order = "-listing_distance"
                } else {
                    $scope.order = "listing_distance"
                }
            };
            $scope.orderByName = function () {
                if ($scope.order === "listing_name") {
                    $scope.order = "-listing_name"
                } else {
                    $scope.order = "listing_name";
                }
            }
            $scope.orderByTripCard = function () {
                if ($scope.order === "-tripcard_savings") {
                    $scope.order = "tripcard_savings";
                } else {
                    $scope.order = "-tripcard_savings";
                }
            }
            var location = _.findWhere(SessionData.get('locations'), {id: $scope.params.location_id});
            var category = _.findWhere(SessionData.get('categories'), {id: $scope.params.business_category_id});
            $scope.title = !location ? "" : location.city;
            $scope.title += !category ? "" : ' - ' + category.title;
            $scope.serviceUrl = ServiceURL;
            if ($state.current.name == 'app.favorite') {
                $scope.parmatrs = {business_category_id: $scope.params.business_category_id};
            } else {
                $scope.parmatrs = {business_category_id: $scope.params.business_category_id};
            }
            var subCategories = API.getSubcategories({business_category_id: $scope.params.business_category_id}, function (data) {
                if (!data.success) {
                    SessionData.set('sub-categories', []);
                    $scope.$emit("UpdatedSubCategories");
                } else {
                    console.log(data.subCategories);
                    SessionData.set('sub-categories', data.subCategories);
                    $scope.$emit("UpdatedSubCategories");
                    if (!SessionData.get('attributes')) {
                        SessionData.set('attributes', {});
                    }
                    _.each(data.subCategories, function (subCategory) {
                        var attributes = API.getAttributes({business_subcategory_id: subCategory.id}, function (data) {
                            var key = subCategory.title.replace(' ', '_');
                            if (!data.success) {
                                SessionData.attributes[key] = []
                            } else {
                                SessionData.attributes[key] = data.attributes
                            }
                        })
                    });
                }

            });

            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $scope.moredata = true;
            var posOptions = {timeout: 20000, enableHighAccuracy: false};
            if (!$scope.params.keyword) {
                $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                        .then(function (position) {

                            SessionData.set('position', position);

                            $scope.params.latitude = position.coords.latitude;
                            $scope.params.longitude = position.coords.longitude;

                            var listings = API.getListings($scope.params, function (data) {
                                if (!data.success) {
                                    $ionicLoading.hide();
                                    if (typeof data.error === "string") {
                                        if (data.error.indexOf("latitude") != -1 || data.error.indexOf("longitude") != -1) {
                                            $cordovaDialogs.alert("Please turn on the location service and retry.", "Location Unavailable", "OK");
                                        }
                                    }
                                    return;
                                }
                                $scope.listings = data.listings;
                                console.log(data.listings);
                                $scope.moredata = data.pagination.page == data.pagination.total_pages;
                                $scope.params['page'] = !$scope.moredata ? parseInt(data.pagination.page) + 1 : "";
                                SessionData.set('listings', data.listings);
                                SessionData.set('pagination', data.pagination);
                                $ionicLoading.hide();
                            });
                        }, function (err) {
                            $scope.params.latitude = "";
                            $scope.params.longitude = "";

                            var listings = API.getListings($scope.params, function (data) {
                                if (!data.success) {
                                    $ionicLoading.hide();
                                    if (typeof data.error === "string") {
                                        if (data.error.indexOf("latitude") != -1 || data.error.indexOf("longitude") != -1) {
                                            $cordovaDialogs.alert("Please turn on the location service and retry.", "Location Unavailable", "OK");
                                        }
                                    }
                                    return;
                                }
                                $ionicLoading.hide();
                            });

                        });
            }

            $scope.loadMoreData = function () {
                if ($scope.moredata)
                    return;
                var listings = API.getListings($scope.params, function (data) {
                    if (!data.success) {
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        if (typeof data.error === "string") {
                            if (data.error.indexOf("latitude") != -1 || data.error.indexOf("longitude") != -1) {
                                $cordovaDialogs.alert("Please turn on the location service and retry.", "Location Unavailable", "OK");
                            }
                        }
                        return;
                    }
                    $scope.listings = $scope.listings.concat(data.listings);
                    SessionData.set('listings', $scope.listings);
                    SessionData.set('pagination', data.pagination);
                    $scope.moredata = data.pagination.page == data.pagination.total_pages;
                    $scope.params['page'] = !$scope.moredata ? parseInt(data.pagination.page) + 1 : "";
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            };

        })
//        .controller('FavoriteCtrl', function ($scope, API, $state, $ionicLoading, ServiceURL, SessionData, $cordovaGeolocation, $cordovaDialogs) {
//            $scope.params = angular.copy($state.params);
//            $scope.order = "";
//            $scope.orderByFavorite = function () {
//                if ($scope.order === "listing_ratings") {
//                    $scope.order = "-listing_ratings"
//                } else {
//                    $scope.order = "listing_ratings"
//                }
//            };
//            $scope.orderByDistance = function () {
//                if ($scope.order === "listing_distance") {
//                    $scope.order = "-listing_distance"
//                } else {
//                    $scope.order = "listing_distance"
//                }
//            };
//            $scope.orderByName = function () {
//                if ($scope.order === "listing_name") {
//                    $scope.order = "-listing_name"
//                } else {
//                    $scope.order = "listing_name";
//                }
//            }
//            $scope.orderByTripCard = function () {
//                if ($scope.order === "-tripcard_savings") {
//                    $scope.order = "tripcard_savings";
//                } else {
//                    $scope.order = "-tripcard_savings";
//                }
//            }
//            var location = _.findWhere(SessionData.get('locations'), {id: $scope.params.location_id});
//            var category = _.findWhere(SessionData.get('categories'), {id: $scope.params.business_category_id});
//            $scope.title = !location ? "" : location.city;
//            $scope.title += !category ? "" : ' - ' + category.title;
//            $scope.serviceUrl = ServiceURL;
//
//            var subCategories = API.getSubcategories({business_category_id: $scope.params.business_category_id}, function (data) {
//                if (!data.success) {
//                    SessionData.set('sub-categories', []);
//                    $scope.$emit("UpdatedSubCategories");
//                } else {
//                    console.log(data.subCategories);
//                    SessionData.set('sub-categories', data.subCategories);
//                    $scope.$emit("UpdatedSubCategories");
//                    if (!SessionData.get('attributes')) {
//                        SessionData.set('attributes', {});
//                    }
//                    _.each(data.subCategories, function (subCategory) {
//                        var attributes = API.getAttributes({business_subcategory_id: subCategory.id}, function (data) {
//                            var key = subCategory.title.replace(' ', '_');
//                            if (!data.success) {
//                                SessionData.attributes[key] = []
//                            } else {
//                                SessionData.attributes[key] = data.attributes
//                            }
//                        })
//                    });
//                }
//
//            });
//
//            $ionicLoading.show({
//                content: 'Loading',
//                animation: 'fade-in',
//                showBackdrop: true,
//                maxWidth: 200,
//                showDelay: 0
//            });
//            $scope.moredata = true;
//            var posOptions = {timeout: 20000, enableHighAccuracy: false};
//            $cordovaGeolocation
//                    .getCurrentPosition(posOptions)
//                    .then(function (position) {
//
//                        SessionData.set('position', position);
//
//                        $scope.params.latitude = position.coords.latitude;
//                        $scope.params.longitude = position.coords.longitude;
//
//                        var listings = API.getListings($scope.params, function (data) {
//                            if (!data.success) {
//                                $ionicLoading.hide();
//                                if (typeof data.error === "string") {
//                                    if (data.error.indexOf("latitude") != -1 || data.error.indexOf("longitude") != -1) {
//                                        $cordovaDialogs.alert("Please turn on the location service and retry.", "Location Unavailable", "OK");
//                                    }
//                                }
//                                return;
//                            }
//                            $scope.listings = data.listings;
//                            console.log(data.listings);
//                            $scope.moredata = data.pagination.page == data.pagination.total_pages;
//                            $scope.params['page'] = !$scope.moredata ? parseInt(data.pagination.page) + 1 : "";
//                            SessionData.set('listings', data.listings);
//                            SessionData.set('pagination', data.pagination);
//                            $ionicLoading.hide();
//                        });
//                    }, function (err) {
//                        $scope.params.latitude = "";
//                        $scope.params.longitude = "";
//
//                        var listings = API.getListings($scope.params, function (data) {
//                            if (!data.success) {
//                                $ionicLoading.hide();
//                                if (typeof data.error === "string") {
//                                    if (data.error.indexOf("latitude") != -1 || data.error.indexOf("longitude") != -1) {
//                                        $cordovaDialogs.alert("Please turn on the location service and retry.", "Location Unavailable", "OK");
//                                    }
//                                }
//                                return;
//                            }
//                            $ionicLoading.hide();
//                        });
//
//                    });
//            $scope.loadMoreData = function () {
//                if ($scope.moredata)
//                    return;
//                var listings = API.getListings($scope.params, function (data) {
//                    if (!data.success) {
//                        $scope.$broadcast('scroll.infiniteScrollComplete');
//                        if (typeof data.error === "string") {
//                            if (data.error.indexOf("latitude") != -1 || data.error.indexOf("longitude") != -1) {
//                                $cordovaDialogs.alert("Please turn on the location service and retry.", "Location Unavailable", "OK");
//                            }
//                        }
//                        return;
//                    }
//                    $scope.listings = $scope.listings.concat(data.listings);
//                    SessionData.set('listings', $scope.listings);
//                    SessionData.set('pagination', data.pagination);
//                    $scope.moredata = data.pagination.page == data.pagination.total_pages;
//                    $scope.params['page'] = !$scope.moredata ? parseInt(data.pagination.page) + 1 : "";
//                    $scope.$broadcast('scroll.infiniteScrollComplete');
//                });
//            };
//
//        })
        .controller('AboutCtrl', function ($scope, API, SessionData) {
            $scope.about = SessionData.get('about');
            if (!$scope.about) {
                var about = API.getAbout(function (data) {
                    $scope.about = data;
                    SessionData.set('about', data);
                });
            }
            //AboutCtrl
        })
        .controller('DetailCtrl', function ($scope, API, $state, $ionicLoading, $compile, SessionData, $cordovaSocialSharing, $cordovaContacts, $cordovaEmailComposer) {

            $scope.params = angular.copy($state.params);
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            var detail = API.getDetail({id: $scope.params.listing_id}, function (data) {
                console.log(data);
                $ionicLoading.hide();
                $scope.detail = data;

//            $scope.detail = _.findWhere(SessionData.get('listings'), {id: $scope.params.listing_id});
//            console.log($scope.detail);
                $scope.mode = {
                    switchTo: true
                };
                $scope.showMap = function () {
                    if ($scope.mode.switchTo)
                        return;
                    $scope.mode.switchTo = true;
                }
                $scope.showDirections = function () {
                    if (!$scope.mode.switchTo)
                        return;
                    $scope.mode.switchTo = false;
                }

                $scope.position = SessionData.get('position');

                function initialize() {
                    var myLatlng = new google.maps.LatLng($scope.detail.google_latitude, $scope.detail.google_longitude);

                    var mapOptions = {
                        center: myLatlng,
                        zoom: 13,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        disableDefaultUI: true
                    };
                    var map = new google.maps.Map(document.getElementById("map"),
                            mapOptions);

                    //Marker + infowindow + angularjs compiled ng-click
                    //var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
                    //var compiled = $compile(contentString)($scope);

                    //var infowindow = new google.maps.InfoWindow({
                    //  content: compiled[0]
                    //});
                    if ($scope.detail.proximity_location === '0') {
                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            title: 'Uluru (Ayers Rock)'
                        });
                    } else {
                        var radius = parseInt(parseFloat($scope.detail.listing_distance) * parseFloat($scope.detail.proximity_location));

                        var myCity = new google.maps.Circle({
                            center: myLatlng,
                            radius: !radius ? 2500 : radius,
                            strokeColor: "#f38421",
                            strokeOpacity: 1.0,
                            strokeWeight: 2,
                            fillColor: "#f38421",
                            fillOpacity: 0.0
                        });

                        myCity.setMap(map);
                    }


                    //google.maps.event.addListener(marker, 'click', function() {
                    //  infowindow.open(map,marker);
                    //});

                    $scope.map = map;
                }

                google.maps.event.addDomListener(window, 'load', initialize);

                $scope.centerOnMe = function () {
                    if (!$scope.map) {
                        return;
                    }

                    $scope.loading = $ionicLoading.show({
                        content: 'Getting current location...',
                        showBackdrop: false
                    });

                    navigator.geolocation.getCurrentPosition(function (pos) {
                        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                        $scope.loading.hide();
                    }, function (error) {
                        alert('Unable to get location: ' + error.message);
                    });
                };

                $scope.clickTest = function () {
                    alert('Example of infowindow with ng-click')
                };
                initialize();

                $scope.getReviews = function (listid) {
                    console.log(listid);
                    var detail = API.getListingsReviews({listing_id: listid}, function (data) {
                        console.log(data);
                    })
//                    return false;
                };

                $scope.compose = function () {
                    $cordovaEmailComposer.isAvailable().then(function () {
                        var email = {
                            to: !$scope.detail.listing_email ? "" : $scope.detail.listing_email,
                            cc: '',
                            bcc: '',
                            attachments: [],
                            subject: '',
                            body: '',
                            isHtml: true
                        };
                        $cordovaEmailComposer.open(email).then(null, function () {
                            // user cancelled email
                        });
                    }, function () {
                        // not available
                    });
                };

                $scope.addContact = function () {
                    $scope.contactForm = {
                        "displayName": $scope.detail.listing_name,
                        "phoneNumbers": [
                            {
                                "value": !$scope.detail.listing_phone ? "" : $scope.detail.listing_phone,
                                "type": "work"
                            }
                        ],
                        "emails": [
                            {
                                "value": !$scope.detail.listing_email ? "" : $scope.detail.listing_email,
                                "type": "work"
                            }
                        ],
                        "addresses": [
                            {
                                "type": "work",
                                "formatted": $scope.detail.address + ',' + $scope.detail.address2 + ',' + $scope.detail.city + ',' + $scope.detail.state + ',' + $scope.detail.country + $scope.detail.zip,
                                "streetAddress": $scope.detail.address + ',' + $scope.detail.address2 + ',' + $scope.detail.city + ',' + $scope.detail.state + ',' + $scope.detail.country + $scope.detail.zip
                            }
                        ],
                        "urls": !$scope.detail.website ? "" : $scope.detail.website
                    }

                    $cordovaContacts.save($scope.contactForm).then(function (result) {
                        // Contact saved
                    }, function (err) {
                        // Contact error
                    });
                };

                $scope.shareLocation = function () {
                    var message = $scope.detail.listing_name;
                    var subject = "Sharing: " + $scope.detail.listing_name;
                    var file = "";
                    var link = !$scope.detail.listing_url ? "" : $scope.detail.listing_url;
                    $cordovaSocialSharing
                            .share(message, subject, file, link) // Share via native share sheet
                            .then(function (result) {
                                // Success!
                            }, function (err) {
                                // An error occured. Show a message to the user
                            });
                };
            });
            $scope.toggleGroup = function (group) {
                if ($scope.isGroupShown(group)) {
                    $scope.shownGroup = null;
                } else {
                    $scope.shownGroup = group;
                }
            };
            $scope.isGroupShown = function (group) {
                return $scope.shownGroup === group;
            };

        })
        .controller('TripCardCtrl', function ($scope, API, WeatherOnline, $cordovaGeolocation, $rootScope) {//q=48.834,2.394

            $scope.profile = null;
            // $rootScope.isLoggedIn.id
            var card = API.getTripcard({member_id: '402'}, function (data) {
                $scope.profile = data;
                console.log($scope.profile);
                $scope.name = $scope.profile.name;
                $scope.profilePic = $scope.profile.profile_pic;
                $scope.city = $scope.profile.city;
            });

            $scope.dateTime = {
                day: moment().format("dddd"),
                date: moment().format("MMMM D, YYYY h:mm:ss a"),
                date2: moment().format("MMMM D, YYYY - h:mm:ss a"),
                date3: moment().format("MMMM D, YYYY"),
                date4: moment().format("h:mm:ss a")
            }

            var posOptions = {timeout: 20000, enableHighAccuracy: false};
            $cordovaGeolocation
                    .getCurrentPosition(posOptions).then(function (position) {
                var request = {q: position.coords.latitude + ',' + position.coords.longitude};
                WeatherOnline.get(request, function (response) {
                    console.log(response);
                    if (response['data'] != undefined) {
                        if (response.data['current_condition'] != undefined) {
//                            console.log(response.data.current_condition[0].weatherIconUrl[0].value);
                            $scope.weather = response.data.current_condition[0];
//                            console.log($scope.weather[0].weatherIconUrl[0].value)
                        }
                    }
                })
            })
        })
        .controller('MapViewCtrl', function ($scope, $compile, SessionData, $state, $ionicLoading, API) {
            $scope.params = angular.copy($state.params);

            $scope.position = SessionData.get('position');
            $scope.params.latitude = $scope.position.coords.latitude;
            $scope.params.longitude = $scope.position.coords.longitude;
            $scope.listings = SessionData.get('listings');
            $scope.pagination = SessionData.get('pagination');
            $scope.moredata = $scope.pagination.page == $scope.pagination.total_pages;
            $scope.params['page'] = !$scope.moredata ? parseInt($scope.pagination.page) + 1 : "";

            $scope.category = _.findWhere(SessionData.get('categories'), {id: $scope.params.business_category_id});
            $scope.$on('mapInitialized', function (event, map) {

                if (!$scope.position) {
                    map.setCenter(new google.maps.LatLng(24.6669, -81.5442))
                } else {
                    map.setCenter(new google.maps.LatLng($scope.position.coords.latitude, $scope.position.coords.longitude))
                }
                $scope.map = map;
            });

            $scope.infoWindow = new google.maps.InfoWindow();

            $scope.showInfoWindow = function (event, listing) {
                $scope.Info = listing;
                var contentString = '<div> <h4 id="firstHeading" class="firstHeading">{{Info.listing_name}}({{category.title}})</h4> <div id="bodyContent"> <p>{{Info.address}}, {{Info.address2}}, {{Info.city}}, {{Info.state}}, {{Info.country}} {{Info.zip}}</p> <p><a href="tel:+1-1800-555-5555">[Call]</a> <a href="#/app/locations/{{params.location_id}}/{{params.business_category_id}}/{{Info.id}}/detail">[Details]</a></p> </div> </div>';
                var compiled = $compile(contentString)($scope);
                $scope.infoWindow.setContent(compiled[0]);
                var center = new google.maps.LatLng(listing.google_latitude, listing.google_longitude);
                $scope.infoWindow.setPosition(center);
                $scope.infoWindow.open($scope.map);
            }

            $scope.loadMoreData = function () {
                if ($scope.moredata)
                    return;
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                var listings = API.getListings($scope.params, function (data) {
                    if (!data.success) {
                        if (typeof data.error === "string") {
                            if (data.error.indexOf("latitude") != -1 || data.error.indexOf("longitude") != -1) {
                                $cordovaDialogs.alert("Please turn on the location service and retry.", "Location Unavailable", "OK");
                            }
                        }
                        $ionicLoading.hide();
                        return;
                    }
                    $scope.listings = $scope.listings.concat(data.listings);
                    SessionData.set('listings', $scope.listings);
                    SessionData.set('pagination', data.pagination);
                    $scope.moredata = data.pagination.page == data.pagination.total_pages;
                    $scope.params['page'] = !$scope.moredata ? parseInt(data.pagination.page) + 1 : "";
                    $ionicLoading.hide();
                });
            };
            $scope.getRadius = function (pxl, distance) {
                var radius = parseFloat(pxl) * parseFloat(distance);
                return parseInt(radius);
            };
        });
