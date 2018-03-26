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
        apiLink:     string.isRequired,
        token:       string.isRequired,
        secondColor: string.isRequired,
        thirdColor:  string.isRequired,
    };

    state = {
        message: '',
        tasks:   [
            // { id: 0, message: 'Успешно пройти React-интенсив компании Lectrum', favorite: true, completed: true },
            // { id: 1, message: 'Взять автограф у Джареда Лето', favorite: false, completed: false },
            // { id: 2, message: 'Зарегистрировать бабушку в Твиче', favorite: false, completed: false },
            // { id: 3, message: 'Записать собаку на груминг', favorite: false, completed: false },
            // { id: 4, message: 'Научиться играть на барабанах', favorite: false, completed: false }
        ],
    };

    componentWillMount () {
        const localSearchText = localStorage.getItem('searchText');
        const localDoneAll = JSON.parse(localStorage.getItem('doneAll'));

        this.setState({
            searchText: localSearchText ? localSearchText : '',
            doneAll:    localDoneAll ? localDoneAll : false,
        });

        this._getTasks();
    }

    componentDidUpdate () {
        this._localStorageApi();
    }

    _getTasks = () => {
        const { apiLink, token } = this.context;

        fetch(apiLink, {
            method:  'GET',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token,
            },
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Get post error');
                }

                return response.json();
            })
            .then(({ data }) => {
                this.setState(({ tasks }) => ({
                    tasks: [...data, ...tasks],
                }));
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    _localStorageApi = () => {
        const { searchText, doneAll } = this.state;

        localStorage.setItem('searchText', searchText);
        localStorage.setItem('doneAll', JSON.stringify(doneAll));

    };

    _onSchedulerType = ({ target: { value }}) => {
        if (value.length <= 46) {
            this.setState({
                message: value,
            });
        }
    };

    _sendTask = (e) => {
        e.preventDefault();
        const { message } = this.state;
        const { apiLink, token } = this.context;

        if (this.state.message) {
            fetch(apiLink, {
                method:  'POST',
                headers: {
                    'Content-Type':  'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ message }),
            })
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('create tasks error');
                    }

                    return response.json();
                })
                .then(({ data }) => {
                    this.setState(({ tasks }) => ({
                        message: '',
                        tasks:   [data, ...tasks],
                    }));
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    };

    _deleteTask = (id) => {
        const { apiLink, token } = this.context;

        fetch(`${apiLink}/${id}`, {
            method:  'DELETE',
            headers: {
                'Authorization': token,
            },
        })
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('Delete task error ');
                }
            })
            .then(() => {
                this.setState(({ tasks }) => ({
                    tasks: tasks.filter((task) => task.id !== id),
                }));
            })
            .catch((error) => {
                console.log(error.message);
            });
    };


    _updateTask = (id, newText, favorite, done) => {
        const { tasks } = this.state;
        const { apiLink, token } = this.context;

        this.setState(tasks.map((task) => {

            if (task.id === id) { //Data for update task
                if (newText) {
                    task.message = newText;
                } else if (favorite) {
                    task.favorite
                        ? task.favorite = false
                        : task.favorite = true;
                } else if (done) {
                    task.completed
                        ? task.completed = false
                        : task.completed = true;
                }
            } else if (!newText && !favorite && !done) { //Data for update all
                task.completed = true;
            }

            // update task
            fetch(apiLink, {
                method:  'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type':  'application/json',
                },
                body: JSON.stringify([{
                    'id':        task.id,
                    'message':   task.message,
                    'completed': task.completed,
                    'favorite':  task.favorite,
                }]),
            })
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('update task error ');
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
        ));
    };

    _handleDoneAll = () => {
        const { doneAll } = this.state;

        if (doneAll) {
            this.setState({ doneAll: false });
        } else {
            this.setState({ doneAll: true });
            this._updateTask(false, false, false, false);
        }
    };

    _taskSearch = (e) => {
        this.setState({ searchText: e.target.value });
    };


    taskRender = (task) => (
        <Task
            deleteTask = { this._deleteTask }
            key = { task.id }
            localStorageApi = { this._localStorageApi }
            updateTask = { this._updateTask }
            { ...task }
        />
    );

    render () {
        const { thirdColor, secondColor } = this.context;
        const { tasks: tasksData, message, doneAll, searchText } = this.state;

        const tasksFavorite = tasksData
            .filter((task) => task.favorite && !task.completed && task.message.match(searchText))
            .map(this.taskRender);

        const tasks = tasksData
            .filter((task) => !task.favorite && !task.completed && task.message.match(searchText))
            .map(this.taskRender);

        const tasksDone = tasksData
            .filter((task) => task.completed && task.message.match(searchText))
            .map(this.taskRender);

        return (
            <div className = { Style.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск...'
                            type = 'text'
                            value = { searchText }
                            onChange = { this._taskSearch }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._sendTask }>
                            <input
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { message }
                                onChange = { this._onSchedulerType }
                            />
                            <button type = 'Send'>Добавить задачу</button>
                        </form>
                        <ul>
                            {tasksFavorite}
                            {tasks}
                            {tasksDone}
                        </ul>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { doneAll }
                            color1 = { thirdColor }
                            color2 = { secondColor }
                            onClick = { this._handleDoneAll }
                        />
                        <code>Все задачи выполнены</code>
                    </footer>
                </main>
            </div>
        );
    }
}
