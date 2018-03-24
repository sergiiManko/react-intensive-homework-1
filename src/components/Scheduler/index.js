//Core
import React, { Component } from 'react';

//Style
import Style from './styles.scss';

//Instrumental
import Task from '../Task/';
import { getUniqueID } from '../helpers';

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
                tasks:    [{ id: getUniqueID(), taskText }, ...tasks],
            }));
        }
    };


    render () {
        const { tasks: tasksData, taskText } = this.state;
        const tasks = tasksData.map((task) => (
            <Task
                key = { task.id }
                taskText = { task.taskText }
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
