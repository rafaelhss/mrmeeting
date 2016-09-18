/**
 * Created by rafa on 27/08/2016.
 */
(function () {
    "use strict";

    angular.module("MrMeetingApp").controller('MetricsController',
        ['$scope','$http', '$location','MrMeetingConfig', 'MeetingMetrics',

            function($scope, $http, $location, MrMeetingConfig, MeetingMetrics) {


                    MeetingMetrics.getit()
                        .then(function (response) {
                            console.log(response.data)
                            $scope.meetingMetrics = response.data;
                        }, function (response) {
                            console.log(response.status);
                            $scope.erro = response.status;
                        })
                        .then(function () {
                            $scope.carregando = false;

                        });
            }]);
})();
