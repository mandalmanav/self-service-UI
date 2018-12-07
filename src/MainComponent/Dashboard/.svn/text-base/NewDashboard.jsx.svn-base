import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import "babel-polyfill";
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import "./css/gridlayout.css";
import "./css/resizable.css";
import "./css/jsplumbtoolkit-defaults.css";
import "./css/main.css";
import "./css/jsplumbtoolkit-demo.css";
import "./css/demo.css";
import { Input, Button, Modal } from 'antd';
import ChartComponent from '../visualization/ChartComponent.jsx';
import { addObjectToDashboard, removeObjectFromDashboard, updateObjectsOfDashboard } from '../../actions/ObjectAction.jsx'
import GridLayout from 'react-grid-layout';
import { Object } from 'core-js';
import DSImg from '../../assets/images/salesDS.svg';
import FilterPanel from './FilterPanel.jsx'
import earnsummaryimg from '../../assets/images/earningsummary.svg'
import totalspendingimg from '../../assets/images/totalspending.svg'

import filter from './filter.svg'
import closefilter from './closefilter.svg'

import { Menu, Dropdown, Icon,notification,message } from 'antd';
import { pinToWorkboard, addWorkboard, saveWorkboardValues } from '../../actions/WorkboardListAction.jsx';
import { orgUrl } from '../../constants/constants'

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="#">close</a>
        </Menu.Item>
    </Menu>
);
const getColumnDetails = (datasources, idArray, selectedIds) => {
    let result = [];
    for (var i = 0; i < idArray.length; i++) {
        let colId = idArray[i]
        datasources.map((ds) => {
            ds.tables.map((table) => {
                if (selectedIds.indexOf(table.id) == -1) {
                    return
                }
                table.dimensions.map((dimension) => {
                    if (dimension.id == colId)
                        result.push(dimension)
                })
                table.measures.map((measure) => {
                    if (measure.id == colId)
                        result.push(measure)
                })
            })
            // ds.calculations.map(calc=>{
            //     if(calc.id == colId)
            //         result.push(calc)
            // })
        })
    }
    return result;

}

class NewDashboard extends React.Component {
    constructor(props) {
        super(props)
        //  debugger;
        this.apply = this.apply.bind(this)
         this.openFilter = this.openFilter.bind(this)

  this.closeFilter = this.closeFilter.bind(this)
        this.state = {
              lWidth:'240px',
            rWidth:'calc(100% - 240px)',
            isLeftHidden:false,
            srightWidth: 1000,
            workboardId:'',
            showSuccess:false
        }
    }
    componentDidMount() {
        this.setState({ srightWidth: this.refs['sright'].clientWidth - 60 });

    }
    apply() {

        this.props.actions.apply(this.props.Parameters);



        Object.values(this.refs).forEach(it => {
            try { it.callData(); } catch (e) { }
        })

        this.refs['sfilter'].classList.remove('right_filter_section');
    }
    render() {
        var list = Object.assign({}, this.props.list);
        var self = this;
        var props = this.props;



        return (


            <div className="joint-section">

                <div ref={"sleft"} className="left-panel" style={{width:this.state.lWidth , height: "calc(100% - 50px)" }}>


                    <div className="dashboarddesignlist tcc__designer__left-wrapper">
                        <h3 className="tcc__designer__left-title">Charts</h3>


                        <ul className="tcc__designer__left-list">
                            {
                                Object.keys(list).map(function (key) {
                                    return <li draggable
                                        className="draggable" onDragStart={(e) => self.onDragStart(e, list[key], key)} >
                                        <label>{list[key].title}</label>
                                        <div className="imgsection" dangerouslySetInnerHTML={{ __html: list[key].img }}></div>
                                    </li>
                                })
                            }
                        </ul>

                    </div>

                    <p onClick={this.toggleLeftPanel.bind(this)} className="vericaltext">HIDE</p>
                </div>
                <div className="right-panel" ref={"sright"} style={{width:this.state.rWidth }}   >
                    <Modal 
                    visible={this.state.showSuccess}
                    onCancel = {()=>this.setState({showSuccess:false})}
                    footer={null}
                    >
                        <div >
                            <Icon type="smile" style={{ fontSize: "40px", color: "green" }} theme="outlined" />

                            &nbsp;&nbsp;&nbsp;Your dashboard is published. &nbsp;
              <a
                                style={{
                                    color: "#007bff",
                                    textDecoration: "underline"
                                }}  
                                onClick={() => {
                                    this.setState({showSuccess:false})
                                    window.open(`${orgUrl}?auth_token=${window.sessionStorage.getItem('accessToken')}#dashboard?id=${this.state.workboardId}&name=${this.props.workboardConfig.name}`)
                                }}>Click to open
             </a>
                        </div>
                    </Modal>
                    <div className="dashboarddesign-header" >

                        <div className="title"><span className="editable-icon"></span>
                            <Input type="text" onChange={this.saveWorkboardName.bind(self)} value={this.props.workboardConfig.name} />
                        </div>
                        <div className="filter_icon" onClick={this.openFilter} ><img src={filter} /></div>
                    </div>

                    <div className="dashboarddesign-body" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e)} >
                        <GridLayout className="layout"
                            onResizeStop={() => {

                                Object.values(this.refs).forEach(it => {
                                    try { it.resize(1); } catch (e) { }
                                })

                            }}
                            onLayoutChange={(l) => {
                                var obj = Object.assign({}, self.props.objectList);
                                l.map(item => {

                                    if (obj[item.i]) {

                                        obj[item.i]['position'] = Object.assign({}, item);
                                    }


                                })

                                self.update(obj)

                                l.map(item => {
                                    var a = self.refs[item.i];
                                    if (a)
                                        a.resize(1);


                                })
                                console.log(l)
                            }}


                            cols={48} rowHeight={10} width={this.state.srightWidth} >
                            {
                                Object.keys(self.props.objectList).map(function (key) {
                                    return <div className="kpi-section" key={self.props.objectList[key].id} data-grid={self.props.objectList[key].position}>
                                        <h6>{
                                            (self.props.list || self.props.objectList)[key] ? (self.props.list || self.props.objectList)[key].title : self.props.objectList[key].title

                                        }

                                            <Dropdown className="textcolor" placement="bottomRight" overlay={(
                                                <Menu>
                                                    <Menu.Item key="0">
                                                        <a onClick={(e) => { self.remove(self.props.objectList[key].id) }}  >close</a>
                                                    </Menu.Item>
                                                </Menu>
                                            )} trigger={['click']}>
                                                <a className="ant-dropdown-link" >
                                                    <i class="zmdi zmdi-more"></i>
                                                </a>
                                            </Dropdown>

                                        </h6>
                                        <ChartComponent getColumnDetails={getColumnDetails} activeBO={key} {...props} configuration={self.props.objectList[key].completeConfiguration} ref={self.props.objectList[key].id} />
                                    </div>
                                })}

                        </GridLayout>
                    </div>


                   

                </div> 
                <div className="cc__selfservice__footer">


                        <div className="cc__col-2 cc__flex cc__flex-end">
                            <div className="cc__col-2 cc__flex cc__flex_align--center">
                                <button className="cc__ss__button" onClick={() => {
                                    this.props.changeTab(2);
                                    this.props.history.push("/visualization")
                                }}> Back</button>
                            </div>
                            <button className="cc__ss__button" onClick={this.pinToworkboard.bind(this)}>Publish</button>
                        </div>
                    </div>
                <div className="width0" ref={"sfilter"} >
                    <h2>Filters <span onClick={this.closeFilter} className="filter_icon1" style={{ float: "right" }}><img src={closefilter} /> </span></h2>
                    <div className="filter_body_section">


                        <FilterPanel {...props}></FilterPanel>
                    </div>
                    <div className="filter_body_footer">
                        <Button onClick={this.apply}>apply</Button>
                    </div>

                </div>
            </div>

        )
    }
    remove(id) {
        this.props.actions.removeObjectFromDashboard(id);
    }
    addWorkboard() {

        this.props.actions.addWorkboard({ repositoryId: Number(0), name: this.props.workboardConfig.name, configuration: JSON.stringify(this.props.workboardConfig) }, this, "")
    }
    saveWorkboardName(e) {

        //   this.props.workboardConfig.name=name;
        this.props.actions.saveWorkboardValues({ key: "name", value: e.target.value });
    }
    update(obj) {
        this.props.actions.updateObjectsOfDashboard(obj);

    }
    onDragStart(ev, objectLi, id) {
        if (this.props.objectList[id]) {
            ev.preventDefault();
        }

        objectLi['i'] = id;
        objectLi['id'] = id;
        objectLi['element'] = id;

        objectLi['position'] = (objectLi['position'] ? objectLi['position'] : { h: 10, w: 24, minW: 10, minH: 4, x: 0, y: 0, i: id })

        delete objectLi.configuration.chart.renderTo;
        delete objectLi.completeConfiguration.chart.renderTo;

        ev.dataTransfer.setData('text', JSON.stringify(objectLi))
    }
    onDragOver = (ev) => {
        ev.preventDefault();
    }
    onDrop = (ev) => {
        var self = this;

        try {
            var obj = JSON.parse(ev.dataTransfer.getData("text"));
            this.props.actions.addObjectToDashboard(obj);
            setTimeout(function () {
                var a = self.refs[obj.id];
                if (a) {
                    a.draw(1);
                    a.resize(1);
                }
            }, 300)

        } catch (e) { }
    }

openFilter(){

 this.refs['sfilter'].classList.add('right_filter_section')

}
closeFilter(){

 this.refs['sfilter'].classList.remove('right_filter_section')

}

    componentDidMount() {
        var self = this;
        Object.values(this.props.objectList).map(obj => {
            setTimeout(function () {
                var a = self.refs[obj.id];
                if (a) {
                    a.draw(1);
                    a.resize(1)
                }
            }, 300)


        })

    }


    prepareQuery(query) {
        var self = this;



        var obj = self.props.Parameters;
        if (query.indexOf('WHERE') == -1) {
            var subscript = '';
            Object.keys(obj).map((itm, i) => {
                if (i == 0) {
                    subscript += 'WHERE';
                }

                if (subscript.length > 10) {
                    subscript += ' AND '
                }
                subscript += '( ' + obj[itm].tName + '.' + obj[itm].cName + ' in (${' + itm + '}) OR "All" in  (${' + itm + '})    ) ';
                // subscript+=' '+ obj[itm].tName+'.'+obj[itm].cName+' in '+JSON.stringify(obj[itm].value).replace('[','(').replace(']',')')+' ';






            })

            if (query.split('GROUP BY').length > 1) {
                query = query.split('GROUP BY')[0] + subscript + 'GROUP BY' + query.split('GROUP BY')[1]
            } else {
                query += subscript;

            }
            //console.log(query)

        } else {


            Object.keys(obj).map((itm, i) => {
                var wh = query.indexOf('WHERE');
                var gb = query.indexOf('GROUP BY');
                var len = (obj[itm].tName + '.' + obj[itm].cName + ' ').length - 1;
                var index = query.lastIndexOf(obj[itm].tName + '.' + obj[itm].cName + ' ', wh);
                if (index > -1 && index < gb) {

                    var ix = len + index;
                    var andindex = query.indexOf('AND', ix);

                    if (andindex < gb && andindex != -1) {
                        query = query.splice(ix, andindex - 1 - ix, ' in (${' + itm + '}) ');

                    } else {
                        query = query.splice(ix, gb - ix, ' in (${' + itm + '}) ');


                    }

                } else if (index == -1) {
                    query = query.splice(gb - 1, 0, 'AND ' + obj[itm].tName + '.' + obj[itm].cName + '  in (${' + itm + '}) ');



                }




            })

            //console.log(query)

        }
        query = query.replace(/'/g, "''");

        query = query.replace(/"/g, "'");
        console.log(query);

        return query;
    }
    pinToworkboard() {
        var self = this;

        var object = [];

        Object.values(self.props.objectList).map((itm) => {
            var multiGridConfiguration = {
                "configuration": {
                    "export": false,
                    "modalView": false,
                    "schedule": false,
                    "title": "CSO Detailed Savings"
                },
                "height": "22",
                "itemType": "",
                "type": "multi-grid-element",
                "width": "48",
                "x": "0",
                "y": "0"
            }



            var item = Object.assign({}, itm);



            var aa = Object.assign({}, multiGridConfiguration);
            aa.configuration.title = item.title;
            aa.x = item.position.x;
            aa.y = item.position.y;
            aa.height = item.position.h;
            aa.width = item.position.w;

            var obj = { "uniqueid": item.id, "name": item.title, createMultiGrid: "true", "multigridConfiguration": aa, "objectConfiguration": { x: 0, y: 0, height: item.position.h - 3, width: 48, configuration: item.configuration, type: 'chart-element', name: item.title, listeners: Object.keys(self.props.Parameters).concat(['pTemp']) }, "logic": { "datasourceName": self.props.DataSources[0].dbName, "query": btoa(self.prepareQuery(self.props.list[item.id].sql)) }, "type": "sql" }


            if (item.businessLogicId) {
                obj['businessLogicId'] = item.businessLogicId;

            }
            if (item.bussinessObjectId) {
                obj['bussinessObjectId'] = item.bussinessObjectId;

            }

            if (item.multigridId) {
                obj['multigridId'] = item.multigridId;

            }


            object.push(Object.assign({}, obj))

        })

        Object.values(self.props.Parameters).map((itm) => {

            var item = Object.assign({}, itm);



            var obj = {
                "uniqueid": item.id, "name": item.name, createMultiGrid: "false", "objectConfiguration": {
                    "affected": [],
                    "cascadingFilter": false,
                    "configuration": {
                        "key": item.id,
                        "keyIndex": 0,
                        "name": item.name,
                        "selectvalue": [
                            0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40
                        ],
                        "showFilter": true,
                        "valueIndex": 0
                    },
                    "filterType": "multiselect",
                    "height": "1",
                    "listeners": ["pTemp"],
                    "order": 2,
                    "type": "filter-element",
                    "width": "24",
                    "x": "0",
                    "y": "0"
                }, "logic": { "datasourceName": self.props.DataSources[0].dbName, "query": btoa(item.sql) }, "type": "sql"
            }


            if (item.businessLogicId) {
                obj['businessLogicId'] = item.businessLogicId;

            }
            if (item.bussinessObjectId) {
                obj['bussinessObjectId'] = item.bussinessObjectId;

            }

            if (item.multigridId) {
                obj['multigridId'] = item.multigridId;

            }


            object.push(Object.assign({}, obj))

        })
        self.props.workboardConfig.parameters = Object.assign(self.props.workboardConfig.parameters, self.props.Parameters)
        var f = {
            "configuration": JSON.stringify(self.props.workboardConfig),
            "name": self.props.workboardConfig.name,
            "repositoryId": 262,
            "objects": object,
            "connectionId": self.props.selectedDs[0]

        }
        if (self.props.workboardConfig.id) {
            f['workboardId'] = self.props.workboardConfig.id;

        }

        console.log(f);


        self.props.actions.pinToWorkboard(f, self, '', (response) => {
            
            if(response.data.status.code === "200" )
            {
                self.setState({workboardId:response.data.data.id , showSuccess:true})
           
            }response.data.status.code === "400" ? message.error('Required parameter cound not be null') : null
            response.data.status.code === "500" ? message.error('Failed-to-connect') : null
        })

    }

    toggleLeftPanel = (e) => {
             var self = this;
       if(!this.state.isLeftHidden){
        this.setState({
            lWidth:'0px',
            rWidth:'100%',
            isLeftHidden:true
        })
       }
       else{
        this.setState({
            lWidth:'240px',
            rWidth:'calc(100% - 240px)',
            isLeftHidden:false
        })
       }


 // this.refs['sfilter'].className.indexOf('right_filter_section') == -1 ? this.refs['sfilter'].classList.add('right_filter_section') : this.refs['sfilter'].classList.remove('right_filter_section');
        this.setState({ srightWidth: this.refs['sright'].clientWidth - 60 });
        setTimeout(function () {
            Object.values(self.refs).forEach(it => {
                try { it.resize(1); } catch (e) { }
            })
        }, 500)

    }



  
}


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            addWorkboard, saveWorkboardValues,
            saveParameter: obj => dispatch({ type: "UPDATE_PARAM", payLoad: obj }),
            apply: obj => dispatch({ type: "UPDATE_DASHBOARD_PARAM", payLoad: obj }),

            addObjectToDashboard, removeObjectFromDashboard, updateObjectsOfDashboard, pinToWorkboard
        }, dispatch)
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.SavedObjects,
        objectList: state.SavedDashboardObjects,
        workboardConfig: state.WorkboardList,
        selectedDs: state.Tables.selectedDs,
        DataSources: state.DataSources,
        Dashboard: state.Dashboard,
        Join: state.Join,
        Tables: state.Tables,
        Parameters: state.Dashboard.parameters,
        DashboardParameters: state.Dashboard.appliedParameters
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDashboard);
