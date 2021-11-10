import React, { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'


class NewTaskGenerator extends Component {
    constructor(props) {
      super(props);
      this.state = {
        task: "",
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
      handleOnChange = (event) => {
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

    loadImage= (query)=>{
      return fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=${query}&count=1`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
        "x-rapidapi-key": "42ea65992cmshdc1d8bcebe43cf6p1f3d92jsne9d5b899eff5"
      }
    })
    .then(response => {
     return response.json()
    })
    .then(data=>{
      this.setState({imgSrc: data.value[0].thumbnailUrl})
      return data.value[0].thumbnailUrl
    })
    .catch(err => {
      this.setState({imgSrc:'./question.jpg'})
      return './question.jpg'
    })
    .then(image=>{
      return image
    })
    ;}


    handleButtonClick =  async (priority) => {
      let source= await this.loadImage(this.state.task);
      this.props.updateListOfTasks(this.state.task, priority, source);
      this.setState({task:''})
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
          onChange={this.handleOnChange}
          value={this.state.task}
        />


<DropdownButton id="dropdown-basic-button" title="Add" >
          <Dropdown.Item onClick={()=>this.handleButtonClick(0)} >Low Priority</Dropdown.Item>
          <Dropdown.Item onClick={()=>this.handleButtonClick(1)}>Medium Priority</Dropdown.Item>
          <Dropdown.Item onClick={()=>this.handleButtonClick(2)}>High Priority</Dropdown.Item>
        </DropdownButton>


        {/* <button className='addTask' onClick={() => this.props.updateListOfTasks(this.state.task)}>
          Add 
        </button> */}
      </div>
      
    );
  }
}

export default NewTaskGenerator;
