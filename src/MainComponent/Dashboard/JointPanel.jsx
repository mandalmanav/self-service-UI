import React from 'react';
import { connect } from 'react-redux';
import ReactDom from "react-dom";
import Loader from 'react-loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import "babel-polyfill";
import { jsPlumb } from "jsplumb";
import $ from 'jquery';
import { bindActionCreators } from 'redux'
import { Select, Modal, Input } from 'antd';
import "./css/gridlayout.css";
import "./css/resizable.css";
import JoinView from './JoinView.jsx';
import "./css/jsplumbtoolkit-defaults.css";
import "./css/main.css";
import "./css/jsplumbtoolkit-demo.css";
import "./css/demo.css";
import { fetchDatasource } from '../../actions/DataSourceListAction.jsx';
import TableVisualization from './TableVisualization.jsx';
import { joinsAction, fetchAllTable, fetchTables, selectTable } from '../../actions/TableListAction.jsx';
import DSImg from '../../assets/images/icon-ds.png';
import previewImg from '../../assets/images/previewImg.svg'


const DAG_CONTAINER_ID = "canvas";

const Option = Select.Option;



class JointPanel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            lWidth:'240px',
            rWidth:'calc(100% - 240px)',
            isLeftHidden:false,
            list: [], currentSingleTable: 0, singleTable: {}, singleTableLimit: 10, largeTableLimit: 10, largeTableActive: false, singleTableActive: false, largeTable: {}, instance: {}, joiningObject: { sourceColumns: [], targetColumns: [] },
            listFilter:"",
            selectedKeys: [],
            visible: false,
            tasks: [],
            originalTask: [],
            currentJoin: "Inner Join",
            FirstTable: { name: "", column: [] },
            SecondTable: { name: "", column: [] },
            FirstColumn: "",
            SecondColumn: "",
            GraphicData: []
        }
    }
    handleChange = () => {

    }

    updateJoin = () => {

        var joins = [];
        var la = this.state.instance.getAllConnections()
        for (var i = 0; i < la.length; i++) {



            var jj = la[i].getData().join;
            jj['position'] = {
                source: { x: la[i].source.offsetLeft, y: la[i].source.offsetTop },
                dest: { x: la[i].target.offsetLeft, y: la[i].target.offsetTop }
            }
            joins.push(jj)
        }


        this.props.actions.joinsAction(joins, this)
    }


    onChangeLargeLimit(value) {
        this.setState({ largeTableLimit: value })

    }
    onChangesingleLimit(value) {
        this.setState({ singleTableLimit: value })

    }

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


    handleCancel = (e) => {
        this.setState({
            visible: false
        });



    }

    initNode = (el, bol, node) => {
        var self = this;

        // initialise draggable elements.
        self.state.instance.draggable(el);

        self.state.instance.makeSource(el, {
            filter: ".ep",
            anchor: "Continuous",
            connectorStyle: { stroke: "#5c96bc", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
            connectionType: "basic",
            extract: {
                "action": "the-action"
            },
            maxConnections: 10,
            onMaxConnections: function (info, e) {
                alert("Maximum connections (" + info.maxConnections + ") reached");
            }
        });

        self.state.instance.makeTarget(el, {
            dropOptions: { hoverClass: "dragHover" },
            anchor: "Continuous"
        });




        // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
        // version of this demo to find out about new nodes being added.
        //

        el.firstElementChild.firstElementChild.onclick = function (e) {


            this.root.state.instance.deleteConnectionsForElement(this.element);
            this.root.updateList(this.element.id, "pop")
            this.root.state.instance.remove(this.element.id)

        }.bind({ root: self, element: el })

        var aa = self.state.instance.fire("jsPlumbDemoNodeAdded", el);

        if (node) {

            self.autoConnect(el)

        }
    }

    autoConnect = (el) => {

        if (this.state.list.length > 1) {
            var self = this;
            var tables = this.props.TablesObject;





            var connect = {};
            var targetId = self.state.list[self.state.list.length - 1];
            var targetColumn = tables[targetId].dimensions.concat(tables[targetId].measures);
            var targetColumnObj = {};
            targetColumn.map((item_drill0) => {

                return targetColumnObj[item_drill0.name] = item_drill0;



            })
            var types = ["integer", "int", "bigint unsigned", "smallint", "tinyint", "mediumint", "bigint", "decimal", "numeric", "float", "double"];
            var targetObjKeys = Object.keys(targetColumnObj);
            for (var i = 0; i < self.state.list.length - 1; i++) {


                var sourceId = self.state.list[i];

                var sourceColumn = tables[sourceId].dimensions.concat(tables[sourceId].measures);
                var sourceColumnObj = {};
                sourceColumn.map((item_drill0) => {

                    return sourceColumnObj[item_drill0.name] = item_drill0;
                })
                var sourceObjKeys = Object.keys(sourceColumnObj);
                for (var j = 0; j < targetObjKeys.length; j++) {
                    if (sourceObjKeys.indexOf(targetObjKeys[j]) > -1) {
                        if (types.indexOf(targetColumnObj[targetObjKeys[j]].dataType.toLowerCase()) > -1 && types.indexOf(sourceColumnObj[targetObjKeys[j]].dataType.toLowerCase()) > -1) {

                            connect = { source: sourceId, target: targetId, destT: targetColumnObj[targetObjKeys[j]], sourceT: sourceColumnObj[targetObjKeys[j]], column: targetObjKeys[j] }
                            break;
                        }
                    }

                }

                if (Object.keys(connect).length) {
                    break;
                }

            }


            if (Object.keys(connect).length) {



                var item = {
                    sourceId: connect.source, destId: connect.target,
                    sourceAlias: tables[connect.source].alias, destAlias: tables[connect.target].alias,
                    source: tables[connect.source].name, dest: tables[connect.target].name,
                    operators: ["="],
                    joinType: "inner", conditions: [

                        tables[connect.source].name + "." + connect.sourceT.name + "=" + tables[connect.target].name + "." + connect.destT.name
                    ]
                }

                console.log(item)
                self.state.instance.connect({
                    source: String(connect.source),
                    target: String(connect.target),
                    type: "basic", parameters: item,
                    data: { join: item }
                })


                self.updateJoin()

            }
        }


    }
    updateList = (e, op) => {
        var aa = this.state.list;
        if (op == "push") {
            aa.push(e);
        }

        if (op == "pop") {


            aa.splice(aa.indexOf(e), 1)

        }


        if (op == "removeAll") {


            aa = []

        }

        this.setState({ list: aa });
        this.props.actions.selectTable(aa);


    }
    newNode = (x, y, id, name, items, bol) => {
        var d = document.createElement("div");

if(Object.keys(this.state.instance.getManagedElements()).length ==0){
     this.props.actions.fetchTables(items, "*", "single", this.state.largeTableLimit, this,true);
    

    
}
        d.className = "w joint-text";

        d.id = String(id);
        d.innerHTML = "<span><i class=\"close-X  zmdi zmdi-close-circle-o\" ></i></span><label>TABLE</label><p>" + name + "</p> <div class=\"ep\"></div>";
        d.style.left = x + "px";
        d.style.top = y + "px";
        this.state.instance.getContainer().appendChild(d);

        this.updateList(id, "push")
        if (!bol && Object.keys(this.state.instance.getManagedElements()).length > 0) {
            this.initNode(d, false, true);



        } else {
            this.initNode(d);

        }
        return d;
    };

    componentDidMount() {
        var self = this;
        var obj = { "connectionName": "ccplatform_qa", "type": "MYSQL", "url": "jdbc:mysql://10.90.21.46:3311/ccplatform_qa", "username": "bi_mkjaiswal", "password": "bi_user_Jis6hr@rshbox.app_bi", "driver": "com.mysql.jdbc.Driver", "metaDataName": "sdasd" }
        obj['schemaName'] = obj.connectionName;
        obj['datasourceName'] = obj.connectionName;
        if (!this.props.DataSources.length) {


            //  this.props.actions.fetchDatasource(obj,this) 
        }

        jsPlumb.ready(() => {


            self.state.instance = jsPlumb.getInstance({
                Endpoint: ["Dot", { radius: 2 }],
                Connector: "StateMachine",
                HoverPaintStyle: { stroke: "#1e8151", strokeWidth: 2 },
                ConnectionOverlays: [
                    ["Custom", {
                        create: function (component) {

                            var join = "inner";



                            var ob = $('<div  id=' + String(component.id) + '></div>')


                            return ob;
                        },
                        location: 0.5,
                        id: "customOverlay"
                    }]

                ],
                Container: DAG_CONTAINER_ID
            });

            self.state.instance.registerConnectionType("basic", { anchor: "Continuous", connector: "StateMachine" });

            window.jsp = self.state.instance;

            var canvas = document.getElementById(DAG_CONTAINER_ID);
            var windows = jsPlumb.getSelector(".statemachine-demo .w");

            self.state.instance.bind("connection", function (info, e) {
                if (info.sourceId == info.targetId) {
                    this.deleteConnection(info.connection)
                } else {


                    if (info.connection.getOverlay('customOverlay').canvas) {

                        var a = info.connection.getOverlay('customOverlay').canvas
                        var ab = document.createElement('div');

                        a.appendChild(ab)


                        const ob = <JoinView parentEl={self} connection={info.connection} />
                        ReactDom.render(ob, a)
                    } else {

                        setTimeout(function () {
                            var a = info.connection.getOverlay('customOverlay').canvas
                            var ab = document.createElement('div');

                            a.appendChild(ab)


                            const ob = <JoinView parentEl={self} connection={info.connection} />
                            ReactDom.render(ob, a)
                        }, 500)

                    }

                }

            });


            self.state.instance.batch(function () {
                for (var i = 0; i < windows.length; i++) {
                    self.initNode(windows[i], true);
                }





                self.addNodes();





            });

            jsPlumb.fire("jsPlumbDemoLoaded", self.state.instance);

        })

    }
    onChange1 = (value) => {
        this.setState({ SecondColumn: value });
    }
    handleMenuClick = (value) => {
        console.log("sdd");
    }

    onDragStart = (ev, item) => {

        if (this.state.instance.getManagedElements()[item.id]) {
            ev.preventDefault();
        }

        ev.dataTransfer.setData('text', JSON.stringify(item))


    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }
    getTableData(item, limit) {
        
        this.setState({ singleTableLimit: limit })

        if (item)
            this.props.actions.fetchTables(item, "*", "single", this.state.singleTableLimit, this);
        else
            this.props.actions.fetchTables(this.props.TablesObject[this.state.currentSingleTable], "*", "single", limit, this);

    }
    getJoinData(limit) {

        if (limit)
            this.props.actions.fetchTables(Object.values(this.props.TablesObject)[0], "*", "multiple", limit, this);
        else this.props.actions.fetchTables(Object.values(this.props.TablesObject)[0], "*", "multiple", this.state.largeTableLimit, this);

    }

    onDrop = (ev) => {


        try {
            var textobx = JSON.parse(ev.dataTransfer.getData("text"));


            this.newNode(ev.nativeEvent.offsetX, ev.nativeEvent.offsetY, textobx.id, textobx.alias, textobx, false)
        } catch (e) { }
    }


    render() {



        var self = this;


        var list = this.props.DataSources;


        const value = this.state.listFilter
        
        return (



            
            <div>
                <div className="joint-section">

                    <div ref={"sleft"} style={{width:this.state.lWidth , height: "calc(100% - 50px)" }} className="left-panel">


                        <div className="body" id="scrollbar">
                            <h3>Tables</h3>
<div style={{padding: "0 15px 10px"}}  >
<Input.Search placeholder="search table"  onSearch={value => this.setState({ listFilter:value }) } onChange={value => {  this.setState({ listFilter:value.target.value })} } />
    </div> 
                            <ul>
                                {list.map((item) => {

                                    return item.tables.filter(d => value === '' || d.alias.includes(value)).sort((a,b)=> {
                                        
                                        var nameA=a.alias.toLowerCase(), nameB=b.alias.toLowerCase()
                                        if (nameA < nameB) //sort string ascending
                                            return -1 ;
                                        if (nameA > nameB)
                                            return 1;
                                        return 0;
                                    }).map((item_drill0) => {
                                        return <li draggable onDoubleClick={(e) => { this.addOnClick(e, item_drill0) }}
                                            className="draggable" onDragStart={(e) => this.onDragStart(e, item_drill0)} ><div className="overflow-text"><i className="zmdi zmdi-grid"></i>{item_drill0.alias} <span className="iconRight" onClick={() => { self.setState({ visible: true, currentSingleTable: item_drill0.id, singleTable: {} }); self.getTableData(item_drill0) }} title="enter values"></span></div></li>

                                    })

                                })}
                            </ul>

                        </div>
                        <p onClick={this.toggleLeftPanel.bind(this)} className="vericaltext">
                            HIDE
                  </p>
                    </div>

                    <div ref={"sright"} style={{width:this.state.rWidth }} className="right-panel">
                        <div id={DAG_CONTAINER_ID} ref={"sdown"} onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, "column")} className="jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan jointpanel-one " >
                        </div>

                        <Modal title="Table Data"
                            visible={this.state.visible}
                            footer={null}
                            onCancel={this.handleCancel}>
                            <div>
                                <span className="">DATA</span>
                                <span className="">2 Tables with 45 Columns & 3001 Rows Found</span>
                                <span className="">Row Limit:<Select style={{ width: 100 }} defaultValue="10" onChange={(v) => { self.getTableData(undefined, v) }}>
                                    <Option key="0" value="10">10</Option>
                                    <Option key="1" value="50">50</Option>
                                    <Option key="2" value="100">100</Option>
                                    <Option key="3" value="500">500</Option>
                                    <Option key="4" value="1000">1000</Option>
                                    <Option key="5" value="5000">5000</Option>
                                </Select>
                                </span>
                            </div>
                            <div>
                                {
                                    Object.keys(this.state.singleTable).length ? <TableVisualization data={this.state.singleTable}></TableVisualization> : <span></span>
                                }
                            </div>
                        </Modal>

                        <div className="jointpanel-two" style={{ background: "#f9f9f9", height: "7px", borderTop: "1px solid #d9dee4", borderBottom: "1px solid #d9dee4",  cursor: "row-resize" }} onMouseDown={this.md} onMouseUp={this.md1}></div>
                        <div className="jointpanel-two" ref={"sdown1"}>
                            <div className="data-header">
                                <span className="data-text">Data Preview</span>
                                {/* <span className="data-rowcolumn-text">2 Tables with 45 Columns & 3001 Rows Found</span> */}
                                <span className="data-rowlimit">Row Limit:<Select style={{ width: 78, marginLeft:"10px" }} defaultValue="10" onChange={(v) => { self.setState({ largeTableLimit: v }); self.getJoinData(v) }}>
                                    <Option key="0" value="10">10</Option>
                                    <Option key="1" value="50">50</Option>
                                    <Option key="2" value="100">100</Option>
                                    <Option key="3" value="500">500</Option>
                                    <Option key="4" value="1000">1000</Option>
                                    <Option key="5" value="5000">5000</Option>

                                </Select> </span>
                            </div>
                            <div  className="tb-grid-container" >
                                {Object.keys(this.state.largeTable).length ? <TableVisualization data={this.state.largeTable}></TableVisualization> : <div className="blank-block">
                                    <div className="iconblock">
                                        <img style={{ width: '75px', marginBottom: '10px' }} src={previewImg} />
                                        <span className="datatext">DATA</span>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>



                    </div>

                    <div className="cc__selfservice__footer">


                        <div className="cc__col-2 cc__flex cc__flex-end">
                            <button className="cc__ss__button" onClick={this.next.bind(this)}> Next</button>
                        </div>
                    </div>

                </div>

            </div>




        );
    }
    next() {
        console.log('route to vis')
        this.props.changeTab(2);
        this.props.history.push("/visualization")
    }
    addOnClick = (e, item) => {
        if (!this.state.instance.getManagedElements()[item.id]) {
            this.newNode(500, 100, item.id, item.alias, item, false)
        }

    }
    toggleLeftPanel = (e) => {
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

    }
    md = (e) => {
        var self = this;
        $(document).on('mousemove', function (e) {
        
          if(self.refs['sright'].clientHeight- e.originalEvent.layerY >=30)
      {      self.refs['sdown'].style.height = e.originalEvent.layerY + "px";
            self.refs['sdown1'].style.height = self.refs['sright'].clientHeight- e.originalEvent.layerY + "px";
        }else{
            $(document).off('mousemove')
            $(document).off('mouseup') 
        }
        })
        $(document).on('mouseup', function (e) {
            $(document).off('mousemove')
            $(document).off('mouseup')

        })
    }


    md1 = (e) => {
        $(document).off('mousemove')


    }
    addNodes() {

        if (this.props.Join.length) {
            var tables = this.props.TablesObject;

            var self = this;



            var addNode = {};
            this.props.Join.forEach((item) => {

                addNode[item.source] = { details: tables[item.sourceId], x: item.position.source.x, y: item.position.source.y };

                addNode[item.dest] = { details: tables[item.destId], x: item.position.dest.x, y: item.position.dest.y };


            })

            Object.values(addNode).forEach((item) => {



                self.newNode(item.x, item.y, item.details.id, item.details.alias, item.details, true)


            })


            this.props.Join.forEach(item => {

                console.log(item);

                self.state.instance.connect({
                    source: String(item.sourceId),
                    target: String(item.destId),
                    type: "basic",
                    parameters: item,
                    data: { join: item }
                })
            })


        }

    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({
            selectTable,
            joinsAction, fetchDatasource, fetchAllTable, fetchTables
        }, dispatch)
    }
}
const mapStateToProps = (state) => {
    return {
        Join: state.Join, list: state.Tables.selectedIds,
        TablesObject: state.Tables.object,
        selectedDs: state.Tables.selectedDs,
        TablesArray: state.Tables.array,
        DataSources: state.DataSources,
        PageLoader: state.Page.loaded,
        url: state.url
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JointPanel);
