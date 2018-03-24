//Core
import React, { Component } from 'react';
import { string } from 'prop-types';

//Style
import Style from './styles.scss';

//Instrumental
import Checkbox from '../../theme/assets/Checkbox';
import DeleteIcon from '../../theme/assets/Delete';
import EditIcon from '../../theme/assets/Edit';
import StartIcon from '../../theme/assets/Star';

export default class Task extends Component {

    static propTypes = {
        taskText: string.isRequired,
    };

    state = {
        isFavorite: false,
        isEdit:     false,
        isDone:     false,
    };

    _handleFavorite = () => {
        const { isFavorite } = this.state;

        isFavorite === true
            ? this.setState({ isFavorite: false })
            : this.setState({ isFavorite: true });
    };

    _handleDone = () => {
        const { isDone } = this.state;

        isDone === true
            ? this.setState({ isDone: false })
            : this.setState({ isDone: true });
    };

    render () {
        const { taskText } = this.props;
        const { isFavorite, isDone } = this.state;
        let className;

        isDone === true
            ? className = `${Style.task} ${Style.completed}`
            : className = `${Style.task}`;

        return (
            <li className = { className }>
                <div>
                    <Checkbox
                        checked = { isDone }
                        color1 = '#3b8ef3'
                        color2 = '#fff'
                        onClick = { this._handleDone }
                    />
                    <input type = ' text' value = { taskText } />
                </div>
                <div>
                    <StartIcon
                        checked = { isFavorite }
                        color1 = '#3b8ef3'
                        onClick = { this._handleFavorite }
                    />
                    <EditIcon color1 = '#3b8ef3' />
                    <DeleteIcon color1 = '#3b8ef3' />
                </div>
            </li>
        );
    }
}
