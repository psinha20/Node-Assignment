import Responder from './expressResponder';
import {Plan, Employee, Holiday, Task, Training} from '../app/models';
import mongoose from 'mongoose';
import shootMail from './email';
import promise from 'promise';
import createTrelloCard from './trelloCards';

exports.Job = {
  on: "*/10 11-20 * * 1-5",
  job : function() {
    console.log('here');
    Training.find({"state" : "in progress"}).exec()
      .then((responses) => {
        let length = responses.length;
        for(let index = 0 ; index < length ; index++)
        {

          let training = [];
          let emails,trello;
          let response = responses[index];
          Employee.findOne({'_id' : response.trainee_id}, {'email' : 1}).exec((err, result) => {
            result = result.toObject();
            training[0] = result.email;
          })
            .then(() => 
              Employee.findOne({'_id' : response.trainer_id},{'email' : 1}).exec((err, result) => {
                training[1] = result.email;
              })
            )
            .then(() => 
              Plan.findOne({'_id' : response.program_id},{'tasks' : 1}).exec((err,result) => {
                training[2] = result.tasks[response.nextTaskIndex];
              })
            )
            .then(() => 
              Task.findOne({'_id' : training[2]}).exec((err ,result) => {
                emails = result.emails;
                trello = result.trello;
              })
            )
            .then(() => {
              return new promise((resolve, reject) => {
                for (var pointer = 0; pointer < trello.title.length; pointer++) {
                  createTrelloCard(response.trelloListId, trello.title[pointer], trello.description[pointer]);
                }
                for (var pointer = 0; pointer < emails.subject.length; pointer++) {
                  shootMail(training[1], training[0], emails.subject[pointer], emails.body[pointer]);
                }
                resolve();
              })
            });
        } 
      });      
  },
  spawn: false
}