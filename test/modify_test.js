const assert = require('assert');

const Event = require('../models/Event');
const User = require('../models/User');
const Conference = require('../models/Conference');
const Exhibitor = require('../models/Exhibitor');

describe ("updating the database", function () {

    it("Assigns one new event to an user admin and non_admin", function(done) {        
        const event = new Event({
            name: "Congreso mundial de gente bonita",
            place: "Hyatt Miami",
            subject: "How to increase your IQ",
            numOfDays: 3,
            startTime: 9,
            endTime: 18
        });
        event.save().then(function(dbEvent) {        
            User.findOneAndUpdate({name:"Fabian", role:true}, {$push: {events: dbEvent._id}}, {new: true}).then(function() {
                const admin = User.findOne({name:"Fabian", role:true});
                User.findOneAndUpdate({name:"Fabian", role:false}, {$push: {events: dbEvent._id}}, {new: true}).then(function() {
                    const non_admin = User.findOne({name:"Fabian", role:false});
                    assert(admin.events === non_admin.events);
                    done();
                });
            });            
        });
    });

    it("Creates schedule of an Exhibitor based on the event duration", function(done) {
        var days = 3;    
        var startTime = 9;
        var endTime = 18;
        var hours = endTime-startTime;
        const hoursArr=[];
        var available = true;
        const daysArray=[];
        for (let i =0; i<hours; i++ ){
            hoursArr.push(available);
        }
        for (let i =0; i<days; i++){
            daysArray.push(hoursArr);
        }
        Exhibitor.findOneAndUpdate({name:"Smarty pills"}, {$push: {sched: daysArray}}).then(function(){
            Exhibitor.findOne({name:"Smarty pills"}).then(function(result){
                assert(result.sched[2][4] === true);                 
                done();                                                           
            });  
        });

    });

});