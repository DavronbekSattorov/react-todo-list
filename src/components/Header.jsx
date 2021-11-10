import { useState } from "react";

const Header = ({length, onClickFunction}) => {
    
    let [todos, setTodos] = useState();
    todos = new Date();

   

    //Week Days Array
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    //Month Names Array
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   

    return (
        <header >
            <div className='date'>
                <h1>{days[todos.getDay()]}, {todos.getDate()}th</h1>
                <p>{months[todos.getMonth()]}</p>
            </div>

            <div className='amountTask'>
                <p>{length} {length > 1 ? 'Tasks' : 'Task'}</p>
            </div>

            <div className='buttonAdd' onClick = {onClickFunction} >
                <p >+</p>
            </div>
        </header>
    )
}

export default Header;