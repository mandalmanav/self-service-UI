import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import "babel-polyfill";
import { Select, Button, Spin, Row, Col, Card } from 'antd';
import { bindActionCreators } from 'redux';
import './Home.css';
import { Link } from "react-router-dom";
import { fetchDatasourceById } from '../../actions/DataSourceListAction.jsx'
import { fetchAllSelfService, selectSelfService } from '../../actions/SelfServiceObjectListAction.jsx';
import MakeRequest from '../../utilities/MakeRequest';
import { userName, password, orgId } from '../../constants/constants';
import splashImg from '../../MainComponent/Home/self-service-steps.png';
import NewProjectModal from '../Header/NewProjectModal'
import {saveWorkboardValues } from '../../actions/WorkboardListAction'
const Option = Select.Option;

class Splash extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      newProjectModal:false,
      projectModalTitle:''
    }
  }
  
  setModalFalse(name,redirectTo,value){
    let obj = {}
    obj[name]=false;
    this.setState(obj)
    this.props.actions.saveWorkboardValues({ key: "name", value: value });
    if(redirectTo == "home"){
      this.props.history.push('/home')
    }
  }
  componentDidMount() {




  }


  render() {


    var self = this;

    return (
      <div style={{ position: 'absolute', top: '0px', left: '0', right: '0', bottom: '0', display: 'flex', flexDirection: 'column' }}>
            {this.state.newProjectModal? <NewProjectModal setModalFalse={this.setModalFalse.bind(this)} label={this.state.projectModalTitle} />:null}
   
        <div className="explore-page" style={{ background: 'none', boxShadow: 'none' }}>
          <div className="v_center_codntainerg" style={{ background: 'none', boxShadow: 'none', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={splashImg} alt="" />
          </div>
        </div>

        <div style={{ width: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '25px', color: '#2257CE', fontWeight: '200', marginTop: '20px', marginBottom: '20px' }}>Explore the power of thecarecloud Self Service</h1>
          <button className="btn-ss-theme" onClick={()=>{
            this.setState({
              newProjectModal:true,
              projectModalTitle:"Dashboard"
            })
          }}>Create Dashboard</button>
        </div>

      </div>
    );


  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    actions: bindActionCreators({
      fetchAllSelfService, selectSelfService, fetchDatasourceById,saveWorkboardValues
    }, dispatch)
  }
}
const mapStateToProps = (state) => {
  return {
    url: state.url,
    SelectedMetaData: state.SelfServiceObjectList.selected,
    MetaDataList: state.SelfServiceObjectList.list,
    PageLoader: state.Page.loaded
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Splash);
