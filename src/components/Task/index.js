//Core
import React, { Component } from 'react';

//Style
import Style from './styles.scss';


export default class Task extends Component {
    render () {
        return (
            <li className = { Style.task }>
                <div>
                    <span>
                        +
                    </span>
                    <input type = ' text' value = 'Успешно пройти React-интенсив компании Lectrum' />
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
