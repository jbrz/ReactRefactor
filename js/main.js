import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
import Backbone from 'backbone';
import parse from './parse_auth';
import {TodoCollection} from './resources';
import {TodoView} from './views';

let el = document.querySelector('.app');

let todos = new TodoCollection();

todos.fetch().then(function() {
  
  $('.wrapper').html(new TodoView(todos).render().$el);

});