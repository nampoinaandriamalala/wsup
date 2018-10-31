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

angular.module('raptorApp').factory('myPostgresORM', function ($http, $q) {

    var factory = {
        banner: false,
        getDefautl: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'packages/default/model/defaultorm.php',
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


/*Envoie email*/
angular.module('raptorApp').factory('notificationEmail', function ($http, $q, $cookieStore) {

    var factory = {
        banner: false,
        envoyer: function (dataObj) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: $cookieStore.get('notification') + '?sujet=' + dataObj.objet + '&email=' + dataObj.a + '&cc=' + dataObj.cc + '&body=' + dataObj.message,
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
angular.module('raptorApp').controller('CtrlDefault', ['$scope', '$rootScope', '$http', 'myPostgres', 'myPostgresORM', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', '$interval', 'ngToast', 'notificationEmail', function ($scope, $rootScope, $http, myPostgres, myPostgresORM, $location, $sce, $cookies, $cookieStore, $window, $timeout, $interval, ngToast, notificationEmail) {

        $scope.yourName = "CtrlDefault";
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

        //Montrer notification
        $scope.actionShowNotification = function ()
        {
            $rootScope.showThisNotification("Bienvenu sur Raptor.", 'default');
        }

        $scope.actionShowToast = function ()
        {
            //ngToast.create('a toast message...');
            ngToast.create({
                className: 'danger',
                content: '<b>Erreur toast</b>'
            });

        }

        //Ouvrir page default
        $scope.actionOuvrirPageDefault = function ()
        {
            $location.path('/verif/0'); //Ouvrir le contenu menu
            $rootScope.curseurMenu(1);   //Position curseur
        }

        //TEST BDD FACTORY
        myPostgres.getDefautl(dataObj).then(function (datas) {
            $scope.error = false;
            $scope.datas = datas.data.datas;
        });

        myPostgresORM.getDefautl(dataObj).then(function (datas) {
            console.log(datas);
        });

        /*EVENT*/
        $scope.actionShowModal = function ()
        {
            var myModal = $('#myModalDefault');
            myModal.modal('show');
        }
        $scope.actionShowLoad = function ()
        {
            $rootScope.modalLoading(true);
        }
        $scope.actionShowHide = function ()
        {
            $rootScope.modalLoading(false);
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

        /*myfilter*/
        $scope.datas_myfilter = [
            {
                "index": 0,
                "guid": "8a25947e-a23f-4a5d-86a7-6ec15538b9ee",
                "isActive": false,
                "balance": "$2,713.71",
                "picture": "http://placehold.it/32x32",
                "age": 21,
                "eyeColor": "brown",
                "name": "Burch Bean",
                "gender": "male",
                "company": "TRANSLINK",
                "email": "burchbean@translink.com",
                "phone": "+1 (945) 484-2585",
                "address": "886 Alton Place, Elizaville, Alaska, 3963",
                "about": "Tempor anim consequat tempor anim officia ullamco voluptate deserunt ipsum duis. Ea do qui incididunt ipsum minim reprehenderit ea occaecat. Lorem nulla qui voluptate nostrud incididunt veniam deserunt laborum fugiat tempor et sit adipisicing magna. Ex pariatur nulla amet quis reprehenderit laboris duis officia ut ipsum commodo proident cillum. Dolor labore Lorem amet tempor cupidatat anim est. Enim aute do esse mollit enim id ex. Esse ipsum pariatur cillum exercitation in in fugiat eiusmod incididunt magna sunt laborum ex.\r\n"
            },
            {
                "index": 1,
                "guid": "91d623c5-3e23-4797-9a91-60cfd95fa149",
                "isActive": false,
                "balance": "$2,834.44",
                "picture": "http://placehold.it/32x32",
                "age": 33,
                "eyeColor": "green",
                "name": "Linda Hurley",
                "gender": "female",
                "company": "INQUALA",
                "email": "lindahurley@inquala.com",
                "phone": "+1 (897) 484-3735",
                "address": "418 Broome Street, Bend, North Carolina, 3362",
                "about": "Id labore et do ad tempor et. Incididunt in cupidatat ut eiusmod et Lorem Lorem et amet ea consectetur nulla amet non. Occaecat anim anim ipsum elit. Aliquip deserunt reprehenderit tempor nulla sit amet incididunt cillum do culpa proident. Non quis sunt tempor consectetur labore eiusmod sit in culpa ea. Veniam magna ex exercitation elit ea velit dolore ut voluptate velit officia enim ea anim.\r\n"
            },
            {
                "index": 2,
                "guid": "15638fae-3929-45c4-98b0-104b444fb9b6",
                "isActive": false,
                "balance": "$2,175.90",
                "picture": "http://placehold.it/32x32",
                "age": 29,
                "eyeColor": "green",
                "name": "Blair Michael",
                "gender": "male",
                "company": "INTERFIND",
                "email": "blairmichael@interfind.com",
                "phone": "+1 (984) 575-2576",
                "address": "140 Hall Street, Conestoga, Mississippi, 9005",
                "about": "Dolore occaecat magna cillum sint id. Labore non deserunt tempor labore aute. Qui reprehenderit adipisicing dolor eu amet fugiat anim ipsum. Cupidatat laboris minim deserunt ad consectetur. Laborum do cupidatat officia sunt cillum proident aliqua exercitation sit proident voluptate nulla veniam in. Exercitation voluptate labore ex sint labore.\r\n"
            },
            {
                "index": 3,
                "guid": "41f41fe9-33c0-43e9-9357-5b81455c1686",
                "isActive": false,
                "balance": "$3,091.57",
                "picture": "http://placehold.it/32x32",
                "age": 30,
                "eyeColor": "green",
                "name": "Allen Trujillo",
                "gender": "male",
                "company": "DIGIPRINT",
                "email": "allentrujillo@digiprint.com",
                "phone": "+1 (962) 437-3581",
                "address": "577 Arlington Avenue, Dawn, California, 3476",
                "about": "Ex quis eu excepteur ex do duis. Culpa ea ex cupidatat Lorem anim aliquip qui tempor ad magna aliquip exercitation. Ut eu fugiat non eiusmod aliqua aute officia consectetur.\r\n"
            },
            {
                "index": 4,
                "guid": "4f199f14-9e70-41a6-aad6-1ecf319b7246",
                "isActive": false,
                "balance": "$1,090.30",
                "picture": "http://placehold.it/32x32",
                "age": 29,
                "eyeColor": "green",
                "name": "Eula Chan",
                "gender": "female",
                "company": "PRINTSPAN",
                "email": "eulachan@printspan.com",
                "phone": "+1 (882) 472-3993",
                "address": "835 Fenimore Street, Bourg, Delaware, 7745",
                "about": "Ea aliquip nisi magna cupidatat culpa labore laborum nulla sunt duis est cillum fugiat dolore. Duis incididunt nostrud tempor adipisicing reprehenderit incididunt sint dolor occaecat tempor tempor mollit. Labore irure quis magna esse dolor ea veniam enim esse. Occaecat consequat qui veniam commodo. Et ut exercitation ipsum mollit enim Lorem pariatur nostrud in esse ea elit.\r\n"
            },
            {
                "index": 5,
                "guid": "589c5537-6429-4ac4-9abc-f01dfbe7d0b7",
                "isActive": false,
                "balance": "$2,508.69",
                "picture": "http://placehold.it/32x32",
                "age": 36,
                "eyeColor": "blue",
                "name": "Phoebe Pennington",
                "gender": "female",
                "company": "GEEKY",
                "email": "phoebepennington@geeky.com",
                "phone": "+1 (932) 599-3919",
                "address": "835 Eckford Street, Sultana, Louisiana, 5161",
                "about": "Laborum id adipisicing aliqua ullamco. Esse esse commodo sint elit exercitation sunt enim. Eiusmod incididunt ea minim pariatur ad consectetur elit ex nisi nostrud proident ullamco labore.\r\n"
            }


            //Date par défaut pour datepicker

        ];

        // Auto complete
        //debut
        $scope.projectNames = [];   //tableau

        //Initialisation des variables
        $scope.email = {};
        $scope.email.a = "";
        $scope.email.cc = "";
        $scope.email.objet = "";
        $scope.email.message = "";
        /*Envoi email*/
        $scope.envoyerEmailNotification = function (data_email)
        {
            //data_email représente les données issues du view
            $rootScope.modalLoading(true);  //Afficher loading
            var dataObj = {
                a: data_email.a,
                cc: data_email.cc,
                objet: data_email.objet,
                message: data_email.message,
            }
            notificationEmail.envoyer(dataObj).then(function (datas) {
                $rootScope.modalLoading(false); //Fermer loading
            });
        }

        //Chiffre en lettre
        $scope.cl = {};
        $scope.cl.chiffre = 0;
        $scope.cl.lettre = "";
        $scope.chiffreEnLettre = function (nombre)
        {
            var lettre = NumberToLetter(nombre.chiffre);
            $scope.cl.lettre = lettre;
        }




        $scope.Names = [{"name": "Marisol Hull"}, {"name": "Henry Prince"}, {"name": "Steele Gilbert"}, {"name": "Miriam Cunningham"}, {"name": "Alfreda Molina"}, {"name": "Hinton Campbell"}, {"name": "Angie Luna"}, {"name": "Dudley Brock"}, {"name": "Whitney Brewer"}, {"name": "Eve Macias"}, {"name": "Blevins Meyers"}, {"name": "Curry Brown"}, {"name": "Elvia Gay"}, {"name": "Kerry Peck"}, {"name": "Carlene Kim"}, {"name": "Deana Alexander"}, {"name": "Dickerson Bowen"}, {"name": "Jeannie Shaffer"}, {"name": "Sanchez Schneider"}, {"name": "Webb Pugh"}];

        for (var item in $scope.Names) {
            $scope.projectNames.push($scope.Names[item].name);

        }

        $scope.autoCompAllProjects = {
            minimumChars: 1,
            dropdownHeight: "100px",
            data: function (term) {
                return _.filter($scope.projectNames, function (val) {
                    return val == term || val.includes(term);
                });
            },
            itemSelected: function (item) {}
        };
        //fin
        function dateAujourdhui()
        {
            var datenow = new Date();
            var jour = datenow.getDate();
            var mois = datenow.getMonth() + 1;

            if (mois < 10) {
                mois = "0" + mois;
            } else {
                mois = mois;
            }

            if (jour < 10) {
                jour = "0" + jour;
            } else {
                jour = jour;
            }
            var dateJourMoisAnnee = "";
            dateJourMoisAnnee = jour + "/" + mois + "/" + datenow.getFullYear();
            return dateJourMoisAnnee;
        }

        function heureAujourdhui()
        {
            var datenow = new Date();
            var heure = datenow.getHours();
            var minute = datenow.getMinutes();
            var seconde = datenow.getSeconds();

            if (heure < 10) {
                heure = "0" + heure;
            } else {
                heure = heure;
            }

            if (minute < 10) {
                minute = "0" + minute;
            } else {
                minute = minute;
            }

            if (seconde < 10) {
                seconde = "0" + seconde;
            } else {
                seconde = seconde;
            }
            var heure_du_jour = "";
            heure_du_jour = heure + ":" + minute + ":" + seconde;
            return heure_du_jour;
        }


        $scope.modelDate = dateAujourdhui();

        $timeout($scope.onTimeout, 1000);

        var dateEtHeure = dateAujourdhui() + ' ' + heureAujourdhui();
        $scope.dateheure = dateEtHeure;

        $interval(
                function () {
                    var dateEtHeure = dateAujourdhui() + ' ' + heureAujourdhui();
                    $scope.dateheure = dateEtHeure;
                }
        , 1000, 0);


    }]);

angular.module('raptorApp').controller('CtrlVerif', ['$scope', '$rootScope', '$routeParams', '$http', 'myPostgres', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $rootScope, $routeParams, $http, myPostgres, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {


        $scope.myID = $routeParams.id;

    }]);

angular.module('raptorApp').controller('CtrlTableau', ['$scope', '$rootScope', '$http', 'myPostgres', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', '$filter', function ($scope, $rootScope, $http, myPostgres, $location, $sce, $cookies, $cookieStore, $window, $timeout, $filter) {

        // init
        $scope.sort = {
            sortingOrder: 'id',
            reverse: false
        };

        $scope.gap = 5;

        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 10;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.items = [
            {"id": 1, "name": "name 1", "description": "description 1", "field3": "field3 1", "field4": "field4 1", "field5 ": "field5 1"},
            {"id": 2, "name": "name 2", "description": "description 1", "field3": "field3 2", "field4": "field4 2", "field5 ": "field5 2"},
            {"id": 3, "name": "name 3", "description": "description 1", "field3": "field3 3", "field4": "field4 3", "field5 ": "field5 3"},
            {"id": 4, "name": "name 4", "description": "description 1", "field3": "field3 4", "field4": "field4 4", "field5 ": "field5 4"},
            {"id": 5, "name": "name 5", "description": "description 1", "field3": "field3 5", "field4": "field4 5", "field5 ": "field5 5"},
            {"id": 6, "name": "name 6", "description": "description 1", "field3": "field3 6", "field4": "field4 6", "field5 ": "field5 6"},
            {"id": 7, "name": "name 7", "description": "description 1", "field3": "field3 7", "field4": "field4 7", "field5 ": "field5 7"},
            {"id": 8, "name": "name 8", "description": "description 1", "field3": "field3 8", "field4": "field4 8", "field5 ": "field5 8"},
            {"id": 9, "name": "name 9", "description": "description 1", "field3": "field3 9", "field4": "field4 9", "field5 ": "field5 9"},
            {"id": 10, "name": "name 10", "description": "description 1", "field3": "field3 10", "field4": "field4 10", "field5 ": "field5 10"},
            {"id": 11, "name": "name 11", "description": "description 1", "field3": "field3 11", "field4": "field4 11", "field5 ": "field5 11"},
            {"id": 12, "name": "name 12", "description": "description 1", "field3": "field3 12", "field4": "field4 12", "field5 ": "field5 12"},
            {"id": 13, "name": "name 13", "description": "description 1", "field3": "field3 13", "field4": "field4 13", "field5 ": "field5 13"},
            {"id": 14, "name": "name 14", "description": "description 1", "field3": "field3 14", "field4": "field4 14", "field5 ": "field5 14"},
            {"id": 15, "name": "name 15", "description": "description 1", "field3": "field3 15", "field4": "field4 15", "field5 ": "field5 15"},
            {"id": 16, "name": "name 16", "description": "description 1", "field3": "field3 16", "field4": "field4 16", "field5 ": "field5 16"},
            {"id": 17, "name": "name 17", "description": "description 1", "field3": "field3 17", "field4": "field4 17", "field5 ": "field5 17"},
            {"id": 18, "name": "name 18", "description": "description 1", "field3": "field3 18", "field4": "field4 18", "field5 ": "field5 18"},
            {"id": 19, "name": "name 19", "description": "description 1", "field3": "field3 19", "field4": "field4 19", "field5 ": "field5 19"},
            {"id": 20, "name": "name 5", "description": "description 1", "field3": "field3 5", "field4": "field4 5", "field5 ": "field5 5"},
            {"id": 21, "name": "name 6", "description": "description 1", "field3": "field3 6", "field4": "field4 6", "field5 ": "field5 6"},
            {"id": 22, "name": "name 7", "description": "description 1", "field3": "field3 7", "field4": "field4 7", "field5 ": "field5 7"},
            {"id": 23, "name": "name 8", "description": "description 1", "field3": "field3 8", "field4": "field4 8", "field5 ": "field5 8"},
            {"id": 24, "name": "name 9", "description": "description 1", "field3": "field3 9", "field4": "field4 9", "field5 ": "field5 9"},
            {"id": 25, "name": "name 10", "description": "description 1", "field3": "field3 10", "field4": "field4 10", "field5 ": "field5 10"},
            {"id": 26, "name": "name 11", "description": "description 1", "field3": "field3 11", "field4": "field4 11", "field5 ": "field5 11"},
            {"id": 27, "name": "name 12", "description": "description 1", "field3": "field3 12", "field4": "field4 12", "field5 ": "field5 12"},
            {"id": 28, "name": "name 13", "description": "description 1", "field3": "field3 13", "field4": "field4 13", "field5 ": "field5 13"},
            {"id": 29, "name": "name 14", "description": "description 1", "field3": "field3 14", "field4": "field4 14", "field5 ": "field5 14"},
            {"id": 30, "name": "name 15", "description": "description 1", "field3": "field3 15", "field4": "field4 15", "field5 ": "field5 15"},
            {"id": 31, "name": "name 16", "description": "description 1", "field3": "field3 16", "field4": "field4 16", "field5 ": "field5 16"},
            {"id": 32, "name": "name 17", "description": "description 1", "field3": "field3 17", "field4": "field4 17", "field5 ": "field5 17"},
            {"id": 33, "name": "name 18", "description": "description 1", "field3": "field3 18", "field4": "field4 18", "field5 ": "field5 18"},
            {"id": 34, "name": "name 19", "description": "description 1", "field3": "field3 19", "field4": "field4 19", "field5 ": "field5 19"},
            {"id": 35, "name": "name 5", "description": "description 1", "field3": "field3 5", "field4": "field4 5", "field5 ": "field5 5"},
            {"id": 36, "name": "name 6", "description": "description 1", "field3": "field3 6", "field4": "field4 6", "field5 ": "field5 6"},
            {"id": 37, "name": "name 7", "description": "description 1", "field3": "field3 7", "field4": "field4 7", "field5 ": "field5 7"},
            {"id": 38, "name": "name 8", "description": "description 1", "field3": "field3 8", "field4": "field4 8", "field5 ": "field5 8"},
            {"id": 39, "name": "name 9", "description": "description 1", "field3": "field3 9", "field4": "field4 9", "field5 ": "field5 9"},
            {"id": 40, "name": "name 10", "description": "description 1", "field3": "field3 10", "field4": "field4 10", "field5 ": "field5 10"},
            {"id": 41, "name": "name 11", "description": "description 1", "field3": "field3 11", "field4": "field4 11", "field5 ": "field5 11"},
            {"id": 42, "name": "name 12", "description": "description 1", "field3": "field3 12", "field4": "field4 12", "field5 ": "field5 12"},
            {"id": 43, "name": "name 13", "description": "description 1", "field3": "field3 13", "field4": "field4 13", "field5 ": "field5 13"},
            {"id": 44, "name": "name 14", "description": "description 1", "field3": "field3 14", "field4": "field4 14", "field5 ": "field5 14"},
            {"id": 45, "name": "name 15", "description": "description 1", "field3": "field3 15", "field4": "field4 15", "field5 ": "field5 15"},
            {"id": 46, "name": "name 16", "description": "description 1", "field3": "field3 16", "field4": "field4 16", "field5 ": "field5 16"},
            {"id": 47, "name": "name 17", "description": "description 1", "field3": "field3 17", "field4": "field4 17", "field5 ": "field5 17"},
            {"id": 48, "name": "name 18", "description": "description 1", "field3": "field3 18", "field4": "field4 18", "field5 ": "field5 18"},
            {"id": 49, "name": "name 19", "description": "description 1", "field3": "field3 19", "field4": "field4 19", "field5 ": "field5 19"},
            {"id": 50, "name": "name 5", "description": "description 1", "field3": "field3 5", "field4": "field4 5", "field5 ": "field5 5"},
            {"id": 51, "name": "name 6", "description": "description 1", "field3": "field3 6", "field4": "field4 6", "field5 ": "field5 6"},
            {"id": 52, "name": "name 7", "description": "description 1", "field3": "field3 7", "field4": "field4 7", "field5 ": "field5 7"},
            {"id": 53, "name": "name 8", "description": "description 1", "field3": "field3 8", "field4": "field4 8", "field5 ": "field5 8"},
            {"id": 54, "name": "name 9", "description": "description 1", "field3": "field3 9", "field4": "field4 9", "field5 ": "field5 9"},
            {"id": 55, "name": "name 10", "description": "description 1", "field3": "field3 10", "field4": "field4 10", "field5 ": "field5 10"},
            {"id": 56, "name": "name 11", "description": "description 1", "field3": "field3 11", "field4": "field4 11", "field5 ": "field5 11"},
            {"id": 57, "name": "name 12", "description": "description 1", "field3": "field3 12", "field4": "field4 12", "field5 ": "field5 12"},
            {"id": 58, "name": "name 13", "description": "description 1", "field3": "field3 13", "field4": "field4 13", "field5 ": "field5 13"},
            {"id": 59, "name": "name 14", "description": "description 1", "field3": "field3 14", "field4": "field4 14", "field5 ": "field5 14"},
            {"id": 60, "name": "name 15", "description": "description 1", "field3": "field3 15", "field4": "field4 15", "field5 ": "field5 15"},
            {"id": 61, "name": "name 16", "description": "description 1", "field3": "field3 16", "field4": "field4 16", "field5 ": "field5 16"},
            {"id": 62, "name": "name 17", "description": "description 1", "field3": "field3 17", "field4": "field4 17", "field5 ": "field5 17"},
            {"id": 63, "name": "name 18", "description": "description 1", "field3": "field3 18", "field4": "field4 18", "field5 ": "field5 18"},
            {"id": 64, "name": "name 19", "description": "description 1", "field3": "field3 19", "field4": "field4 19", "field5 ": "field5 19"},
            {"id": 65, "name": "name 20", "description": "description 1", "field3": "field3 20", "field4": "field4 20", "field5 ": "field5 20"}
        ];

        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

        // init the filtered items
        $scope.search = function () {
            $scope.filteredItems = $filter('filter')($scope.items, function (item) {
                for (var attr in item) {
                    if (searchMatch(item[attr], $scope.query))
                        return true;
                }
                return false;
            });
            // take care of the sorting order
            if ($scope.sort.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
            }
            $scope.currentPage = 0;
            // now group by pages
            $scope.groupToPages();
        };


        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        $scope.range = function (size, start, end) {
            var ret = [];
            //console.log(size, start, end);

            if (size < end) {
                end = size;
                start = size - $scope.gap;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            //console.log(ret);
            return ret;
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };

        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };


        // fin
        $scope.search();
    }]);

angular.module('raptorApp').controller('CtrlDatatable', ['$scope', '$rootScope', '$http', 'myPostgres', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', '$filter', function ($scope, $rootScope, $http, myPostgres, $location, $sce, $cookies, $cookieStore, $window, $timeout, $filter) {



    }]);

angular.module('raptorApp').controller('CtrlGraphique', ['$scope', '$rootScope', '$http', 'myPostgres', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', '$filter', function ($scope, $rootScope, $http, myPostgres, $location, $sce, $cookies, $cookieStore, $window, $timeout, $filter) {

        //Pour graphique
        $scope.myChartObject = {
            "type": "AreaChart",
            "displayed": false,
            "data": {
                "cols": [
                    {
                        "id": "month",
                        "label": "Month",
                        "type": "string",
                        "p": {}
                    },
                    {
                        "id": "laptop-id",
                        "label": "Laptop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "desktop-id",
                        "label": "Desktop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "server-id",
                        "label": "Server",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "cost-id",
                        "label": "Shipping",
                        "type": "number"
                    }
                ],
                "rows": [
                    {
                        "c": [
                            {
                                "v": "January"
                            },
                            {
                                "v": 19,
                                "f": "42 items"
                            },
                            {
                                "v": 12,
                                "f": "Ony 12 items"
                            },
                            {
                                "v": 7,
                                "f": "7 servers"
                            },
                            {
                                "v": 4
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "February"
                            },
                            {
                                "v": 13
                            },
                            {
                                "v": 1,
                                "f": "1 unit (Out of stock this month)"
                            },
                            {
                                "v": 12
                            },
                            {
                                "v": 2
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "March"
                            },
                            {
                                "v": 24
                            },
                            {
                                "v": 5
                            },
                            {
                                "v": 11
                            },
                            {
                                "v": 6
                            }
                        ]
                    }
                ]
            },
            "options": {
                "title": "Sales per month",
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Sales unit",
                    "gridlines": {
                        "count": 10
                    }
                },
                "hAxis": {
                    "title": "Date"
                }
            },
            "formatters": {}
        }

        //Pour gauge
        $scope.myChartObjectGauge = {};
        $scope.myChartObjectGauge.type = "Gauge";

        $scope.myChartObjectGauge.options = {
            width: 400,
            height: 120,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
            minorTicks: 5
        };

        $scope.myChartObjectGauge.data = [
            ['Label', 'Value'],
            ['Memory', 80],
            ['CPU', 55],
            ['Network', 68]
        ];
    }]);

//Sort
app.directive("ngCustomSort", function () {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            order: '=',
            sort: '='
        },
        template:
                ' <a ng-click="sort_by(order)" style="color: #555555;">' +
                '    <span ng-transclude></span>' +
                '    <i ng-class="selectedCls(order)"></i>' +
                '</a>',
        link: function (scope) {

            // change sorting order
            scope.sort_by = function (newSortingOrder) {
                var sort = scope.sort;

                if (sort.sortingOrder == newSortingOrder) {
                    sort.reverse = !sort.reverse;
                }

                sort.sortingOrder = newSortingOrder;
            };


            scope.selectedCls = function (column) {
                if (column == scope.sort.sortingOrder) {
                    return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
                } else {
                    return'icon-sort'
                }
            };
        }// end link
    }
});
//Directive Graphique
app.directive('ngGraphique', function () {
    return {
        scope: {
            data: '=',
            options: '=',
        },
        restrict: 'A', /*Attribut*/
        data: '=',
        link: function (scope, element, attrs) {
            // canvas
            var id = attrs.id;
            var type = attrs.type;
            var ctx = document.getElementById(id).getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: type,
                // The data for our dataset
                data: scope.data,
                // Configuration options go here
                options: scope.options
            });
        }
    }
});
//Directive modale
app.directive('ngModaldefault', function () {
    return {
        restrict: 'A', /*Attribut*/
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
//Directive loader
app.directive('ngModaldloader', function () {
    return {
        restrict: 'A', /*Attribut*/
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
//Directive datepicker
app.directive('ngDatepicker', function () {
    return {
        require: 'ngModel',
        restrict: 'A', /*Attribut*/
        link: function (scope, element, attrs, ngModel) {
            $(element).datepicker({
                todayBtn: true,
                language: "fr",
                autoclose: true,
                todayBtn: "linked"
            });

            $(element).on('change', function (el) {
                ngModel.$setViewValue($(element).val());
            });

            $(element).focusout(function () {
                $(element).val(ngModel.$viewValue);
            });

            scope.$watch(attrs.ngModel, function (val) {
                if (val) {
                    var date_regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
                    if (date_regex.test(val)) {
                        $(element).datepicker('setDate', new Date(datefrtoen(val)));
                        $(element).datepicker('update');
                    }
                }
            });

            function datefrtoen(date)
            {
                var tab_date = date.split('/');
                tab_date.reverse();
                var date = tab_date.join('-');
                return date;
            }

        }
    }
});
//Popover
app.directive('ngPopover', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            $(element).popover({
                trigger: 'hover'
            });
            
            $(element).click(function () {
                $(element).tooltip('hide'); // destroy
            });
        }
    }
});


//Tooltip
app.directive('ngTooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).tooltip(
                    {
                        trigger: 'hover'
                    });
            $(element).click(function () {
                $(element).tooltip('hide'); // destroy
            });
        }
    }
});

//force saisi numérique
app.directive('ngNumeric', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            //(^[0-9]+[.]{1}[0-9]+$)|(^\d*$)|(^[-][0-9]+[.]{1}[0-9]+$)|(^-\d*$)             Regex qui permet de savoir si un champ numerique est valide ou non
            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g, '') : null;

                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});
//notification
app.directive('ngNotification', function () {
    return {
        restrict: 'A', /*Attribut*/
        template: '<div id="myDIV" ng-class="styleNotificaiton" class="fadein fadeout" ng-show="shownotification"><div>{{messageNotificationDirective}}</div></div>',
        link: function (scope, element, attrs) {
        }
    }
});

app.directive('n3Svg', function () {
    return {
        restrict: 'E', /*Attribut*/
        replace: true,
        templateUrl: 'ressources/images/nv3.svg',
        link: function (scope, element, attrs) {
        }
    }
});
//filtre
app.filter("raptorFilter", function () {
    return function (input, searchText) {

        var returnArray = [];
        if (searchText != undefined) {
            var searchTextSplit = searchText.toLowerCase().split(' ');
            for (var x = 0; x < input.length; x++) {
                var ajouter = false;
                var count = 0;
                for (var y = 0; y < searchTextSplit.length; y++) {
                    var objects = input[x];
                    var i = 0;
                    for (var cle in objects) {

                        if (cle != undefined) {
                            if (objects[cle].toString().indexOf(searchTextSplit[y]) != -1) {
                                ajouter = true;
                            }
                        }
                        i++
                    }
                }
                if (ajouter == true) {
                    returnArray.push(input[x]);
                }
            }
        } else {
            returnArray = input;
        }
        return returnArray;
    }
});

// app.directive('ngTokenfield', function () {
//     return {
//         require: 'ngModel',
//         restrict: 'A', /*Attribut*/
//         scope: {
//             source: '=ngSource',
//             min: '=ngMin',
//             duplicate: '=ngDuplicate',
//         },
//         link: function (scope, element, attrs, ngModel) {
//             console.log('token', scope.source, element);
//             var token = $(element).tokenfield({
//               autocomplete: {
//                 source: scope.source,
//                 delay: 100,
//                 minLength: scope.min
//               },
//               showAutocompleteOnFocus: true
//             });
//             if (scope.duplicate == 'false') {
//                 token.on('tokenfield:createtoken', function (e) {
//                     var existingTokens = $(this).tokenfield('getTokens');
//                     console.log('existing', existingTokens, existingTokens.length != 0);
//                     if (existingTokens.length != 0) {
//                         e.preventDefault();
//                     }
//                 })
//             }
//         }
//     }
// });

//Prototype

//Array.prototype.toLowerCase = function () {
//    for (var i = 0; i < this.length; i++) {
//        this[i] = this[i].toString().toLowerCase();
//    }
//}