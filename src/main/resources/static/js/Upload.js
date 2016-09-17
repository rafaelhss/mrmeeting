angular.module("tillaApp").directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

angular.module("tillaApp").service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(fd, uploadUrl, $scope){

        $scope.uploading = true;
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .then(function(response){
                console.log("foi");
                $scope.vendaConcluida = response.data;
                $scope.uploading = false;
            },function(response){
                $scope.uploading = false;
                console.log("NAO foi");
                $scope.erro = response.statusText;
            });
    }
}]);
