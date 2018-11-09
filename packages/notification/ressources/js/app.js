//FACTORY
angular.module('raptorApp').factory('tanaNotifFactory', function ($http, $q) {

    var factory = {
        banner: false,
        getListNotif: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/notification/model/notification.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        getListNotifAll: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/notification/model/notificationAll.php',
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
angular.module('raptorApp').controller('CtrlNotif', ['$scope', '$rootScope', '$http', 'tanaNotifFactory', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $rootScope, $http, tanaNotifFactory, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {


        var dataObj = {};
        tanaNotifFactory.getListNotif(dataObj).then(function (datas) {
            console.log(datas.data);
            $scope.listnotif = datas.data;

        });

        $scope.initialisationNotif = function ()
        {
            var dataObj = {};
            tanaNotifFactory.getListNotif(dataObj).then(function (datas) {
                $scope.listnotif = datas.data.datas;
                $scope.listnotif.push('');
                console.log(datas.data.datas);

            });
        };

        $scope.affichervalue = "Afficher tout       ";
        $scope.icon = "fa fa-eye";
        $scope.ListNotifTout = function ()
        {
            if ($scope.affichervalue === "Afficher tout") {
                $scope.affichervalue = "Afficher les 100 derniers      ";
                $scope.icon = "fa fa-home";
                var dataObj = {};
                tanaNotifFactory.getListNotifAll(dataObj).then(function (datas) {
                    console.log(datas.data);
                    $scope.listnotif = datas.data;

                });

                $scope.initialisationNotif = function ()
                {
                    var dataObj = {};
                    tanaNotifFactory.getListNotifAll(dataObj).then(function (datas) {
                        $scope.listnotif = datas.data.datas;
                        $scope.listnotif.push('');
                        console.log(datas.data.datas);

                    });
                };

            } else
                $scope.affichervalue = "Afficher tout";
            $scope.icon = "fa fa-eye";
            var dataObj = {};
            tanaNotifFactory.getListNotif(dataObj).then(function (datas) {
                console.log(datas.data);
                $scope.listnotif = datas.data;

            });

            $scope.initialisationNotif = function ()
            {
                var dataObj = {};
                tanaNotifFactory.getListNotif(dataObj).then(function (datas) {
                    $scope.listnotif = datas.data.datas;
                    $scope.listnotif.push('');
                    console.log(datas.data.datas);

                });
            };

        };



    }]);

/*
 //Directive modale
 app.directive('ngModaldefault', function () {
 return {
 restrict: 'A', 
 templateUrl: 'packages/default/views/templateDefaultModal.html',
 link: function (scope, element, attrs) {
 $(element).on('hidden.bs.modal', function () {
 try {
 //$scope.verificationAjourFournisseur = "";                    
 } catch (e) {
 }
 });
 }
 }
 });
 //Directive modale
 app.directive('ngModaldloader', function () {
 return {
 restrict: 'A', 
 template: '<div class="modal-hide"></div>',
 link: function (scope, element, attrs) {
 $(element).on('hidden.bs.modal', function () {
 try {
 } catch (e) {
 }
 });
 
 }
 }
 });
 
 //Directive modale
 app.directive('ngDatepicker', function () {
 return {
 restrict: 'A',
 link: function (scope, element, attrs) {
 $(element).datepicker({
 todayBtn: true,
 language: "fr",
 autoclose: true
 });
 }
 }
 });
 app.directive('ngNumeric', function(){
 return {
 require: 'ngModel',
 link: function(scope, element, attrs, modelCtrl) {
 
 modelCtrl.$parsers.push(function (inputValue) {
 var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;
 
 if (transformedInput!=inputValue) {
 modelCtrl.$setViewValue(transformedInput);
 modelCtrl.$render();
 }
 return transformedInput;
 });
 }
 };
 });
 **/