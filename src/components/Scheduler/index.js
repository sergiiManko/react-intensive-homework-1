//Core
import React, { Component } from 'react';

//Style
import Style from './styles.scss';

//Instrumental
import Task from '../Task/';

export default class Scheduler extends Component {
    state = {
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
                tasks:    [{ id: Math.random(), taskText, isFavorite: false }, ...tasks],
            }));
        }
    };

    _setFavorite = (id) => {
        const { tasks } = this.state;

        tasks.map((task) => {
            if (task.id === id) {
                task.isFavorite
                    ? task.isFavorite = false
                    : task.isFavorite = true;
            }
        });

        this.sort();
    };

    _updateText = (id, newText) => {
        const { tasks } = this.state;

        tasks.map((task) => {
            if (task.id === id) {
                task.taskText = newText;
            }
        });
    };

    sort = () => {
        const { tasks } = this.state;

        this.setState(tasks.sort((a, b) => {
            return a.isFavorite < b.isFavorite;
        }));

    };


    render () {
        const { tasks: tasksData, taskText } = this.state;
        const tasks = tasksData.map((task) => (
            <Task
                key = { task.id }
                setFavorite = { this._setFavorite }
                updateText = { this._updateText }
                sort = { this.sort }
                { ...task }
            />
        ));

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
                            { tasks }
                        </ul>
                    </section>
                </main>
            </div>
        );
    }
}
