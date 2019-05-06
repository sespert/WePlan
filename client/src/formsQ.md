ORGANIZER or ATTENDEE
PERSONAL QUESTIONS
name
company
role (checkbox)
email
password

EVENT INFO
event name
place
subject
date
numOfDays
startTime
endTime

CONFERENCES
title
speakers
room
event
schedule

EXHIBITORS
name
representant
booth
event
sched: hour, available, user

 <Label>Full Name</Label>
            <Input 
            name="name"
            value={this.state.name}
            type="text"
            placeHolder="Enter your full name"
            onChange={this.handleInputChange}
            />
            <TextArea
            type="text"
            placeHolder="Enter the description of the conference"
            />
            <FormBtn />