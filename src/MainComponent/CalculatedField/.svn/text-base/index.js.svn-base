import React, { Component } from 'react'
import { Modal } from 'antd'
import { AutoComplete, Input, Button } from 'antd';
import uuid from 'uuid'
import { DropTarget } from 'react-dnd';
import MakeRequest from '../../utilities/MakeRequest';
import { Alert } from 'antd';

const Option = AutoComplete.Option;
const { TextArea } = Input;



function collect(connect, monitor) {

    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()

    };
}
const boxTarget = {
    drop(props, monitor, component) {

        let item = monitor.getItem();
        console.log(item)

        let column = props.getColumnDetails(props.DataSources, [item.id], props.Tables.selectedIds)
        console.log(column)
        let formulaColumns = component.state.formulaColumns;
        formulaColumns.push(column[0])
        let formula = component.state.formula
        if (item.type == "measure")
            formula += `[${column[0].tAlias}.${column[0].alias}]`
        else
            formula += `length([${column[0].tAlias}.${column[0].alias}])`
        component.setState({ formula })
        component.setState({ formulaColumns })
        component.validate(formula)
    }
}
@DropTarget('label', boxTarget, collect)

export default class index extends Component {
    constructor(props) {
        super(props)
        let id = new Date().getTime()
        this.state = {
            id,
            visible: true,
            formulaColumns: [],
            formula: '',
            operators: ['-', '+', '%', '(', ')', '*'],
            inputValue: "",
            invalidExpression: false,
            title: "",
            showAlert: false,
            errorDescription: ''
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.validate = this.validate.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.titleChange = this.titleChange.bind(this)
        this.onClose = this.onClose.bind(this)

    }
    handleCancel() {
        this.props.removeCalculated()
    }
    onSelect(value) {
        this.setState({ inputValue: '', formula: this.state.formula + (this.state.operators.indexOf(value) == -1 ? "[ " + value + " ]" : " " + value) })
        this.validate(this.state.formula + (this.state.operators.indexOf(value) == -1 ? "[ " + value + " ]" : " " + value))
    }
    validate(value) {

        let expression = value.replace(/\[(.*?)\]/g, '(5)')
        expression = expression.replace(/length\((.*?)\)/g, '(5')
        expression = expression.replace(/count\((.*?)\)/g, '(5')
        expression = expression.replace(/avg\((.*?)\)/g, '(5')

        try {
            console.log(expression)
            eval(expression)
            this.setState({ invalidExpression: false })
        } catch (error) {
            this.setState({ invalidExpression: true })
        }


    }
    handleChange(event) {
        let value = event.target.value;
        this.setState({ formula: value });
        this.validate(value)
    }
    handleSearch(value) {
        this.setState({
            inputValue: value,
            dataSource: !value.length ? this.state.dataSourceOriginal : this.state.dataSource.filter(item => item.indexOf(value) != -1)
        })
    }
    handleOk(e) {
        let props = this.props
        if (!this.state.title.trim().length) {
            this.setState ({ errorDescription:"Name cannot be blank"})
            this.setState({ showAlert: true })
            return
        }
        if (this.state.invalidExpression) {
            alert("invalid expression")
            return
        }
        let formula = this.state.formula;

        let name_alias = {};
        props.Tables.selectedIds.map(tId => {
            let t = props.Tables.object[tId]
            name_alias[t.alias] = t.name
        })
        for (var alias in name_alias) {
            formula = formula.replace(alias, name_alias[alias])

        }
        formula = formula.replace(/\[/gi, '')
        formula = formula.replace(/\]/gi, '')

        let data = {
            "data": {
                "connectionId": 157,
                dims: [],
                meas: [{
                    agg: "",
                    tId: "",
                    tName: "",
                    cAlias: "",
                    cName: formula,
                    calculation: '',
                    isTransformed: false,
                    cAlias: 'aa',
                    isDerived: true,
                    cId: this.state.id
                }],
                limit: 100,
                "Filters": [],
                conditions: [],
                joins: props.Join
            }
        }
        MakeRequest.post('queryengine/generateData', data)
            .then((response) => {

                console.log(response)
            })
            .catch((err) => {
                console.error(err)
            })
        // let props = this.props, ds = props.DataSources[0];
        // if (!this.state.title.trim().length) {
        //     alert("enter name")
        //     return
        // }
        let ds = props.DataSources[0]
        let tId = props.Tables.selectedIds[props.Tables.selectedIds.length - 1]
        let table = ds.tables.filter(table => table.id == tId)[0]
        table.measures.push({
            id: new Date().getTime(),
            name: formula,
            alias: this.state.title,
            dataType: "Integer",
            isVisible: true,
            isDerived: true,
            formula: formula,
            tName: table.name,
            tId: table.id,
            "isTransformed": false,
            "aggregation": ""
        })
        this.props.updateDS(ds)
        this.props.removeCalculated()
    }
    titleChange(e) {
        this.setState({ title: e.target.value })
    }
    componentDidMount() {
        this.setState({ title: "CF_" + Math.floor(Math.random() * 1000) + 1 })
    }
    onClose() {
        this.setState({ showAlert: false })
    }
    render() {
        const { connectDropTarget, canDrop, isOver } = this.props;
        return (
            connectDropTarget(
                <div className="addcalculatedpopup">
                    {
                    this.state.showAlert?
                    <Alert
                        message="Error"
                        description={this.state.errorDescription}
                        type="error"
                        closable
                        onClose={this.onClose}
                    />:false
                    }
                    <h2 className="">Calculated Measure <span><i className="zmdi zmdi-close" onClick={this.handleCancel}></i></span></h2>
                    <div className="addcalculated-body">
                        <input type="text" className="form-control" onChange={this.titleChange} value={this.state.title} />
                        <br />
                        <TextArea className="form-control" onChange={this.handleChange} value={this.state.formula} />
                        {this.state.invalidExpression ? <div className="error-text">Calculation has error</div> : ''}
                        <br />
                        <label>Drag columns here..</label>
                    </div>
                    <div className="addcalculated-footer">
                        <div className="bttndiv">
                            <Button onClick={this.handleCancel}>Cancel</Button>
                            <Button className="orange" onClick={this.handleOk}>Save</Button>
                        </div>
                    </div>

                </div>
            )
        )
    }
}
