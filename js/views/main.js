export default React.createClass({




});


/*
 * Set the View prototype.
 */

// View.prototype = {
  
//   // Create a render function on the view.
//   render() {
//     // First just add our wrapper template
//     // which will create our base structure.
//     this.$el.html(wrapper());
    
//     // Grab the <ul> we just created from
//     // the wrapper()
//     let $ul = this.$el.find('ul');
   
//     // iterate our collection and render
//     // an <li> for each model.
//     this.collection.each(model => {
//       let $li = $(template(model));
//       $ul.append($li);
//     });
//     return this;
//   }
// };