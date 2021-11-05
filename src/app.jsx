import React, { Component } from "react";
import { IconContext } from 'react-icons';
import _ from "lodash";
import "./App.css";
import NewTaskGenerator from "./components/new-task-generator";
import ListOfTasks from "./components/list-of-tasks";
import Header from "./components/Header";
import EditTask from "./components/EditTask";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        listOfTasks: [],
        listOfCompleted: [],
        hiddenAdd: false,
        hiddenEdit: false,
        editIndex: 0,
      };
    }

  //Update Class
    updateListOfTasks = (newTask, priority, source) => {
      
      if(!(newTask === '')) {
        this.setState({ listOfTasks: [...this.state.listOfTasks,{ taskName: newTask, checkedValue: false, key: Math.random() * 1000, currentTime: this.getCurrentTime(), priority, source}]});
      }
      //this.setState({listOfTasks:[...this.state.listOfTasks,...filtered]})
    };




  //Returns The Current Time
    getCurrentTime = () => {
      return new Date().getHours() + ':' + new Date().getMinutes();
    }

  //Handle On Change
    handleOnChange = (index) => {
      // this.setState(prevState => ({
      //   listOfTasks : prevState.listOfTasks.map(
      //     el => el.taskName === task ? {...el, checkedValue: !el.checkedValue} :el
      //   )
      // }))
     let tempArr=this.state.listOfTasks;
     tempArr.map((el,ind) => ind===index ?  el.checkedValue= !el.checkedValue :el)
     let tempData=tempArr.splice(index,1)
     tempArr.push(tempData[0])
     this.setState({listOfTasks:tempArr})
    }
  
  // Delete's The Task
    handleDelete = (index) => {
      this.setState({listOfTasks: this.state.listOfTasks.filter((el,ind) => ind !== index)});
    }


    handleHidden = () => {
      this.setState({hiddenAdd : true})
    }  

    handleHiddenClose = () => {
      this.setState({hiddenAdd : false})
    } 

    handleHiddenEdit = (index) => {
      this.setState({hiddenEdit : true, editIndex: index});
    }  

    handleHiddenCloseEdit = () => {
      this.setState({hiddenEdit : false})
    } 

  
    changeTaskFromList = (task, index) => {
      this.setState({listOfTasks: this.state.listOfTasks.filter((el, elIndex) => index === elIndex ? el.taskName = task : el), hiddenEdit: false});
    }
 

  render() {
    return (
     

      <div className='my-container'>
        {this.state.hiddenAdd ? <NewTaskGenerator updateListOfTasks={this.updateListOfTasks} close = {this.handleHiddenClose} /> : null}

        {this.state.hiddenEdit ? <EditTask updateListOfTasks={this.updateListOfTasks} close = {this.handleHiddenCloseEdit} listOfTasks={this.state.listOfTasks} editIndex = {this.state.editIndex} changeTask = {this.changeTaskFromList}/> : null}
        
        
       
          
        <div className='container'>
            <Header length = {this.state.listOfTasks.length} onClickFunction = {this.handleHidden}/>
            <ListOfTasks listOfTasks={this.state.listOfTasks} handleDelete = {this.handleDelete} 
            handleOnChange = {this.handleOnChange}
            onClickFunction = {this.handleHiddenEdit}
            />
        </div>
      </div>
      
    );
  }
}

export default App;
