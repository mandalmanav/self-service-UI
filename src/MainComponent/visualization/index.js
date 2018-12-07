import React, { Component } from 'react'
import Dimesions from './Dimensions'
import Measures from './Measures'
import ColumnDropSection from './ColumnDropSection'
import DashboardSection from './DashboardSection'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MeasureDimension from './MeasureDimension'
import DashboardContainer from './../../containers/DashboardContainer'
import FilterSection from './FilterSection'
import CSS from './css/visualization.css'

import { Input, Button, notification } from 'antd'
import ChartComponent from './ChartComponent'
import FormatterComponent from './Formatter'
import makeRequest from '../../utilities/MakeRequest'

import DSImg from '../../assets/images/salesDS.svg'
import 'antd/dist/antd.css';

// class App extends React.Component {
//     state = {
//       value: 1,
//     }


class index extends Component {
    constructor(props) {
        super(props)
        this.updateTitle = this.updateTitle.bind(this)
        this.runQuery = this.runQuery.bind(this)
        this.refreshChart = this.refreshChart.bind(this)
        this.child = React.createRef();
        this.formatterRef = React.createRef();
        this.changeChartType = this.changeChartType.bind(this)
        this.saveBusinessObject = this.saveBusinessObject.bind(this)
        this.addBusinessObject = this.addBusinessObject.bind(this)
        this.state = {
            value: 1,
            data: {

            },
            showChart: false
        }

    }


    changeChartType(e) {
        this.child.current.changeChartType(e.target.id)
    }
    updateTitle(e) {
        this.props.updateBOTitle([this.props.Dashboard.activeBO, e.target.value])
    }
    refreshChart = (bit = 0) => {
        this.child.current.draw(bit);
    }
    runQuery() {
        let props = this.props
        let businessObjects = props.Dashboard.businessObjects;
        let activeBo = props.Dashboard.activeBO
        let dims = props.getColumnDetails(props.DataSources, businessObjects[activeBo].dims, props.Tables.selectedIds)
        let meas = props.getColumnDetails(props.DataSources, businessObjects[activeBo].meas, props.Tables.selectedIds)
        let conditions = businessObjects[activeBo].conditions.map(condition => {
            return { ...condition.column, operator: condition.operator, agg: condition.agg, value: typeof condition.value == 'object' ? condition.value : [condition.value], condition: condition.condition, operator: condition.operator }
        })
        dims = dims.map(dim => {
            return {
                ...dim, ...{
                    cId: dim.id,
                    cName: dim.name,
                    cAlias: dim.alias,
                    isDerived: dim.isDerived || false,
                    "calculation": "",
                    "isTransformed": false,
                    agg: dim.aggregation == null ? "" : dim.aggregation
                }
            }
        })
        meas = meas.map(dim => {
            return {
                ...dim, ...{
                    cId: dim.id,
                    cName: dim.name,
                    cAlias: dim.alias,
                    isDerived: dim.isDerived || false,
                    "calculation": "",
                    "isTransformed": false,
                    agg: dim.aggregation == null ? "" : dim.aggregation
                }
            }
        })
        if (!meas.length) {
            this.setState({ showChart: false })
            return
        }

        if (!this.state.showChart)
            this.setState({ showChart: true })
        let joins = props.Join
        let condition
        let data = {
            "data": {
                "connectionId": this.props.DataSources[0].conId,
                dims,
                meas,
                "Filters": [],
                conditions,
                joins
            }
        }
        makeRequest.post('queryengine/generateData', data)
            .then((response) => {
                this.props.setSql([this.props.Dashboard.activeBO, response.data.data.finalQuery])
                if (response.data.data.resultSet.length == 0) {
                    notification['warning']({
                        message: 'Dashboard',
                        description: `No result found for this query`,
                    });
                    return
                }
                this.props.setData([activeBo, response.data.data])
                this.setState({ data: response.data.data }, () => {
                    this.refreshChart();
                })
            })
            .catch((error) => {
                console.error(error)
            })

    }
    saveBusinessObject() {
        let props = this.props
        let activeBo = this.props.Dashboard.activeBO
        let bo = this.props.Dashboard.businessObjects[activeBo]
        delete bo.completeConfiguration.chart.renderTo;
        let img = ''
        //    makeRequest.post('publish/convertSvgToBase64',{
        //        data:{
        //          images:[{
        //              id:1993,
        //             svg: this.child.current.getSvg()
        //          }  ]
        //        }
        //    })
        //    .then(response=>{
        //        if(response.data.data){
        //            img= this.child.current.getSvg()
        //        }
        //        this.props.saveBO({
        //         id: activeBo,
        //         img:img,
        //         configuration: bo.configuration,
        //         completeConfiguration:bo.completeConfiguration,
        //         sql: bo.sql,
        //         title: bo.title
        //     })
        //     notification['success']({
        //         message: 'Dashboard',
        //         description: `Kpi ${this.props.Dashboard.businessObjects[props.Dashboard.activeBO].title} Saved`,
        //       });
        //    })
        //    .catch((err)=>{
        this.props.saveBO({
            id: activeBo,
            img: this.child.current.getSvg(),
            configuration: bo.configuration,
            completeConfiguration: bo.completeConfiguration,
            sql: bo.sql,
            title: bo.title
        })
        notification['success']({
            message: 'Dashboard',
            description: `Kpi ${this.props.Dashboard.businessObjects[props.Dashboard.activeBO].title} Saved`,
        });
        // }) 


    }
    addBusinessObject() {
        let id = new Date().getTime()
        this.props.addBO(id)
        this.setState({ showChart: false })
        this.formatterRef.current.setStateFromProps()
    }
    toggleLeftPanel = (e) => {
        this.refs['sleft'].style.width == "" ? this.refs['sleft'].style.width = "0px" : this.refs['sleft'].style.width == "0px" ? this.refs['sleft'].style.width = "240px" : this.refs['sleft'].style.width == "240px" ? this.refs['sleft'].style.width = "0px" : this.refs['sleft'].style.width = "240px"

    }
    componentDidMount() {
        if (this.props.Dashboard.businessObjects[this.props.Dashboard.activeBO].meas.length)
            this.setState({ showChart: true })
    }
    setBusinessObjectActive(e) {
        let id = e.target.id
        let activeBo = this.props.Dashboard.activeBO;
        if (id == activeBo)
            return
        else
            this.props.setBOActive(id)
        let conf = this.props.Dashboard.businessObjects[id].completeConfiguration || {}
        if (!Object.keys(conf).length) {
            this.setState({ showChart: false })
            return
        }

        this.setState({
            showChart: true
        }, () => {
            this.refreshChart(1)
            this.formatterRef.current.setStateFromProps()
        })
        

    }
    render() {
        var divStyle = {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };
        var borderStyle = {
            border: '1px solid'
        }
        let props = this.props;
        let businessObjects = Object.keys(this.props.Dashboard.businessObjects);
        return (
            <div className="joint-section">
                <div ref={"sleft"} className="left-panel" style={{height:'calc(100% - 50px)'}}>
                   

                    <div className="visulisation">
                        <MeasureDimension runQuery={this.runQuery} label="Fields" {...props} type="dimension" />
                        <MeasureDimension runQuery={this.runQuery} label="Measures" {...props} type="measure" />
                        <FilterSection {...props} />
                    </div>

                    <p onClick={this.toggleLeftPanel.bind(this)} className="vericaltext">
                        HIDE
                </p>
                </div>

                <div className="right-panel">
                    <div className="visulisation-header">
                        
                        <div className="flexcolumn">
                            <ColumnDropSection runQuery={this.runQuery} label="Columns " type="dimension" {...props} />
                            <ColumnDropSection runQuery={this.runQuery} label="Rows " type="measure" {...props} />
                            <ColumnDropSection runQuery={this.runQuery} label="Conditions " type="condition" {...props} />

                        </div>
                       

                    </div>

                    <div className="visulisation-body">

                        {/* <div className="chart-section" style={{ position: 'absolute', bottom: '75px',top: '142px',  right: ' 20px', left: '20px'}}>
                             <div className="chart-header">
                                <ul>
                                    <p>Chart<label>Type</label></p>
                                    {this.state.chartTypes.map(chart => {
                                        return (
                                            // <li disabled={chart.isDisabled} title={chart.title} key={chart.name} ><i onClick={this.changeChartType} id={chart.name}  className={chart.className}></i></li>
                                            <li disabled={chart.isDisabled} title={chart.title} key={chart.name} ><img onClick={this.changeChartType} id={chart.name} style={{ width: '30px', height: '30px', ...chart.style }} src={chart.chartIcon} className={chart.className} /></li>

                                        )
                                    })}
                                </ul>
                                {<span className="settingIcon"><i className="zmdi zmdi-settings"></i></span> }

                            </div> 
                             <div className="chart-body" style={{width:'80%',height: '92%'}}>
                                {
                                     this.state.showChart ? 
                                    <ChartComponent showChart={this.state.showChart} configuration={this.props.Dashboard.businessObjects[this.props.Dashboard.activeBO].completeConfiguration || {chart:{}}} data={this.state.data} ref={this.child} {...props} /> 
                                     : false
                                }
                            </div>
                            <div className="chart-body chart-formatting" style={{width:'20%',
                            width: '20%',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            border: '1px solid',

                        }}>
                                <FormatterComponent formatter={props.Dashboard.businessObjects[props.Dashboard.activeBO].formatter || {}} data={this.state.data} refreshChart={this.refreshChart} {...props}/>
                            </div>
                            
                        </div> */}
                        <div className="create__kpi-title"><span className="editable-icon"></span>
                            <Input type="text" onChange={this.updateTitle} value={props.Dashboard.businessObjects[props.Dashboard.activeBO].title} />
                        </div>
                        <div className="chartSection" >{
                            this.state.showChart ?
                                <ChartComponent showChart={this.state.showChart} configuration={this.props.Dashboard.businessObjects[this.props.Dashboard.activeBO].completeConfiguration || { chart: {} }} data={this.state.data} ref={this.child} {...props} />
                                : false
                        }</div>

                        <FormatterComponent ref={this.formatterRef} changeChartType={this.changeChartType} data={this.state.data} refreshChart={this.refreshChart} {...props} />



                    </div>






                    {/* <div className="visulisation-footer">
                        {
                            
                            businessObjects.map(bo => {
                                let bObject = this.props.Dashboard.businessObjects[bo]
                                return <Button
                                    key={bo}
                                    id={bo}
                                    onClick={this.setBusinessObjectActive.bind(this)}
                                >
                                    {bObject.title}</Button>
                            })
                        }
                
                        <div style={{ float: 'right' }}>
                            <Button onClick={this.addBusinessObject} style={{ marginRight: '10px' }}>Add BO</Button>
                            <Button onClick={this.saveBusinessObject}>Save</Button>
                        </div>
                    </div> */}

                </div>
          <div className="cc__selfservice__footer">
                    <div className="cc__col-2 cc__flex cc__flex_align--center">
                        <button className="cc__ss__button" onClick={()=>{
                            this.props.changeTab(1);
                            this.props.history.push("/JointPanel")
                        }}> Back</button>

                        <div className="datakpi-list" style={{marginLeft: '20px'}}>
                            <ul>
                                {/* {
                                        businessObjects.map(bo => {
                                            let bObject = this.props.Dashboard.businessObjects[bo]
                                            return
                                            
                                                <li key={bo} id={bo} onClick={this.setBusinessObjectActive.bind(this)} ><span><i class="zmdi zmdi-view-dashboard"></i></span>
                                                    <label for="">{bObject.title}</label>
                                                </li>
                                            
                                        })
                                    } */}
                                {

                                    businessObjects.map(bo => {
                                        let bObject = this.props.Dashboard.businessObjects[bo]
                                        let activeBo=  this.props.Dashboard.activeBO
                                        return <li key={bo} id={bo} class={activeBo == bo?'active':''} onClick={this.setBusinessObjectActive.bind(this)} ><span key={bo} id={bo}><i key={bo} id={bo} class="zmdi zmdi-view-dashboard"></i></span>
                                            <label for="" key={bo} id={bo}>{bObject.title}</label>
                                        </li>
                                    })
                                }

                                <span className="addIcon" onClick={this.addBusinessObject}><i class="zmdi zmdi-plus-circle-o"></i></span>
                            </ul>
                        </div>
                    </div>

                   
                <div className="cc__col-2 cc__flex cc__flex-end cc__flex_align--center">
                <a  className="cc__ss__button" onClick={this.saveBusinessObject} style={{"marginRight":"10px"}}>Save</a>
                        
                        <a  className="cc__ss__button" onClick={()=>{
                            this.props.changeTab(3);
                            this.props.history.push("/newDashboard")
                        }}>Next</a>
                   
                </div>
                </div>

            </div>

        )
    }
}
export default DragDropContext(HTML5Backend)(index);

