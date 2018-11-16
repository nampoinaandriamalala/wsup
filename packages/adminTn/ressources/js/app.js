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
        },

        addEmplacement: function (dataObj) {
            var deferred = $q.defer();
            dataObj['action'] = 'addEmplacement';
            $http({
                method: 'POST',
                url: 'packages/default/model/getplanAndPoste.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas.data);
                    }, function (errors) {
                        deferred.reject(errors.data);
                    });
            return deferred.promise;
        },
        getPostes: function (dataObj) {
            var deferred = $q.defer();
            dataObj['action'] = 'getPostes';
            $http({
                method: 'POST',
                url: 'packages/default/model/getplanAndPoste.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas.data);
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

angular.module('raptorApp').controller('CtrlAdminTn_n3', ['$scope', '$filter', '$rootScope', '$http', 'tanaAdminFactory', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $filter, $rootScope, $http, tanaAdminFactory, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {

//        $scope.emplacements=[];
//        $scope.listposteglpi=[];

        $scope.recherchetype = function () {
            console.log($scope.rechercheTypes);
        };

        $scope.login = $cookieStore.get('login');
        $scope.tabnbr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        $scope.nombreplace = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
            $('div#svgidzoom').css(
                    {
                        'transform': str
                        
                    });
        };

        $scope.zoommoins = function () {
            $scope.scale -= 0.1;
            var str = 'scale(' + $scope.scale + ')';

            $('div#svgidzoom').css(
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
            $scope.postelocals = datas.data.datas;
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
                $scope.postelocals = datas.data.datas;
                console.log('listpost local', $scope.listepostelocal);
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


            $scope.tabnbr.forEach((item) => {
                $(`#place` + item).append(`
                    <div >
                        <h2>Poste ${item} </h2>
                    </div>
                `);

            });
        };

        //Action sur l'ajout ou modification des emplacements

        $scope.testPostList = [];

        for (let i = 0; i <= 19; i++) {

            for (let j = 0; j <= 72; j++) {
                $scope.testPostList.push({
                    position: `${i}-${j}`,
                    nom_poste: `Post numer ${i}-${j}`
                });
            }
        }

        console.log('testPostList', $scope.testPostList);

        $scope.populatePlan = function (listPoste) {
//             listPoste.forEach((item) => {
//                 $(`#n3_${item.position}`).append(`
//                     <div class="post">
//                         <h2>${item.nom_poste}</h2>
//                     </div>
//                 `);
//             });
        };

        $scope.listCols = [];
        $scope.listRows = [];

        for (var i = 0; i <= 19; i++) {
            $scope.listRows.push(i);
        }

        for (var i = 0; i <= 71; i++) {
            $scope.listCols.push(i);
        }

        setTimeout(function () {
            $scope.populatePlan($scope.testPostList);

        }, 1000);

        $scope.selectedGlpi = $cookies.get("selectedGlpi");


        $timeout(function () {
            var paths = document.querySelectorAll('path');

            // console.log(paths);

            paths.forEach((item) => {
                // console.log(item);
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    console.log(e.target.getAttribute('id'));
                    $scope.selectedGlpi = e.target.getAttribute('id');
                    $cookies.put("selectedGlpi", $scope.selectedGlpi);
                })
            });

        }, 2000);


        $scope.saveEmplacement = function (data) {
            tanaAdminFactory.addEmplacement(data).then(function (response) {
                console.log('result of save', response);
            }, function (errors) {
                console.error(errors);
            });
        }

        $scope.getPostes = function (data) {
            tanaAdminFactory.getPostes(data).then(function (response) {
                $scope.postes = response;
                $scope.populatePlanPostes($scope.postes);
                console.log('postes', response);
            }, function (errors) {
                console.error(errors);
            });
        }

        $scope.getPostes({});

        $scope.filtreposte = function (recherche) {

            //effacer
            var listPoste = $scope.postes;
            listPoste.forEach((item) => {
                if (!item.plan_id) {
                    return
                } else {
                    $(`#${item.plan_id}`).empty();
                }
            });
            
//            $scope.apresfiltre = $filter('filter')($scope.postes, {nom_poste: recherche});
            
            

            switch ($scope.rechercheTypes) {
                case "uc":
                    $scope.apresfiltre = $filter('filter')($scope.postes, {nom_poste: recherche});
                    break;
                case "ut":
                    $scope.apresfiltre = $filter('filter')($scope.postes, {possesseur: recherche});
                    break;
                case "em":
                    $scope.apresfiltre = $filter('filter')($scope.postes, {location: recherche});
                    break;
                case "ai":
                    $scope.apresfiltre = $filter('filter')($scope.postes, {ip_adress: recherche});
                    break;
                case "ps":
                    $scope.apresfiltre = $filter('filter')($scope.postes, {designation_processeurs: recherche});
                    break;
                case "oi":
                    $scope.apresfiltre = $filter('filter')($scope.postes, {name_system: recherche});
                    break;
                case "mv":
                    $scope.apresfiltre = $filter('filter')($scope.postes, {size_memories: recherche});
                    break;
                case "fm":
                    $scope.apresfiltre = $filter('filter')($scope.postes, {frequence_memory: recherche});
                    break;
                case "cg":
                    $scope.apresfiltre = $filter('filter')($scope.postes, {designation_graphic_card: recherche});
                    break;
                case "am":
                    $scope.apresfiltre = $filter('filter')($scope.postes, {mac: recherche});
                    break;

                default:
                    $scope.apresfiltre = $filter('filter')($scope.postes, {nom_poste: recherche});
            }

            $scope.populatePlanPostes($scope.apresfiltre);
        };

        $scope.populatePlanPostes = function (listPoste) {


            //listPoste2 = listPoste;



            listPoste.forEach((item) => {
                if (!item.plan_id) {
                    return
                } else {

//                    item.plan_id = $filter('filter')(item.plan_id, $scope.filtercomputers);

                    $(`#${item.plan_id}`).append(`               
                <div class="card" id="drag1" draggable="true" ondragstart="drag(event)">
                    <div class="card-content">
                    
                        <div class="card-title green white-text">
                            <h1>${item.nom_poste}</h1>
                   
                            <h5>${item.location}</h5>
 
                        </div>                                              
                    </div>
                    <div class="card-action">   
                        <h2 class="text-center" id="possesseur"> ${item.possesseur} </h2>
                        <h3 class="text-center" id="ip"> ${item.ip_adress} </h3>
                        <div class="heart_img text-center"><button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-info"><i class="fa fa-info-circle" aria-hidden="true">Plus</i></button></div>
                    </div>
                </div>
                   
                   <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          <h4 class="modal-title" id="myModalLabel">UC numero : ${item.plan_id}</h4>
                        </div>
                        <div class="modal-body">
                          
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
                        </div>
                      </div>
                    </div>
                    </div>
                `);
                }
                ;
//                $scope.$watch('filtercomputers', function (val)
//                {
//                    $scope.items = $filter('filter')(item.plan_id, val);
//                });

            });
        };

        // .map((item) => {
        //     console.log(item);
        //         // item.addEventListener('click', function (e) {
        //         //     e.preventDefault();
        //         //     console.log(e);
        //         // })
        // });

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
            $('div#svgidzoom').css(
                    {
                        'transform': str
                    });
        };

        $scope.zoommoins = function () {
            $scope.scale -= 0.1;
            var str = 'scale(' + $scope.scale + ')';
            $('div#svgidzoom').css(
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
angular.module('raptorApp').controller('CtrlAdminTn_n2', ['$scope', '$filter', '$rootScope', '$http', 'tanaAdminFactory', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $filter, $rootScope, $http, tanaAdminFactory, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {

//        $scope.emplacements=[];
//        $scope.listposteglpi=[];

        $scope.login = $cookieStore.get('login');

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
            $('div#svgidzoom').css(
                    {
                        'transform': str
                    });
        };

        $scope.zoommoins = function () {
            $scope.scale -= 0.1;
            var str = 'scale(' + $scope.scale + ')';

            $('div#svgidzoom').css(
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
            $scope.postelocals = datas.data.datas;
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
                $scope.postelocals = datas.data.datas;
                console.log('listpost local', $scope.listepostelocal);
            });
        };



        //Action sur l'ajout ou modification des emplacements

        $scope.testPostList = [];

        for (let i = 0; i <= 19; i++) {

            for (let j = 0; j <= 72; j++) {
                $scope.testPostList.push({
                    position: `${i}-${j}`,
                    nom_poste: `Post numer ${i}-${j}`
                });
            }
        }

        console.log('testPostList', $scope.testPostList);

        $scope.populatePlan = function (listPoste) {
            listPoste.forEach((item) => {
                $(`#n3_${item.position}`).append(`
                     <div class="post">
                         <h2>${item.nom_poste}</h2>
                     </div>
                 `);
            });
        };

        $scope.listCols = [];
        $scope.listRows = [];

        for (var i = 0; i <= 19; i++) {
            $scope.listRows.push(i);
        }

        for (var i = 0; i <= 71; i++) {
            $scope.listCols.push(i);
        }

        setTimeout(function () {
            $scope.populatePlan($scope.testPostList);

        }, 1000);

        $scope.selectedGlpi = $cookies.get("selectedGlpi");


        $timeout(function () {
            var paths = document.querySelectorAll('path');

            // console.log(paths);

            paths.forEach((item) => {
                // console.log(item);
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    console.log(e.target.getAttribute('id'));
                    $scope.selectedGlpi = e.target.getAttribute('id');
                    $cookies.put("selectedGlpi", $scope.selectedGlpi);
                })
            });

        }, 2000);


        $scope.saveEmplacement = function (data) {
            tanaAdminFactory.addEmplacement(data).then(function (response) {
                console.log('result of save', response);
            }, function (errors) {
                console.error(errors);
            });
        }

        $scope.getPostes = function (data) {
            tanaAdminFactory.getPostes(data).then(function (response) {
                $scope.postes = response;
                $scope.populatePlanPostes($scope.postes);
                console.log('postes', response);
            }, function (errors) {
                console.error(errors);
            });
        }

        $scope.getPostes({});



        $scope.filtreposte = function (recherche) {

            //effacer
            var listPoste = $scope.postes;
            listPoste.forEach((item) => {
                if (!item.plan_id) {
                    return
                } else {
                    $(`#${item.plan_id}`).empty();
                }
            });

            $scope.apresfiltre = $filter('filter')($scope.postes, {possesseur: recherche});

            swit

            $scope.populatePlanPostes($scope.apresfiltre);
        };

        $scope.populatePlanPostes = function (listPoste) {


            //listPoste2 = listPoste;



            listPoste.forEach((item) => {
                if (!item.plan_id) {
                    return
                } else {

//                    item.plan_id = $filter('filter')(item.plan_id, $scope.filtercomputers);

                    $(`#${item.plan_id}`).append(`               
                <div class="card" id="drag1" draggable="true" ondragstart="drag(event)">
                    <div class="card-content">
                    
                        <div class="card-title green white-text">
                            <h1>${item.nom_poste}</h1>
                   
                            <h5>${item.location}</h5>
 
                        </div>                                              
                    </div>
                    <div class="card-action">   
                        <h2 class="text-center" id="possesseur"> ${item.possesseur} </h2>
                        <h3 class="text-center" id="ip"> ${item.ip_adress} </h3>
                        <div class="heart_img text-center"><button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-info"><i class="fa fa-info-circle" aria-hidden="true">Plus</i></button></div>
                    </div>
                </div>
                   
                   <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          <h4 class="modal-title" id="myModalLabel">UC numero : ${item.plan_id}</h4>
                        </div>
                        <div class="modal-body">
                          
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
                        </div>
                      </div>
                    </div>
                    </div>
                `);
                }
                ;
//                $scope.$watch('filtercomputers', function (val)
//                {
//                    $scope.items = $filter('filter')(item.plan_id, val);
//                });

            });
        };

        // .map((item) => {
        //     console.log(item);
        //         // item.addEventListener('click', function (e) {
        //         //     e.preventDefault();
        //         //     console.log(e);
        //         // })
        // });

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