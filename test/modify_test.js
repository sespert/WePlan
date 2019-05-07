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
        var k = 0;  
        var i = 0;    
        var j = 9;          
        do {            
                Exhibitor.findOneAndUpdate({name:"Smarty pills"}, {$push: {sched: {day:i, hour:j }}}).then(function(){
                    if(j === 17){
                        i++;                        
                        if(i=== 3 && j===17){
                            // let index = 3*9;
                            Exhibitor.findOne({name:"Smarty pills"}).then(function(result){
                                assert(result.sched[5].available === true);                 
                                done(); 
                                                               
                            });  
                                               
                        }else{
                            j=9;
                        }
                    } else{
                        j++;
                    }
                   
                });
           
        // }
        // const hours_day = dbEvent.endTime - dbEvent.startTime;
        // for(let i=0; i<dbEvent.numOfDays; i++) {
        //     for(let j=dbEvent.startTime; j<dbEvent.endTime; j++) {
        //         Exhibitor.findOneAndUpdate({name:"Smarty pills"}, {$push: { sched: {day:i, hour: j}}});
        //     }
        }while( k < 1)

    });

});