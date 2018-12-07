import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import "babel-polyfill";
import { Spin, Tabs } from 'antd';
import { bindActionCreators } from 'redux';
import './DataSource.css';
import { Link } from "react-router-dom";
// import './connections.css';
import AddDataSource from "./AddDataSource.jsx";
import FileUploader from "./FileUploader.jsx";
import salesforceImg from "../../assets/images/connector-salesforce.png";
import twitterImg from "../../assets/images/connector-twitter.png";
import facebookImg from "../../assets/images/connector-facebook.png";
import callImg from "../../assets/images/connector-call-miner.png";

const TabPane = Tabs.TabPane;


class DataSource extends React.Component {
    state = {
    }
    componentDidMount() {

        //      this.props.actions.fetchAllSelfService();

    }
    handleChange = (value) => {

        //this.props.actions.selectSelfService(value);   
    }


    render() {

        return (
            <div>
                <div className="connection-section">
                    <h2>Connections</h2>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Data Source" key="1">
                            <AddDataSource history={this.props.history}></AddDataSource>
                        </TabPane>
                        <TabPane tab="Upload file" key="2">
                            <FileUploader history={this.props.history}></FileUploader>
                        </TabPane>
                        <TabPane tab="Connections (API)" key="3">
                            <div className="connectors__wrapper">
                                <div className="connectors__wrapper-list">
                                    <div className="img-wrapper">
                                        <img src={callImg} />
                                    </div>

                                    <h4>Call Miner</h4>
                                </div>

                                <div className="connectors__wrapper-list">
                                    <div className="img-wrapper">
                                        <img src={salesforceImg} />
                                    </div>

                                    <h4>Salesforce</h4>
                                </div>

                                <div className="connectors__wrapper-list">
                                    <div className="img-wrapper">
                                        <img src={facebookImg} />
                                    </div>

                                    <h4>Facebook</h4>
                                </div>

                                <div className="connectors__wrapper-list">
                                    <div className="img-wrapper">
                                        <img src={twitterImg} />
                                    </div>

                                    <h4>Twitter</h4>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({
            //   fetchAllSelfService,
            //         selectSelfService 
        }, dispatch)
    }
}
const mapStateToProps = (state) => {
    return {
        url: state.url,
        //     SelectedMetaData:state.SelfServiceObjectList.selected,
        //    MetaDataList:state.SelfServiceObjectList.list,
        PageLoader: state.Page.loaded

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DataSource);
