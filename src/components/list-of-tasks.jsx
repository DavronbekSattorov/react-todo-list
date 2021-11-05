import React, { Component } from "react";
import { MdDeleteForever } from 'react-icons/md';
import { FiMoreVertical } from 'react-icons/fi';

class ListOfTasks extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.listOfTasks.map((task, index) => {
          return (
            <>
              <div className='task'>
                <div className='priority'></div>
                <div className='task-left-side'>
                  
                  <input type="checkbox" className='check' id={task.taskName} 
                    onChange={() => this.props.handleOnChange(index)} />
                    
                    <label 
                      className='taskName' 
                      htmlFor={task.taskName} 
                      style ={ task.checkedValue ? {textDecoration :'line-through',color:'#b2bec3' } : {textDecoration:'none'}}
                    > 
                        {task.taskName}
                    </label>

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
