const assert = require('assert');

const Event = require('../models/Event');
const User = require('../models/User');
const Conference = require('../models/Conference');
const Exhibitor = require('../models/Exhibitor');
// const DayExhibit = require('../models/DayExhibit');
// const TimeExhibit = require('../models/TimeExhibit');
// const Day = require('../models/Day');
// const Time = require('../models/Time');

describe ("creating new collections" , function() {

    // it("Creates a new User", function(done) {
    //     const user = new User({
    //         name: "Fabian",
    //         company: "FM Tech Enterprise",
    //         role: false,
    //         email: "fmtechenterprise6@gmail.com",
    //         password: "test1234",
    //         // event: [{ '_id': 'ObjectId("5cce4f1cfb49d38188fa316e")'}]
    //     });

    //     user.save().then(function() {
    //         assert(user.isNew === false);
    //         done();
    //     });
    // });

    it("Creates a new Event", function(done) {
        const event = new Event({
            name: "Congreso mundial de gente inteligente",
            place: "Sheraton Miami",
            subject: "How to increase your IQ",
            numOfDays: 3,
            startTime: 9,
            endTime: 18
        });

        event.save().then(function() {
            assert(event.isNew === false);
            done();
        });
    });

    it("Creates a new Conference", function(done) {
        const conference = new Conference({
            title: "Be smarter than your dog",
            speakers: ["Cesar Millan", "Pluto"],
            description: "Cesar and Pluto will show you thru valid examples how to gain the canine wisdom",
            room: "Green Room",
            schedule: {
                day:2,
                time: 10,
                duration:2
            }
        });

        conference.save().then(function() {
            assert(conference.isNew === false);
            done();
        });
    });

    it("Creates a new Exhibitor", function(done) {
        const exhibitor = new Exhibitor({
            name: "Smarty pills",
            representant: "Diana Pachon",
            booth: "N-201",
            
        });

        exhibitor.save().then(function() {
            assert(exhibitor.isNew === false);
            done();
        });
    });

    // it("Creates a new DayExhibit", function() {
    //     const dayExhibit = new DayExhibit();
    //     dayExhibit.save().then(function() {
    //         assert(dayExhibit.isNew === false);
    //         done();
    //     });
    // });

    // it("Creates a new TimeExhibit", function() {
    //     const timeExhibit = new TimeExhibit({ 
    //         hour:6,
    //         available: false,
    //     });

    //     timeExhibit.save.then(function() {
    //         assert(timeExhibit.isNew === false);
    //         done();
    //     });
    // })

    // it("Creates a new Day", function() {
    //     const day =  new Day();
    //     day.save().then(function() {
    //         assert(day.isNew === false);
    //         done();
    //     });
    // });

    // it("Creates a new Time", function() {
    //     const time = new Time({

    //     })
    // })



    
})