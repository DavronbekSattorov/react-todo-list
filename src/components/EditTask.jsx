import React, { Component } from "react";


class EditTask extends Component {
    constructor(props) {
      super(props);
      this.state = {
        task: this.props.listOfTasks[this.props.editIndex].taskName,
        checkedValue: false,

        diffX: 0,
        diffY: 0,
        dragging: false,
        styles: {}
      }

      this._dragStart = this._dragStart.bind(this);
      this._dragging = this._dragging.bind(this);
      this._dragEnd = this._dragEnd.bind(this);
    }
    //Handle On Change
        handleEditChnage = (event) => {
        event.stopPropagation();
       
          this.setState({ task: event.target.value });
        
        
      };


      _dragStart = (e) => {
        this.setState({
            diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
            diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true
        });
    }

    _dragging = (e) => {

        if(this.state.dragging) {
            var left = e.screenX - this.state.diffX;
            var top = e.screenY - this.state.diffY;
    
            this.setState({
                styles: {
                    left: left,
                    top: top
                }
            });
        }
    }    

    _dragEnd = () => {
        this.setState({
            dragging: false
        });
    }
  

  render() {
    return (
      <div className='getTask' 
        style={this.state.styles} 
        onMouseDown={this._dragStart} 
        onMouseMove={this._dragging} 
        onMouseUp={this._dragEnd}
      >

        <button className='close' onClick= { this.props.close}>
          x
        </button>

        <input
          className='getInputFromUser'
          type='text'
          placeholder='Type your task here'
          onChange={this.handleEditChnage}
          value={ this.state.task }
        />

        <button className='addTask' onClick={() => this.props.changeTask(this.state.task, this.props.editIndex)}>
          Edit 
        </button>
      </div>
      
    );
  }
}

export default EditTask;
