import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import "babel-polyfill";
import { Select, Button ,Spin,Row,Col,Card } from 'antd';
import {bindActionCreators} from 'redux';
import './Home.css';
import {  Link } from "react-router-dom";
import {fetchDatasourceById} from '../../actions/DataSourceListAction.jsx'
import {fetchAllSelfService,selectSelfService  } from '../../actions/SelfServiceObjectListAction.jsx';
import MakeRequest from '../../utilities/MakeRequest'
import {userName , password , orgId} from '../../constants/constants'
const Option = Select.Option;
class Home extends React.Component {
  state = {
  }
  componentDidMount() {
    process.env.NODE_ENV != "production"?
      MakeRequest.post('core/validate-password',
              {
                "data":{
                "email":
                userName,
                "password":password,
                "organizationId":orgId,
                "firebaseTokenId":"abc"}
              }
          )
          .then((succes)=>{
             sessionStorage.setItem('accessToken',succes.data.data.token.access_token)
             this.props.actions.fetchAllSelfService(); 
          }):this.props.actions.fetchAllSelfService();
  
           
  
  }

      handleChange=(value)=> {
  
 this.props.actions.selectSelfService(value);   
 this.setState({
   visibleSelfSerive:true
  })    
}

handleDS=(e)=>{
  e.preventDefault()
  this.props.actions.fetchDatasourceById({"datasourceId":this.props.SelectedMetaData.id},this)
}
      
 render() {
    var display= <Card className="exploreFileUploader">
    <div className="no-metadata">
    <span>No Metadata Selected!</span>
    <p>Select Predefined Metadata to Create New Dashboard</p>
    </div>
        </Card>
             
       if(Object.keys(this.props.SelectedMetaData).length){
          
            display= <Card className="exploreFileUploader"              
            // actions={[<Icon type="setting" />, <Icon type="edit" />]}
          >
          <Row>
            <Col span={8}>
              <span  style={{fontSize:'15px',display: 'block'}}>Metadata name</span>
              <label style={{ fontSize: '19px', color:'#2257CE'}}>{this.props.SelectedMetaData.dataSourceName}</label>

              <div>
                {/* <span style={{display:'block'}}>OWNER</span> */}
                {/* <div style={{border:'1px solid #333', borderRadius:'50px', width:'50px',height:'50px'}}><img src="../images/logo-symbol.png" /></div>                 */}
              </div>
              
            </Col>
            {/* <Col span={8}>
            <span style={{fontSize:'12px',display: 'block'}}>DATA SOURCE TYPE</span>
              <label>VERTICA</label>
            </Col> */}

            <Col span={8} className="pt-ctreated-text">
                <span style={{fontSize:'15px',display: 'block'}}>Created on</span>
                <label style={{ fontSize: '19px', color:'#2257CE'}}>{this.props.SelectedMetaData.createdOn.substr(0,10)}</label>
                </Col>
                <Col span={8} className="pt-ctreated-text">
                <span style={{fontSize:'15px',display: 'block'}}>Modified on</span>
                <label style={{ fontSize: '19px', color:'#2257CE'}}>{this.props.SelectedMetaData.modifiedOn.substr(0,10)}</label>
            </Col>
          </Row>
          <div className="createbttn-section">
            <a type="default" onClick={(e)=>self.handleDS(e)}>Create New Dashboard</a>
  
          </div>
          </Card>
                
                }
      
      var self=this;
  
        return (
       <div className="explore-page" style={{background:'none', boxShadow:'none', borderRadius:'0px', marginTop:'36px'}}> 
            <div className="selectDS__wrapper">
              <div className="v_center_container" style={{padding:'15px 40px'}}>
                <h1 style={{ fontSize: '25px', color: '#2257CE', fontWeight: '200', marginTop: '5px', marginBottom: '20px' }}>Select Dataset to create dashboard</h1>

                <div className="formfield">
                  <label style={{fontSize:'15px'}}>Available Dataset <span>
                    {/* <i class="zmdi zmdi-help"></i> */}
                    </span></label>
                  <Select
                    showSearch
                    style={{ width: '100%', margin: '5px auto' }}
                    placeholder="Select Dataset"
                    optionFilterProp="children"
                    onChange={this.handleChange.bind(this)} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {this.props.MetaDataList.map(function (item) { return <Option value={item.id} key={item.id}>{item.dataSourceName}</Option> })}

                  </Select>
                  <small className="totaltext">Total <span>{this.props.MetaDataList.length}</span> predefined metadata</small>
                </div>
                {display}
              </div>
      </div>
            <div className="selectDS__wrapper" style={{marginTop: '20px'}}>
        <div className="explorebtn" style={{padding:'15px 40px'}}>
                <h1 style={{ fontSize: '25px', color: '#2257CE', fontWeight: '200', marginTop: '5px', marginBottom: '20px', textTransform:'capitalize' }}>Create New Data Source</h1>
        <Link to="/DataSource"><Button >Create New Data Source</Button></Link>   </div>
        </div>
      </div>
    );
 
      
  }
}

const mapDispatchToProps=(dispatch)=>{
    
     return {
         actions: bindActionCreators({
     fetchAllSelfService,selectSelfService,fetchDatasourceById
         },dispatch)
     }
}
const mapStateToProps=(state)=>{
    return {
     url:state.url,
     SelectedMetaData:state.SelfServiceObjectList.selected,
     MetaDataList:state.SelfServiceObjectList.list,
     PageLoader : state.Page.loaded
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);
