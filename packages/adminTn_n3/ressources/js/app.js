/* global tanaAdminFactory */

//FACTORY
angular.module('raptorApp').factory('tanaAdminFactory', function ($http, $q) {

    var factory = {
        banner: false,
        getListEmplacement: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/adminTn_n3/model/listEmplacement.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        getListPostesGlpi: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/adminTn_n3/model/listPostes.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        ajoutPoste: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/adminTn_m3/model/ajoutPoste.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        }
    };
    return factory;
});



//Controller par defaut
angular.module('raptorApp').controller('Ctrl1', ['$scope', '$rootScope', '$http', 'tanaAdminFactory', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $rootScope, $http, tanaAdminFactory, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {

        /*Votre code ici*/

    }]);

angular.module('raptorApp').controller('CtrlAdminTn_n3', ['$scope', '$rootScope', '$http', 'tanaAdminFactory', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $rootScope, $http, tanaAdminFactory, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {

//        $scope.emplacements=[];
//        $scope.listposteglpi=[];

        $scope.login = $cookieStore.get('login');

        $scope.poste = {};
        $scope.poste.id = "";
        $scope.poste.possesseur = "";
        $scope.poste.nomposte = "";

        $scope.savePoste = function (poste) {
            var dataObj = {
                matricule: $cookieStore.get('login'),
                poste: poste
            };
            tanaAdminFactory.ajoutPoste(dataObj).then(function (datas) {

                $scope.poste.id = "";
                $scope.poste.possesseur = "";
                $scope.poste.nomposte = "";

                ngToast.create({
                    className: datas.data.notification,
                    content: datas.data.message
                });
            });


        };


        $scope.tabn = [1, 2, 3, 4, 5, 6];
        $scope.scale = 1;
        $scope.zoomplus = function () {
            $scope.scale += 0.1;
            var str = 'scale(' + $scope.scale + ')';
            $('svg#demo-tiger').css(
                    {
                        'transform': str
                    });
        };
        $scope.zoommoins = function () {
            $scope.scale -= 0.1;
            var str = 'scale(' + $scope.scale + ')';
            $('svg#demo-tiger').css(
                    {
                        'transform': str
                    });
        };

        var dataObj = {};
        tanaAdminFactory.getListEmplacement(dataObj).then(function (datas) {
            console.log(datas.data);
            $scope.emplacements = datas.data;

        });
        var dataObj = {};
        tanaAdminFactory.getListPostesGlpi(dataObj).then(function (datas) {
            console.log(datas.data);
            $scope.listposteglpi = datas.data;

        });

        $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible09 = $scope.IsVisible08 = $scope.IsVisible07 = $scope.IsVisible06 = $scope.IsVisible05 = $scope.IsVisible04 = $scope.IsVisible03 = $scope.IsVisible02 = $scope.IsVisible01 = false;

        //Afichage des postes suivants les nombres des emplacements
        $scope.Show1 = function () {
            $scope.IsVisible01 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible09 = $scope.IsVisible08 = $scope.IsVisible07 = $scope.IsVisible06 = $scope.IsVisible05 = $scope.IsVisible04 = $scope.IsVisible03 = $scope.IsVisible02 = false;

        };
        $scope.Show2 = function () {
            $scope.IsVisible01 = $scope.IsVisible02 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible09 = $scope.IsVisible08 = $scope.IsVisible07 = $scope.IsVisible06 = $scope.IsVisible05 = $scope.IsVisible04 = $scope.IsVisible03 = false;
        };
        $scope.Show3 = function () {
            $scope.IsVisible01 = $scope.IsVisible03 = $scope.IsVisible02 = true;

            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible09 = $scope.IsVisible08 = $scope.IsVisible07 = $scope.IsVisible06 = $scope.IsVisible05 = $scope.IsVisible04 = false;
        };
        $scope.Show4 = function () {
            $scope.IsVisible03 = $scope.IsVisible04 = $scope.IsVisible02 = $scope.IsVisible01 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible09 = $scope.IsVisible08 = $scope.IsVisible07 = $scope.IsVisible06 = $scope.IsVisible05 = false;
        };
        $scope.Show5 = function () {
            $scope.IsVisible01 = $scope.IsVisible02 = $scope.IsVisible03 = $scope.IsVisible04 = $scope.IsVisible05 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible09 = $scope.IsVisible08 = $scope.IsVisible07 = $scope.IsVisible06 = false;

        };
        $scope.Show6 = function () {
            $scope.IsVisible01 = $scope.IsVisible06 = $scope.IsVisible05 = $scope.IsVisible04 = $scope.IsVisible03 = $scope.IsVisible02 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible09 = $scope.IsVisible08 = $scope.IsVisible07 = false;
        };
        $scope.Show12 = function () {
            $scope.IsVisible01 = $scope.IsVisible02 = $scope.IsVisible03 = $scope.IsVisible04 = $scope.IsVisible05 = $scope.IsVisible06 = $scope.IsVisible07 = $scope.IsVisible08 = $scope.IsVisible09 = $scope.IsVisible10 = $scope.IsVisible11 = $scope.IsVisible12 = true;
        };

        //Action sur l'ajout ou modification des emplacements

        $scope.initialisationEmplacement = function ()
        {
            var dataObj = {};
            tanaAdminFactory.getListEmplacement(dataObj).then(function (datas) {
                $scope.emplacements = datas.data.datas;
                console.log(datas.data.datas);

            });
        };
        $scope.initialisationPosteGlpi = function ()
        {
            var dataObj = {};
            tanaAdminFactory.getListPostesGlpi(dataObj).then(function (datas) {
                $scope.listposteglpi = datas.data.datas;
                console.log(datas.data.datas);

            });
        };
    }]);


//angular.module('raptorApp').filter('filterWithOr', function ($filter) {
//    var comparator = function (actual, expected) {
//        if (angular.isUndefined(actual)) {
//            // No substring matching against `undefined`
//            return false;
//        }
//        if ((actual === null) || (expected === null)) {
//            // No substring matching against `null`; only match against `null`
//            return actual === expected;
//        }
//        if ((angular.isObject(expected) && !angular.isArray(expected)) || (angular.isObject(actual) && !hasCustomToString(actual))) {
//            // Should not compare primitives against objects, unless they have custom `toString` method
//            return false;
//        }
//
//        actual = angular.lowercase('' + actual);
//        if (angular.isArray(expected)) {
//            var match = false;
//            expected.forEach(function (e) {
//                e = angular.lowercase('' + e);
//                if (actual.indexOf(e) !== -1) {
//                    match = true;
//                }
//            });
//            return match;
//        } else {
//            expected = angular.lowercase('' + expected);
//            return actual.indexOf(expected) !== -1;
//        }
//    };
//    return function (campaigns, filters) {
//        return $filter('filter')(campaigns, filters, comparator);
//    };
//});

//Filtre sur les selections multiuples
angular.module('raptorApp').filter('filterMultiple', ['$filter', function ($filter) {

        return function (items, keyObj) {
            var filterObj = {
                data: items,
                filteredData: [],
                applyFilter: function (obj, key) {
                    var fData = [];
                    if (this.filteredData.length == 0)
                        this.filteredData = this.data;
                    if (obj) {
                        var fObj = {};
                        if (!angular.isArray(obj)) {
                            fObj[key] = obj;
                            fData = fData.concat($filter('filter')(this.filteredData, fObj));
                        } else if (angular.isArray(obj)) {
                            if (obj.length > 0) {
                                for (var i = 0; i < obj.length; i++) {
                                    if (angular.isDefined(obj[i])) {
                                        fObj[key] = obj[i];
                                        fData = fData.concat($filter('filter')(this.filteredData, fObj));
                                    }
                                }

                            }
                        }
                        if (fData.length > 0) {
                            this.filteredData = fData;
                        }
                    }
                }
            };
            if (keyObj) {
                angular.forEach(keyObj, function (obj, key) {
                    filterObj.applyFilter(obj, key);
                });
            }
            return filterObj.filteredData;
        };
    }]);

//Filtre unique pour les resultats dupliqués
angular.module('raptorApp').filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
                keys = [];
        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
})
