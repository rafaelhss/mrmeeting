package mrmeeting.service;

import mrmeeting.cost.servidor.CostProvider;
import mrmeeting.cost.servidor.ServidorTransparenciaProvider;
import mrmeeting.meeting.Attendee;
import mrmeeting.meeting.Meeting;
import mrmeeting.meeting.MeetingMetrics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by rafa on 17/09/2016.
 */
@Service
public class MeetingService {

    @Autowired
    private ServidorTransparenciaProvider servidorTransparenciaProvider;


    public MeetingMetrics calculate(Meeting meeting){
        CostProvider provider = servidorTransparenciaProvider;

        MeetingMetrics result = new MeetingMetrics();
        result.setTotalCost(provider.getMeetingTotalCost(meeting));

        return result;
    }


    public Meeting parseMeeting(String rawMeeting) {
        Meeting result = null;

        String language = detectLanguage(rawMeeting);
        if(language.equals("pt-br")){
            result = parseMeetingPtBr(rawMeeting);
        }
        return result;
    }

    private Meeting parseMeetingPtBr(String rawMeeting) {
        String PARA = "Para:";
        String DE = "De:";
        String ENVIADA_EM = "Enviada em:";

        Meeting result = new Meeting();


        String aux = rawMeeting.substring(rawMeeting.indexOf(DE) + DE.length());
        aux = aux.substring(0, aux.indexOf(ENVIADA_EM));
        Attendee organizer = new Attendee();
        organizer.setName(aux.trim().replaceAll("[^A-Za-z0-9 ]", ""));
        result.setOrganizer(organizer);


        aux = rawMeeting.substring(rawMeeting.indexOf(PARA) + PARA.length());
        aux = aux.substring(0, aux.indexOf("Assunto:"));
        List<String> attendeeNames = Arrays.asList(aux.split(";"));

        List<Attendee> attendeeList = new ArrayList<>();

        for(String attendeeName:attendeeNames){
            Attendee a = new Attendee();
            a.setName(attendeeName);
            attendeeList.add(a);
        }

        result.setAttendeeList(attendeeList);

        return result;
    }

    private String detectLanguage(String rawMeeting) {
        return "pt-br";
    }
}
