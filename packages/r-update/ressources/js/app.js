//FACTORY
angular.module('raptorApp').factory('myPostgresExemple', function ($http, $q) {    //Exemple de service

    var factory = {
        banner: false,
        getDefautl: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/default/model/default.php',
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

angular.module('raptorApp').factory('myRaptorRoute', function ($http, $q) {    //Exemple de service

    var factory = {
        banner: false,
        getListe: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-update/model/listeroute.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        reecrire: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-update/model/reecrireroute.php',
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
angular.module('raptorApp').controller('CtrlRUpdate', ['$scope', '$rootScope', '$http', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', 'myRaptorRoute', function ($scope, $rootScope, $http, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast, myRaptorRoute) {

        /*Votre code ici*/
        $scope.listerLesRoutes = function ()
        {
            var dataObj = {};
            myRaptorRoute.getListe(dataObj).then(function (datas) {
                console.log(datas);
                $scope.listeDesRoutes = datas.data.datas.version;
                console.log($scope.listeDesRoutes);
            });
        }

        /*Event*/
        $scope.regenererRoute = function (listeDesRoutes)
        {
//            console.log(listeDesRoutes);
            var dataObj = {route: listeDesRoutes};
            myRaptorRoute.reecrire(dataObj).then(function (datas) {
                console.log(datas);
                ngToast.create({
                    className: datas.data.notification,
                    content: datas.data.message
                });

                //actualisaiton
                $scope.listerLesRoutes();
            });
        }
        $scope.supprimerLigne = function (route) {
            var index = $scope.listeDesRoutes.indexOf(route);
            $scope.listeDesRoutes.splice(index, 1);
        }
        $scope.ajouterLigne = function(ajout)
        {
           var ajouter = angular.copy(ajout);
            $scope.listeDesRoutes.push(ajouter);
            
            $scope.clear();
            
        }
        
        //Function
        $scope.clear = function()
        {
            $scope.ajout.url = "";
            $scope.ajout.template = "";
            $scope.ajout.controler = "";
        }

        //Initialisation
        $scope.listerLesRoutes();
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