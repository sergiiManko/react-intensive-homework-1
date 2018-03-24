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
        sort:        func.isRequired,
        taskText:    string.isRequired,
    };

    componentDidMount () {
        const { sort, taskText } = this.props;

        sort();

        this.setState({
            text: taskText,
        });
    }

    state = {
        text:     '',
        readOnly: true,
        done:     false,
    };

    _handleFavorite = () => {
        const { setFavorite, id } = this.props;

        setFavorite(id);
    };

    _handleDone = () => {
        const { done } = this.state;

        done === true
            ? this.setState({ done: false })
            : this.setState({ done: true, readOnly: true });
    };

    _handleEdit = () => {
        const { readOnly, done, text } = this.state;

        this.setState({
            oldText: text,
        });
        readOnly === true && done !== true
            ? this.setState({ readOnly: false })
            : this.setState({ readOnly: true });
    };

    _handleInputType = (e) => {
        const { value } = e.target;

        if (value.length <= 46) {
            this.setState({ text: value });
        }
    };

    _handleInputKeyPress = (e) => {
        const { oldText } = this.state;

        if (e.keyCode === 27) {
            this._handleEdit();
            this.setState({
                text: oldText,
            });
        }
    };


    render () {
        let className;
        const firstColor = '#3b8ef3';

        const { isFavorite } = this.props;
        const { done, readOnly, text } = this.state;

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
                        value = { text }
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
