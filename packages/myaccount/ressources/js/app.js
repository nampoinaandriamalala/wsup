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
        },

//        readAsDataUrl = function () {
//            if (!$window.FileReader) {
//                throw new Error('Browser does not support FileReader');
//            }
//
//            function readAsDataUrl(file) {
//                var deferred = $q.defer(),
//                        reader = new $window.FileReader();
//
//                reader.onload = function () {
//                    deferred.resolve(reader.result);
//                };
//
//                reader.onerror = function () {
//                    deferred.reject(reader.error);
//                };
//
//                reader.readAsDataURL(file);
//
//                return deferred.promise;
//            }
//
//            return {
//                readAsDataUrl: readAsDataUrl
//            };
//        }
    };
    return factory;
});

//Controller par defaut
angular.module('raptorApp').controller('CtrlMyAccount', ['$scope', '$rootScope', '$http', 'myPostgresExemple', '$location', '$sce', '$cookies', '$cookieStore', '$window', '$timeout', 'ngToast', function ($scope, $rootScope, $http, myPostgresExemple, $location, $sce, $cookies, $cookieStore, $window, $timeout, ngToast) {

        /*Votre code ici*/
        $scope.matricule = $cookieStore.get('login');
        $scope.nom = $cookieStore.get('nom');
        $scope.prenom = $cookieStore.get('prenoms');

        $scope.sup = $cookieStore.get('editer');
        $scope.tech = $cookieStore.get('supprimer');
        $scope.adm = $cookieStore.get('admin');

        $scope.imageSrc = "/wsup/ressources/images/profil.png";

//        $scope.testcl = UploadController();
//
//        var UploadController = function (fileReader) {
//            console.log(fileReader);
//            $scope.getFile = function () {
//                fileReader.readAsDataUrl($scope.file, $scope)
//                        .then(function (result) {
//                            $scope.imageSrc = result;
//                        });
//            };
//        };

    }]);


//directive('fileChanged', function () {
//    return {
//        restrict: 'A',
//        require: '?ngModel',
//        link: function ($scope, element, attrs, ngModel) {
//            if (!ngModel) {
//                return;
//            }
//
//            ngModel.$render = angular.noop;
//
//            element.bind('change', function (event) {
//                ngModel.$setViewValue(event.target.files[0]);
//                $scope.$apply();
//            });
//        }
//    };
//});
//
//directive('filePreview', function (FileReader) {
//    return {
//        restrict: 'A',
//        scope: {
//            filePreview: '='
//        },
//        link: function (scope, element, attrs) {
//            scope.$watch('filePreview', function (filePreview) {
//                if (filePreview && filePreview.name) {
//                    FileReader.readAsDataUrl(filePreview).then(function (result) {
//                        element.attr('src', result);
//                    });
//                }
//            });
//        }
//    };
//});

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
 */