package mrmeeting.cost.servidor;

import mrmeeting.meeting.Attendee;
import mrmeeting.meeting.Meeting;

import java.math.BigDecimal;

/**
 * Created by rafa on 17/09/2016.
 */
public abstract class CostProvider {
    public abstract Double getSalaryByName(String name);

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

        return totalCost;
    }
}
