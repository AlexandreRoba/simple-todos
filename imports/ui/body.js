import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import {Tasks} from '../api/tasks.js';

import './task.js';
import './body.html';


Template.body.onCreated(function onCreated() {
    this.state = new ReactiveDict();
});

//Reminder here we create an json object for wich the properties tasks is a function
//It is using the Object Literal Extensions of ES6
Template.body.helpers({
    tasks(){
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
        }
        return Tasks.find({}, {sort: {createdAt: -1}});
    },
    incompleteCount() {
        return Tasks.find({checked: {$ne: true}}).count();
    },
});

Template.body.events({
    'submit .new-task'(event){
        //prefent default browser form submit
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Meteor.call('tasks.insert', text);

        target.text.value = '';
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },

});