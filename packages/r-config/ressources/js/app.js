//FACTORY
angular.module('raptorApp').factory('myPostgres', function ($http, $q) {

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

angular.module('raptorApp').factory('urlRaptor', function ($http, $q) {

    var factory = {
        banner: false,
        list: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/urllist.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        ajouter: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/urlajouter.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        enregistrer: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/urlenregistrer.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        supprimer: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/urlsupprimer.php',
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

angular.module('raptorApp').factory('fontawesome', function ($http, $q) {

    var factory = {
        banner: false,
        getListe: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/listfontawesome.php',
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


angular.module('raptorApp').factory('menuraptor', function ($http, $q) {

    var factory = {
        banner: false,
        getListe: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/listmenu.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        ajout: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/menuajout.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        supprimer: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/menusupprimer.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;

        },
        modifier: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/menumodif.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        haut: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/menuhaut.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;

        },
        bas: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/menubas.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        droite: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/menudroite.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        gauche: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/r-config/model/menugauche.php',
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
angular.module('raptorApp').controller('Ctrl1', ['$scope', '$rootScope', '$http', 'myPostgres', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', function ($scope, $rootScope, $http, myPostgres, $location, $sce, $cookies, $cookieStore, $window, $timeout) {


        $scope.yourName = "Ctrl1";
        $scope.testScript = false;
        // TEST BDD
        // USING MODEL WITH PARSE DATA
        $scope.name = "Name";
        $scope.employees = "Employees";
        $scope.headoffice = "Headoffice";

        var dataObj = {
            name: $scope.name,
            employees: $scope.employees,
            headoffice: $scope.headoffice
        };

        //Fonction utiliser par le module de chargement ou LOADING
        $scope.modalLoading = function (data) {
            if (data) {
                $('.modal-hide').css({
                    'display': 'block'
                });
            } else {
                $('.modal-hide').css({
                    'display': 'none'
                });
            }
        };

        //TEST BDD FACTORY
        myPostgres.getDefautl(dataObj).then(function (datas) {
            $scope.error = false;
            $scope.datas = datas.data;
        });

        /*EVENT*/
        $scope.actionShowModal = function ()
        {
            var myModal = $('#myModalDefault');
            myModal.modal('show');
        }

        //Exemple d'utilisation loading
        $scope.showLoading = function ()
        {
            $scope.modalLoading(true);
        }
        $scope.hideLoading = function ()
        {
            $scope.modalLoading(false);
        }
    }]);


angular.module('raptorApp').controller('CtrlRConfig', ['$scope', '$rootScope', '$http', 'myPostgres', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', 'fontawesome', 'menuraptor', 'myRaptorData', 'urlRaptor', function ($scope, $rootScope, $http, myPostgres, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast, fontawesome, menuraptor, myRaptorData, urlRaptor) {

        //Initialisation
        $scope.createmenu = {};
        $scope.createmenu.libelle = "";
        $scope.createmenu.niveau = "";
        $scope.createmenu.url = "";
        $scope.createmenu.variable_associe = "";
        $scope.createmenu.icon = "";


        $scope.afficherLesFontAwesome = function () {
            var dataObj = {};
            fontawesome.getListe(dataObj).then(function (datas) {
                var icons = datas.data.fontawesome;

                $scope.fontawesomeicons = [];
                for (var item in icons) {

                    $scope.fontawesomeicons.push(icons[item]);
                }
            });
        };

        //Afficher modal fontawesome
        $scope.voirIconFontAwesome = function ()
        {
            var modalFontAwesome = $('#myModalFontawesome');
            modalFontAwesome.modal('show');
        }

        $scope.menuEncours = {};
        $scope.voirIconFontAwesomeMenu = function (menu)
        {
            var modalFontAwesome = $('#myModalFontawesomemenu');
            modalFontAwesome.modal('show');
            $scope.menuEncours = menu;
        }

        $scope.prendreIcon = function (icon) {


            $scope.createmenu.icon = '<i class="fa ' + icon + '" aria-hidden="true"></i> ';
        }

        $scope.prendreIconMenu = function (icon) {
//            //console.log($scope.menuEncours);

            for (var item in $scope.listeDesMenus) {
                if ($scope.listeDesMenus[item] == $scope.menuEncours)
                {
//                    //console.log($scope.menuEncours); 
                    $scope.menuEncours.icon = '<i class="fa ' + icon + '" aria-hidden="true"></i> ';
                }
            }
        }

        $scope.afficherListeMenu = function () {
            var dataObj = {};
            menuraptor.getListe(dataObj).then(function (datas) {
                //console.log(datas);
                $scope.listeDesMenus = datas.data;
            });
        }
        /*Evenement*/
        $scope.ajouterMenu = function (createmenu)
        {
            var dataObj = createmenu;
            menuraptor.ajout(dataObj).then(function (datas) {
                ngToast.create({
                    className: datas.data.notification,
                    content: '<b>' + datas.data.message + '</b>'
                });

                $scope.afficherListeMenu();
            });

        }
        $scope.supprimerMenu = function (createmenu)
        {
            var dataObj = createmenu;
            menuraptor.supprimer(dataObj).then(function (datas) {
                ngToast.create({
                    className: datas.data.notification,
                    content: '<b>' + datas.data.message + '</b>'
                });

                $scope.afficherListeMenu();
            });

        }
        $scope.enregistrerMenu = function (modifmenu)
        {
            var dataObj = modifmenu;
            menuraptor.modifier(dataObj).then(function (datas) {
                //console.log(datas);
                ngToast.create({
                    className: datas.data.notification,
                    content: '<b>' + datas.data.message + '</b>'
                });

                $scope.afficherListeMenu();
            });
        }
        //Direction
        $scope.hautMenu = function (modifmenu)
        {
            var dataObj = modifmenu;
            menuraptor.haut(dataObj).then(function (datas) {
                //console.log(datas);
                ngToast.create({
                    className: datas.data.notification,
                    content: '<b>' + datas.data.message + '</b>'
                });

                $scope.afficherListeMenu();
            });
        }
        $scope.basMenu = function (modifmenu)
        {
            var dataObj = modifmenu;
            menuraptor.bas(dataObj).then(function (datas) {
                //console.log(datas);
                ngToast.create({
                    className: datas.data.notification,
                    content: '<b>' + datas.data.message + '</b>'
                });

                $scope.afficherListeMenu();
            });
        }
        $scope.droiteMenu = function (modifmenu)
        {
            var dataObj = modifmenu;
            menuraptor.droite(dataObj).then(function (datas) {
                //console.log(datas);
                ngToast.create({
                    className: datas.data.notification,
                    content: '<b>' + datas.data.message + '</b>'
                });

                $scope.afficherListeMenu();
            });
        }
        $scope.gaucheMenu = function (modifmenu)
        {
            var dataObj = modifmenu;
            menuraptor.gauche(dataObj).then(function (datas) {
                //console.log(datas);
                ngToast.create({
                    className: datas.data.notification,
                    content: '<b>' + datas.data.message + '</b>'
                });

                $scope.afficherListeMenu();
            });
        }

        //Prendre les données du projet
        $scope.prendreInfoDefaut = function () {
            $rootScope.modalLoading(true);  //Afficher
            var dataObj = {
                type : '0',
            };
            myRaptorData.liste(dataObj).then(function (datas) {
                $scope.raptorData = datas.data.datas;
                $rootScope.modalLoading(false); //Cacher
            });
        }
        //Enregistrer les données
        $scope.enregistrerData = function (data) {
//            console.log(data);
            var dataObj = {
                valeur: data.valeur,
                identifiant: data.identifiant,
            };
            myRaptorData.enregistrer(dataObj).then(function (datas) {
                $scope.raptorData = datas.data.datas;
                ngToast.create({
                    className: datas.data.notification,
                    content: '<b>' + datas.data.message + '</b>'
                });
                $scope.prendreInfoDefaut();

            });
        }

        /*Variable url par défaut selon les variables*/
        $scope.listeDesUrls = function ()
        {
            var dataObj = {};
            urlRaptor.list(dataObj).then(function (datas) {
//                console.log(datas);
                $scope.tab_var_url = datas.data;
            });
        }
        $scope.ajout_var_url = {};
        $scope.ajout_var_url.variable = "";
        $scope.ajout_var_url.url = "";

        $scope.ajouterDesUrls = function (ajout_data)
        {
            var dataObj = ajout_data;
            urlRaptor.ajouter(dataObj).then(function (datas) {
                $scope.tab_var_url = datas.data;
                //actualiser la liste
                $scope.listeDesUrls();
                //vider les champs
                $scope.ajout_var_url.variable = "";
                $scope.ajout_var_url.url = "";

                ngToast.create({
                    className: datas.data.notification,
                    content: '<b>' + datas.data.message + '</b>'
                });
            });
        }

        $scope.supprimerDesUrls = function (supprimer_data)
        {
            var dataObj = supprimer_data;
            urlRaptor.supprimer(dataObj).then(function (datas) {
                //actualiser la liste
                $scope.listeDesUrls();

                ngToast.create({
                    className: datas.data.notification,
                    content: '<b>' + datas.data.message + '</b>'
                });
            });
        }

        $scope.enregistrerDesUrls = function (supprimer_data)
        {
            var dataObj = supprimer_data;
            urlRaptor.enregistrer(dataObj).then(function (datas) {
                //actualiser la liste
                $scope.listeDesUrls();

                ngToast.create({
                    className: datas.data.notification,
                    content: '<b>' + datas.data.message + '</b>'
                });

            });
        }
        //Initialisation appele
        $scope.afficherLesFontAwesome();
        $scope.afficherListeMenu();
        $scope.prendreInfoDefaut();

        $scope.listeDesUrls();
    }]);

//Directive modale
app.directive('ngModalfontawesome', function () {
    return {
        restrict: 'A',
        templateUrl: 'packages/r-config/views/templateModalFontAwesome.html',
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

app.directive('ngModalfontawesomemenu', function () {
    return {
        restrict: 'A',
        templateUrl: 'packages/r-config/views/templateModalFontAwesomeMenu.html',
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

app.filter('strReplace', function () {
    return function (input, from, to) {
        input = input || '';
        from = from || '';
        to = to || '';
        return input.replace(new RegExp(from, 'g'), to);
    };
});
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