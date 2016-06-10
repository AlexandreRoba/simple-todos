import {Template} from 'meteor/templating';

import {Tasks} from '../api/tasks.js';

import './task.js';
import './body.html';


//Reminder here we create an json object for wich the properties tasks is a function
//It is using the Object Literal Extensions of ES6
Template.body.helpers({
    tasks(){
        return Tasks.find({},{sort:{createdAt:-1}});
    }
});

Template.body.events({
    'submit .new-task'(event){
        //prefent default browser form submit
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;

        //Insert a task into the collection
        Tasks.insert({text:text,createdAt:new Date()});

        target.text.value='';
    }
});