//Core
import React, { Component } from 'react';

//Style
import Style from './styles.scss';

//Instrumental
import Checkbox from '../../theme/assets/Checkbox';
import Task from '../Task/';
import { string } from 'prop-types';

export default class Scheduler extends Component {
    static contextTypes = {
        secondColor: string.isRequired,
        thirdColor:  string.isRequired,
    };

    state = {
        doneAll:  false,
        taskText: '',
        tasks:    [],
    };

    _onSchedulerType = ({ target: { value }}) => {
        if (value.length <= 46) {
            this.setState({
                taskText: value,
            });
        }
    };

    _sendTask = (e) => {
        e.preventDefault();
        const { taskText } = this.state;

        if (this.state.taskText) {
            this.setState(({ tasks }) => ({
                taskText: '',
                tasks:    [{ id: Math.random(), taskText, isFavorite: false, isDone: false }, ...tasks],
            }));
        }
    };

    _setFavorite = (id) => {
        const { tasks } = this.state;

        this.setState(tasks.map((task) => {
            if (task.id === id) {
                task.isFavorite
                    ? task.isFavorite = false
                    : task.isFavorite = true;
            }
        }));
    };

    _setDone = (id) => {
        const { tasks } = this.state;

        this.setState(tasks.map((task) => {
            if (task.id === id) {
                task.isDone
                    ? task.isDone = false
                    : task.isDone = true;
            }
        }));
    };

    _deleteTask = (id) => {
        this.setState(({ tasks }) => ({
            tasks: tasks.filter((task) => task.id !== id),
        }));
    };

    _updateText = (id, newText) => {
        const { tasks } = this.state;

        tasks.map((task) => {
            if (task.id === id) {
                task.taskText = newText;
            }
        });
    };

    _handleDoneAll = () => {
        const { tasks, doneAll } = this.state;


        doneAll
            ? this.setState({ doneAll: false })
            : this.setState({ doneAll: true });

        this.setState(tasks.map((task) => {
            task.isDone = true;
        }));
    };


    taskRender = (task) => (
        <Task
            deleteTask = { this._deleteTask }
            key = { task.id }
            setDone = { this._setDone }
            setFavorite = { this._setFavorite }
            updateText = { this._updateText }
            { ...task }
        />
    );


    render () {
        const { thirdColor, secondColor } = this.context;
        const { tasks: tasksData, taskText, doneAll } = this.state;

        const tasksFavorite = tasksData.filter((task) => task.isFavorite && !task.isDone).map(this.taskRender);
        const tasks = tasksData.filter((task) => !task.isFavorite && !task.isDone).map(this.taskRender);
        const tasksDone = tasksData.filter((task) => task.isDone).map(this.taskRender);

        return (
            <div className = { Style.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск...' type = 'text' />
                    </header>
                    <section>
                        <form onSubmit = { this._sendTask }>
                            <input placeholder = 'Описание моей новой задачи' type = 'text' value = { taskText } onChange = { this._onSchedulerType } />
                            <button type = 'Send'>Добавить задачу</button>
                        </form>
                        <ul>
                            { tasksFavorite }
                            { tasks }
                            { tasksDone }
                        </ul>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { doneAll }
                            color1 = { thirdColor }
                            color2 = { secondColor }
                            onClick = { this._handleDoneAll }
                        />
                        <code>Выполнить все задачи</code>
                    </footer>
                </main>
            </div>
        );
    }
}
