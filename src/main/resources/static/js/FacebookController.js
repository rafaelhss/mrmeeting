/**
 * Created by rafa on 27/08/2016.
 */
app.controller("FacebookController", function ($scope, $http, $location) {

    $scope.facebook = localStorage.getItem("facebook");

    $scope.processar = function(facebook, nome){
        if(facebook) {
            localStorage.setItem("facebook", facebook.replace(/ /g,''));
            localStorage.setItem("contato", facebook.replace(/ /g,''));
            localStorage.setItem("nome", nome);
            localStorage.removeItem("whatsapp");
            $location.path('/cep');
        }
    }
});
