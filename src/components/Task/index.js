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
        isFavorite:  bool.isRequired,
        setFavorite: func.isRequired,
        taskText:    string.isRequired,
        updateText:  func.isRequired,
    };

    state = {
        readOnly: true,
        done:     false,
        newText:  '',
    };

    _handleFavorite = () => {
        const { setFavorite, id } = this.props;

        setFavorite(id);
    };

    _handleDone = () => {
        const { done } = this.state;

        done
            ? this.setState({ done: false })
            : this.setState({ done: true, readOnly: true });
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
        let className;
        const firstColor = '#3b8ef3';

        const { isFavorite, taskText } = this.props;
        const { done, readOnly, newText } = this.state;

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
                        readOnly = { readOnly }
                        type = 'text'
                        value = { newText ? newText : taskText }
                        onChange = { this._handleInputType }
                        onKeyDown = { this._handleInputKeyPress }
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
