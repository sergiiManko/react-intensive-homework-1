//Core
import React, { Component } from 'react';
import { string } from 'prop-types';

//Style
import Style from './styles.scss';


export default class Task extends Component {
    static propTypes = {
        taskText: string.isRequired,
    };

    render () {
        const { taskText } = this.props;

        return (
            <li className = { Style.task }>
                <div>
                    <span>
                        +
                    </span>
                    <input type = ' text' value = { taskText } />
                </div>
                <div>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
            </li>
        );
    }
}
