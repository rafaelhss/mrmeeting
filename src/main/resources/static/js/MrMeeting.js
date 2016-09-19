
var app = angular.module("MrMeetingApp", ['ngRoute', 'counter']);

app.service('MrMeetingConfig',function(){
     this.apiUrl = "http://mrmeeting.herokuapp.com/api";
    // this.adminUrl = "http://tillacheckout.herokuapp.com/admin";

    //this.apiUrl = "http://localhost:8080/api";
    //this.adminUrl = "http://localhost:8080/admin";
});

app.factory('MeetingMetrics', function($http, MrMeetingConfig) {
    var promise;
    this.currMeeting ={};
    var MeetingMetrics = {
        getit: function(meeting) {
            // $http returns a promise, which has a then function, which also returns a promise
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



app.controller("MrMeetingCtrl", function ($scope, $http, $interval) {

    var imgs = ["http://o.aolcdn.com/dims-shared/dims3/GLOB/crop/5010x3335+0+95/resize/640x426!/format/jpg/quality/85/http://o.aolcdn.com/hss/storage/adam/3d54e4f8c861ed52544f965a401f4446/B705JK.jpg",
        "http://ddhl74alddyxl.cloudfront.net/wp-content/uploads/2014/01/boringmeeting.jpg",
        "http://i.huffpost.com/gen/1373463/thumbs/o-BORING-MEETING-facebook.jpg",
    "http://www.firstsun.com/wp-content/uploads/2014/08/Meeting-Boring.jpg",
    "http://www.incimages.com/uploaded_files/image/1940x900/bored-employees-in-presentation-1940x900_29877.jpg",
    "http://cdn2.hubspot.net/hubfs/229288/images/Blog/boringmeeting.png"];   // your code puts strings into this array
    var imgIdx = Math.floor((Math.random() * imgs.length));

    $scope.bgimg = imgs[imgIdx];
    $interval(function(){
        ++imgIdx;
        if (imgIdx >= imgs.length) {
            imgIdx = 0;
        }
        $scope.bgimg = imgs[imgIdx];   // set new news item into the ticker
    }, 7000)

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
});
