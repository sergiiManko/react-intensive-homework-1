//Core
import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';

//Style
import Style from './styles.scss';

//Instrumental
import Checkbox from '../../theme/assets/Checkbox';
import DeleteIcon from '../../theme/assets/Delete';
import EditIcon from '../../theme/assets/Edit';
import StartIcon from '../../theme/assets/Star';

export default class Task extends Component {
    static propTypes = {
        deleteTask:      func.isRequired,
        isDone:          bool.isRequired,
        isFavorite:      bool.isRequired,
        localStorageApi: func.isRequired,
        setDone:         func.isRequired,
        setFavorite:     func.isRequired,
        taskText:        string.isRequired,
        updateText:      func.isRequired,
    };

    static contextTypes = {
        firstColor:  string.isRequired,
        secondColor: string.isRequired,
    };

    state = {
        readOnly: true,
        done:     false,
        newText:  '',
    };

    componentDidMount () { //Чувствую что можно сделать этот момент лучше, но пока не придумал как)
        const { taskText } = this.props;
        this.setState({
            newText: taskText,
        });
    }

    componentWillUpdate () {
        const { localStorageApi } = this.props;

        localStorageApi();
    }

    _handleFavorite = () => {
        const { setFavorite, id } = this.props;

        setFavorite(id);
    };

    _handleDone = () => {
        const { setDone, id } = this.props;

        setDone(id);
    };

    _handleDelete = () => {
        const { deleteTask, id } = this.props;

        deleteTask(id);
    };

    _handleEdit = () => {
        const { updateText, id } = this.props;
        const { readOnly, done, newText } = this.state;

        if (readOnly && !done) {
            this.setState({ readOnly: false, oldText: newText });
        } else {
            this.setState({ readOnly: true, oldText: newText });
            updateText(id, newText);
        }
    };

    _handleInputType = (e) => {
        const { value } = e.target;

        if (value.length <= 46) {
            this.setState({ newText: value });
        }
    };

    _handleInputKeyPress = (e) => {
        const { oldText, readOnly } = this.state;

        if (e.keyCode === 27 && !readOnly) {
            this.setState({
                newText:  oldText,
                readOnly: true,
            });
        }
    };


    render () {

        const { firstColor, secondColor } = this.context;
        const { isFavorite, isDone, taskText } = this.props;
        const { readOnly, newText } = this.state;

        const taskMessage = readOnly
            ? <p> { newText ? newText : taskText } </p>
            : <input
                // readOnly = { readOnly } А если редактирование включать через атрибут readOnly, тогда можно не заменять <input/> на <p/>. Я думаю такой код красивее будет)
                type = 'text'
                value = { newText ? newText : taskText }
                onChange = { this._handleInputType }
                onKeyDown = { this._handleInputKeyPress }
            />;

        return (
            <li className = { isDone ? `${Style.task} ${Style.completed}` : `${Style.task}` }>
                <div>
                    <Checkbox
                        checked = { isDone }
                        color1 = { firstColor }
                        color2 = { secondColor }
                        onClick = { this._handleDone }
                    />
                    { taskMessage }
                </div>
                <div>
                    <StartIcon
                        checked = { isFavorite }
                        color1 = { firstColor }
                        onClick = { this._handleFavorite }
                    />
                    <EditIcon
                        color1 = { firstColor }
                        onClick = { this._handleEdit }
                    />
                    <DeleteIcon
                        color1 = { firstColor }
                        onClick = { this._handleDelete }
                    />
                </div>
            </li>
        );
    }
}
