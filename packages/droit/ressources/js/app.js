//FACTORY
angular.module('raptorApp').factory('groupAdmin', function ($http) {
    var factory = {
        banner: false,
        listAbreviation: function (dataObj, handleData) {
            $http({
                method: 'POST',
                url: 'packages/droit/model/listeabreviation.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    success(function (datas) {
                        handleData(datas);
                    });
        },
        listGroup: function (dataObj, handleData) {
            $http({
                method: 'POST',
                url: 'packages/droit/model/droitlistes.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    success(function (datas) {
                        handleData(datas);
                    });
        },
        saveGroup: function (dataObj, handleData) {
            $http({
                method: 'POST',
                url: 'packages/droit/model/droitenregistrer.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    success(function (datas) {
                        handleData(datas);
                    });
        },
        addGroup: function (dataObj, handleData) {
            $http({
                method: 'POST',
                url: 'packages/droit/model/droitajouter.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    success(function (datas) {
                        handleData(datas);
                    });
        },
        removeGroup: function (dataObj, handleData) {
            $http({
                method: 'POST',
                url: 'packages/droit/model/droitsupprimer.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    success(function (datas) {
                        handleData(datas);
                    });
        }
    };
    return factory;
});

//Controller par defaut
angular.module('raptorApp').controller('CtrlDroit', ['$scope', '$rootScope', '$http', 'groupAdmin', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', function ($scope, $rootScope, $http, groupAdmin, $location, $sce, $cookies, $cookieStore, $window, $timeout) {

        //TEST CONNEXION ELSE /LOGIN
        //SPECIAL LOGIN //
        $scope.login = $cookieStore.get('login');
        $scope.password = $cookieStore.get('password');

        $rootScope.rootInformation = {};
        $rootScope.rootInformation.nom = $cookieStore.get('nom');
        $rootScope.rootInformation.prenoms = $cookieStore.get('prenoms');
        $rootScope.rootInformation.matricule = $cookieStore.get('login');

        if ($scope.login == undefined && $scope.login == undefined) {
            $location.path('/login');
        } else {
            //For banner
            $rootScope.hideYourBannerRoot(true);
            $scope.admindb = $cookieStore.get('admin') == "t";
            if ($scope.admindb) {
                $rootScope.imAdmin(true);
            } else {
                $rootScope.imAdmin(false);
                $('.menu-admin').remove();
            }
            //end for banner
        }
        // FIN SPECIAL LOGIN //

        $scope.creer = [];
        $scope.replanifier = [];
        $scope.supprimer = [];
        $scope.valider = [];
        $scope.devaliderval = [];
        $scope.extraction = [];

        $scope.varFlexibilite = {}
        $scope.varFlexibilite.abreviation = "";
        $scope.listGroupe = function ()
        {
            $scope.creer = [];
            $scope.replanifier = [];
            $scope.supprimer = [];
            $scope.valider = [];
            $scope.devaliderval = [];
            $scope.extraction = [];


            $scope.varFlexibilite.abreviation = "";
            $scope.varFlexibilite.creer = false;
            $scope.varFlexibilite.replanifier = false;
            $scope.varFlexibilite.supprimer = false;
            $scope.varFlexibilite.valider = false;
            $scope.varFlexibilite.devalider = false;
            $scope.varFlexibilite.extraction = false;

            var dataObj = {};
            groupAdmin.listGroup(dataObj, function (datas) {
                console.log(datas);

                $scope.listGroup = datas.datas;
                for (var item in $scope.listGroup) {
                    $scope.creer.push(($scope.listGroup[item]['creer'] == '1'));
                    $scope.replanifier.push(($scope.listGroup[item]['replanifier'] == '1'));
                    $scope.supprimer.push(($scope.listGroup[item]['supprimer'] == '1'));
                    $scope.valider.push(($scope.listGroup[item]['valider'] == '1'));
                    $scope.devaliderval.push(($scope.listGroup[item]['devalider'] == '1'));
                    $scope.extraction.push(($scope.listGroup[item]['extraction'] == '1'));
                }
                console.log($scope.replanifier);
            });
        }

        $scope.saveModifGroup = function (id, creer, replanifier,supprimer, valider, devaliderval, extraction) {
            console.log(id, creer, replanifier,supprimer, valider, devaliderval, extraction);
            var dataObj = {
                id: id,
                creer: creer,
                replanifier: replanifier,
                supprimer: supprimer,
                valider: valider,
                devalider: devaliderval,
                extraction: extraction
            }

            groupAdmin.saveGroup(dataObj, function (datas) {
                $rootScope.showThisNotification(datas.message, datas.notification);
            });
        }

        $scope.ajouterGroup = function ()
        {
            var varFlexibilite = $scope.varFlexibilite;
            console.log(varFlexibilite);
            var dataObj = {
                abreviation: varFlexibilite.abreviation.abrev_fonction,
                creer: varFlexibilite.creer,
                replanifier: varFlexibilite.replanifier,
                supprimer: varFlexibilite.supprimer,
                valider: varFlexibilite.valider,
                devalider: varFlexibilite.devalider,
                extraction: varFlexibilite.extraction
            }
            console.log(dataObj);

            groupAdmin.addGroup(dataObj, function (datas) {
                $scope.listGroupe();
                $rootScope.showThisNotification(datas.message, datas.notification);
            });
        }

        $scope.supprimerGroup = function (id)
        {
            var dataObj = {
                id: id
            }
            groupAdmin.removeGroup(dataObj, function (datas) {
                $scope.listGroupe();
                $rootScope.showThisNotification(datas.message, datas.notification);
            });
        }

        $scope.listAbreviation = function ()
        {
            var dataObj = {};
            
            groupAdmin.listAbreviation(dataObj, function (datas) {
                $scope.listAbreviations = datas.datas;
                console.log($scope.listAbreviations);
            });
            
        }
        
        //Initialisation
        $scope.listAbreviation();
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