import React, { Component } from "react";
import { MdDeleteForever } from 'react-icons/md';
import { FiMoreVertical } from 'react-icons/fi';

class ListOfTasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color:['#ffd1d1','#ff6b6b','#ff1616']
    }
  }

  render() {
    return (
      <>
        {this.props.listOfTasks.map((task, index) => {
          return (
            <>
              <div className='task'>
                <div className='priority' style={{backgroundColor:this.state.color[task.priority]}}></div>
                <div className='task-left-side'>
                  
                  <input type="checkbox" className='check' id={task.taskName} 
                    onChange={() => this.props.handleOnChange(index)} 
                    checked= {task.checkedValue}/>
                    
                    <label 
                      className='taskName' 
                      htmlFor={task.taskName} 
                      style ={ task.checkedValue ? {textDecoration :'line-through',color:'#b2bec3' } : {textDecoration:'none'}}
                    > 
                        {task.taskName}
                    </label>

                    <img src={task.source} alt='source' className='hoverImage' style= {{width:'100px'}}/>
                    <p className='time'> {task.currentTime} PM</p>
                  
                    
                    {/* <button className='delete' onClick = {() => this.props.handleDelete(index)}><MdDeleteForever/></button> */}
                </div>
                <div className='task-right-side'>
                  <div className='more-div'>
                        <FiMoreVertical className='more' style={{color:'#57606fd'}}/>
                  </div>
                  
              
                  <div className='more-popup'>
                    <p className='edit' onClick = {() => this.props.onClickFunction(index)}>Edit</p>
                    <p className='deletee' onClick = {() => this.props.handleDelete(index)}>Delete</p>
                    <p className='undo' onClick={() => this.props.handleOnChange(index)}>{task.checkedValue ? 'Undo' : 'Done'}</p>
                  </div>
                </div>
              </div>
              
            </>
          );
        })}
      </>
    );
  }
}

export default ListOfTasks;
