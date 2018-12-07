import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import "babel-polyfill";
import ReactDOM from 'react-dom';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import { Object } from 'core-js';

import makeRequest from '../../utilities/MakeRequest'
const generateData="queryengine/generateData";
const generateSql="queryengine/getSqlData";
String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

//var result = "foo baz".splice(4, 0, "bar ");

class FilterElement extends React.Component {
    constructor(props) {
        super(props)
      //  debugger;
      this.onInputChange=this.onInputChange.bind(this)
      
      this.onClose=this.onClose.bind(this)
    this.state = {
        children:[],presentParams:{},menuIsOpen:false,
        srightWidth: 1000,sql:"",ref:{},
        id:"", inputValue: []
    }
  //  this.filter = React.createRef();

}



    onClose(e){
        var value=this.state.inputValue.map(itm=>{return itm.value;})
      
        this.props.actions.saveParameter({id:this.state.id,
        value:Object.assign([],value),show:Object.assign([],value)
        });


    this.props.fire()

    }
   
 render() {
 
// children=this.state.children.map(item=>{
// return <Option key={item}>{item}</Option>

// });

return (


            <div className="filter_row">
                <label>
                {this.props.obj.name}
                </label>
             

{/* <Select ref={"filter"}
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Please select"
    defaultValue={['All']}
    onSelect={this.onSelect }
    onChange={this.handleChange}
    onBlur={ this.props.fire}
  >
    {children}
  </Select> */}

<Select options={this.state.children} ref={"filter"} defaultValue={this.state.children[0]}
    isMulti   isSearchable
    onChange={this.onInputChange}
    closeMenuOnSelect={false}
 value={this.state.inputValue} 
 onMenuClose={this.onClose}
   isClearable={false} />

{/* //<div ref={"filter"}></div> */}

            </div>
           
        )
    }
    remove(id) {
        this.props.actions.removeObjectFromDashboard(id);
    }
    onInputChange (inputValue, { action })  {
        console.log(inputValue, action);
      //  this.refs['filter'].getValue()
        switch (action) {
            case "select-option":
          if((inputValue.length>1 && inputValue[inputValue.length-1].label=="All")){
            this.setState({ inputValue:this.state.children });  
          }else{
if(inputValue.length>1 && inputValue[0].label=="All"){
inputValue.shift();
}
            this.setState({ inputValue });
          
          }
         
           return
            case "deselect-option":
          case "pop-value":
            case "remove-value":
          debugger;
            if(!inputValue.length)
            this.setState({inputValue:this.state.children});
            else
            this.setState({inputValue});
            this.props.actions.saveParameter({id:'p'+this.props.obj.tName+this.props.obj.name,
            value:inputValue.map(itm=>{return itm.value;}),show:inputValue.map(itm=>{return itm.value;}),name:this.props.obj.alias,isVisible:true,tName:this.props.obj.tName,cName:this.props.obj.name
            })
this.props.fire()
           return
           case "clear":
            
            this.setState({ inputValue });

           return
            case "set-value":
            this.setState({ inputValue });
    return
          case 'input-change':
            this.setState({ inputValue });
          return
          case 'menu-close':
          debugger;
            console.log(this.state.inputValue);
            let menuIsOpen = undefined;
            if (this.state.inputValue) {
              menuIsOpen = true;
            }
            this.setState({
              menuIsOpen
            });
        return
          default:
        return 
        }
      }

fireData(){
    var a=Object.assign({},this.props.Parameters);
   var b= Object.assign({},this.state.presentParams);
    delete a[this.state.id];
    delete b[this.state.id];
    

if(JSON.stringify(a)!=JSON.stringify(b)){
console.log('fire data'+this.state.id)
this.updateParameters(JSON.parse(JSON.stringify(this.props.Parameters)))
}

}
updateParameters(obj){
this.setState({'presentParams':obj})
this.callData(generateSql,obj,'sql')
}
    update(obj){
        this.props.actions.updateObjectsOfDashboard(obj);
        
            }
   
 
    componentDidMount(){

var self=this;
//this.setState({ref:$(ReactDOM.findDOMNode(self.refs['filter']))});

this.setState({id:'p'+self.props.obj.tName+self.props.obj.name})

var obj={


    //"connectionId":obj.dbId,
    "connectionId":self.props.selectedDs[0],
 
    "dims": [
        {

            "tId":self.props.obj.tId,
            "tName":self.props.obj.tName,
            "cId":self.props.obj.id,
            "cName":self.props.obj.name,
            "cAlias":self.props.obj.alias,
            "isDerived":false,
            "calculation":"",
            "isCalculated":self.props.obj.isCalculated,
            "isTransformed":self.props.obj.isTransformed,
            "agg":"DISTINCT"
        }   
    ],
    "meas":[ ],
    "conditions":[],
    "Filters":[ ],
    "joins":self.props.Join
}

this.callData(generateData,obj,'data');
     

      }

  callData(url,obj,type){
      var self=this;
      
if(type==="sql"){
    return;
    var query=self.state.sql;

 if(query.indexOf('WHERE')==-1){
var subscript=' WHERE ';   
Object.keys(obj).map((itm,i)=>{
    

if(itm!=self.state.id){
    if(subscript.length>10){
        subscript+=' AND '  
    }
    //subscript+='( '+ obj[itm].tName+'.'+obj[itm].cName+' in '+JSON.stringify(obj[itm].value).replace('[','(').replace(']',')')+' OR "All" in  '+JSON.stringify(obj[itm].value).replace('[','(').replace(']',')')+'    ) ';
    subscript+=' '+ obj[itm].tName+'.'+obj[itm].cName+' in '+JSON.stringify(obj[itm].value).replace('[','(').replace(']',')')+' ';

}




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
       

    if(itm!=self.state.id){
        var len=(obj[itm].tName+'.'+obj[itm].cName+' ').length-1;
        var index=query.lastIndexOf(obj[itm].tName+'.'+obj[itm].cName+' ');
        if(index>-1 && index>wh){

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
      //  if(i!=0){
         //   subscript+=' AND '    
       // }

       // subscript+=obj[itm].tName+'.'+obj[itm].cName+' in '+String(obj[itm].value).replace('[','(').replace(']',')')+' ';
    
    }
    
    
    
    
    })
    
    //console.log(query)

 }
 query=query.replace(/'/g,"''");
 
 query=query.replace(/"/g,"'");
 console.log(query);


 
 makeRequest.post(url,{data:{"connectionId":self.props.selectedDs[0],
 "sql":query }}).then((response) => {
        
    if(response.data.hasOwnProperty('data') && response.data.data.hasOwnProperty('metaData')){
 //self.setState({sql:response.data.data.finalQuery})
      var a=[],ob=[];
      response.data.data.resultSet.map(item=>{
        if(item[0].toLowerCase()=='(all)'||item[0].toLowerCase()=='all')
        {
            
       //   return {label:'All',value:'All'};
     
     
      } else{
         
         a.push({label:item[0],value:item[0]});
         if(self.state.inputValue.indexOf({label:item[0],value:item[0]})){
ob.push({label:item[0],value:item[0]})
         }
      }
        
    }) 

  self.setState({'children':a})

  self.setState({'inputValue':ob})
  
  self.props.actions.saveParameter({id:'p'+self.props.obj.tName+self.props.obj.name,
  value:ob.map(itm=>{return itm.value;}),show:ob.map(itm=>{return itm.value;}),name:self.props.obj.alias,isVisible:true,tName:self.props.obj.tName,cName:self.props.obj.name
  })


  
}
      })
          
     .catch(() =>        {});

return;
}

    makeRequest.post(url,{data:obj}).then((response) => {
        
        if(response.data.hasOwnProperty('data') && response.data.data.hasOwnProperty('metaData')){
     self.setState({sql:response.data.data.finalQuery})
          var a=[];
          response.data.data.resultSet.map(item=>{
            if(item[0].toLowerCase()=='(all)'||item[0].toLowerCase()=='all')
            {
                
            //  return {label:'All',value:'All'};
         
         
          } else
            return  a.push({label:item[0],value:item[0]});
        }) 

      self.setState({'children':a})
      self.setState({'inputValue':a})
      
      self.props.actions.saveParameter({id:'p'+self.props.obj.tName+self.props.obj.name,sql:response.data.data.finalQuery,
value:a.map(itm=>{return itm.value;}),show:a.map(itm=>{return itm.value;}),name:self.props.obj.alias,isVisible:true,tName:self.props.obj.tName,cName:self.props.obj.name
})

  
    }
          })
              
         .catch(() =>        {});


  }    
pinToworkboard(){
var self=this;

var object=[];
Object.values(self.props.objectList).map((itm)=>{
    var multiGridConfiguration={
        "configuration" : {
            "export" : false,
            "modalView" : false,
            "schedule" : false,
            "title" : "CSO Detailed Savings"
        },
        "height" : "22",
        "itemType" : "",
        "type" : "multi-grid-element",
        "width" : "48",
        "x" : "0",
        "y" : "0"
    }
    var item=Object.assign({},itm);
   var aa= Object.assign({},multiGridConfiguration);
   aa.configuration.title=item.title;
   aa.x=item.position.x;
   aa.y=item.position.y;
   aa.height=item.position.h;
   aa.width=item.position.w;

var obj={"uniqueid":item.id,"name":item.title ,"multigridConfiguration":aa,"objectConfiguration":{x:0,y:0,height:item.position.h-3,width:48,configuration:item.configuration,type:'chart-element',name:item.title,listeners:['pTemp']},"logic":{ "datasourceName":self.props.DataSources[0].dbName , "query":btoa(item.sql)} ,"type":"sql"}


if(item.businessLogicId){
    obj['businessLogicId']=item.businessLogicId;
    
    }
    if(item.bussinessObjectId){
        obj['bussinessObjectId']=item.bussinessObjectId;
        
        }
        
    if(item.multigridId){
        obj['multigridId']=item.multigridId;
        
        }


   object.push(Object.assign({},obj))   

})


var f={ 
    "configuration":JSON.stringify(self.props.workboardConfig),
  "name":self.props.workboardConfig.name,
  "repositoryId":262,
  "objects":object,
    "connectionId":self.props.selectedDs[0]
    
}
if(self.props.workboardConfig.id){
f['workboardId']=self.props.workboardConfig.id;

}
self.props.actions.pinToWorkboard(f ,self,'')

}

    toggleLeftPanel = (e) => {
        this.refs['sleft'].style.width == "" ? this.refs['sleft'].style.width = "0px" : this.refs['sleft'].style.width == "0px" ? this.refs['sleft'].style.width = "240px" : this.refs['sleft'].style.width == "240px" ? this.refs['sleft'].style.width = "0px" : this.refs['sleft'].style.width = "240px"
        this.setState({ srightWidth: this.refs['sright'].clientWidth });
    }
}



export default (FilterElement);
