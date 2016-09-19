/**
 * Created by rafa on 27/08/2016.
 */
(function () {
    "use strict";

    var parseOrganizer = function(cabecalho){
        var DE = "De:";
        var ENVIADA_EM = "Enviada em:";

        var aux = cabecalho.substring(cabecalho.indexOf(DE) + DE.length);
        aux = aux.substring(0, aux.indexOf(ENVIADA_EM));
        return {name:aux.trim()};
    }

    /*

     Assunto: ENC: Reuni?o de Coordena??o da Gepla
     Quando: sexta-feira, 16 de setembro de 2016 15:30-16:30 (UTC-03:00) Bras?lia.
     Onde: Deinf/Gabin

     */

    var parseStart = function (cabecalho) {
        return parseStartEnd(cabecalho, true)
    }
    var parseEnd = function (cabecalho) {
        return parseStartEnd(cabecalho, false)
    }

    var parseStartEnd = function(cabecalho, start){
        var aux = cabecalho.replace(/\s*/,"");
        aux = /[0-9]{2}:[0-9]{2}\s*-\s*[0-9]{2}:[0-9]{2}/.exec(aux);
        if(aux){
            if(start){
                return aux[0].split('-')[0];
            } else {
                return aux[0].split('-')[1];
            }
        }
    }



    var parseAttendees = function(cabecalho){
        var PARA = "Para:";
        var ASSUNTO = "Assunto:";

        var aux = cabecalho.substring(cabecalho.indexOf(PARA) + PARA.length);
        aux = aux.substring(0, aux.indexOf(ASSUNTO));
        var attendees = aux.split(";");
        var attendeeList = [];
        for (var i = 0; i < attendees.length; i++) {
            attendeeList.push({name:attendees[i]})
        }
        return attendeeList;
    }

    angular.module("MrMeetingApp").controller('ColarController',
        ['$scope','$http', '$location','MrMeetingConfig', 'MeetingMetrics',

            function($scope, $http, $location, MrMeetingConfig, MeetingMetrics) {

                $scope.exemplo = function(){
                    $scope.cabecalho = "-----Compromisso original-----\n" +
                        "De: MICHEL MIGUEL ELIAS TEMER LULIA \n" +
                        "Enviada em: quinta-feira, 15 de setembro de 2016 09:46\n" +
                        "Para: MICHEL MIGUEL ELIAS TEMER LULIA; BLAIRO BORGES MAGGI; HENRIQUE DE CAMPOS MEIRELLES; Gilberto Kassab; TORQUATO LORENA JARDIM; GEDDEL QUADROS VIEIRA LIMA; MAURICIO QUINTELLA MALTA LESSA\n" +
                        "Assunto: ENC: Reunião de Coordenação Ministerial\n" +
                        "Quando: sexta-feira, 16 de setembro de 2016 15:30-16:30 (UTC-03:00) Brasília.\n" +
                        "Onde: Sala de reuniao 2\n";
                }

                $scope.cabecalho = localStorage.getItem("cabecalho");

                $scope.addAttendee = function(tmpName) {
                    $scope.meeting.attendeeList.push({name:tmpName});
                    delete $scope.tmpName;
                }

                $scope.deleteName = function (index){
                    console.log(name);
                    console.log(index);

                    if (index >= 0) {
                        $scope.meeting.attendeeList.splice( index, 1 );
                    }
                }

                $scope.parseHeader = function(cabecalho) {
                    localStorage.setItem("cabecalho", cabecalho);
                    $scope.meeting = {};
                    $scope.meeting.organizer = parseOrganizer(cabecalho);
                    $scope.meeting.attendeeList = parseAttendees(cabecalho);

                    $scope.meeting.start = parseStart(cabecalho);
                    $scope.meeting.end = parseEnd(cabecalho);


                }

                $scope.processar = function (meeting) {
                    $scope.carregando = true;

                    console.log('cabecalho:' + cabecalho);
                    /*
                    $http.post(MrMeetingConfig.apiUrl + "/meeting/cost",
                        meeting,
                        {headers: {'Content-Type': 'application/json'}})
                        .then(function (response) {
                            $scope.meetingMetrics = response.data;
                        }, function (response) {
                            console.log(response.status);
                            $scope.erro = response.status;
                        })
                        .then(function () {
                            $scope.carregando = false;
                        });
                        */
                    MeetingMetrics.getit(meeting)
                        .then(function (response) {
                            $location.path('/metrics');
                        }, function (response) {
                            console.log(response.status);
                            $scope.erro = response.status;
                        })
                        .then(function () {
                            $scope.carregando = false;

                        });
                }
            }]);
})();
