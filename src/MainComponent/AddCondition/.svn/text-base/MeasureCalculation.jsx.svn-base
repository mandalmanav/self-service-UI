import React, { Component } from 'react'
import { Select, Modal, Input, Radio } from 'antd';
const RadioGroup = Radio.Group;
const Option = Select.Option;

export default class MeasureCalculation extends Component {
    constructor(props) {
        super(props)
        let column = props.getColumnDetails(props.DataSources, [props.columnId], props.Tables.selectedIds)[0]
        column["cId"] = column.id;
        column["cName"] = column.name;
        column["cAlias"] = column.alias;
        column["calculation"] = "";
        column["isDerived"] = column.isDerived || false;

        this.state = {
            checkedList: [],
            indeterminate: true,
            checkAll: false,
            column,
            condition: 'AND',
            operator: "=",
            alias: column.alias,
            agg: "SUM"
        };
        this.handleCancel = this.handleCancel.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleAliasChange = this.handleAliasChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.operatorChanged = this.operatorChanged.bind(this)
        this.conditionChanged = this.conditionChanged.bind(this)
        this.changeAggregation = this.changeAggregation.bind(this)
    }
    handleCancel() {
        this.props.removeModal()
    }
    handleAliasChange(e) {
        this.setState({ alias: e.target.value })
    }
    operatorChanged(value) {
        this.setState({ operator: value })
        console.log(value)
    }
    conditionChanged(value) {
        this.setState({ condition: value })
    }
    handleOk() {
        let cId = new Date().getTime()
        debugger;
        this.props.addCondition([this.props.Dashboard.activeBO, {
            id: cId,
            alias: this.state.alias,
            colType: 'measure',
            column: this.state.column,
            condition: this.state.condition,
            operator: this.state.operator,
            value: this.state.operator != "BETWEEN" ? this.state.value1 : this.state.value1 + ' AND ' + this.state.value2,
            agg: this.state.agg

        }])
        this.props.runQuery()
        this.props.removeModal()
    }
    handleChange(e) {
        let obj = {}
        obj[e.target.id] = e.target.value
        this.setState(
            obj
        )
    }
    changeAggregation(e) {
        this.setState({
            agg: e.target.value,
        });
    }
    render() {
        return (
            <div>
                <Modal title="Add a Condition"
                    //   visible={true}
                    visible={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input onChange={this.handleAliasChange} value={this.state.alias} />
                        <br/><br/>
                    <Select defaultValue="AND" style={{ width:'25%',marginRight:'20px'}} onChange={this.conditionChanged}>
                        <Option value="AND">AND</Option>
                        <Option value="OR">OR</Option>
                    </Select>
                    
                    {this.state.column.alias}
                    <Select defaultValue="=" style={{ width:'25%',marginLeft:'20px'}} onChange={this.operatorChanged}>
                        <Option value="=">equals</Option>
                        <Option value="<>">Not Equals</Option>
                        <Option value="<">Less Than</Option>
                        <Option value=">">Greater Than</Option>
                        <Option value="BETWEEN">Between</Option>
                    </Select>
                    <br/><br/>
                    <Input value={this.state.value1} type="number" onChange={this.handleChange} id="value1" key="value1" />
                    {
                    this.state.operator == "BETWEEN"?
                    <Input value={this.state.value2} type="number" onChange={this.handleChange} id="value2" key="value2" />:false
}
 <br/><br/>
  Use Aggregation 
  <RadioGroup onChange={this.changeAggregation} value={this.state.agg}>
        <Radio value="">None</Radio>
        <Radio value="SUM">Sum</Radio>
        <Radio value="MIN">MINIMUM</Radio>
        <Radio value="MAX">MAXIMUM</Radio>
        <Radio value="AVG">AVERAGE</Radio>
        
      </RadioGroup>
</Modal>
                   
            </div>
        )
    }
}
