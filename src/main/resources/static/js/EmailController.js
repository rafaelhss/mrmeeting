/**
 * Created by rafa on 27/08/2016.
 */


app.controller("EmailController", function ($scope, $http, $location) {
    $scope.processar = function(email) {
        localStorage.setItem("email", email);
        $location.path('/comprovante');
    }
});
