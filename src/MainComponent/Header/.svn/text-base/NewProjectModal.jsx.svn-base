import React, { Component } from 'react'
import { Modal, Button, Input } from 'antd';

export default class NewProjectModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      value: '',
      showError: false
    }
    this.handleOk.bind(this)
    this.handleCancel.bind(this)

  }
  handleChange(e) {
    this.state.showError ? this.setState({ showError: false }) : null;
    this.setState({ value: e.target.value })

  }
  handleOk = (e) => {
    if (!this.state.value.trim().length) {
      this.setState({ showError: true })
      return
    }
    this.setState({
      visible: false,
    }, () => {
      this.props.setModalFalse("newProjectModal", "home", this.state.value)
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    }, () => {
      this.props.setModalFalse("newProjectModal")
    });;
  }
  render() {
    return (
      <div>
        <Modal
          title={`New Dashboard`}
          visible={this.state.visible}
          // onOk={this.handleOk}
          // onCancel={this.handleCancel}
          footer={<div style={{padding:'5px 0'}}>
              <span style={{marginRight: '10px',background: 'rgb(255, 255, 255)',borderRadius: '20px',border: '1px solid rgb(234, 234, 234)',color: 'rgb(112, 112, 112)',padding: '5px 20px',
                cursor: 'pointer'}} onClick={this.handleCancel}>Cancel</span>
              <span style={{marginRight: '10px',background: 'rgb(34, 87, 206)',borderRadius: '20px',border: 'none',color: 'rgb(255, 255, 255)',padding: '5px 20px',
                cursor: 'pointer'}} onClick={this.handleOk}>Ok</span>
          </div>            
          }
        >
          <p style={{marginBottom:'7px'}}>
            Enter New Dashboard Name
           </p>
          <Input value={this.state.value} onChange={this.handleChange.bind(this)} placeholder='enter new dashboard name' />

          {
           <p style={{
              color: "red",
              padding: "10px 0",
              opacity:this.state.showError?1:0
            }}>Please enter dashboard name</p> 
          }
        </Modal>
      </div>
    )
  }
}
