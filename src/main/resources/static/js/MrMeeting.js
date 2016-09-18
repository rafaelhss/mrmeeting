
var app = angular.module("MrMeetingApp", ['ngRoute']);

app.service('MrMeetingConfig',function(){
    // this.apiUrl = "http://tillacheckout.herokuapp.com/api";
    // this.adminUrl = "http://tillacheckout.herokuapp.com/admin";

    this.apiUrl = "http://localhost:8080/api";
    //this.adminUrl = "http://localhost:8080/admin";
});

app.factory('MeetingMetrics', function($http, MrMeetingConfig) {
    var promise;
    this.currMeeting ={};
    var MeetingMetrics = {
        getit: function(meeting) {
            // $http returns a promise, which has a then function, which also returns a promise

            console.log("oi");

            console.log(meeting);
            console.log(this.currMeeting);
            console.log(this.currMeeting != meeting);

            console.log(promise);

            if(!promise || (meeting && this.currMeeting != meeting)){
                this.currMeeting = meeting;
                promise =
                    $http.post(MrMeetingConfig.apiUrl + "/meeting/cost",
                        meeting,
                        {headers: {'Content-Type': 'application/json'}})
                        /*.then(function (response) {
                            return response.data;
                        })*/;
            }
            return promise;
        }
    };
    return MeetingMetrics;
});



app.controller("MrMeetingCtrl", function ($scope, $http) {


});


app.config(function($routeProvider, $locationProvider) {
    $routeProvider
/*        .when('/whatsapp', {
            templateUrl: 'html/whats.html',
            controller: 'WhatsappController'
        })
        .when('/facebook', {
            templateUrl: 'html/facebook.html',
            controller: 'FacebookController'
        })
        .when('/cep', {
            templateUrl: 'html/cep.html',
            controller: 'CepController'
        })
        .when('/produtos', {
            templateUrl: 'html/produtos.html',
            controller: 'ProdutosController'
        })
        .when('/email', {
            templateUrl: 'html/email.html',
            controller: 'EmailController'
        })
        .when('/comprovante', {
            templateUrl: 'html/comprovante.html',
            controller: 'ComprovanteController'
        })*/
        .when('/metrics', {
            templateUrl: 'html/metrics.html',
            controller: 'MetricsController'

        })
        .when('/colar', {
            templateUrl: 'html/colar.html',
            controller: 'ColarController'

        })
        .otherwise({
            templateUrl: 'html/home.html'
        });




//    $locationProvider.html5Mode(true);
});
