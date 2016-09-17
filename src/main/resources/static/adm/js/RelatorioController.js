/**
 * Created by rafa on 27/08/2016.
 */


app.controller("RelatorioController", function ($scope, $http, $location, TillaConfig, fileUpload) {

    $http.get(TillaConfig.adminUrl + "/vendas")
        .then(function (response){
            $scope.vendas = response.data;
            $scope.url = TillaConfig.adminUrl;
        },function (response){
            console.log('Erro ao buscar vendas');
            console.log(response.status);
        });


    $scope.uploadFile3 = function(codigo){
        var file = $scope.file;


        var fd = new FormData();
        fd.append('file', file);


        console.log('myFile1 is ' );
        console.dir(file);
        console.log(codigo);
        var uploadUrl = TillaConfig.adminUrl +
            '/vendas/' + codigo + '/comprovantes-pac/';

        console.log("uploadUrl:" + uploadUrl);
        fileUpload.uploadFileToUrl(fd, uploadUrl, $scope);
        $scope.myFile = undefined;
    };

    $scope.fileSet = function(){
        return $scope.myFile != undefined;
    }


    var changeStatus = function(operacao, codigoVenda){

        $http.get(TillaConfig.adminUrl + "/vendas/" + codigoVenda + "/" + operacao)
            .then(function (response){
                console.log("oiss");
                $scope.vendas = response.data;
                $scope.url = TillaConfig.adminUrl;
            },function (response){
                console.log('Erro ao buscar vendas');
                console.log(response.status);
            });
    }

    $scope.forwardStatus = function(codigoVenda){
        console.log("oi");
        changeStatus("forwardStatus", codigoVenda);
    }
    $scope.backwardStatus = function(codigoVenda){
        changeStatus("backwardStatus", codigoVenda);
    }




});
