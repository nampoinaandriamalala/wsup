
//FACTORY
angular.module('raptorApp').factory('myRaptorData', function ($http, $q) {

    var factory = {
        banner: false,
        liste: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/login/model/raptordata.php',
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
                url: 'packages/login/model/raptordatasave.php',
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
        }
    };
    return factory;
});

angular.module('raptorApp').factory('raConnexion', function ($http, $q) {

    var factory = {
        banner: false,
        getConnexion: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/login/model/login.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        setBanner: function (etat) {
            factory.banner = etat;
        },
        getBanner: function () {
            return factory.banner;
        }
    };
    return factory;
});

angular.module('raptorApp').factory('utilisateurDroit', function ($http, $q) {

    var factory = {
        getAllUser: function () {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/login/model/utilisateurlistes.php',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        AddUser: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/login/model/utilisateurajouter.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        saveModifUser: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/login/model/utilisateurenregistrer.php',
                data: $.param(dataObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                    then(function (datas) {
                        deferred.resolve(datas);
                    });
            return deferred.promise;
        },
        deleteUser: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/login/model/utilisateursupprimer.php',
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

angular.module('raptorApp').factory('operateur', function ($http, $q) {

    var factory = {
        banner: false,
        information: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/login/model/operateur.php',
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

angular.module('raptorApp')
        .controller('CtrlUtilisateur', ['$scope', '$rootScope', '$http', 'raConnexion', '$location', '$cookies', '$cookieStore', '$window', '$sce', 'utilisateurDroit', 'ngToast', 'operateur', function ($scope, $rootScope, $http, raConnexion, $location, $cookies, $cookieStore, $window, $sce, utilisateurDroit, ngToast, operateur) {
              
              // Choix 1 pour type utilisateurs
      
//      $scope.selectiontypeuseradm=function(){
//          $scope.varUser.ajouter.cheked=false;
//          $scope.varUser.consulter.cheked=false;
//      };
//      $scope.selectiontypeusertech=function(){
//          $scope.varUser.admin.cheked=false;
//          $scope.varUser.consulter.cheked=false;
//      };
//      $scope.selectiontypeusersup=function(){
//          $scope.varUser.ajouter.cheked=false;
//          $scope.varUser.admin.cheked=false;
//      };
                        
                        // Initialisation
                $scope.login = $cookieStore.get('login');
                $scope.password = $cookieStore.get('password');
                if ($scope.login == undefined && $scope.login == undefined) {
                    $location.path('/login');


                } else {
                    //For banner
                    $rootScope.hideYourBannerRoot(true);
                    $scope.admindb = $cookieStore.get('admin') == "t";
                    if ($scope.admindb)
                        $rootScope.imAdmin(true);
                    else
                        $rootScope.imAdmin(false);
                    //end for banner

                    $scope.ajouterUser = $cookieStore.get('ajouter') == "t";
                    $scope.consulterUser = $cookieStore.get('consulter') == "t";
                    $scope.editerUser = $cookieStore.get('editer') == "t";
                    $scope.supprimerUser = $cookieStore.get('supprimer') == "t";

                    $scope.superUser = $scope.admindb;
                    $scope.num_matricule = $cookieStore.get('login');


                }

                if ($scope.superUser == false)
                {
                    $location.path('/deconnexion');
                }
                $scope.varUser = {}
                $scope.varUser.matricule = "";
                $scope.varUser.nom = "";
                $scope.varUser.prenoms = "";
                $scope.varUser.adresseemail = "";
                $scope.varUser.consulter = false;
                $scope.varUser.ajouter = false;
                $scope.varUser.editer = false;
                $scope.varUser.supprimer = false;
                $scope.varUser.admin = false;

                //List utilisateur   
                listUtilisateur();


                $scope.ajouterUtilisateur = function (data)
                {
                    var matricule = data.matricule;
                    var consulter = data.consulter;
                    var ajouter = data.ajouter;
                    var editer = data.editer;
                    var supprimer = data.supprimer;
                    var admin = data.admin;
                    var adresseemail = data.adresseemail;

                    var dataObj = {
                        matricule: matricule,
                        consulter: consulter,
                        ajouter: ajouter,
                        editer: editer,
                        supprimer: supprimer,
                        admin: admin,
                        adresseemail: adresseemail
                    };
                    console.log(dataObj);
                    utilisateurDroit.AddUser(dataObj).then(function (datas) {
                        //List utilisateur     
                        listUtilisateur();

                        ngToast.create({
                            className: datas.data.notification,
                            content: datas.data.message
                        });

                        $scope.varUser.matricule = "";
                        $scope.varUser.adresseemail = "";
                        $scope.varUser.consulter = false;
                        $scope.varUser.ajouter = false;
                        $scope.varUser.editer = false;
                        $scope.varUser.supprimer = false;
                        $scope.varUser.admin = false;
                    });

                };

                $scope.saveModif = function (id, index, consulter, ajouter, editer, supprimer, admin, adresseemail) {
                    var dataObj = {
                        id: id,
                        consulter: consulter,
                        ajouter: ajouter,
                        editer: editer,
                        supprimer: supprimer,
                        admin: admin,
                        adresseemail: adresseemail,
                    };
                    utilisateurDroit.saveModifUser(dataObj).then(function (datas) {
                        ngToast.create({
                            className: datas.data.notification,
                            content: datas.data.message
                        });
                    });
                };
                $scope.supprimerUser = function (id, index) {
                    var dataObj = {
                        id: id
                    };
                    utilisateurDroit.deleteUser(dataObj).then(function (datas) {
                        //List utilisateur     
                        listUtilisateur();

                        ngToast.create({
                            className: datas.data.notification,
                            content: datas.data.message
                        });

                    });
                };

                $scope.voirInformationsOperateur = function (matricule)
                {
                    var dataObj = {
                        matricule: matricule
                    }
                    operateur.information(dataObj).then(function (datas) {
                        console.log(datas);

                        $scope.varUser.nom = datas.data.datas[0].nom;
                        $scope.varUser.prenoms = datas.data.datas[0].prenoms;

                    });
                }

                //Function
                function listUtilisateur() {
                    $rootScope.modalLoading(true);  //Afficher
                    utilisateurDroit.getAllUser().then(function (datas) {

                        var utilisateurs = datas.data;
                        var valstrikeFacture = [];

                        var consulter = [];
                        var ajouter = [];
                        var editer = [];
                        var supprimer = [];
                        var admin = [];
                        var adresseemail = [];

                        for (var item in utilisateurs) {
                            valstrikeFacture.push("");

                            if (utilisateurs[item].consulter == "t") {
                                consulter.push(true);
                            } else {
                                consulter.push(false);
                            }
                            if (utilisateurs[item].ajouter == "t") {
                                ajouter.push(true);
                            } else {
                                ajouter.push(false);
                            }
                            if (utilisateurs[item].editer == "t") {
                                editer.push(true);
                            } else {
                                editer.push(false);
                            }
                            if (utilisateurs[item].supprimer == "t") {
                                supprimer.push(true);
                            } else {
                                supprimer.push(false);
                            }
                            if (utilisateurs[item].administrateur == "t") {
                                admin.push(true);
                            } else {
                                admin.push(false);
                            }
                            adresseemail.push(utilisateurs[item].email);
                            //////console.log(utilisateurs[item]);
                        }

                        $scope.valstrikeFacture = valstrikeFacture;

                        $scope.consulter = consulter;
                        $scope.ajouter = ajouter;
                        $scope.editer = editer;
                        $scope.supprimer = supprimer;
                        $scope.admin = admin;
                        $scope.adresseemail = adresseemail;
                        console.log($scope.adresseemail);
                        $scope.listAllUtilisateur = utilisateurs;
                        //////console.log(utilisateurs);
                        $rootScope.modalLoading(false); //Cacher
                    });
                }
            }]);

//Controller par defaut
//CONTROLLER
angular.module("raptorApp")
        .controller('CtrlLogin', ['$scope', '$rootScope', '$http', 'raConnexion', '$location', '$cookies', '$cookieStore', '$window', 'urlRaptor', '$parse', function ($scope, $rootScope, $http, raConnexion, $location, $cookies, $cookieStore, $window, urlRaptor, $parse) {
                /*TEST USER*/
                //Si enregistrer continuer                        
                //Sinon page login

                $scope.login = {};
                $scope.login.matricule = "";
                $scope.login.password = "";
                if ($cookieStore.get('login') == undefined && $cookieStore.get('password') == undefined)
                {
                    try {
                        $cookieStore.put('login', undefined);
                        $cookieStore.put('password', undefined);
                        $cookieStore.put('nom', undefined);
                        $cookieStore.put('prenoms', undefined);
                        $cookieStore.put('admin', undefined);
                        $cookieStore.put('consulter', undefined);
                        $cookieStore.put('ajouter', undefined);
                        $cookieStore.put('editer', undefined);
                        $cookieStore.put('supprimer', undefined);
                    } catch (e) {
                    }
                    $rootScope.hideYourBannerRoot(false);
                    $location.path('/login');
                } else {
                    if ($location.path() == '/login')
                    {
                        $rootScope.hideYourBannerRoot(true);
                        raConnexion.setBanner(true);
//                        $location.path('/'); //pour activer menu php
                        var dataObj = {};
                        urlRaptor.list(dataObj).then(function (datas) {
//                            console.log(datas);
//                            console.log($rootScope.showAdministrateur);
//                            var model = $parse('showAdministrateur');
//                            console.log($rootScope['showAdministrateur']);


//                            if($rootScope.showAdministrateur == true)
//                            {
//                                $location.path('./r-config'); //pour activer menu php  
//                            } else {
//                                $location.path('./'); //pour activer menu php  
//                            } 
                            $location.path('/');

                            /*Prendre configuration par défaut*/
                            var config_default = {};
                            for (var item in datas.data) {
                                if (datas.data[item].variable == "")
                                {
                                    config_default = datas.data[item];
                                }
                            }
                            /*Si il n'y a pas de configuration par rapport à l'utilisateur*/
                            if (config_default.variable != undefined)
                            {
                                $location.path(config_default.url); //ouvrir la page pour variable vide
                            } else {
                                $location.path('/');                //si il n'y a vraiment pas de donnée alors il ouvrir la configuraiton d'avant
                            }


                            /*Ouvrir la page selon privilège de l'utilisateur*/
                            for (var item in datas.data) {
//                                console.log(datas.data[item]);
                                var test = $rootScope[datas.data[item].variable];
                                if (test == true)
                                {

                                    $location.path(datas.data[item].url); //pour activer menu php  
                                    break;
                                    return;
                                }
                            }



                        });



                    }

                    if ($location.path() == '/deconnexion')
                    {
                        $rootScope.hideYourBannerRoot(true);
                        try {
                            $cookieStore.put('login', undefined);
                            $cookieStore.put('password', undefined);
                            $cookieStore.put('nom', undefined);
                            $cookieStore.put('prenoms', undefined);
                            $cookieStore.put('admin', undefined);
                            $cookieStore.put('consulter', undefined);
                            $cookieStore.put('ajouter', undefined);
                            $cookieStore.put('editer', undefined);
                            $cookieStore.put('supprimer', undefined);
                        } catch (e) {
                        }
                        $http.defaults.headers.post['login'] = undefined;
                        $http.defaults.headers.post['password'] = undefined;
                        $location.path('/login');
                    }
                }
                /*Fin test user*/

                //Initialisation
                $scope.showError = false;
                // TEST BDD
                // USING MODEL WITH PARSE DATA
                $scope.name = "Name";
                $scope.employees = "Employees";
                $scope.headoffice = "Headoffice";
                /*EVENT*/

                //Login
                $scope.actionLogin = function (data)
                {

                    $scope.showError = false; //Cacher message d'erreur
                    var dataObj = {
                        login: data.matricule,
                        password: data.password
                    };
                    //Initialisation après validation login
                    raConnexion.getConnexion(dataObj)
                            .then(function (data) {
//                                ////console.log(output);
                                var output = data.data;
                                if (output.verification == true) //Si oui ouvrir page de travail
                                {
                                    //Coockies
                                    $http.defaults.headers.post['login'] = output.matricule;
                                    $http.defaults.headers.post['password'] = output.password;

                                    /* Cookies */
                                    $cookies.userName = 'Sandeep';

                                    $cookieStore.put('login', output.matricule);
                                    $cookieStore.put('password', output.password);
                                    $cookieStore.put('nom', output.nom);
                                    $cookieStore.put('prenoms', output.prenoms);
                                    $cookieStore.put('admin', output.administrateur);
                                    $cookieStore.put('consulter', output.consulter);
                                    $cookieStore.put('ajouter', output.ajouter);
                                    $cookieStore.put('editer', output.editer);
                                    $cookieStore.put('supprimer', output.supprimer);


                                    $rootScope.hideYourBannerRoot(true);

                                    //Redirection                            
                                    location.reload();

                                } else {                        //Sinon afficher message d'erreur
                                    $scope.showError = true;
                                }

                            });

                };

                $scope.typePassword = "password";
                $scope.montrerCacherPass = function ()
                {
                    if ($scope.typePassword == "password")
                        $scope.typePassword = "text";
                    else
                        $scope.typePassword = "password";
                }
            }]);

angular.module("raptorApp")
        .controller('CtrlDeconnection', ['$scope', '$rootScope', '$http', 'raConnexion', '$location', '$cookies', '$cookieStore', '$window', function ($scope, $rootScope, $http, raConnexion, $location, $cookies, $cookieStore, $window) {
                /*TEST USER*/
                //Si enregistrer continuer                        
                //Sinon page login

                $rootScope.hideYourBannerRoot(true);
                try {
                    $cookieStore.put('login', undefined);
                    $cookieStore.put('password', undefined);
                    $cookieStore.put('nom', undefined);
                    $cookieStore.put('prenoms', undefined);
                    $cookieStore.put('admin', undefined);
                    $cookieStore.put('consulter', undefined);
                    $cookieStore.put('ajouter', undefined);
                    $cookieStore.put('editer', undefined);
                    $cookieStore.put('supprimer', undefined);
                } catch (e) {
                }
                $http.defaults.headers.post['login'] = undefined;
                $http.defaults.headers.post['password'] = undefined;
                $location.path('/login');


            }]);
//CONTROLLER
angular.module("raptorApp")
        .controller('CtrlMenu', ['$scope', '$rootScope', '$http', 'raConnexion', '$location', '$cookies', '$cookieStore', '$window', '$timeout', function ($scope, $rootScope, $http, raConnexion, $location, $cookies, $cookieStore, $window, $timeout) {


                $rootScope.hideYourBannerRoot = function (bool) {
                    if (bool) {
                        $scope.showBanner = true;
                    } else {
                        $scope.showBanner = false;
                    }
                }

                $rootScope.imAdmin = function (bool) {
                    if (bool) {
                        $scope.showAdministrateur = true;
                    } else {
                        $scope.showAdministrateur = false;
                    }
                }
                //Fonction utiliser par le module de chargement ou LOADING
                $rootScope.modalLoading = function (data) {
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
                $rootScope.myMatricul = function () {
                    $scope.login = $cookieStore.get('login');
                    $scope.nom = $cookieStore.get('nom');
                    $scope.prenoms = $cookieStore.get('prenoms');
                }
                $rootScope.myMatricul();
                //Il faut ajouter selon le nombre de menu
                $scope.menu = [];
                $scope.collapse = [];
                var menu_position = $cookieStore.get('menu_active');
                if (menu_position == undefined) {
                    $cookieStore.put('menu_active', 0);
                    menu_position = 0;
                }
                for (var i = 0; i < 100; i++)
                {
                    if (i == menu_position) {
                        $scope.menu[i] = "active";
                        $scope.collapse[i] = "display-none";
                    } else {
                        $scope.menu[i] = "";
                        $scope.collapse[i] = "display-none";
                    }

                }

                //Notification 3s
                $rootScope.showThisNotification = function (message, styleNotificaiton)
                {
                    $rootScope.messageNotificationDirective = message;
                    $rootScope.shownotification = true;
                    $rootScope.styleNotificaiton = "";
                    switch (styleNotificaiton) {
                        case "success":
                            $rootScope.styleNotificaiton = "notification-success";
                            break;
                        case "warning":
                            $rootScope.styleNotificaiton = "notification-warning";
                            break;
                        case "danger":
                            $rootScope.styleNotificaiton = "notification-danger";
                            break;
                        case "primary":
                            $rootScope.styleNotificaiton = "notification-primary";
                            break;
                        case "default":
                            $rootScope.styleNotificaiton = "notification-default";
                            break;
                        default:
                            $rootScope.styleNotificaiton = "notification-default";
                            break;
                    }
                    $timeout(function () {
                        $rootScope.shownotification = false;
                    }, 3000);
                }
                //Activer menu class
                $rootScope.activeMenu = function ($event, id) {

                    var target = $event.currentTarget;
                    for (var i = 0; i < $scope.menu.length; i++)
                    {
                        if (id == i) {
                            $scope.menu[i] = "active";
                            if ($scope.collapse[i] == "display-none")
                                $scope.collapse[i] = "display-block";
                            else
                                $scope.collapse[i] = "display-none";
                            $cookieStore.put('menu_active', i);
                        } else {
                            $scope.menu[i] = "";
                        }
                    }

                    //ouvrir menu
                    var lien = null;
                    var url_lien = null;
                    try {
                        lien = target.getElementsByTagName('a')[0];
                        url_lien = lien.getAttribute('href');
                        $location.path(url_lien.replace('#', ''));
                    } catch (e) {

                    }


                }
                //Activer menu class
                $rootScope.curseurMenu = function (id) {

                    for (var i = 0; i < $scope.menu.length; i++)
                    {
                        if (id == i) {
                            $scope.menu[i] = "active";
//                            $scope.collapse[i] = "collapse";
                            $cookieStore.put('menu_active', i);
                        } else {
                            $scope.menu[i] = "";
//                            $scope.collapse[i] = "collapse";
                        }
                    }
                }

                $rootScope.menuSlide = "menuouvrir";
                $rootScope.iconSlide = false;
                $rootScope.etatmenu = 0;
                $rootScope.affichermenu = function () {
                    if ($rootScope.menuSlide == "menuouvrir") {
                        $rootScope.menuSlide = "menufermer";
                        $rootScope.iconSlide = true;
                    } else {
                        $rootScope.menuSlide = "menuouvrir";
                        $rootScope.iconSlide = false;
                    }
                }

                $rootScope.version = "1.2.8";

            }]);