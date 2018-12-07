import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './route.css';
import '../index.css';
import '../App.css';

import { Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import HeaderComponent from '../MainComponent/Header/Header.jsx';
import Home from '../MainComponent/Home/Home.jsx';
import Visualization from '../containers/VisualizationContainer'

import DataSource from '../MainComponent/DataSource/DataSource.jsx';
import MetaDataCreation from '../MainComponent/MetaData/MetaDataCreation.jsx';

import NewDashboard from '../MainComponent/Dashboard/NewDashboard.jsx';
import JointPanel from '../MainComponent/Dashboard/JointPanel.jsx';
import KpiBank from '../containers/KpiBankContainer'
import Splash from '../MainComponent/Home/Splash.jsx';
const history = createHistory();


class RoutingElement extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <HeaderComponent history={history} {...this.props} />
                    <div className="body_wrapper matadata-body">
                        <Redirect exact to={'/'} />
                        <Route path={'/DataSource'} component={DataSource} />
                        <Route path={'/MetaDataCreation'} component={MetaDataCreation} />
                        <Route path={'/visualization'} render={(props) => <Visualization {...this.props} history={history} isAuthed={true} />} />
                        <Route path="/kpibank" component={KpiBank} />
                        <Route path={'/NewDashboard'} render={(props) => <NewDashboard {...this.props} history={history} isAuthed={true} />} />
                        <Route path={'/JointPanel'} render={(props) => <JointPanel {...this.props} history={history} isAuthed={true} />} />
                        <Route exact strict path={'/home'} component={Home} />

                        <Route exact strict path={'/'} component={Splash} />
                    </div>
                </div>
            </Router>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
        }, dispatch)
    }
}
const mapStateToProps = (state) => {
    return {
        url: state.url
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RoutingElement)
