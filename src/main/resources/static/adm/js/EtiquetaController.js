/**
 * Created by rafa on 27/08/2016.
 */


app.controller("EtiquetaController", function ($scope, $http, TillaConfig) {


        $http.get(TillaConfig.adminUrl + "/vendas?status=PAGAMENTO_APROVADO")
            .then(function (response) {
                $scope.vendas = response.data;
            }, function (response) {
                console.log('Erro ao buscar vendas');
                console.log(response.status);
            });
});
