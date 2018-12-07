import React from 'react';
import 'core-js/fn/string/includes';
import 'core-js/es7/array';
//import 'babel-polyfill';
import './index.css';
import './App.css';
import './assets/fonts/css/fontawesome-all.min.css';
import ReactDom from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import RoutingElement from './Routes/index.jsx';
import allReducers from './reducers/index.jsx';
import thunk from 'redux-thunk';
import MakeRequest from '../src/utilities/MakeRequest'
const store = createStore(allReducers, composeWithDevTools(), applyMiddleware(thunk))

class StartSelfService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 1
        }
    }
    changeTab(e) {
        this.setState({
            activeTab: e
        })
    }
    render() {
        return (
            <div>
                <Provider store={store} changeTab={this.changeTab.bind(this)}>
                    <RoutingElement changeTab={this.changeTab.bind(this)} activeTab={this.state.activeTab}/>
                </Provider>
            </div>
        )
    }
}

export default StartSelfService;

ReactDom.render(<StartSelfService />, document.getElementById('selectSelfService'));



