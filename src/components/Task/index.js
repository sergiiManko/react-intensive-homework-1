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
        isFavorite: bool.isRequired,
        sortTask:   func.isRequired,
        taskText:   string.isRequired,
    };

    state = {
        edit: true,
        done: false,
    };

    _handleFavorite = () => {
        const { sortTask, id } = this.props;

        sortTask(id);
    };

    _handleDone = () => {
        const { done } = this.state;

        done === true
            ? this.setState({ done: false })
            : this.setState({ done: true });
    };

    _handleEdit = () => {
        const { edit } = this.state;

        edit === true
            ? this.setState({ edit: false })
            : this.setState({ edit: true });
    };

    _inputType = (event) => {
        this.setState({ value: event.target.value });
    };

    render () {
        let className;
        const firstColor = '#3b8ef3';

        const { taskText, isFavorite } = this.props;
        const { done, edit, value } = this.state;

        done === true
            ? className = `${Style.task} ${Style.completed}`
            : className = `${Style.task}`;

        return (
            <li className = { className }>
                <div>
                    <Checkbox
                        checked = { done }
                        color1 = { firstColor }
                        color2 = '#fff'
                        onClick = { this._handleDone }
                    />
                    <input
                        readOnly = { edit }
                        type = 'text'
                        value = { value ? value : taskText }
                        onChange = { this._inputType }
                    />
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
                    <DeleteIcon color1 = { firstColor } />
                </div>
            </li>
        );
    }
}
