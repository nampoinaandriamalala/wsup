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
angular.module('raptorApp').controller('Ctrl1', ['$scope', '$rootScope', '$http', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout','ngToast', function ($scope, $rootScope, $http, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout,ngToast) {

    /*Votre code ici*/

}]);


angular.module('raptorApp').controller('CtrlAdminTn_n2', ['$scope', '$rootScope', '$http', 'tanaAdminFactory', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $rootScope, $http, tanaAdminFactory, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {

        /*Votre code ici*/

        /*var panZoomTiger = svgPanZoom('#demo-tiger');*/
        
        
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
        
        $scope.getListEmplacement = function (data) {
            tanaAdminFactory.getListEmplacement(data).then(function (response) {
                $scope.emplacements = response.datas;
                console.log($scope.emplacements);
            }, function (error) {
                console.log(error);
            });
        };

        var dataObj = {};
        tanaAdminFactory.getListPostesGlpi(dataObj).then(function (datas) {
            console.log(datas.data);
            $scope.listposteglpi = datas.data;

        });

        $scope.recuperIP = function (nomposte) {
            var dataObj = {
                nom_poste: nomposte
            }
            tanaAdminFactory.getListPostesGlpi(dataObj).then(function (datas) {
                console.log(datas.data);
                $scope.posteip = datas.data[2].ip_adress;
            });
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
});