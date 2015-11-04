import React from 'react';
import ReactDom from 'react-dom';

export default React.createClass({

  render(){
    return(
      <div>
        <header>
          <h1>Things Todo</h1>
        </header>
        <main>
          <form onSubmit={this.props.onSubmitHandler} class="todo-add">
            <input type="text" name="title" placeholder="Add Something"></input>
            <button><i class="fa fa-plus"></i></button>
          </form>
          <ul class="todo-list">
            items={todos.toJSON()}
          </ul>
        </main>
        <footer>
          <button class="clear">Clear Complete</button>
        </footer>
      </div>
    );
  }

});

todos.fetch().then(() => {  
  ReactDom.render(<MainView/>, el);
});