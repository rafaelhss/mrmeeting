package mrmeeting;

import java.util.concurrent.atomic.AtomicLong;

import mrmeeting.meeting.Meeting;
import mrmeeting.meeting.MeetingMetrics;
import mrmeeting.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MeetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    private MeetingService meetingService;


    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return counter.incrementAndGet() +  String.format(template, name);
    }

    @CrossOrigin(origins = "http://localhost:63343")
    @PostMapping("/api/meeting/cost")
    public MeetingMetrics calculateMetrics(@RequestBody Meeting meeting) {
        return meetingService.calculate(meeting);
    }

    @CrossOrigin(origins = "http://localhost:63343")
    @PostMapping("/api/raw-meeting/meeting/cost")
    public MeetingMetrics calculateMetrics(@RequestBody String rawMeeting) {
        Meeting meeting = meetingService.parseMeeting(rawMeeting);
        return meetingService.calculate(meeting);
    }

}