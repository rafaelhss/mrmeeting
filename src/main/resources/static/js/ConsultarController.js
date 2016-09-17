/**
 * Created by rafa on 27/08/2016.
 */


app.controller("ConsultarController", function ($scope, $http, $location, TillaConfig, fileUpload) {

    var whatsapp = localStorage.getItem("whatsapp");
    var facebook = localStorage.getItem("facebook");

    $scope.cliente = undefined;
    if(facebook){
        $scope.cliente = facebook;
    }
    if(whatsapp){
        $scope.cliente = whatsapp;
    }
    if($location.search().cliente){
        $scope.cliente = $location.search().cliente;
    }


    $scope.buscarCompras = function(cliente){
        $http.get(TillaConfig.apiUrl + "/" + cliente + "/vendas")
        .then(function (response){
            $scope.vendas = response.data;
            $scope.url = TillaConfig.adminUrl;
            //localStorage.setItem("compras", JSON.stringify(response.data));
            $scope.mostrarForm = false;
        },function (response){
            console.log('Erro ao buscar vendas');
            console.log(response.status);
        });
    }

    console.log($scope.cliente);
    if($scope.cliente === undefined) {
        $scope.mostrarForm = true;
    }
    else{
        $scope.buscarCompras($scope.cliente);
    }


/*


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

*/
});
