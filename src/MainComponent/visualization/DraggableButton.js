import React, { Component } from 'react'
import { Dropdown, Menu } from 'antd'
import { DragSource } from 'react-dnd';

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
const sources = {
  beginDrag(props) {
    return props
  }
}


@DragSource('column', sources, collect)
export default class DraggableButton extends Component {

  constructor(props) {
    super(props)
    this.removeLabel = this.removeLabel.bind(this)
    this.changeAttribute = this.changeAttribute.bind(this)
  }

  removeLabel(e) {
    let props = this.props;
    let activeBO = props.Dashboard.activeBO;
    let businessObject = props.Dashboard.businessObjects[activeBO]
    if (props.container == "measure") {
      props.removeFromMeasure([props.Dashboard.activeBO, props.columnDetail.id])
      if (businessObject.yAxis == props.columnDetail.id) {
        if (businessObject.meas.length) {
          props.setAsYaxis([props.Dashboard.activeBO, businessObject.meas[0]])
          props.runQuery()
        }
        else {
          props.setAsYaxis([props.Dashboard.activeBO, ""])
        }
      }

    }
    else if (props.container == "dimension") {
      props.removeFromDimension([props.Dashboard.activeBO, props.columnDetail.id])
      if (businessObject.xAxis == props.columnDetail.id) {
        if (businessObject.dims.length) {
          props.setAsXaxis([props.Dashboard.activeBO, businessObject.dims[0]])

          if (businessObject.dims.length > 1) {
            props.setAsGroup([props.Dashboard.activeBO, ""])
            props.setAsMark([props.Dashboard.activeBO, businessObject.dims[1]])
            if (businessObject.dims.length > 2) {

              props.setAsGroup([props.Dashboard.activeBO, businessObject.dims[2]])
            }
          }
          else {
            props.setAsMark([props.Dashboard.activeBO, ""])
          }
        }
        else {
          props.setAsXaxis([props.Dashboard.activeBO, ""])
        }
      }
      if (businessObject.mark == props.columnDetail.id) {
        if (businessObject.dims.length > 1) {
          props.setAsGroup([props.Dashboard.activeBO, ""])
          props.setAsMark([props.Dashboard.activeBO, businessObject.dims[1]])
          if (businessObject.dims.length > 2) {
            props.setAsGroup([props.Dashboard.activeBO, businessObject.dims[2]])
          }
        }

        else
          props.setAsMark([props.Dashboard.activeBO, ""])
      }
      if (businessObject.group == props.columnDetail.id) {
        if (businessObject.dims.length > 2) {
          props.setAsGroup([props.Dashboard.activeBO, businessObject.dims[2]])

        }
        else
          props.setAsGroup([props.Dashboard.activeBO, ""])
      }
      if (businessObject.meas.length) {
        props.runQuery()
      }
    }
    else if (props.container == "condition") {

      props.removeCondition([props.Dashboard.activeBO, props.condition.id])
      props.runQuery();
    }
  }
  changeAttribute(item) {
    let props = this.props;
    let activeBO = props.Dashboard.activeBO;
    let businessObject = props.Dashboard.businessObjects[activeBO];
    if(item.key==1){
      //set as mark
      let mark = businessObject.mark
      props.setAsMark([activeBO,props.columnDetail.id])
      if(businessObject.xAxis == props.columnDetail.id)
      props.setAsXaxis([activeBO,mark])
      else if(businessObject.group == props.columnDetail.id)
      props.setAsGroup([activeBO,mark])
    }
    else if(item.key ==2 ){
      let group = businessObject.group
      
      props.setAsGroup([activeBO,props.columnDetail.id])
      if(businessObject.xAxis == props.columnDetail.id)
      props.setAsXaxis([activeBO,group])
      else if(businessObject.mark == props.columnDetail.id)
      props.setAsMark([activeBO,group])
    }
    else if(item.key ==3 ){
      let xAxis = businessObject.xAxis
      props.setAsXaxis([activeBO,props.columnDetail.id])
      if(businessObject.mark == props.columnDetail.id)
      props.setAsMark([activeBO,xAxis])
      else if(businessObject.group == props.columnDetail.id)
      props.setAsGroup([activeBO,xAxis])
    
    } 
    else if(item.key ==4 ){
      
      props.setAsYaxis([activeBO,props.columnDetail.id])
    }

    this.props.runQuery()
  }
  render() {
    const display = {
      display: 'inline-block'
    }

    const { isDragging, connectDragSource } = this.props;
    let props = this.props;
    let activeBO = props.Dashboard.activeBO;
    let businessObject = props.Dashboard.businessObjects[activeBO];

    let options = []
    if (props.container == "dimension") {
      if (businessObject.xAxis == props.columnDetail.id)
        options = [{
          label: "Set as mark",
          id: 1
        }, {
          label: "Set as group",
          id: 2
        }]
      else if (businessObject.mark == props.columnDetail.id)
        options = [{
          label: "Set as group",
          id: 2
        }, {
          label: "Set as x-axis",
          id: 3
        }]
      else if (businessObject.group == props.columnDetail.id)
        options = [{
          label: "Set as mark",
          id: 1
        }, {
          label: "Set as x-axis",
          id: 3
        }]
      else
        options = [{
          label: "Set as mark",
          id: 1
        }, {
          label: "Set as group",
          id: 2
        }, {
          label: "Set as a-axis",
          id: 3
        }]
    }
    else if(props.container == "measure") {
      if(businessObject.yAxis!=props.columnDetail.id)
      options = [
        {
          label: 'set as y-axis',
          id: 4
        }
      ]
    }

    const menu = (

      <Menu>

        {
          options.map(option => <Menu.Item onClick={this.changeAttribute} key={option.id}>
            {
              option.label
            }
          </Menu.Item>)
        }
      </Menu>
    );
    return connectDragSource(
      <li>
        
          {
            props.container == "condition"
              ?
              <span className="axis-text"> {props.condition.agg == "" ? props.condition.alias : `${props.condition.agg}(${props.condition.alias})`} </span>
              :
              <Dropdown overlay={menu} trigger={['click']}>
              <span className="axis-text">
                {businessObject.xAxis == props.columnDetail.id ?
                  <label htmlFor="">x-axis</label> :
                  businessObject.mark == props.columnDetail.id ?
                    <label>mark</label> : businessObject.group == props.columnDetail.id ? <label>group</label> : ''
                }
                {
                  (businessObject.yAxis == props.columnDetail.id ?
                    <label>y-axis</label> :
                    false)}
                {props.container == "dimension" ? props.columnDetail.alias : (props.columnDetail.aggregation == "" || props.columnDetail.aggregation ==null ? 'Sum(' + props.columnDetail.alias + ')' : props.columnDetail.aggregation + '(' + props.columnDetail.alias + ')')
                }

              </span>
              </Dropdown>

          }
        <label className="close-list" onClick={this.removeLabel}></label>
      </li>
    )
  }
}
