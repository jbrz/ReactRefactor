import React from 'react';
import ReactDom from 'react-dom';

export default React.createClass({

  render(){
    return(
      <li className="todo">
        <span className={this.title()}>
          {this.props.data.title}
        </span>
        <button className={this.action()} data-id={this.props.id}>
          {this.icon()}
        </button>
      </li>
    );
  }

});

todos.fetch().then(() => {  
  ReactDom.render(<TodoView/>, el);
});