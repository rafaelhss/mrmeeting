/**
 * Created by rafa on 27/08/2016.
 */


app.controller("ProdutosController", function ($scope, $http, $location) {


    $scope.validarProdutos = function(produtos) {
        $scope.produtosinvalidos = true;
        if(produtos.length >= 10){
            $scope.produtosinvalidos = false;
        }
    }
    $scope.processar = function(produtos){
        if(!$scope.produtosinvalidos) {
            localStorage.setItem("produtos", produtos);
            $location.path('/email');
        }
    }
});
