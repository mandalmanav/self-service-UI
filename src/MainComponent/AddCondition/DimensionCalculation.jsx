import React, { Component } from 'react'
import { Checkbox } from 'antd';
import { Modal, Select, Input } from 'antd';
import 'antd/dist/antd.css';
import makeRequest from '../../utilities/MakeRequest'
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;


export default class DimensionCalculation extends Component {
    constructor(props) {
        super(props)
        let column = props.getColumnDetails(props.DataSources, [props.columnId], props.Tables.selectedIds)[0]
        //call the select columnName api here
        this.state = {
            checkedList: [],
            indeterminate: true,
            checkAll: false,
            allOptions:[],
            column,
            condition: 'AND',
            operator: "=",
            alias: column.alias
        };
        this.handleCancel = this.handleCancel.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleAliasChange = this.handleAliasChange.bind(this)

    }
    componentDidMount(){
        let dim =this.state.column

        dim ["cId"]=dim.id
        dim ["cName"]=dim.name
        dim ["cId"]=dim.id
        dim ["cAlias"]=dim.alias
        dim ["isDerived"]=false
        dim ["agg"]="DISTINCT"
        dim ["calculation"]=""
        
        let data = {
            "data": {
                "connectionId": this.props.DataSources[0].conId,
                dims:[dim],
                meas:[],
                "Filters": [],
                conditions:[],
                joins:this.props.Join
            }
        }
        makeRequest.post('queryengine/generateData', data)
            .then((response) => {
                if(response.data.data.resultSet){
                   let values =  response.data.data.resultSet.map(arr=>arr[0]) 
                   this.setState({allOptions:values})
                }
                
                
            })
            .catch((error) => {
                console.error(error)
            })

    }
    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < this.state.allOptions.length),
            checkAll: checkedList.length === this.state.allOptions.length,
        });
    }

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? this.state.allOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }
    operatorChanged(value) {
        this.setState({ operator: value })
        console.log(value)
    }
    conditionChanged(value) {
        this.setState({ condition: value })
    }
    handleCancel() {
        this.props.removeModal()
    }
    handleOk() {
        this.props.addCondition([this.props.Dashboard.activeBO, {
            id: new Date().getTime(),
            alias: this.state.alias,
            colType: 'dimension',
            condition: this.state.condition,
            operator: this.state.operator,
            value: this.state.checkedList,
            column:this.state.column,
            agg:""
        }])
        this.props.runQuery()
        this.props.removeModal()
    }
    handleAliasChange(e) {
        this.setState({ alias: e.target.value })
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
                        <Option value="=">In</Option>
                        <Option value="<>">Not In</Option>
                    </Select>


                    <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            Check all
                        </Checkbox>
                    </div>
                    <br /><br/>
                    <CheckboxGroup options={this.state.allOptions} value={this.state.checkedList} onChange={this.onChange} />
                </Modal>
            </div>
        )
    }
}
