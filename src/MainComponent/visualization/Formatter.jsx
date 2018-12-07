import React, { Component } from 'react';
import { Input } from 'antd';

import { Button } from 'antd';
import { Checkbox } from 'antd';
import getVisualization from '../../utilities/getVisualization'
import { Tabs, Radio } from 'antd';
import bar from '../../assets/images/column.png'
import column from '../../assets/images/bar.png'
import line from '../../assets/images/line.png'
import spline from '../../assets/images/spline.png'
import pie from '../../assets/images/pie.png'
import funnel from '../../assets/images/funnel.png'
import area from '../../assets/images/area.png'
import treemap from '../../assets/images/treemap.png'
import { Select } from 'antd';

const Option = Select.Option;

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

export default class Formatter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symbol: props.symbol || '',
            decimalPoint: props.decimalPoint || 2,
            symbolPosition: props.symbolPosition || 'left',
            thousandSeparator: true,
            abbreviation: 'auto',
            legend: {
                enabled: true
            },
            yAxis: {

            },
            subProperty: '',
            subPropertyTwo: '',
            sortOn: 'category',
            sortType: 'asc',
            gridLineWidth: 0,
            gridLineColor:'',
            gridLineDashStyle:'',
            barThickness: 40,
            scrollEnabled: false,
            scrollMax: 0,
            chartTitle:'',
            chartTitleAlign:'center',
            chartTitleStyle:'',
            legendAlign:'center',
            legendBgColor:'',
            legendWidth:'',
            legendDistance:'',

            tooltip_backgroundColor:undefined,
            tooltip_borderColor:undefined,
             tooltip_borderRadius:3,
            tooltip_borderWidth:1,
             tooltip_enabled:true,
          tooltip_hideDelay:500,
            tooltip_padding:8,
            stacked:false,

chart_backgroundColor:'#ffffff',
chart_borderColor:'#335cad',
chart_borderRadius:0,
chart_borderWidth:0,
chart_ignoreHiddenSeries:true,
chart_inverted:false,
chart_marginBottom:undefined,
chart_marginLeft:undefined,
chart_marginRight:undefined,
chart_marginTop:undefined,
chart_plotBackgroundColor:undefined,
chart_plotBorderColor:'#cccccc',
chart_plotBorderWidth:0,
chart_plotShadow:false,

chart_spacingBottom:15,
chart_spacingLeft:10,
chart_spacingRight:10,
chart_spacingTop:10
         


        }
        this.handleChange = this.handleChange.bind(this)
        this.showSubproperty = this.showSubproperty.bind(this)
        this.showSubpropertyTwo = this.showSubpropertyTwo.bind(this)
        this.run = this.run.bind(this)

    }
    showSubpropertyTwo(e) {
        this.setState({
            subPropertyTwo: e.target.id
        })
    }
    componentDidMount() {

    }
    setStateFromProps() {
        let props = this.props
        let formatterObject = props.Dashboard.businessObjects[props.Dashboard.activeBO].formatter
        if (formatterObject && Object.keys(formatterObject).length) {

            this.setState({
                symbol: formatterObject.symbol || '',
                decimalPoint: formatterObject.decimalPoint || 2,
                symbolPosition: formatterObject.symbolPosition || 'left',
                thousandSeparator: true,
                abbreviation: 'auto',
                legend: formatterObject.legend,
                yAxis: {

                },
                subProperty: '',
                subPropertyTwo: '',
                sortOn: 'category',
                sortType: formatterObject.xAxis.reversed ? 'desc' : 'asc' || 'asc',
                gridLineWidth: formatterObject.yAxis.gridLineWidth || 0,
                barThickness: formatterObject.plotOptions.series.pointWidth || 40,
                scrollEnabled: formatterObject.xAxis.scrollbar.enabled || false,
                scrollMax: formatterObject.xAxis.max || 0
              

            })
        }
        else {
            this.setState({
                symbol: props.symbol || '',
                decimalPoint: props.decimalPoint || 2,
                symbolPosition: props.symbolPosition || 'left',
                thousandSeparator: true,
                abbreviation: 'auto',
                legend: {
                    enabled: true
                },
                yAxis: {

                },
                subProperty: '',
                subPropertyTwo: '',
                sortOn: 'category',
                sortType: 'asc',
                gridLineWidth: 0,
                barThickness: 40,
                scrollEnabled: false,
                scrollMax: 0


            })
        }
    }
    handleChange(e) {
        let obj = {}
        obj[e.target.id] = e.target.value
        this.setState(obj)
    }
    run() {
        let tooltip = {
            symbol: this.state.symbol,
            symbolPosition: this.state.symbolPosition,
            decimalPoint: this.state.decimalPoint,
            abbreviation: 'auto',

            chart:{

                backgroundColor:this.state.chart_backgroundColor,
                borderColor:this.state.chart_borderColor,
                borderRadius:this.state.chart_borderRadius,
                borderWidth:this.state.chart_borderWidth,
                ignoreHiddenSeries:this.state.chart_ignoreHiddenSeries,
                inverted:this.state.chart_inverted,
                marginBottom:this.state.chart_marginBottom,
                marginLeft:this.state.chart_marginLeft,
                marginRight:this.state.chart_marginRight,
                marginTop:this.state.chart_marginTop,
                plotBackgroundColor:this.state.chart_plotBackgroundColor,
                plotBorderColor:this.state.chart_plotBorderColor,
                plotBorderWidth:this.state.chart_plotBorderWidth,
                plotShadow:this.state.chart_plotShadow,
             
                spacingBottom:this.state.chart_spacingBottom,
                spacingLeft:this.state.chart_spacingLeft,
                spacingRight:this.state.chart_spacingRight,
                spacingTop:this.state.chart_spacingTop


            },
            legend: {
                enabled:this.state.legend.enabled,
                // itemWidth:this.state.legendWidth,
                // itemDistance:this.state.legendDistance,
                backgroundColor:this.state.legendBgColor,
                align:this.state.legendAlign
            },
            tooltip:{
                backgroundColor:this.state.tooltip_backgroundColor,
borderColor:this.state.tooltip_borderColor,
borderRadius:this.state.tooltip_borderRadius,
borderWidth:this.state.tooltip_borderWidth,
enabled:this.state.tooltip_enabled,
hideDelay:this.state.tooltip_hideDelay,
padding:this.state.tooltip_padding






            },
            xAxis: {
                reversed: this.state.sortType == 'asc' ? false : true,
                scrollbar: {
                    enabled: this.state.scrollEnabled,

                },
                max: !this.state.scrollEnabled ? undefined : this.state.scrollMax != 0 ? this.state.scrollMax : undefined
            },
            yAxis: {
                gridLineWidth: this.state.gridLineWidth,
                gridLineDashStyle:this.state.gridLineDashStyle,
                gridLineColor:this.state.gridLineColor

            },
            plotOptions: {
                series: {
                    stacking:this.state.stacked,
                  //  pointWidth: this.state.barThickness
                },column:{
                    stacking:this.state.stacked
                }


            },
            title:{
                text:this.state.chartTitle,
                align:this.state.chartTitleAlign,
                style:this.state.chartTitleStyle
            }

        }, props = this.props
        let completeConfiguration = props.Dashboard.businessObjects[props.Dashboard.activeBO].completeConfiguration;
        let configuration = props.Dashboard.businessObjects[props.Dashboard.activeBO].configuration;
        delete configuration.chart.renderTo;
        delete completeConfiguration.chart.renderTo;

        props.setConfiguration([props.Dashboard.activeBO, configuration, JSON.parse(JSON.stringify(completeConfiguration)), tooltip])
        props.refreshChart(0)
    }
    toggleLegend() {
        let legend = this.state.legend;
        legend.enabled = !legend.enabled
        this.setState({
            legend
        }, () => {
            this.run()
        })
    }
    showSubproperty(e) {
        let id = e.target.id;
        this.setState({
            subProperty: id
        })
    }
    setSortOn = (e) => {
        this.setState({
            sortOn: e.target.value,
        });
    }
    render() {
        const plainOptions = ['left', 'right'];
        let dimCount = 0;
        let props = this.props;

        let activeBo=props.Dashboard.activeBO
        if(props.Dashboard.businessObjects[activeBo]){
           if (props.Dashboard.businessObjects[activeBo].meas.length)
           dimCount= props.Dashboard.businessObjects[activeBo].dims.length 
        }
        console.log(dimCount)
        let chartTypes = [
            {
            name: 'bar',
            title: 'bar',
            isDisabled:dimCount>0?false: true,
            chartIcon: bar,
            className: "zmdi zmdi-chart"
        }, {
            name: 'column',
            title: 'column',
            isDisabled: dimCount>0?false: true,
            chartIcon: column,
            className: "zmdi zmdi-chart"
        }, {
            name: 'line',
            title: 'line',
            isDisabled: dimCount>0?false: true,
            chartIcon: line,
            className: "zmdi zmdi-chart-donut"
        }, {
            name: 'spline',
            title: 'spline',
            isDisabled: dimCount>0?false: true,
            chartIcon: spline,
            className: "zmdi zmdi-chart-donut"
        }, {
            name: 'pie',
            title: 'pie',
            isDisabled: dimCount>0 && dimCount<2?false: true,
            chartIcon: pie,
            className: "zmdi zmdi-chart-donut"
        }, {
            name: 'funnel',
            title: 'funnel',
            isDisabled: dimCount>0 && dimCount<2?false: true,
            chartIcon: funnel,
            style: {
                opacity: '0.5'
            },
            className: "zmdi zmdi-chart-donut"
        }, {
            name: 'area',
            title: 'area',
            isDisabled: dimCount>0?false: true,
            chartIcon: area,
            style: {
                opacity: '0.5'
            },
            className: "zmdi zmdi-chart-donut"
        }, {
            name: 'treemap',
            title: 'treemap',
            isDisabled: true,
            chartIcon: treemap,
            style: {
                opacity: '0.5'
            },
            className: "zmdi zmdi-chart-donut"
        }];
        return (

            <div className="propertiesSection" >
                <h5>Properties
                    {/* <span className="propertiesSection_undo"><i class="zmdi zmdi-undo"></i></span>
                    <span className="propertiesSection_redo"><i class="zmdi zmdi-undo"></i></span> */}
                </h5>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="General" key="1">
                        <div className="generalSection">
                            <div className="chartProrerties" style={{ display: this.state.subProperty == '' ? 'block' : 'none' }} >
                                <ul>
                                    <li onClick={this.showSubproperty} id="chartType" >Chart Types <span><i class="zmdi zmdi-chevron-right"></i></span></li>
                                    <li onClick={this.showSubproperty} id="chartStyle" >Chart Style <span><i class="zmdi zmdi-chevron-right"></i></span></li>
                                    {/* <li onClick={this.showSubproperty} id="chartTitle">Title<span><i class="zmdi zmdi-chevron-right"></i></span></li> */}
                                    <li onClick={this.showSubproperty} id="chartTooltip">Tooltip<span><i class="zmdi zmdi-chevron-right"></i></span></li>
                                    <li onClick={this.showSubproperty} id="chartLegend">Legend <span><i class="zmdi zmdi-chevron-right"></i></span></li>
                                    {/* <li onClick={this.showSubproperty} id="chartColors">Colors <span><i class="zmdi zmdi-chevron-right"></i></span></li> */}
                                    <li onClick={this.showSubproperty} id="chartxAxis">X-axis <span><i class="zmdi zmdi-chevron-right"></i></span></li>
                                    <li onClick={this.showSubproperty} id="chartyAxis">Y-axis <span><i class="zmdi zmdi-chevron-right"></i></span></li>
                                </ul>
                            </div>

                            <div className="IconBlock" style={{ display: this.state.subProperty == 'chartType' ? 'block' : 'none' }}>
                                <span className="label-text">
                                    <i onClick={() => { this.setState({ subProperty: '' }) }} class="zmdi zmdi-arrow-left" style={{ paddingRight: '10px' }}></i>
                                    Chart Type</span>
                                <ul>
                                    {chartTypes.map(chart => {
                                        return (
                                              <li style={{padding:'8px',opacity:chart.isDisabled?.3:1,pointerEvents:chart.isDisabled?'none':null}} disabled={chart.isDisabled} title={chart.title} key={chart.name} ><img onClick={this.props.changeChartType} id={chart.name} style={{ width: '30px', height: '30px', ...chart.style }} src={chart.chartIcon} className={chart.className} /><div>{chart.title}</div></li>
                                            //<li key={chart.name} onClick={this.props.changeChartType} id={chart.name} title={chart.title}><span id={chart.name}  ><i id={chart.name} class={chart.className} key={chart.name}   ></i></span>{chart.title} </li>
                                        )
                                    })}

                                </ul>
                            </div>
                            {
                                this.state.subProperty == 'chartStyle' ?<div className="IconBlock" >
                                <span className="label-text">
                                    <i onClick={() => { this.setState({ subProperty: '' }) }} class="zmdi zmdi-arrow-left" style={{ paddingRight: '10px' }}></i>
                                    Chart Style
                                    </span>





         
         <div className="form-grouptextfield">
                                    <Checkbox checked={this.state.stacked} onChange={() => { this.setState({ stacked: this.state.stacked==false?'normal':false }, () => { this.run() }) }} >Stacked</Checkbox>
                               
                                </div>


                                <div className="form-grouptextfield">
                                    <label for="">Background Color</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_backgroundColor} onChange={(e) => { this.setState({ chart_backgroundColor: e.target.value }) }}/>
                                  
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Border Color</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_borderColor} onChange={(e) => { this.setState({ chart_borderColor: e.target.value }) }}/>
                                  
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Border Radius</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_borderRadius} onChange={(e) => { this.setState({ chart_borderRadius: e.target.value }) }}/>
                                  
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Border Width</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_borderWidth} onChange={(e) => { this.setState({ chart_borderWidth: e.target.value }) }}/>
                                  
                                </div>
                                <div className="form-grouptextfield">
                                    <Checkbox checked={this.state.chart_ignoreHiddenSeries} onChange={() => { this.setState({ chart_ignoreHiddenSeries: !this.state.chart_ignoreHiddenSeries }, () => { this.run() }) }} >Ignore Hidden Series</Checkbox>
                               
                                </div>
                                <div className="form-grouptextfield">
                                    <Checkbox checked={this.state.chart_inverted} onChange={() => { this.setState({ chart_inverted: !this.state.chart_inverted }, () => { this.run() }) }} >Inverted</Checkbox>
                               
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Plot Background Color</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_plotBackgroundColor} onChange={(e) => { this.setState({ chart_plotBackgroundColor: e.target.value }) }}/>
                                  
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Plot Border Color</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_plotBorderColor} onChange={(e) => { this.setState({ chart_plotBorderColor: e.target.value }) }}/>
                                  
                                </div>
                                
                                
                                <div className="form-grouptextfield">
                                    <label for="">Plot Border Width</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_plotBorderWidth} onChange={(e) => { this.setState({ chart_plotBorderWidth: e.target.value }) }}/>
                                      </div>

                               <div className="form-grouptextfield">
                                    <label for="">Plot Shadow</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_plotShadow} onChange={(e) => { this.setState({ chart_plotShadow: e.target.value }) }}/>
                                      </div>
                               





                               <div className="form-grouptextfield">
                                    <label for="">Margin Bottom</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_marginBottom} onChange={(e) => { this.setState({ chart_marginBottom: e.target.value }) }}/>
                                      </div>
<div className="form-grouptextfield">
                                    <label for="">Margin Left</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_marginLeft} onChange={(e) => { this.setState({ chart_marginLeft: e.target.value }) }}/>
                                      </div>

<div className="form-grouptextfield">
                                    <label for="">Margin Right</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_marginRight} onChange={(e) => { this.setState({ chart_marginRight: e.target.value }) }}/>
                                      </div>

<div className="form-grouptextfield">
                                    <label for="">Margin Top</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_marginTop} onChange={(e) => { this.setState({ chart_marginTop: e.target.value }) }}/>
                                      </div>


<div className="form-grouptextfield">
                                    <label for="">Spacing Bottom</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_spacingBottom} onChange={(e) => { this.setState({ chart_spacingBottom: e.target.value }) }}/>
                                      </div>

<div className="form-grouptextfield">
                                    <label for="">Spacing Left</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_spacingLeft} onChange={(e) => { this.setState({ chart_spacingLeft: e.target.value }) }}/>
                                      </div>

<div className="form-grouptextfield">
                                    <label for="">Spacing Right</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_spacingRight} onChange={(e) => { this.setState({ chart_spacingRight: e.target.value }) }}/>
                                      </div>

<div className="form-grouptextfield">
                                    <label for="">Spacing Top</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chart_spacingTop} onChange={(e) => { this.setState({ chart_spacingTop: e.target.value }) }}/>
                                      </div>





                               
                            </div>:null
                        }
                           {/*
                                this.state.subProperty=="chartTitle"?<div className="IconBlock" >
                                <span className="label-text">
                                    <i onClick={() => { this.setState({ subProperty: '' }) }} class="zmdi zmdi-arrow-left" style={{ paddingRight: '10px' }}></i>
                                    Chart Title</span>
                                    <div className="form-grouptextfield">
                                    <label for="">Title</label>
                                    <Input onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chartTitle} onChange={(e) => { this.setState({ chartTitle: e.target.value }) }}></Input>
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Align</label>
                                    <Select defaultValue="center" style={{ width: "100%" }} onChange={(value) => {
                                        this.setState({ chartTitleAlign: value })
                                    }}>
                                        <Option value="left">Left</Option>
                                        <Option value="center">Center</Option>
                                        <Option value="right">Right</Option>

                                    </Select>
                                   </div>
                                   <div className="form-grouptextfield">
                                    <label for="">Style</label>
                                    <Input type="text"  onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.chartTitleStyle} onChange={(e) => { this.setState({ chartTitleStyle: e.target.value }) }}/>
                                   </div>
                            </div>:null
                                */}
                            <div className="IconBlock" style={{ display: this.state.subProperty == 'chartTooltip' ? 'block' : 'none' }}>
                                <span className="label-text">
                                    <i onClick={() => { this.setState({ subProperty: '' }) }} class="zmdi zmdi-arrow-left" style={{ paddingRight: '10px' }}></i>
                                    Chart Tooltip</span>

       
       
       <div className="form-grouptextfield">
                                 
                                 <Checkbox checked={this.state.tooltip_enabled} onChange={() => { this.setState({ tooltip_enabled: !this.state.tooltip_enabled }, () => { this.run() }) }} >Enabled</Checkbox>
                               
                                </div>
                              


                                    <div className="form-grouptextfield">
                                    <label for="">Background Color</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.tooltip_backgroundColor} onChange={(e) => { this.setState({ tooltip_backgroundColor: e.target.value }) }}/>
                                  
                                   </div>
                                   <div className="form-grouptextfield">
                                    <label for="">Border color</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.tooltip_borderColor} onChange={(e) => { this.setState({ tooltip_borderColor: e.target.value }) }}/>
                                  
                                   </div>
                                   <div className="form-grouptextfield">
                                    <label for="">Border Radius</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.tooltip_borderRadius} onChange={(e) => { this.setState({ tooltip_borderRadius: e.target.value }) }}/>
                                  
                                   </div>
                                   <div className="form-grouptextfield">
                                    <label for="">Border Width</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.tooltip_borderWidth} onChange={(e) => { this.setState({ tooltip_borderWidth: e.target.value }) }}/>
                                  
                                   </div>
                                   
                                   <div className="form-grouptextfield">
                                    <label for="">Hide Delay</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.tooltip_hideDelay} onChange={(e) => { this.setState({ tooltip_hideDelay: e.target.value }) }}/>
                                  
                                   </div>

                                    <div className="form-grouptextfield">
                                    <label for="">Padding</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.tooltip_padding} onChange={(e) => { this.setState({ tooltip_padding: e.target.value }) }}/>
                                  
                                   </div>

                                 
                                   
                            </div>
                            <div className="IconBlock" style={{ display: this.state.subProperty == 'chartLegend' ? 'block' : 'none' }}>
                                <span className="label-text">
                                    <i onClick={() => { this.setState({ subProperty: '' }) }} class="zmdi zmdi-arrow-left" style={{ paddingRight: '10px' }}></i>
                                    Chart Legend</span>
                                    <div className="form-grouptextfield">
                                    <label for="">Legend</label>
                                    <Checkbox checked={!this.state.legend.enabled} onChange={this.toggleLegend.bind(this)} >Hide Legends </Checkbox>
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Align</label>
                                    <Select defaultValue="center" style={{ width: "100%" }} onChange={(value) => {
                                        this.setState({ legendAlign: value },()=>{this.run()});
                                    }}>
                                        <Option value="left">Left</Option>
                                        <Option value="center">Center</Option>
                                        <Option value="right">Right</Option>

                                    </Select>
                                   </div>
                                   <div className="form-grouptextfield">
                                    <label for="">Background Color</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.legendBgColor} onChange={(e) => { this.setState({ legendBgColor: e.target.value }) }}/>
                                   </div>
                                   {/* <div className="form-grouptextfield">
                                    <label for="">Item width</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.legendWidth} onChange={(e) => { this.setState({ legendWidth: e.target.value }) }}/>
                                   </div>
                                   <div className="form-grouptextfield">
                                    <label for="">Item distance</label>
                                    <Input type="text" onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.legendDistance} onChange={(e) => { this.setState({ legendDistance: e.target.value }) }}/>
                                   </div> */}
                                  
                            </div>
                            <div className="IconBlock" style={{ display: this.state.subProperty == 'chartColors' ? 'block' : 'none' }}>
                                <span className="label-text">
                                    <i onClick={() => { this.setState({ subProperty: '' }) }} class="zmdi zmdi-arrow-left" style={{ paddingRight: '10px' }}></i>
                                    Chart Colors</span>
                                
                            </div>
                            <div className="IconBlock" style={{ display: this.state.subProperty == 'chartxAxis' ? 'block' : 'none' }}>
                                <span className="label-text">
                                    <i onClick={() => { this.setState({ subProperty: '' }) }} class="zmdi zmdi-arrow-left" style={{ paddingRight: '10px' }}></i>
                                    Chart X-Axis</span>
                                    <div className="form-grouptextfield">
                                    <label for="">Scroll</label>
                                    <Checkbox checked={this.state.scrollEnabled} onChange={() => { this.setState({ scrollEnabled: !this.state.scrollEnabled }, () => { this.run() }) }} >Enabled</Checkbox>
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Scroll Max</label>
                                    <Input onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} type="number" value={this.state.scrollMax} onChange={(e) => {
                                        this.setState({ scrollMax: e.target.value })
                                    }}></Input>
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Grid Line Width</label>
                                    <Input onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.gridLineWidth} onChange={(e) => { this.setState({ gridLineWidth: e.target.value }) }}></Input>
                                </div>
                                {/* <div className="form-grouptextfield">
                                    <label for="">Grid Line Color</label>
                                    <Input onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }} value={this.state.gridLineColor} onChange={(e) => { this.setState({ gridLineColor: e.target.value }) }} ></Input>
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Grid Line Dash style</label>
                                    <Input onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }}  value={this.state.gridLineDashStyle} onChange={(e) => { this.setState({ gridLineDashStyle: e.target.value }) }}></Input>
                                </div> */}
                                {/* <div className="form-grouptextfield">
                                    <label for="">Title rotation</label>
                                    <Input onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }}  ></Input>
                                </div> */}
                            </div>
                            <div className="IconBlock" style={{ display: this.state.subProperty == 'chartyAxis' ? 'block' : 'none' }}>
                                <span className="label-text">
                                    <i onClick={() => { this.setState({ subProperty: '' }) }} class="zmdi zmdi-arrow-left" style={{ paddingRight: '10px' }}></i>
                                    Chart Y-Axis</span>
                                    <div className="form-grouptextfield">
                                    <label for="">Reversed</label>
                                    <Checkbox checked={this.state.scrollEnabled} onChange={() => { this.setState({ scrollEnabled: !this.state.scrollEnabled }, () => { this.run() }) }} >
                                    
                                    </Checkbox>
                               
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Align</label>
                                    <Select defaultValue="center" style={{ width: "100%" }} onChange={(value) => {
                                        this.setState({ legendAlign: value })
                                    }}>
                                        <Option value="left">Left</Option>
                                        <Option value="center">Center</Option>
                                        <Option value="right">Right</Option>

                                    </Select>
                                </div>
                                {/* <div className="form-grouptextfield">
                                    <label for="">Style</label>
                                    <Input onKeyPress={(e) => {
                                        e.key == 'Enter' ? this.run() : null
                                    }}  ></Input>
                                </div> */}
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="Functions" key="2">
                        <div className="generalSection">
                            <div className="chartProrerties" style={{ display: this.state.subPropertyTwo == '' ? 'block' : 'none' }}>
                                <ul>
                                    <li onClick={this.showSubpropertyTwo} id="sort">Sort<span><i class="zmdi zmdi-chevron-right"></i></span></li>
                                    <li onClick={this.showSubpropertyTwo} id="numformat">Number Formating<span><i class="zmdi zmdi-chevron-right"></i></span></li>
                                    {/* <li onClick={this.showSubpropertyTwo} id="conditionalFormat">Conditional Formating<span><i class="zmdi zmdi-chevron-right"></i></span></li>
                                    <li>Show Grand Total<span><i class="zmdi zmdi-chevron-right"></i></span></li>
                                    <li>Group<span><i class="zmdi zmdi-chevron-right"></i></span></li>
                                    <li>Data Type<span><i class="zmdi zmdi-chevron-right"></i></span></li> */}
                                </ul>
                            </div>

                            <div className="sortSection" style={{ display: this.state.subPropertyTwo == 'sort' ? 'block' : 'none' }}>
                                <span className="label-text">
                                    <i onClick={() => { this.setState({ subPropertyTwo: '' }) }} class="zmdi zmdi-arrow-left" style={{ paddingRight: '10px' }}></i>Sort</span>
                                
                                <div className="form-grouptextfield">
                                    <label for="">Order</label>
                                    <Select defaultValue="asc" style={{ width: "100%" }} onChange={(value) => {
                                        this.setState({ sortType: value })
                                    }}>
                                        <Option value="asc">Ascending</Option>
                                        <Option value="desc">Descending</Option>

                                    </Select>
                                </div>
                                <div className="button-right">
                                    <a onClick={this.run}>APPLY</a>
                                </div>
                            </div>

                            <div className="numberformatingSection" style={{ display: this.state.subPropertyTwo == 'numformat' ? 'block' : 'none' }}>
                                <span className="label-text">
                                    <i onClick={() => { this.setState({ subPropertyTwo: '' }) }} class="zmdi zmdi-arrow-left" style={{ paddingRight: '10px' }}></i>Number Formating</span>
                                <div className="form-grouptextfield">
                                    <label for="">Currency Symbol</label>
                                    <input type="text" id="symbol" onChange={this.handleChange} value={this.state.symbol} placeholder="currency symbol" />
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Symbol Position</label>
                                    <RadioGroup onChange={this.handleChange} value={this.state.symbolPosition} style={{ display: 'flex' }}>
                                        <Radio id="symbolPosition" value='left'>left</Radio>
                                        <Radio id="symbolPosition" value='right'>right</Radio>
                                    </RadioGroup>
                                </div>


                                <div className="form-grouptextfield">
                                    <label for="">Precision</label>
                                    <input type="text" placeholder=".##" onChange={this.handleChange} id="decimalPoint" value={this.state.decimalPoint} />
                                </div>

                                <div className="button-right">
                                    <a onClick={this.run}>APPLY</a>
                                </div>
                            </div>

                            <div className="conditionalformatinfSection" style={{ display: this.state.subPropertyTwo == 'conditionalFormat' ? 'block' : 'none' }}>
                                <span className="label-text">
                                    <i onClick={() => { this.setState({ subPropertyTwo: '' }) }} class="zmdi zmdi-arrow-left" style={{ paddingRight: '10px' }}></i>Sort</span>
                                {/* <div className="form-group">
                                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                        <Radio value="category">Category</Radio>
                                        <Radio value="value">Value</Radio>
                                    </RadioGroup>
                                </div>
                                <div className="form-grouptextfield">
                                    <label for="">Order</label>
                                    <input type="text" placeholder="choose" />
                                </div>
                                <div className="button-right">
                                    <a onClick={this.run}>APPLY</a>
                                </div> */}
                            </div>

                        </div>
                    </TabPane>
                </Tabs>
            </div>
        
        )
    }
}
