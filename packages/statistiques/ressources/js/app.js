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

angular.module('raptorApp').factory('stat', function ($http, $q) {

    var factory = {
        banner: false,
        statEmplacement: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/statistiques/model/statEmplacementPoste.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },

    };
    return factory;

});
//Controller par defaut
angular.module('raptorApp').controller('Ctrl1', ['$scope', '$rootScope', '$http', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $rootScope, $http, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {

        /*Votre code ici*/



    }]);


angular.module('raptorApp').controller('CtrlStat', ['$scope', '$rootScope', '$http', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast','stat', function ($scope, $rootScope, $http, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast,stat) {

        /*Votre code ici*/
        
        stat.statEmplacement.then(function (datas) {
            $scope.ChartObjectPostes = {
                    "type": "LineChart",
                    "displayed": false,
                    "data": {
                        "cols": [
                            {
                                "id": "demande",
                                "label": "Demande",
                                "type": "string",
                                "p": {}
                            },

                            {
                                "id": "AnPrec-id",
                                "label": "Année actuelle",
                                "type": "number",
                                "p": {}
                            },
                            {
                                "id": "An-id",
                                "label": "Année précédente",
                                "type": "number",
                                "p": {}
                            },
                        ],
                        "rows": datas.data[0]
                    },
                    "options": {
                        "title": "Courbes de variation des demandes dans l'année",
                        "isStacked": "true",
                        "fill": 20,
                        "displayExactValues": true,
                        "vAxis": {
                            "title": "Nombre de demande",
                            "gridlines": {
                                "count": 10
                            }
                        },
                        "hAxis": {
                            "title": "Mois"
                        }
                    },
                    "formatters": {}
                }
        });

        $scope.Lesannees = [

            {
                "numero": "00",
                mois: 'Mois en cours'
            },
            {
                "numero": "01",
                mois: 'Janvier'
            },
            {
                "numero": "02",
                mois: 'Février'
            }
            ,
            {
                "numero": "03",
                mois: 'Mars'
            }
            ,
            {
                "numero": "04",
                mois: 'Avril'
            }
            ,
            {
                "numero": "05",
                mois: 'Mai'
            }
            ,
            {
                "numero": "06",
                mois: 'Juin'
            }
            ,
            {
                "numero": "07",
                mois: 'Juillet'
            }
            ,
            {
                "numero": "08",
                mois: 'Août'
            }
            ,
            {
                "numero": "09",
                mois: 'Septembre'
            }
            ,
            {
                "numero": "10",
                mois: 'Octobre'
            }
            ,
            {
                "numero": "11",
                mois: 'Novembre'
            }
            ,
            {
                "numero": "12",
                mois: 'Décembre'
            }
        ];
        $scope.lalistedesannees = $scope.Lesannees[0];

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


//        $scope.ChartObjectPostes = {};
//
//        $scope.ChartObjectPostes.type = "PieChart";
//
//        $scope.onions = [
//            {v: "Onions"},
//            {v: 3},
//        ];
//
//        $scope.ChartObjectPostes.data = {"cols": [
//                {id: "occupe", label: "Occupé", type: "string"},
//                {id: "libre", label: "Libre", type: "string"}
//            ], "rows": [
//                {c: [
//                        {v: "Libre"},
//                        {v: 74},
//                    ]},
//                {c: [
//                        {v: "Occupé"},
//                        {v: 1200},
//                    ]}
//            ]};
//
//        $scope.ChartObjectPostes.options = {
//            "title": "Statistiques de Postes Libres",
//            "isStacked": "true",
//            "fill": 20,
//            "displayExactValues": true,
//            "vAxis": {
//                "title": "test titre",
//                "gridlines": {
//                    "count": 10
//                }
//            },
//            "hAxis": {
//                "title": "Semaine"
//            },
//            "formatters": {}
//        };

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
