/**
 * Created by rafa on 27/08/2016.
 */
app.controller("WhatsappController", function ($scope, $http, $location) {

    $scope.whatsapp = localStorage.getItem("whatsapp");


    $scope.validarWhatsapp = function(whatsapp) {
        $scope.whatsappinvalido = true;
        if(whatsapp.length >= 10 && whatsapp.length <= 11){
            $scope.whatsappinvalido = false;
        }
    }
    $scope.processar = function(whatsapp, nome){
        if(!$scope.whatsappinvalido) {
            localStorage.setItem("whatsapp", whatsapp);
            localStorage.setItem("contato", whatsapp);
            localStorage.setItem("nome", nome);
            localStorage.removeItem("facebook");
            $location.path('/cep');
        }
    }
});
