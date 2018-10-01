//Création de l'application globale
var app = angular.module("raptorApp", ["ngRoute", "ngCookies", "angular-autogrow", "ngToast", "autoCompleteModule", "datatables", "googlechart", "moment-picker"]);

//Controlleur pour les urls ne figurant pas dans ROUTER
angular.module('raptorApp').controller('CtrlOtherwise', ['$scope', '$rootScope', '$http', function ($scope, $http, $rootScope) {}]);

//ROUTER
app.config(function ($routeProvider, $locationProvider) {
    //check browser support
//    if (window.history && window.history.pushState) {
    //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

    // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

    // if you don't wish to set base URL then use this
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false 
    });
//    }
    $routeProvider
            .when("/login", {
                templateUrl: "packages/login/views/login.html",
                controller: 'CtrlLogin',
            })
            .when("/admst-accueil", {
                templateUrl: "packages/administrationAccueil/views/administrationAccueil.html",
                controller: 'CtrlAdminstAccueil',
            })
            .when("/admin-accueil", {
                templateUrl: "packages/adminaccueil/views/adminAccueil.html",
                controller: 'CtrlAdminAccueil',
            })
            .when("/tech-accueil", {
                templateUrl: "packages/techaccueil/views/techAccueil.html",
                controller: 'CtrlTechnAccueil',
            })
            .when("/sup-accueil", {
                templateUrl: "packages/supaccueil/views/supAccueil.html",
                controller: 'CtrlSupAccueil',
            })
            .when("/tn-n3", {
                templateUrl: "packages/adminTn_n3/views/tn_n3.html",
                controller: 'CtrlAdminTn_n3',
            })
            .when("/tn-n2", {
                templateUrl: "packages/adminTn_n2/views/tn_n2.html",
                controller: 'CtrlAdminTn_n2',
            })
            .when("/tn-n1", {
                templateUrl: "packages/adminTn_n1/views/tn_n1.html",
                controller: 'CtrlAdminTn_n1',
            })
            .when("/stat", {
                templateUrl: "packages/statistiques/views/statistique.html",
                controller: 'CtrlStat',
            })
            .when("/notif", {
                templateUrl: "packages/notification/views/notification.html",
                controller: 'CtrlNotif',
            })
            .when("/droit-group", {
                templateUrl: "packages/droit/views/droit.html",
                controller: 'CtrlDroit',
            })
            .when("/my-account", {
                templateUrl: "packages/myaccount/views/myaccount.html",
                controller: 'CtrlMyAccount',
            })

            .when("/deconnexion", {
                templateUrl: "packages/login/views/login.html",
                controller: 'CtrlDeconnection',
            })
            .when("/", {
                templateUrl: "packages/default/views/accueil.html",
                controller: 'CtrlDefault',
            })
            .when("/accueil", {
                templateUrl: "packages/default/views/accueil.html",
                controller: 'CtrlDefault',
            })
            .when("/verif/:id", {
                templateUrl: "packages/default/views/verif.html",
                controller: 'CtrlVerif',
            })
            .when("/tableau", {
                templateUrl: "packages/default/views/tableau.html",
                controller: 'CtrlTableau',
            })
            .when("/datatable", {
                templateUrl: "packages/default/views/datatable.html",
                controller: 'CtrlDatatable',
            })
            .when("/graphique", {
                templateUrl: "packages/default/views/graphique.html",
                controller: 'CtrlGraphique',
            })
            .when("/default", {
                templateUrl: "packages/default/views/default.html",
                controller: 'CtrlDefault',
            })
            .when("/utilisateur", {
                templateUrl: "packages/login/views/utilisateur.html",
                controller: 'CtrlUtilisateur',
            })
            .otherwise({
                templateUrl: "packages/default/views/error_404.html",
                controller: 'CtrlOtherwise',
            });












});

//ROUTER Administration RAPTOR à ne pas modifier
app.config(function ($routeProvider, $locationProvider) {
    //check browser support
//    if (window.history && window.history.pushState) {
    //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

    // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

    // if you don't wish to set base URL then use this
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
//    }
    $routeProvider
            .when("/r-config", {
                templateUrl: "packages/r-config/views/accueil.php",
                controller: 'CtrlRConfig',
            })
            .when("/r-generation", {
                templateUrl: "packages/r-generation/views/accueil.html",
                controller: 'CtrlRGeneration',
            })
            .when("/r-update", {
                templateUrl: "packages/r-update/views/accueil.html",
                controller: 'CtrlRUpdate',
            })
            ;

});

//Function appeler à chaque controlleur lors des actualisations pour afficher le menu
app.run(['$rootScope', '$http', '$cookies', '$cookieStore', '$location', function ($rootScope, $http, $cookies, $cookieStore, $location) {

        //$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;

        //TEST CONNEXION ELSE /LOGIN
        //SPECIAL LOGIN //
        $rootScope.login = $cookieStore.get('login');
        $rootScope.password = $cookieStore.get('password');

        $rootScope.rootInformation = {};
        $rootScope.rootInformation.nom = $cookieStore.get('nom');
        $rootScope.rootInformation.prenoms = $cookieStore.get('prenoms');
        $rootScope.rootInformation.matricule = $cookieStore.get('login');

        if ($rootScope.login == undefined && $rootScope.login == undefined) {
            $location.path('/login');
        } else {
            //For banner
            $rootScope.showBanner = true;

                    
            $rootScope.admindb = $cookieStore.get('consulter') == "t";
            if ($rootScope.admindb)
                $rootScope.showA = true;
            else
                $rootScope.showA = false;

            $rootScope.admindb = $cookieStore.get('ajouter') == "t";
            if ($rootScope.admindb)
                $rootScope.showB = true;
            else
                $rootScope.showB = false;

            $rootScope.admindb = $cookieStore.get('editer') == "t";
            if ($rootScope.admindb)
                $rootScope.showC = true;
            else
                $rootScope.showC = false;

            $rootScope.admindb = $cookieStore.get('supprimer') == "t";
            if ($rootScope.admindb)
                $rootScope.showD = true;
            else
                $rootScope.showD = false;

            $rootScope.admindb = $cookieStore.get('admin') == "t";
            if ($rootScope.admindb)
                $rootScope.showAdministrateur = true;
            else
                $rootScope.showAdministrateur = false;
            
            
            
            
            
            
            //end for banner
        }
        // FIN SPECIAL LOGIN //
    }]);

/*IMPORTANT */

//Nom du projet et titre de la page
angular.module('raptorApp').controller('Ctrltitle', ['$scope', '$rootScope', '$http', 'myRaptorData', '$parse', '$cookieStore', function ($scope, $http, $rootScope, myRaptorData, $parse, $cookieStore) {

        var vm = this;

        $scope.nom_projet = "";            //Libellé sur le menu du projet
        $scope.titre = "";     //Nom du projet assocé à l'onglet du navigateur

        //Debut trigger lors des états de changement d'url
        $scope.$on('$routeChangeStart', function ($event, next, current) {
            // ... you could trigger something here ...
            //console.log("start");
            $rootScope.isRouteLoading = false;
        });
        $scope.$on('$routeChangeSuccess', function ($event, next, current) {
            // ... you could trigger something here ...
            //console.log("success");
            $rootScope.isRouteLoading = true;
        });
        $scope.$on('$routeChangeError', function ($event, next, current) {
            // ... you could trigger something here ...
            //console.log("error");
            $rootScope.isRouteLoading = false;
        });
        //Fin trigger

        //Prendre les données du projet
        $scope.prendreInfoDefaut = function () {
            var dataObj = {};
            myRaptorData.liste(dataObj).then(function (datas) {
                var tab_data = datas.data.datas;
                for (var item in tab_data) {
                    var the_string = tab_data[item].identifiant;
                    // Get the model
                    var model = $parse(the_string);
                    // Assigns a value to it
                    model.assign($scope, tab_data[item].valeur);
                    $cookieStore.put(the_string, tab_data[item].valeur); //Mettre tous les paramètres de la base raptor dans cookie
                }
            });
        }

        //Initialisation
        $scope.prendreInfoDefaut();
    }]);

//Directive pour afficher le texte de chargement si il y a trop de donnée à afficher
app.directive('routeLoadingIndicator', function ($rootScope) {
    return {
        restrict: 'E', /*Attribut*/
        template: "<h1 ng-if='isRouteLoading'>Chargement...</h1>",
        link: function (scope, element, attrs) {
            scope.isRouteLoading = false;

            $rootScope.$on('$routeChangeStart', function () {
                scope.isRouteLoading = true;
            });

            $rootScope.$on('$routeChangeSuccess', function () {
                scope.isRouteLoading = false;
            });
        }
    }
});