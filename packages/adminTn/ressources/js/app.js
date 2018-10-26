/* global tanaAdminFactory */

//FACTORY
angular.module('raptorApp').factory('tanaAdminFactory', function ($http, $q) {

    var factory = {
        banner: false,
        getListEmplacement: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/adminTn/model/listEmplacement.php',
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
                url: 'packages/adminTn/model/listPostes.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        getListPosteLocal: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/adminTn/model/getPosteLocal.php',
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
                url: 'packages/adminTn/model/ajoutPoste.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    }, function (errors) {
                        deferred.reject(errors.data);
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
        $scope.tabnbr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        $scope.nombreplace=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        $scope.poste = {
            siege: '',
            niveau: '',
            lettre: '',
            numero: '',
        };
        $scope.poste.id = "";
        $scope.poste.possesseur = "";
        $scope.poste.nomposte = "";

        $scope.savePoste = function (data) {


            //données sur les postes
            var nom_poste = data.nomposte;
            var ip = data.ip;
            var possesseur = data.possesseur;
            var matricule_responsable = $cookieStore.get('login');
            var date = data.date;

            console.log(data);

            //Données sur les emplacements
            //var id_emplacement;
            var siege = data.siege;
            var niveau = data.niveau;
            var lettre = data.lettre;
            var numero = data.numero;


            var dataObj = {

                //variables sur les postes
                nomposte: nom_poste,
                ip: ip,
                possesseur: possesseur,
                matricule_responsable: matricule_responsable,
                date: date,

                //Variable sur les emplacements
                siege: siege,
                niveau: niveau,
                lettre: lettre,
                numero: numero

            };
            console.log(dataObj);
            tanaAdminFactory.ajoutPoste(dataObj).then(function (datas) {
                ngToast.create({
                    className: 'success',
                    content: 'Ajout avec succès'
                });
                $scope.poste.siege = "";
                $scope.poste.niveau = "";
                $scope.poste.lettre = "";
                $scope.poste.numero = "";
                $scope.poste.nomposte = "";
                $scope.poste.ip = "";
                $scope.poste.date = "";
                $scope.poste.possesseur = "";
            }, function (errors) {
                ngToast.create({
                    className: 'danger',
                    content: errors.error
                });
                console.log('controller', errors);
            });
        };



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

        var dataObj = {};
        tanaAdminFactory.getListPosteLocal(dataObj).then(function (datas) {
            $scope.postelocals=datas.data.datas;
            console.log(datas.data.datas);

        });

        $scope.initialisationEmplacement = function ()
        {
            var dataObj = {};
            tanaAdminFactory.getListEmplacement(dataObj).then(function (datas) {
                $scope.emplacements = datas.data.datas;
                $scope.emplacements.push('');
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

        $scope.initializeListePosteLocal = function ()
        {
            var dataObj = {};
            tanaAdminFactory.getListPosteLocal(dataObj).then(function (datas) {
                $scope.postelocals=datas.data.datas;
                console.log('listpost local',$scope.listepostelocal);
            });
        };

        $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = $scope.IsVisible2 = $scope.IsVisible1 = false;

        //Afichage des postes suivants les nombres des emplacements
        $scope.Show1 = function ($niveau, $lettre, $ordre) {
            $scope.IsVisible1 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = $scope.IsVisible2 = false;

            console.log('niveau : ' + $niveau + ' lettre : ' + $lettre + ' ordre : ' + $ordre);
        };
        $scope.Show2 = function ($niveau, $lettre, $ordre) {
            $scope.IsVisible1 = $scope.IsVisible2 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = false;
            console.log('niveau : ' + $niveau + ' lettre : ' + $lettre + ' ordre : ' + $ordre);
        };
        $scope.Show3 = function ($niveau, $lettre, $ordre) {
            $scope.IsVisible1 = $scope.IsVisible3 = $scope.IsVisible2 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = false;
            console.log('niveau : ' + $niveau + ' lettre : ' + $lettre + ' ordre : ' + $ordre);

        };
        $scope.Show4 = function ($niveau, $lettre, $ordre) {
            $scope.IsVisible3 = $scope.IsVisible4 = $scope.IsVisible2 = $scope.IsVisible1 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = false;
            console.log('niveau : ' + $niveau + ' lettre : ' + $lettre + ' ordre : ' + $ordre);
        };
        $scope.Show5 = function ($niveau, $lettre, $ordre) {
            $scope.IsVisible1 = $scope.IsVisible2 = $scope.IsVisible3 = $scope.IsVisible4 = $scope.IsVisible5 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = false;
            console.log('niveau : ' + $niveau + ' lettre : ' + $lettre + ' ordre : ' + $ordre);
        };
        $scope.Show6 = function ($niveau, $lettre, $ordre) {
            $scope.IsVisible1 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = $scope.IsVisible2 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = false;
            console.log('niveau : ' + $niveau + ' lettre : ' + $lettre + ' ordre : ' + $ordre);
        };
        $scope.Show12 = function ($niveau, $lettre, $ordre) {
            $scope.IsVisible1 = $scope.IsVisible2 = $scope.IsVisible3 = $scope.IsVisible4 = $scope.IsVisible5 = $scope.IsVisible6 = $scope.IsVisible7 = $scope.IsVisible8 = $scope.IsVisible9 = $scope.IsVisible10 = $scope.IsVisible11 = $scope.IsVisible12 = true;
            console.log('niveau : ' + $niveau + ' lettre : ' + $lettre + ' ordre : ' + $ordre);
            
            
            $scope.tabnbr.forEach((item)=>{
                $(`#place`+item).append(`
                    <div >
                        <h2>Poste ${item} </h2>
                    </div>
                `);
                
            });   
        };
        
        $scope.populateNumtable=function(niveau, lettre, ordre){
            switch (ordre){
                case 1:
                    
                    break;
                case 2:
                    
                    break;
                case 3:
                    
                    break;
                case 4:
                    
                    break;
                case 5:
                    
                    break;
                default:

            }
        };
        
        //Action sur l'ajout ou modification des emplacements

        $scope.testPostList = [];

        for (let i = 0; i < 24; i++) {

            for (let j = 0; j < 2; j++) {
                $scope.testPostList.push({
                    position: `${j}-${i}`, 
                    nom_poste: `Post numer ${j}-${i}`
                });
            }
        }

        console.log('testPostList', $scope.testPostList);

        $scope.populatePlan = function (listPoste) {
            listPoste.forEach((item) => {
                $(`#${item.position}`).append(`
                    <div class="post">
                        <h2>${item.nom_poste}</h2>
                    </div>
                `);
            });
        };

        $scope.populatePlan($scope.testPostList);
       
    }]);

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


angular.module('raptorApp').controller('CtrlAdminTn_n1', ['$scope', '$rootScope', '$http', 'tanaAdminFactory', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $rootScope, $http, tanaAdminFactory, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {

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


        $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = $scope.IsVisible2 = $scope.IsVisible1 = false;

        //Afichage des postes suivants les nombres des emplacements
        $scope.Show1 = function () {
            $scope.IsVisible1 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = $scope.IsVisible2 = false;

        };
        $scope.Show2 = function () {
            $scope.IsVisible1 = $scope.IsVisible2 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = false;
        };
        $scope.Show3 = function () {
            $scope.IsVisible1 = $scope.IsVisible3 = $scope.IsVisible2 = true;

            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = false;
        };
        $scope.Show4 = function () {
            $scope.IsVisible3 = $scope.IsVisible4 = $scope.IsVisible2 = $scope.IsVisible1 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = false;
        };
        $scope.Show5 = function () {
            $scope.IsVisible1 = $scope.IsVisible2 = $scope.IsVisible3 = $scope.IsVisible4 = $scope.IsVisible5 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = false;

        };
        $scope.Show6 = function () {
            $scope.IsVisible1 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = $scope.IsVisible2 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = false;
        };
        $scope.Show12 = function () {
            $scope.IsVisible1 = $scope.IsVisible2 = $scope.IsVisible3 = $scope.IsVisible4 = $scope.IsVisible5 = $scope.IsVisible6 = $scope.IsVisible7 = $scope.IsVisible8 = $scope.IsVisible9 = $scope.IsVisible10 = $scope.IsVisible11 = $scope.IsVisible12 = true;
        
            
        
        };

    }]);


// Controlleur n2
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

        $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = $scope.IsVisible2 = $scope.IsVisible1 = false;

        //Afichage des postes suivants les nombres des emplacements
        $scope.Show1 = function () {
            $scope.IsVisible1 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = $scope.IsVisible2 = false;

        };
        $scope.Show2 = function () {
            $scope.IsVisible1 = $scope.IsVisible2 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = false;
        };
        $scope.Show3 = function () {
            $scope.IsVisible1 = $scope.IsVisible3 = $scope.IsVisible2 = true;

            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = false;
        };
        $scope.Show4 = function () {
            $scope.IsVisible3 = $scope.IsVisible4 = $scope.IsVisible2 = $scope.IsVisible1 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = $scope.IsVisible5 = false;
        };
        $scope.Show5 = function () {
            $scope.IsVisible1 = $scope.IsVisible2 = $scope.IsVisible3 = $scope.IsVisible4 = $scope.IsVisible5 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = $scope.IsVisible6 = false;

        };
        $scope.Show6 = function () {
            $scope.IsVisible1 = $scope.IsVisible6 = $scope.IsVisible5 = $scope.IsVisible4 = $scope.IsVisible3 = $scope.IsVisible2 = true;
            $scope.IsVisible11 = $scope.IsVisible12 = $scope.IsVisible10 = $scope.IsVisible9 = $scope.IsVisible8 = $scope.IsVisible7 = false;
        };
        $scope.Show12 = function () {
            $scope.IsVisible1 = $scope.IsVisible2 = $scope.IsVisible3 = $scope.IsVisible4 = $scope.IsVisible5 = $scope.IsVisible6 = $scope.IsVisible7 = $scope.IsVisible8 = $scope.IsVisible9 = $scope.IsVisible10 = $scope.IsVisible11 = $scope.IsVisible12 = true;
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
