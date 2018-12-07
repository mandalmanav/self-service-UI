
import React, { Component } from 'react'
import $ from 'jquery'
import getVisualization from '../../utilities/getVisualization'
import { Object } from 'core-js';
import makeRequest from '../../utilities/MakeRequest'
const generateSql="queryengine/getSqlData";

var Highcharts = require('highcharts/highstock');
require('highcharts/modules/wordcloud')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
export default class ChartComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { chart: {}, configuration: {} }
        this.getSvg = this.getSvg.bind(this)
    }
    componentDidMount(){
        if(!this.props.Dashboard)
        return
        let props = this.props
        let activeBo =this.props.activeBO ||this.props.Dashboard.activeBO
        let bo =(this.props.activeBO && this.props.list) ?this.props.list[activeBo]: this.props.Dashboard.businessObjects[activeBo];
        if(bo.completeConfiguration && bo.completeConfiguration.hasOwnProperty('chart')){
                this.setState({
                    configuration:bo.completeConfiguration
                })
                //bo.completeConfiguration
                let config=Object.assign({},bo.completeConfiguration)
                config.chart["renderTo"] = this.refs['container']
                Highcharts.chart(config)
                
        }
       
    }
    callData(){
        var self=this;
        
  
      var query=self.props.list[self.props.activeBO].sql;
  var obj=self.props.Parameters;
   if(query.indexOf('WHERE')==-1){
  var subscript=' WHERE ';   
  Object.keys(obj).map((itm,i)=>{
      
  
      if(subscript.length>10){
          subscript+=' AND '  
      }
      //subscript+='( '+ obj[itm].tName+'.'+obj[itm].cName+' in '+JSON.stringify(obj[itm].value).replace('[','(').replace(']',')')+' OR "All" in  '+JSON.stringify(obj[itm].value).replace('[','(').replace(']',')')+'    ) ';
      subscript+=' '+ obj[itm].tName+'.'+obj[itm].cName+' in '+JSON.stringify(obj[itm].value).replace('[','(').replace(']',')')+' ';
  
  
  
  
  
  
  })
  
  if(query.split('GROUP BY').length>1){
      query=query.split('GROUP BY')[0]+subscript+ 'GROUP BY'+query.split('GROUP BY')[1]
  }else{
      query+=subscript;
  
  }
  //console.log(query)
  
   }else{
  
  
  Object.keys(obj).map((itm,i)=>{
      var wh=query.indexOf('WHERE');
      var gb=query.indexOf('GROUP BY');
      var len=(obj[itm].tName+'.'+obj[itm].cName+' ').length-1;
      var index=query.lastIndexOf(obj[itm].tName+'.'+obj[itm].cName+' ',wh);
      if(index>-1 && index<gb ){
  
  var ix=len+index;
  var andindex=query.indexOf('AND',ix);
  
  if(andindex<gb && andindex!=-1  ){
      query=query.splice(ix,andindex-1-ix,' in '+JSON.stringify(obj[itm].value).replace('[','(').replace(']',')')+' ');
  
  }else{
      query=query.splice(ix,gb-ix,' in '+JSON.stringify(obj[itm].value).replace('[','(').replace(']',')')+' ');
  
  
  }
  
          }else if(index==-1) {
              query=query.splice(gb-1,0,'AND '+obj[itm].tName+'.'+obj[itm].cName +'  in '+JSON.stringify(obj[itm].value).replace('[','(').replace(']',')')+' ');
  
  
  
          }
    
      
      
      
      })
      
      //console.log(query)
  
   }
   query=query.replace(/'/g,"''");

   query=query.replace(/"/g,"'");
   console.log(query);
  

   
   makeRequest.post(generateSql,{data:{"connectionId":self.props.selectedDs[0],
   "sql":query }}).then((response) => {
          
      if(response.data.hasOwnProperty('data') && response.data.data.hasOwnProperty('metaData')){
        let config =  getVisualization(self.props,self.props.configuration.chart.type || null ,{data:response.data.data,activeBO:self.props.activeBO})
        if(!Object.keys(config).length)
        return;
        config.chart.renderTo = self.refs['container']
        this.setState({  chart: Highcharts.chart(config) })
      
       
       self.resize(1);
       
   
    
  }
        })
            
       .catch(() =>        {});
  
  return;
  
  
   
  
    } 
    getSvg(){
        return (this.refs["container"].getElementsByTagName('svg')[0]).outerHTML
    }
    draw(bit) {
        let chartProp={};
      if(bit && this.props.list) chartProp =this.props.list[this.props.activeBO];
        let config = (bit && Object.keys(chartProp).length) ? chartProp.completeConfiguration : getVisualization(this.props,this.props.configuration.chart.type || null )
       if(!Object.keys(config).length)
       return;
let configChange=Object.assign({},config);
configChange.chart.renderTo = this.refs['container']

        this.setState({  chart: Highcharts.chart(configChange) })
      
      let configa=Object.assign({},configChange);
      delete configa.chart.renderTo;
        this.setState({  configuration: configa })
        

    }
    
    changeChartType(type) {
        let props = this.props;
        let config = props.Dashboard.businessObjects[props.Dashboard.activeBO].configuration
        config.chart.type=type;
        config.series.map(series => series.type = type)
        if(config.hasOwnProperty('template')){
            config.template["series"]["type"] = type
        }

        let configuration = this.state.configuration
        configuration.chart.type = type
        configuration.series ? configuration.series.map(series => series.type = type) : false
        
        props.setConfiguration([props.Dashboard.activeBO, config, configuration])
        configuration.chart["renderTo"] = this.refs['container']
        Highcharts.chart(configuration)
    }
    resize(bit) {
        if (this.state.chart)
            try {

                this.state.chart.setSize(this.refs['container'].offsetWidth, this.refs['container'].offsetHeight - 50, false);
            } catch (e) { }
    }

    render() {
        return (
            <div  ref={"container"} style={{ position: "relative", width: "100%", height: "100%" }}></div>
        )
    }
}
