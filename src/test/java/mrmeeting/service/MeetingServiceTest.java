package mrmeeting.service;

import junit.framework.Assert;
import mrmeeting.Application;
import mrmeeting.meeting.Attendee;
import mrmeeting.meeting.Meeting;
import mrmeeting.meeting.MeetingMetrics;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by rafa on 17/09/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)   // 2
public class MeetingServiceTest {

    @Autowired
    private MeetingService meetingService;

    @Before
    public void setUp() throws Exception {

    }

    @Test
    public void testCalculate() throws Exception {

        List<String> attendees = new ArrayList<>();

        attendees.add("RAFAEL HENRIQUE SANTOS SOARES");
        attendees.add("RAFAEL CHAGAS HENRIQUE");
        attendees.add("RAFAEL DA SILVA HENRIQUE");
        attendees.add("RAFAEL DA SILVA PAES HENRIQUES");
        attendees.add("RAFAEL DE PAULA PEREIRA HENRIQUE");
        attendees.add("RAFAEL FERMINO HENRIQUE");
        attendees.add("RAFAEL FREITAS HENRIQUES");
        attendees.add("RAFAEL HENRIQUE ALMEIDA DA COSTA");
        attendees.add("RAFAEL HENRIQUE ALVES");
        attendees.add("RAFAEL HENRIQUE BAPTISTA DA SILVA");
        attendees.add("RAFAEL HENRIQUE BARTOLI");
        attendees.add("RAFAEL HENRIQUE BOENO");
        attendees.add("RAFAEL HENRIQUE BOSCATO PEREIRA");
        attendees.add("RAFAEL HENRIQUE CARVALHO POLISELI");
        attendees.add("RAFAEL HENRIQUE CERQUEIRA");
        attendees.add("RAFAEL HENRIQUE COELHO JOAQUIM");

        Meeting meeting = getMeeting(attendees);

        Double expectedCost = 109960.60D;
        DecimalFormat df = new DecimalFormat("#.##");
        df.setRoundingMode(RoundingMode.CEILING);

        assertEquals(df.format(expectedCost), df.format(meetingService.calculate(meeting).getTotalCost()));


    }

    private Meeting getMeeting(List<String> attendees) {
        Meeting meeting = new Meeting();
        meeting.setStart("02:00");
        meeting.setEnd("03:00");
        meeting.setSubject("Reuniao de teste");

        Attendee organizador = new Attendee();
        organizador.setName(attendees.get(0));
        meeting.setOrganizer(organizador);

        List<Attendee> attendeeList = new ArrayList<>();
        for (String attendee : attendees) {
            Attendee a = new Attendee();
            a.setName(attendee);
            attendeeList.add(a);
        }

        meeting.setAttendeeList(attendeeList);

        return meeting;
    }

    @Test
    public void testParseMeeting() throws Exception {

        String rawMeeting = "-----Compromisso original-----\n" +
                "De: Aristides Andrade Cavalcante Neto \n" +
                "Enviada em: quinta-feira, 15 de setembro de 2016 09:46\n" +
                "Para: Aristides Andrade Cavalcante Neto; Rafael Henrique Santos Soares; Andre Bokel da Costa; Firmino Henrique Feijo Valente; Andre Henrique de Siqueira; Eduardo Weller; Gabriela Gouveia Guedes Loureiro Ruberg\n" +
                "Assunto: ENC: Reunião de Coordenação da Gepla\n" +
                "Quando: sexta-feira, 16 de setembro de 2016 15:30-16:30 (UTC-03:00) Brasília.\n" +
                "Onde: Deinf/Gabin\n";

        Meeting meeting = meetingService.parseMeeting(rawMeeting);

        assertEquals("Aristides Andrade Cavalcante Neto", meeting.getOrganizer().getName());
        assertEquals(7, meeting.getAttendeeList().size());
    }

    @Test
    public void testParseAndCalc() throws Exception {
        String rawMeeting = "-----Compromisso original-----\n" +
                "De: Aristides Andrade Cavalcante Neto \n" +
                "Enviada em: quinta-feira, 15 de setembro de 2016 09:46\n" +
                "Para: Aristides Andrade Cavalcante Neto; Rafael Henrique Santos Soares; Andre Bokel da Costa; Firmino Henrique Feijo Valente; Andre Henrique de Siqueira; Eduardo Weller; Gabriela Gouveia Guedes Loureiro Ruberg\n" +
                "Assunto: ENC: Reunião de Coordenação da Gepla\n" +
                "Quando: sexta-feira, 16 de setembro de 2016 15:30-16:30 (UTC-03:00) Brasília.\n" +
                "Onde: Deinf/Gabin\n";

        Meeting meeting = meetingService.parseMeeting(rawMeeting);

        Double expectedCost = 115221.27D;
        DecimalFormat df = new DecimalFormat("#.##");
        df.setRoundingMode(RoundingMode.CEILING);

        MeetingMetrics metrics = meetingService.calculate(meeting);
        assertEquals(df.format(expectedCost), df.format(metrics.getTotalCost()));
        assertNotNull(metrics.getMeeting());

       /* long diff = metrics.getMeeting().getEnd().getTime() - metrics.getMeeting().getStart().getTime();
        long diffHours = diff / (60 * 60 * 1000) % 24;

        assertEquals(1, diffHours);
*/

    }

}