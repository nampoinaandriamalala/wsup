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

//Controller par defaut
angular.module('raptorApp').controller('Ctrl1', ['$scope', '$rootScope', '$http', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $rootScope, $http, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {

        /*Votre code ici*/

    }]);

angular.module('raptorApp').controller('CtrlAdminTn_n3', ['$scope', '$rootScope', '$http', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $rootScope, $http, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {

        /*Votre code ici*/

        /*var panZoomTiger = svgPanZoom('#demo-tiger');*/

        $scope.IsVisible01=false;
        $scope.IsVisible02=false;
        $scope.IsVisible03=false;
        $scope.IsVisible04=false;
        $scope.IsVisible05=false;
        $scope.IsVisible06=false;
        $scope.IsVisible07=false;
        $scope.IsVisible08=false;
        $scope.IsVisible09=false;
        $scope.IsVisible10=false;
        $scope.IsVisible11=false;
        $scope.IsVisible12=false;
        
        var i=1;
        
        $scope.zoomplus=function (){
            for(i=1;i<10;i++){
                
            }
            
        }
        
        $scope.zoommoins=function (){
            
        }
        
        $scope.Show1=function (){
            $scope.IsVisible01= true;
            $scope.IsVisible02= false;
            $scope.IsVisible03= false;
            $scope.IsVisible04= false;
            $scope.IsVisible05= false;
            $scope.IsVisible06= false;
            $scope.IsVisible07= false;
            $scope.IsVisible08= false;
            $scope.IsVisible09= false;
            $scope.IsVisible10= false;
            $scope.IsVisible11= false;
            $scope.IsVisible12= false;
            
        }
        $scope.Show2=function (){
            $scope.IsVisible01= true;
            $scope.IsVisible02= true;
            $scope.IsVisible03= false;
            $scope.IsVisible04= false;
            $scope.IsVisible05= false;
            $scope.IsVisible06= false;
            $scope.IsVisible07= false;
            $scope.IsVisible08= false;
            $scope.IsVisible09= false;
            $scope.IsVisible10= false;
            $scope.IsVisible11= false;
            $scope.IsVisible12= false;
            
        }
        $scope.Show3=function (){
            $scope.IsVisible01= true;
            $scope.IsVisible02= true;
            $scope.IsVisible03= true;
            $scope.IsVisible04= false;
            $scope.IsVisible05= false;
            $scope.IsVisible06= false;
            $scope.IsVisible07= false;
            $scope.IsVisible08= false;
            $scope.IsVisible09= false;
            $scope.IsVisible10= false;
            $scope.IsVisible11= false;
            $scope.IsVisible12= false;
            
        }
        $scope.Show4=function (){
            $scope.IsVisible01= true;
            $scope.IsVisible02= true;
            $scope.IsVisible03= true;
            $scope.IsVisible04= true;
            $scope.IsVisible05= false;
            $scope.IsVisible06= false;
            $scope.IsVisible07= false;
            $scope.IsVisible08= false;
            $scope.IsVisible09= false;
            $scope.IsVisible10= false;
            $scope.IsVisible11= false;
            $scope.IsVisible12= false;
            
        }
        $scope.Show5=function (){
            $scope.IsVisible01= true;
            $scope.IsVisible02= true;
            $scope.IsVisible03= true;
            $scope.IsVisible04= true;
            $scope.IsVisible05= true;
            $scope.IsVisible06= false;
            $scope.IsVisible07= false;
            $scope.IsVisible08= false;
            $scope.IsVisible09= false;
            $scope.IsVisible10= false;
            $scope.IsVisible11= false;
            $scope.IsVisible12= false;
            
        }
        $scope.Show6=function (){
            $scope.IsVisible01= true;
            $scope.IsVisible02= true;
            $scope.IsVisible03= true;
            $scope.IsVisible04= true;
            $scope.IsVisible05= true;
            $scope.IsVisible06= true;
            $scope.IsVisible07= false;
            $scope.IsVisible08= false;
            $scope.IsVisible09= false;
            $scope.IsVisible10= false;
            $scope.IsVisible11= false;
            $scope.IsVisible12= false;
            
        }
        
        $scope.Show12=function (){
            $scope.IsVisible01= true;
            $scope.IsVisible02= true;
            $scope.IsVisible03= true;
            $scope.IsVisible04= true;
            $scope.IsVisible05= true;
            $scope.IsVisible06= true;
            $scope.IsVisible07= true;
            $scope.IsVisible08= true;
            $scope.IsVisible09= true;
            $scope.IsVisible10= true;
            $scope.IsVisible11= true;
            $scope.IsVisible12= true;
        }
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