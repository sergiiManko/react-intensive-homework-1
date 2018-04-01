// Core
import React, { Component } from 'react';

// Components
import Scheduler from '../../components/Scheduler';
import { string } from 'prop-types';

export default class App extends Component {
    static childContextTypes = {
        apiLink:     string.isRequired,
        token:       string.isRequired,
        firstColor:  string.isRequired,
        secondColor: string.isRequired,
        thirdColor:  string.isRequired,
    };

    getChildContext () {
        return {
            apiLink:     'https://lab.lectrum.io/hw/todo/api/',
            token:       'ЗДЕСЬ_ДОЛЖЕН_БЫТЬ_ВАШ_ТОКЕН',
            firstColor:  '#3b8ef3',
            secondColor: '#ffffff',
            thirdColor:  '#363636',
        };
    }

    render () {
        return <Scheduler />;
    }
}
