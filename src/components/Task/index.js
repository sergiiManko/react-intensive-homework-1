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
        completed:       bool.isRequired,
        deleteTask:      func.isRequired,
        favorite:        bool.isRequired,
        localStorageApi: func.isRequired,
        message:         string.isRequired,
        updateTask:      func.isRequired,
    };

    static contextTypes = {
        firstColor:  string.isRequired,
        secondColor: string.isRequired,
    };

    state = {
        readOnly: true,
        newText:  this.props.message, //Чувствую, что можно сделать этот момент лучше, но завтра на работу)
    };

    componentWillUpdate () {
        const { localStorageApi } = this.props;

        localStorageApi();
    }

    _handleFavorite = () => {
        const { updateTask, id } = this.props;

        updateTask(id, false, true, false);
    };

    _handleDone = () => {
        const { updateTask, id } = this.props;


        updateTask(id, false, false, true);
    };

    _handleDelete = () => {
        const { deleteTask, id } = this.props;

        deleteTask(id);
    };

    _handleEdit = () => {
        const { deleteTask, updateTask, id, completed } = this.props;
        const { readOnly, newText } = this.state;

        if (readOnly && !completed) {
            this.setState({ readOnly: false, oldText: newText });
        } else if (!newText) {
            deleteTask(id);
        } else {
            this.setState({ readOnly: true, oldText: newText });
            updateTask(id, newText, false);
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


    _moveCaretAtEnd (e) { //For autoFocus
        const tempValue = e.target.value;

        e.target.value = '';
        e.target.value = tempValue;
    }

    render () {

        const { firstColor, secondColor } = this.context;
        const { favorite, completed } = this.props;
        const { readOnly, newText } = this.state;

        const taskMessage = readOnly
            ? <p> { newText } </p>
            : <input
                // readOnly = { readOnly } А если редактирование включать через атрибут readOnly, тогда можно не заменять <input/> на <p/>. Я думаю такой код красивее будет)
                autoFocus
                type = 'text'
                value = { newText }
                onChange = { this._handleInputType }
                onFocus = { this._moveCaretAtEnd }
                onKeyDown = { this._handleInputKeyPress }
            />;

        return (
            <li className = { completed ? `${Style.task} ${Style.completed}` : `${Style.task}` }>
                <div>
                    <Checkbox
                        checked = { completed }
                        color1 = { firstColor }
                        color2 = { secondColor }
                        onClick = { this._handleDone }
                    />
                    { taskMessage }
                </div>
                <div>
                    <StartIcon
                        checked = { favorite }
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
