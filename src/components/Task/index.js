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

    render () {
        const { taskText } = this.props;

        return (
            <li className = { Style.task }>
                <div>
                    <Checkbox
                        color1 = '#3b8ef3'
                        color2 = '#fff'
                    />
                    <input type = ' text' value = { taskText } />
                </div>
                <div>
                    <StartIcon color1 = '#3b8ef3' />
                    <EditIcon color1 = '#3b8ef3' />
                    <DeleteIcon color1 = '#3b8ef3' />
                </div>
            </li>
        );
    }
}
