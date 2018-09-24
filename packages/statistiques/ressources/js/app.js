//FACTORY
angular.module('raptorApp').factory('myPostgresExemple', function ($http, $q) {    //Exemple de service
    
    var factory = {
        banner: false,
        getDefautl: function (dataObj) {
            var deferred = $q.defer();$http({
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
angular.module('raptorApp').controller('Ctrl1', ['$scope', '$rootScope', '$http', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout','ngToast', function ($scope, $rootScope, $http, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout,ngToast) {

    /*Votre code ici*/
    
   

}]);








angular.module('raptorApp').controller('CtrlStat', ['$scope', '$rootScope', '$http', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout','ngToast', function ($scope, $rootScope, $http, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout,ngToast) {

    /*Votre code ici*/
    
    $scope.ChartObjectUC = {

    };
    
    $scope.ChartObjectUC.type = "PieChart";
    
    $scope.onions = [
        {v: "Onions"},
        {v: 3},
    ];

    $scope.ChartObjectUCt.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
        {c: [
            {v: "Mushrooms"},
            {v: 3},
        ]},
        {c: $scope.onions},
        {c: [
            {v: "Olives"},
            {v: 31}
        ]},
        {c: [
            {v: "Zucchini"},
            {v: 1},
        ]},
        {c: [
            {v: "Pepperoni"},
            {v: 2},
        ]}
    ]};

    $scope.ChartObjectUC.options = {
        'title': 'Statistiques des postes Allumés et Eteint'
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