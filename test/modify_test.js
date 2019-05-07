const assert = require('assert');

const Event = require('../models/Event');
const User = require('../models/User');
const Conference = require('../models/Conference');
const Exhibitor = require('../models/Exhibitor');

describe ("updating the database", function () {
    const event = new Event({
        name: "Congreso mundial de gente bonita",
        place: "Hyatt Miami",
        subject: "How to increase your IQ",
        numOfDays: 3,
        startTime: 9,
        endTime: 18
    });
    event.save().then(function(dbEvent) {
        it("Assigns one new event to an user admin and non_admin", function(done) {
            User.findOneAndUpdate({name:"Fabian", role:true}, {$push: {events: dbEvent._id}}, {new: true}).then(function() {
                const admin = User.findOne({name:"Fabian", role:true});
                User.findOneAndUpdate({name:"Fabian", role:false}, {$push: {events: dbEvent._id}}, {new: true}).then(function() {
                    const non_admin = User.findOne({name:"Fabian", role:false});
                    assert(admin.events === non_admin.events);
                    done();
                });
            });            
        });
        // it("Creates schedule of an Exhibitor based on the event duration", function(done) {
        //     // const hours_day = dbEvent.endTime - dbEvent.startTime;
        //     for(let i=0; i<dbEvent.numOfDays; i++) {
        //         for(let j=dbEvent.startTime; j<dbEvent.endTime; j++) {
        //             Exhibitor.findOneAndUpdate({name:"Smarty pills"}, {$push: { sched: {day:i, hour: j}}});
        //         }
        //     }

        // });
    });

});