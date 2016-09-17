package mrmeeting.meeting;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * Created by rafa on 17/09/2016.
 */

@Getter
@Setter
public class Meeting {

    private String subject;
    private Date start;
    private Date end;

    private Attendee organizer;

    private List<Attendee> attendeeList;

}
