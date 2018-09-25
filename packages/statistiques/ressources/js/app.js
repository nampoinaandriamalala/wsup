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


angular.module('raptorApp').controller('CtrlStat', ['$scope', '$rootScope', '$http', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $rootScope, $http, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {

        /*Votre code ici*/

        $scope.ChartObjectUC = {};

        $scope.ChartObjectUC.type = "PieChart";

        $scope.onions = [
            {v: "Onions"},
            {v: 3},
        ];

        $scope.ChartObjectUC.data = {"cols": [
                {id: "allume", label: "Allumé", type: "string"},
                {id: "eteint", label: "Eteint", type: "string"}
            ], "rows": [
                {c: [
                        {v: "Allumé"},
                        {v: 839},
                    ]},
                {c: [
                        {v: "Eteint"},
                        {v: 122},
                    ]}
            ]};

        $scope.ChartObjectUC.options = {
            "title": "Statistiques de Postes Allumés et Eteints",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "test titre",
                "gridlines": {
                    "count": 10
                }
            },
            "hAxis": {
                "title": "Semaine"
            },
            "formatters": {}
        };






        $scope.ChartObjectPostes = {};

        $scope.ChartObjectPostes.type = "PieChart";

        $scope.onions = [
            {v: "Onions"},
            {v: 3},
        ];

        $scope.ChartObjectPostes.data = {"cols": [
                {id: "occupe", label: "Occupé", type: "string"},
                {id: "libre", label: "Libre", type: "string"}
            ], "rows": [
                {c: [
                        {v: "Libre"},
                        {v: 74},
                    ]},
                {c: [
                        {v: "Occupé"},
                        {v: 1200},
                    ]}
            ]};

        $scope.ChartObjectPostes.options = {
            "title": "Statistiques de Postes Libres",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "test titre",
                "gridlines": {
                    "count": 10
                }
            },
            "hAxis": {
                "title": "Semaine"
            },
            "formatters": {}
        };







        $scope.ChartObjectCarac = {};

        $scope.ChartObjectCarac.type = "PieChart";

        $scope.onions = [
            {v: "Onions"},
            {v: 3},
        ];

        $scope.ChartObjectCarac.data = {"cols": [
                {id: "occupe", label: "Occupé", type: "string"},
                {id: "libre", label: "Libre", type: "string"}
            ], "rows": [
                {c: [
                        {v: "Pentium 4"},
                        {v: 74},
                    ]},
                {c: [
                        {v: "Core 2 Duo"},
                        {v: 120},
                    ]},
                {c: [
                        {v: "Core ï3"},
                        {v: 864},
                    ]},
                {c: [
                        {v: "Core ï5"},
                        {v: 560},
                    ]},
                {c: [
                        {v: "Core ï7"},
                        {v: 115},
                    ]},
                {c: [
                        {v: "Core ï9"},
                        {v: 09},
                    ]}
            ]};

        $scope.ChartObjectCarac.options = {
            "title": "Caracteristiques des UC",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "test titre",
                "gridlines": {
                    "count": 10
                }
            },
            "hAxis": {
                "title": "Semaine"
            },
            "formatters": {}
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