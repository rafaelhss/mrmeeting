package mrmeeting.cost.servidor;

import mrmeeting.meeting.Attendee;
import mrmeeting.meeting.Meeting;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by rafa on 17/09/2016.
 */
public abstract class CostProvider {
    public abstract Double getSalaryByName(String name);
    public abstract int getDefaultMonthHours();


    public Double getMeetingTotalCost(Meeting meeting) {
        Double totalCost = 0D;
        int noInfoCount = 0;
        int totalAttendees = meeting.getAttendeeList().size();
        for (Attendee attendee : meeting.getAttendeeList()) {
            Double cost = this.getSalaryByName(attendee.getName());
            if(cost <= 0){
                noInfoCount++;
            } else {
                totalCost += (cost);
            }
        }

        //If cant find somebody´s salary, consider it avg.
        Double avgFound = totalCost / (totalAttendees - noInfoCount);
        for (int i = 0; i < noInfoCount ; i++) {
            totalCost += avgFound;
        }


        Double avgMinuteCost = totalCost / (getDefaultMonthHours() * 60);


        long duration = getMinutesDuration(meeting);

        return avgMinuteCost * duration;
    }

    public long getMinutesDuration(Meeting meeting) {
        SimpleDateFormat format = new SimpleDateFormat("HH:mm");

        Date d1 = null;
        Date d2 = null;

        try {
            d1 = format.parse(meeting.getStart());
            d2 = format.parse(meeting.getEnd());

            //in milliseconds
            long diff = d2.getTime() - d1.getTime();
            long diffMinutes = (diff / (60 * 1000));
            return diffMinutes;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }
}
