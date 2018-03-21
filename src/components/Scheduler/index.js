//Core
import React, { Component } from 'react';

//Style
import Style from './styles.scss';

//Instrumental
import Task from '../Task/';

export default class Scheduler extends Component {
    state = {
        message: '',
    };

    _onSchedulerType = ({ target: { value }}) => {
        if (value.length <= 10) {
            this.setState({
                message: value,
            });
        }
    };

    _sendScheduler = (e) => {
        e.preventDefault();
        const { message } = this.state;

        if (message) {
            this.setState({
                message: '',
            });
        }
    };


    render () {
        const { message } = this.state;

        return (
            <div className = { Style.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск...' type = 'text' />
                    </header>
                    <section>
                        <form onSubmit = { this._sendScheduler }>
                            <input placeholder = 'Описание моей новой задачи' type = 'text' onChange = { this._onSchedulerType } value = { message } />
                            <button>Добавить задачу</button>
                        </form>
                        <ul>
                            <Task />
                            <Task />
                            <Task />
                            <Task />
                            <Task />
                        </ul>
                    </section>
                    <footer>
                        <span>
                            +
                        </span>
                        <code>code</code>
                    </footer>
                </main>
            </div>
        );
    }
}
