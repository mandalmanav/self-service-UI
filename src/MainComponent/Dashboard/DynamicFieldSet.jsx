
import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { Form, Input, Icon, Button, Select } from 'antd';

import 'bootstrap/dist/css/bootstrap.min.css';
import { bindActionCreators } from 'redux';

const FormItem = Form.Item;
const Option = Select.Option;


class DynamicFieldSet extends React.Component {

  state = {
    condition: ["=", "<", "<=", ">", ">=", "<>"], uuid: 1
  }
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('objects');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      objects: keys.filter(key => key.id !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('objects');
    const nextKeys = keys.concat([{ id: this.state.uuid, source: undefined, target: undefined, operator: undefined }]);

    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      objects: nextKeys,
    });
    this.setState({ uuid: this.state.uuid + 1 })
  }

  componentDidMount() {


    if (this.props.connection.getData().join && this.props.connection.getData().join.conditions.length) {
      this.setState({ uuid: this.props.connection.getData().join.conditions.length });
    }

  }
  handleSubmit = (e) => {
    this.props.handleSubmit(e, this)
  }
  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    var objs = [{ id: 0, source: undefined, target: undefined, operator: undefined }]

    if (this.props.connection.getData().join && this.props.connection.getData().join.conditions.length) {
      var pro = this.props.connection.getData();
      //uuid=  pro.join.conditions.length-1;
      var objsli = [];
      pro.join.conditions.forEach((item, index) => {
        var aa = item.split(pro.join.operators[index])[0].split('.')[1];
        var aa1 = item.split(pro.join.operators[index])[1].split('.')[1];

        objsli.push({ id: index, target: pro.join.dest + '.' + aa1, source: pro.join.source + '.' + aa, operator: pro.join.operators[index] })

      })
      objs = objsli


    }

    getFieldDecorator('objects', { initialValue: objs });


    const keys = getFieldValue('objects');
    var self = this;
    const formItems = keys.map((k, index) => {

      return (

        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '' : ''}
          required={false}
          key={k.id}
        >
          {getFieldDecorator(`source[${k.id}]`, {
            initialValue: k.source,

            rules: [{
              required: true,
              whitespace: true,
              message: "Please input column name or delete this field.",
            }],
          })(
            <Select
              showSearch
              style={{ width: 200, float: 'right', marginRight: 5 }}
              placeholder="Select a  Source"

            >
              {this.props.join.sourceColumns.map(function (item) {

                return <Option value={self.props.join.selectSource.name + '.' + item.name} key={item.id}>{item.alias}</Option>

              }

              )}
            </Select>
          )}{getFieldDecorator(`operator[${k.id}]`, {
            initialValue: k.operator || "=",
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input operator or delete this field.",
            }],
          })(
            <Select
              showSearch
              style={{ width: 200, float: 'right', marginRight: 5 }}
              placeholder="Select a target"

            >
              {this.state.condition.map(function (item) { return <Option value={item} key={item}>{item}</Option> })}
            </Select>

          )}



          {getFieldDecorator(`target[${k.id}]`, {
            initialValue: k.target,
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input column name or delete this field.",
            }],
          })(
            <Select
              showSearch
              style={{ width: 200, float: 'right', marginRight: 5 }}
              placeholder="Select a target"

            >
              {this.props.join.targetColumns.map(function (item) {

                return <Option value={self.props.join.selectTarget.name + '.' + item.name} key={item.id}>{item.alias}</Option>

              })}
            </Select>
          )}
          {keys.length > 1 ? (
            <i  style={{position:'absolute',top:'8px',left:'625px',color:'#14e7ff',cursor:'pointer',fontSize:'25px'}}
              className="zmdi zmdi-close zmdi-hc-lg"
           
              disabled={keys.length === 1}
              onClick={() => this.remove(k.id)}
            ></i>
          ) : null}
        </FormItem>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit} style={{width:'106%',marginLeft:'25px'}}>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button onClick={this.add} style={{float:'right',border:'0',color:'#1890ff',fontWeight:'600' }}>
            {/* <Icon type="plus" /> */} Add field
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel} style={{float:'right',width:'35%'}}>
          <Button type="default" htmlType="submit" ref={"sdsd"} >Cancel</Button>
          <Button type="primary" htmlType="submit" ref={"sdsd"}  style={{marginLeft:'10px'}}>Save</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);



export default WrappedDynamicFieldSet;

//ReactDOM.render(<WrappedDynamicFieldSet />, mountNode);