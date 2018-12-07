import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import "babel-polyfill";
import { Select, Button, Spin, Input, Form } from 'antd';
import { bindActionCreators } from 'redux';
import './connections.css';
import { Link } from "react-router-dom";
//import {fetchAllSelfService,selectSelfService  } from '../../actions/SelfServiceObjectListAction.jsx';
import { addDatasource, fetchDatasource, testDatasource } from '../../actions/DataSourceListAction.jsx';

const FormItem = Form.Item;


const Option = Select.Option;
class AddDataSource extends React.Component {
  state = {
    DataSource: [{ key: "MYSQL", value: "MYSQL", driver: "com.mysql.jdbc.Driver" },
    { key: "VERTICA", value: "VERTICA", driver: "com.vertica.jdbc.Driver" }],
    DataSourceList: {
      "MYSQL": { key: "MYSQL", value: "MYSQL", driver: "com.mysql.jdbc.Driver" },
      "VERTICA": { key: "VERTICA", value: "VERTICA", driver: "com.vertica.jdbc.Driver" }
    },


  }
  componentDidMount() {

    //      this.props.actions.fetchAllSelfService();

  }
  handleSubmit = (e) => {
    e.preventDefault();
    var self = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var data = {
          "connectionName": values.connectionName,
          "type": values.database,
          "url": "jdbc:" + values.database.toLowerCase() + "://" + values.serverAddress + "/" + values.dataSource,
          "username": values.userName,
          "password": values.password,
          "driver": self.state.DataSourceList[values.database].driver,
          "metaDataName": values.metaDataName,
          "schemaName": values.dataSource
        }
        if (values.serverAddress.lastIndexOf('/') == values.serverAddress.length - 1) {
          data['url'] = "jdbc:" + values.database.toLowerCase() + "://" + values.serverAddress.slice(0, -1) + "/" + values.dataSource;
        }
        self.props.actions.addDatasource(data, self)
      }
    });
  }
  handleChange = (value) => {
    //this.props.actions.selectSelfService(value);   
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div style={{ padding: '30px' }}>

        <Form onSubmit={this.handleSubmit.bind(this)} >
          <FormItem
            {...formItemLayout}
            label="Dataset name"
          >
            {getFieldDecorator('connectionName', {
              rules: [{
                required: false, message: 'Please enter dataset name!',
              }],
            })(
              <Input placeholder="dataset name" />

            )}

            {/* <span style={{ display: "block" }}>The name you will refer to this metadata connection.</span> */}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="IP/host address"
          >
            {getFieldDecorator('serverAddress', {
              rules: [{
                required: false, message: ''
              }],
            })(
              <Input placeholder="IP/host address" />

            )}
          </FormItem>





          <FormItem
            {...formItemLayout}
            label="User ID"
          >
            {getFieldDecorator('userName', {
              rules: [{ required: false, message: 'Please input user id!' }],
            })(
              <Input placeholder="user Id" />

            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: false, message: 'Please enter your password!',
              }],
            })(
              <Input type="password" placeholder="password" />
                /*onBlur={this.handleConfirmBlur}*/
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Database"
          >
            {getFieldDecorator('database', {
              initialValue: 'MYSQL',
              rules: [{ required: false, message: 'Please select your database' }],
            })(
              <Select>
                {this.state.DataSource.map(function (item) { return <Option value={item.value} key={item.value}>{item.key}</Option> })}

              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Schema name"
          >
            {getFieldDecorator('dataSource', {
              rules: [{
                required: false, message: 'Please enter schema name!',
              }],
            })(
              <Input placeholder="schema name" />

            )}
          </FormItem>



          <FormItem {...tailFormItemLayout}>
            <Button htmlType="submit" style={{ marginRight: '20px', background: '#2257CE', borderRadius: '20px', border: 'none', color: '#fff' }}>Add Connection</Button>
            <Button style={{ background: '#fff', borderRadius: '20px', border: '1px solid #eaeaea', color: '#707070' }} onClick={this.testSubmit}>Test Connection</Button>

          </FormItem>

        </Form>
      </div>

    );
  }

  testSubmit = (e) => {
    e.preventDefault();
    var self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {


        console.log('Received values of form: ', values);



        var data = {
          "connectionName": values.connectionName,
          "type": values.database,
          "url": "jdbc:" + values.database.toLowerCase() + "://" + values.serverAddress + "/" + values.dataSource,
          "username": values.userName,
          "password": values.password,
          "driver": self.state.DataSourceList[values.database].driver
        }


        if (values.serverAddress.lastIndexOf('/') == values.serverAddress.length - 1) {

          data['url'] = "jdbc:" + values.database.toLowerCase() + "://" + values.serverAddress.slice(0, -1) + "/" + values.dataSource;
        }




        self.props.actions.testDatasource(data)
        //root.handleOk();
      }
    });
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    actions: bindActionCreators({
      addDatasource, testDatasource, fetchDatasource
    }, dispatch)
  }
}
const mapStateToProps = (state) => {
  return {
    url: state.url,
    //   SelectedMetaData:state.SelfServiceObjectList.selected,
    //    MetaDataList:state.SelfServiceObjectList.list,
    PageLoader: state.Page.loaded

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddDataSource));
