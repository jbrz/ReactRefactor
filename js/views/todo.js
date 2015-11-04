
import $ from 'jquery';
import 'jquery-serializejson';
import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom'



/*
 *
 * This is a template for each todo item.
 *
 */

function template(model) {
  // check of the model is complete
  let complete = model.isComplete();
  
  // show a different icon based on if model is complete
  let fa = complete ? 'undo' : 'close';
  
  // use a different action based on if model is complete
  let action = complete ? 'undo' : 'remove';
  
}
  // define our template



/*
 *
 * This is our main wrapper template.
 *
 */

let onSubmitHandler = function() {
  // prevent form from causing page to reload
  e.preventDefault();
  // find the element with an icon
  // and convert it to a spinner
  this.classList.remove('fa-plus')
  this.classList.add('fa-spin')
  this.classList.add('fa-spinner');
  // get the data from the form
  let data = this.$el.find('form').serializeJSON();
  // use data to create a new todo item
  this.collection.add(data).save().then(() => this.render());
};

let onRemoveHandler = function() {
  e.preventDefault();
    // get the button from the event
    let button = $(e.currentTarget);
    // get the todo id from the button
    let id = $button.data('id');
    // get the model by id from the collection
    let model = this.collection.get(id);
    // convert button icon to a spinner
      this.classList.removeClass('fa-close')
      this.classList.add('fa-spin')
      this.classList.add('fa-spinner');
    // Save the `completeAt` property on the todo
    model.save({
      completeAt: new Date().toString()
    }).then(() => this.render());
  });
}



/*
 *
 * This is a view constructor.
 * - the constructor function accepts a collection
 * - creates a root element to container everything
 * - and adds event listeners for different actions.
 *
 */

function View(collection) {
  // Grab the collection as an argument to the constructor
  // and store a reference as `this.collection` to use later.
  this.collection = collection;
  
  // Create the root element for the view
  this.$el = $('<div/>').addClass('todo-collection');
  
  // Add event listener for when form is submitted.
#  this.$el.on('submit', 'form', (e) => {
    // prevent form from causing page to reload
    e.preventDefault();
    // find the element with an icon
    // and convert it to a spinner
    this.$el.find('.fa-plus')
      .removeClass('fa-plus')
      .addClass('fa-spin')
      .addClass('fa-spinner');
    // get the data from the form
    let data = this.$el.find('form').serializeJSON();
    // use data to create a new todo item
    this.collection.add(data).save().then(() => this.render());
#  });
  
  // Add event listener for when a todo is marked complete
#  this.$el.on('click', '.remove', (e) => {
    e.preventDefault();
    // get the button from the event
    let $button = $(e.currentTarget);
    // get the todo id from the button
    let id = $button.data('id');
    // get the model by id from the collection
    let model = this.collection.get(id);
    // convert button icon to a spinner
    $button.find('.fa-close')
      .removeClass('fa-close')
      .addClass('fa-spin')
      .addClass('fa-spinner');
    // Save the `completeAt` property on the todo
    model.save({
      completeAt: new Date().toString()
    }).then(() => this.render());
#  });

  
  // Add event listener for when completed todo undone
  this.$el.on('click', '.undo', (e) => {
    e.preventDefault();
    // get the button from the event
    let $button = $(e.currentTarget);
    // get the todo id from the button
    let id = $button.data('id');
    // get the model by id from the collection
    let model = this.collection.get(id);
    // convert button icon to a spinner
    $button.find('.fa-undo')
      .removeClass('fa-undo')
      .addClass('fa-spin')
      .addClass('fa-spinner');
    // Clear the `completeAt` property on the todo
    model.save({
      completeAt: null
    }).then(() => this.render());
  });
  
  // Add event listener for when the clear all button is clicked
  // ( This should delete all completed todo records. )
  this.$el.on('click', '.clear', (e) => {
    e.preventDefault();
    // Replace the main section of the page with a spinner.
    this.$el.find('main').html(`
      <div class="clearing">
        <div class="spinner">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <h4>Deleting Complete Todos</h4>
      </div>
    `);
    // Remove the clear button
    this.$el.find('footer .clear').remove();
    // Grab all the models marked complete
    let completeModels = this.collection.filter((model) => {
      return model.isComplete();
    });
    // Map all the models to delete requests.
    // When we call `destroy()` on a model it makes
    // a DELETE request and returns a promise.
    // So if map our array of complete models to
    // `destroy()` calls we will get back an array
    // of primises.
    let deleteRequests = completeModels.map(m => m.destroy());
    // Since we have an array of promises we can use
    // `Promise.all` to be notified when all of them
    // have succeeded.
    Promise.all(deleteRequests).then(() => {
      // Once they have all succeeded
      // call `this.render()` (this is the main view)
      // to reset the view
      this.render();
    });
  });
}



/*
 * Set the View prototype.
 */

View.prototype = {
  
  // Create a render function on the view.
  render() {
    // First just add our wrapper template
    // which will create our base structure.
    this.$el.html(wrapper());
    
    // Grab the <ul> we just created from
    // the wrapper()
    let $ul = this.$el.find('ul');
   
    // iterate our collection and render
    // an <li> for each model.
    this.collection.each(model => {
      let $li = $(template(model));
      $ul.append($li);
    });
    return this;
  }
};

export default View;
