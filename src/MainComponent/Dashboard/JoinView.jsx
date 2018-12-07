import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import "babel-polyfill";
import $ from 'jquery';
import { bindActionCreators } from 'redux';
import { Tree, Form, Transfer, Button, Modal, Select, Card, Input, TreeSelect, Row, Col, Spin, Menu, Dropdown, Icon, List, Radio } from 'antd';
import "./css/gridlayout.css";
import "./css/resizable.css";
import DynamicFieldSet from './DynamicFieldSet.jsx';
import jointicons from '../../assets/images/jointIcon.svg'

const Option = Select.Option;

const FormItem = Form.Item;
var joiningObject = { sourceColumns: [], targetColumns: [] };

class JoinView extends React.Component {
  handleChange = () => {

  }

  state = { joinType: "inner", visible: false }

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  }
  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {

    this.setState({
      visible: false

    });
  }
  handleSubmit = (e, self) => {
    e.preventDefault();

    self.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var join = {
          sourceId: self.props.join.selectSource.id,
          destId: self.props.join.selectTarget.id,
          source: self.props.join.selectSource.name,
          dest: self.props.join.selectTarget.name,
          sourceAlias: self.props.join.selectSource.alias,
          destAlias: self.props.join.selectTarget.alias,
          joinType: self.props.joinType, operators: [],
          conditions: []
        }







        for (let j = 0; j < values.objects.length; j++) {
          var i = values.objects[j].id;


          join.operators.push(values.operator[i]);
          join.conditions.push(values.source[i] + values.operator[i] + values.target[i]);


        }

        var jo = self.props.connection.getData();
        jo['join'] = join;
        self.props.connection.setData(jo);
        self.props.rootEl.updateJoin();
        self.props.parentEl.handleCancel();

      }
    });


  }


  handleCancel = (e) => {
    this.setState({
      visible: false
    });



  }
  handleCancel1 = (e) => {
    console.log(this.refs[this.props.connection.id])



  }

  componentDidMount() {


  }
  onChange = (value) => {
    this.setState({ FirstColumn: value });
  }
  onChange1 = (value) => {
    this.setState({ SecondColumn: value });
  }
  handleMenuClick = (value) => {
    console.log("sdd");
  }

  closeConnection = () => {
    this.props.parentEl.state.instance.deleteConnection(this.props.connection)
  }

  selectJoin = (e) => {

    this.setState({ joinType: e.target.value });

  }
  render() {

    var self = this;
    var obj = this.props.connection.getData();

    var list = this.props.parentEl.props.TablesObject;



    if (Object.keys(list).length) {
      obj['selectTarget'] = list[self.props.connection.targetId];
      obj['selectSource'] = list[self.props.connection.sourceId];


      obj['targetColumns'] = obj['selectTarget'].dimensions.concat(obj['selectTarget'].measures);
      obj['sourceColumns'] = obj['selectSource'].dimensions.concat(obj['selectSource'].measures);
      this.props.connection.setData(obj);
    }

    return (

      <div>



        <span className="closeIcon"><i onClick={this.closeConnection} className="zmdi zmdi-close-circle-o" ></i></span>
        <div onClick={this.showModal} className="joint-text-blank">
          <label>TYPE OF JOIN</label>
          <p><span className="joint-icons"></span>{this.state.joinType}</p>
        </div>
        <Modal
          title="Join"
          visible={this.state.visible}
          closable={false}
          footer={null}
          width={750}
        >

          <div className="row" className="RadioButton">
            <Radio.Group onChange={this.selectJoin} defaultValue="inner" buttonStyle="solid">
              <Radio.Button value="left" style={{marginRight:'15px'}}><img className="iconradio" src={jointicons} />left </Radio.Button>
              <Radio.Button value="right" style={{marginRight:'15px'}}><img  className="iconradio" src={jointicons} />right</Radio.Button>
              <Radio.Button value="inner" style={{marginRight:'15px'}}><img className="iconradio" src={jointicons} />inner </Radio.Button>
              <Radio.Button value="fullouter"><img className="iconradio" src={jointicons} />full outer</Radio.Button>
            </Radio.Group>
          </div>


          <div className="row" style={{marginBottom:'20px',textAlign:'left'}}>
            <div className="col-md-1"></div>
            <div className="col-md-3">Source</div>
            <div className="col-md-3">Operator</div>
            <div className="col-md-3">Target</div>
          </div>



          <div className="row">
            <div className="col-md-12">
              {Object.keys(list).length > 0 ? <DynamicFieldSet join={obj} joinType={this.state.joinType} connection={this.props.connection} parentEl={this} rootEl={this.props.parentEl} ref={this.props.connection.id} handleSubmit={this.handleSubmit}></DynamicFieldSet> : {}}
            </div>


          </div>
        </Modal>
      </div>








    );
  }
}




export default JoinView;
