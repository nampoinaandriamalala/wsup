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

        getListProc: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/statistiques/model/listProc.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        getListMem: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/statistiques/model/listMem.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        getListEtat: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/statistiques/model/listEtat.php',
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


angular.module('raptorApp').controller('CtrlStat', ['$scope', '$rootScope', '$http', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', 'stat', function ($scope, $rootScope, $http, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast, stat) {

        /*Votre code ici*/

// Stat des etats des postes
var dataObj = {};
        stat.getListEtat(dataObj).then(function (datas) {
            console.log(datas.data);
            $scope.listnotifetat = datas.data;


            var avaliacoes_descTipo = [];
            var avaliacoes_quantidade = [];
            var tt = [];
            var val = [];
            var i;
            var val1 = [];
            $scope.avaliacoesetat = {};
            for (var i in $scope.listnotifetat) {
                avaliacoes_descTipo.push($scope.listnotifetat[i].designation);
                avaliacoes_quantidade.push(parseInt($scope.listnotifetat[i].counttotal, 10));
            }
            for (i = 0; i < avaliacoes_descTipo.length; i++) {
                val = {c: [
                        {v: avaliacoes_descTipo[i]},
                        {v: avaliacoes_quantidade[i]}
                    ]};

                val1.push(val);
            }

            $scope.avaliacoesetat.type = "PieChart";

            $scope.onions = [
                {v: avaliacoes_descTipo[0]},
                {v: avaliacoes_quantidade[0]}
            ];

            $scope.avaliacoesetat.data = {"cols": [
                    {id: "t", label: "Topping", type: "string"},
                    {id: "s", label: "Slices", type: "number"}
                ], "rows":
                        val1
            };

            $scope.avaliacoesetat.options = {
                'title': 'Nombres des Ordinateurs ayant le processeurs',
                "isStacked": "true",
                "fill": 100,
                'legend': {'position': 'right'},
                width: 1000,
                height: 800
            };
        });


// Stat pour memoire
        var dataObj = {};
        stat.getListMem(dataObj).then(function (datas) {
            console.log(datas.data);
            $scope.listnotifmem = datas.data;


            var avaliacoes_descTipomem = [];
            var avaliacoes_quantidademem = [];
            var tt = [];
            var valmem = [];
            var i;
            var val1mem = [];
            $scope.avaliacoesmem = {};
            console.log('testaffiche', $scope.listnotifmem[0].designation);
            console.log('tt1', tt);

            for (var i in $scope.listnotifmem) {
                avaliacoes_descTipomem.push($scope.listnotifmem[i].designation+" Mo");
                avaliacoes_quantidademem.push(parseInt($scope.listnotifmem[i].counttotal, 10));
            }
            for (i = 0; i < avaliacoes_descTipomem.length; i++) {
                valmem = {c: [
                        {v: avaliacoes_descTipomem[i]},
                        {v: avaliacoes_quantidademem[i]}
                    ]};

                val1mem.push(valmem);
            }

            $scope.avaliacoesmem.type = "PieChart";

            $scope.onions = [
                {v: avaliacoes_descTipomem[0]},
                {v: avaliacoes_quantidademem[0]}
            ];

            $scope.avaliacoesmem.data = {"cols": [
                    {id: "t", label: "Topping", type: "string"},
                    {id: "s", label: "Slices", type: "number"}
                ], "rows":
                        val1mem
            };

            $scope.avaliacoesmem.options = {
                'title': 'Nombres des Ordinateurs ayant le Memoire Vive',
                "isStacked": "true",
                "fill": 100,
                'legend': {'position': 'right'},
                width: 1000,
                height: 800
            };
        });


// Stat pour processeurs
        var dataObj = {};
        stat.getListProc(dataObj).then(function (datas) {
            console.log(datas.data);
            $scope.listnotif = datas.data;


            var avaliacoes_descTipo = [];
            var avaliacoes_quantidade = [];
            var tt = [];
            var val = [];
            var i;
            var val1 = [];
            $scope.avaliacoes = {};
            console.log('testaffiche', $scope.listnotif[0].valeursub);
            console.log('tt1', tt);

            for (var i in $scope.listnotif) {
                avaliacoes_descTipo.push($scope.listnotif[i].valeursub);
                avaliacoes_quantidade.push(parseInt($scope.listnotif[i].counttotal, 10));
            }
            for (i = 0; i < avaliacoes_descTipo.length; i++) {
                val = {c: [
                        {v: avaliacoes_descTipo[i]},
                        {v: avaliacoes_quantidade[i]}
                    ]};

                val1.push(val);
            }

            $scope.avaliacoes.type = "PieChart";

            $scope.onions = [
                {v: avaliacoes_descTipo[0]},
                {v: avaliacoes_quantidade[0]}
            ];

            $scope.avaliacoes.data = {"cols": [
                    {id: "t", label: "Topping", type: "string"},
                    {id: "s", label: "Slices", type: "number"}
                ], "rows":
                        val1
            };

            $scope.avaliacoes.options = {
                'title': 'Nombres des Ordinateurs ayant le processeurs',
                "isStacked": "true",
                "fill": 100,
                'legend': {'position': 'right'},
                width: 1000,
                height: 800
            };
        });

        $scope.initialisationNotif = function ()
        {
            var dataObj = {};
            stat.getListProc(dataObj).then(function (datas) {
                $scope.listnotif = datas.data.datas;
                $scope.listnotif.push('');
                console.log(datas.data.datas);

            });
        };
        $scope.initialisationNotifMem = function ()
        {
            var dataObj = {};
            stat.getListMem(dataObj).then(function (datas) {
                $scope.listnotif = datas.data.datas;
                $scope.listnotif.push('');
                console.log(datas.data.datas);

            });
        };

        $scope.getListProc = function (data) {
            stat.getListProc(data).then(function (response) {
                $scope.proclist = data;

                console.log('proc', data);

                var proc = [];
                var nombre = [];

                for (var i in data) {
                    proc.push("procname " + data[i].designation);
                    nombre.push(data[i].counttotal);
                }

                var chartdata = {
                    labels: proc,
                    datasets: [
                        {
                            label: 'Stat des processeurs',
                            backgroundColor: 'rgba(200, 200, 200, 0.75)',
                            borderColor: 'rgba(200, 200, 200, 0.75)',
                            hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                            hoverBorderColor: 'rgba(200, 200, 200, 1)',
                            data: nombre
                        }
                    ]
                };
                var ctx = $("#mycanvas");

                var barGraph = new Chart(ctx, {
                    type: 'bar',
                    data: chartdata
                });

            }, function (errors) {
                console.error(errors);
            });
        };



    }]);
