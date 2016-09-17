/**
 * Created by rafa on 27/08/2016.
 */


app.controller("CepController", function ($scope, $http, $location) {

    $scope.cep = Number(localStorage.getItem("cep"));

    //http://api.postmon.com.br/v1/cep/31160440
    $scope.carregarEndereco = function(cep) {
        $scope.carregando = true;
        
        console.log('cep:' + cep );
        $http.get("https://api.postmon.com.br/v1/cep/" + cep.toString().replace(/\D/g,''))
            .then(function (response){
                $scope.endereco = response.data;
                $scope.cepnaoencontrado = false;
            },function (response){
                console.log(response.status);
                $scope.cepnaoencontrado = true;
                $scope.errocep = response.status ;
            })
            .then(function(){
                $scope.carregando = false;
                $scope.mostrarformendereco = true;
            });
    }


    $scope.processar = function(endereco){
        if(endereco.numero) {
            localStorage.setItem("endereco", JSON.stringify(endereco));
            localStorage.setItem("cep", endereco.cep);
            $location.path('/produtos');
        }
    }
});
