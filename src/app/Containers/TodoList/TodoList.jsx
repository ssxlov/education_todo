import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import TodoItem from '../../Components/TodoItem/TodoItem';
import {actions, initialState, todoSlice} from './todoSlice';
import PropTypes from 'prop-types'
import { createSelector } from '@reduxjs/toolkit'
/**
 * todo implement component called ToDoInput
 * which should receive onSubmit function which will be called on the press enter key
 * should receive placeholder value which should show as placeholder for the input
 * this input changes should be managed by local state inside ToDoInput component
 * Use this component for enter tasks name
 */
import ToDoInput from "../../Components/TodoInput/ToDoInput";
import {bindActionCreators} from "../../utils/store";

import './TodoList.scss'
import RadioBadge from "../../Components/RadioBadge/RaidoBadge";

/**
 * todo use this list of the control badges to show them at the control panel
 */

import { controlBadges } from '../../constants/todo';
import {text} from "@fortawesome/fontawesome-svg-core";

/**
 * todo implement HOC for display the list of the todos and control panel and input for add new todos
 */
//const todos = initialState.tasks;

const TodoList = (props) => {
    const FILTER_MAP = {
        All: () => true,
        ToDo: todo => !todo.completed,
        Completed: todo => todo.completed
    };
    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const {todos, remove, markAsChecked} = props
    const [state, setState] = useState({items: todos, filter: 'All'})

    useEffect(()  => {
       // const raw = localStorage.getItem('todos') || []
        // (JSON.parse(raw))
        const todoList = todos.filter(FILTER_MAP['All'])
        setState({items: todoList, filter: 'All'})
        console.log('LOOG fsdfsdfsdfs');
    },[todos])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const btnClick = name => () => {
        const todoList = todos.filter(FILTER_MAP[name])
        setState({items: todoList, filter: name})
    };

    return (
        <React.Fragment>
            <div className="todo-list">
                <ToDoInput/>
                <hr/>
                {state.items.map((todo, index) => (
                    <TodoItem
                    id={todo.id}
                    index={index}
                    key={todo.id}
                    text={todo.text}
                    onRemove={() => {
                    remove({id: todo.id, text: todo.text})
                }}
                    markAsChecked={() => {
                    markAsChecked({id: todo.id, completed: todo.completed})
                }}
                    todo={todo}
                    />
                    ))}
                <div>
                    <ul className="footer">
                        <li className="taskCount">
                            {todos.length} tasks left
                        </li>
                        <li>
                            {controlBadges.map((name) => (
                                <button
                                    key={name}
                                    onClick={btnClick(name)}
                                    name={name}
                                    className="filterButton"
                                >
                                    {name}
                                </button>))}
                        </li>
                        <li className="clearTasksButton">
                            Clear completed
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

const selectTodos = state => state.todos

const selectVisibleTodos = createSelector(
    [selectTodos]
)

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({todos: state.todo})
const mapDispatchToProps = {
    addTodo: actions.addTodo,
    remove: actions.remove,
    markAsChecked: actions.markAsChecked
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
// export default TodoList
