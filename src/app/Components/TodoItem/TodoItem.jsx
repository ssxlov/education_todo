import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {actions, initialState, todoSlice} from "../../Containers/TodoList/todoSlice";
import {useState} from 'react';
import { connect } from 'react-redux'
import './TodoItem.scss';
import TodoList from "../../Containers/TodoList/TodoList";
import removeTodo from "../../Containers/TodoList/TodoList"

/**
 * todo implement here component which will show todo item
 * Component should contain checkbox text and trash icon for remove item
 *
 * This component should receive the following params
 * text -  name of task
 * id - id of task
 * checked - checked state of the task
 * onCheck - callback which should be called if the checkbox state was changed
 * onRemove - callback which should be called if the trash icon was called
 *
 * NOTE: need to pass task id into callbacks as param
 */

const TodoItem = ({todo, text, id, completed, markAsChecked, onRemove}) => {
    return (
        <React.Fragment>
            <li className="todo"
                key={id}
                style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
                // checked={checked}
                // onCheck={onCheck}
            >
                <input type="checkbox" onClick={markAsChecked}/>
                <div className="taskText">
                    {todo.text}
                    <div className="deleteTask" onClick={onRemove}>
                        <img src='https://img.icons8.com/android/12/000000/trash.png' alt="error"/>
                    </div>
                </div>
            </li>
            <hr/>
        </React.Fragment>
    )
};

TodoItem.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    markAsChecked: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default TodoItem
