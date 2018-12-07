import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import './header.css';
import $ from 'jquery';
import im from '../../assets/images/logo.svg';
import minimize from '../../assets/images/minimize.svg';
import zoomimg from '../../assets/images/zoomImg.svg'
import { Link } from 'react-router-dom';
import { Modal, Menu, Dropdown, Icon } from 'antd';
import NewProjectModal from './NewProjectModal'
import DSImg from '../../assets/images/icon-ds.png'
import { saveWorkboardValues } from '../../actions/WorkboardListAction'
const SubMenu = Menu.SubMenu;

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props)
    //this.menuClicked.bind(this)
    this.state = {
      newProjectModal: false,
      projectModalTitle: '',
      activeTab: 1,
      exitModal: false,
      fullscreen: 0
    }
    //this.setModalFalse.bind(this);
  }
  setModalFalse(name, redirectTo, value) {
    let obj = {}
    obj[name] = false;
    this.setState(obj)
    this.props.actions.saveWorkboardValues({ key: "name", value: value });
    if (redirectTo == "home") {
      this.props.history.push('/home')
    }
  }
  menuClicked(item) {
    console.log(item);
    if (item.key == "dashboard") {
      this.setState({
        newProjectModal: true,
        projectModalTitle: "Dashboard"
      })
    }

    else if (item.key == "storyboard") {
      this.setState({
        newProjectModal: true,
        projectModalTitle: "Storyboard"
      })
    }
    else if (item.key == "exit") {
      this.setState({ exitModal: true })
    }
    else if (item.key == "addDs") {
      this.props.history.push('/datasource')
    }
    else if (item.key == "openDs") {
      this.props.history.push('/home')
    }
    else if (item.key == "print") {
      window.print()
    }

    else if (item.key == "visualization") {
      this.setState({
        newProjectModal: true,
        projectModalTitle: "Visualization"
      })
    }
    else if (item.key == "fullscreen") {
      {
        this.setState({ fullscreen: 1 })

        if (document.body.requestFullscreen) {
          document.body.requestFullscreen();
        } else if (document.body.mozRequestFullScreen) { /* Firefox */
          document.body.mozRequestFullScreen();
        } else if (document.body.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          document.body.webkitRequestFullscreen();
        } else if (document.body.msRequestFullscreen) { /* IE/Edge */
          document.body.msRequestFullscreen();
        }
      }
    }
    else if (item.key == "exitFullscreen") {
      this.setState({ fullscreen: 0 })
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    else if (item.key == "visualization") {
      this.setState({
        newProjectModal: true,
        projectModalTitle: "Visualization"
      })
    }
  }
  render() {
    var self = this;
    const fileMenu = (
      <Menu onClick={this.menuClicked.bind(this)}>
        <SubMenu title="New Dashboard">
          <Menu.Item key="dashboard">Dashboard</Menu.Item>
          {/* {this.state.activeTab !=0 ? <Menu.Item key="dashboard">Dashboard</Menu.Item>:null} */}
          {/* <Menu.Item key="storyboard">Story Board</Menu.Item> */}
          {/* {this.state.activeTab !=0 ?  <Menu.Item key="visualization">Visualization</Menu.Item>:null} */}
        </SubMenu>

        {/* {this.state.activeTab !=0 ?  <Menu.Item key="save">Save</Menu.Item>:null} */}
        {/* {this.state.activeTab !=0 ?  <Menu.Item key="saveAs">Save As</Menu.Item>:null} */}
        {
          this.state.activeTab != 0 ?
            <SubMenu title="Export">
              {/* <Menu.Item key="pdf">Pdf</Menu.Item> */}
              {/* <Menu.Item key="image">Image</Menu.Item> */}
              <Menu.Item key="print">Print</Menu.Item>
            </SubMenu>
            : null
        }
        <Menu.Item key="exit">Exit</Menu.Item>
      </Menu>
    );
    const dataMenu = (
      <Menu onClick={this.menuClicked.bind(this)}>

        <Menu.Item key="addDs">Add New Datasource</Menu.Item>
        <Menu.Item key="openDs">Open existing datasource</Menu.Item>

      </Menu>
    );
    const viewMenu = (
      <Menu onClick={this.menuClicked.bind(this)}>

        {!this.state.fullscreen ? <Menu.Item key="fullscreen">Goto Full Screen</Menu.Item> : <Menu.Item key="exitFullscreen">Exit Full Screen</Menu.Item>}

        {this.state.activeTab == 2 ? <Menu.Item key="showToolbar">Show Toolbar</Menu.Item> : null}
        {this.state.activeTab == 2 ? <Menu.Item key="hideToolbar">Hide Toolbar</Menu.Item> : null}


      </Menu>
    );

    return (
      <div className="header_section">
        <Modal
          title="Exit"
          visible={this.state.exitModal}
          onOk={() => { $(window.parent.document.body).find("iframe").remove() }}
          onCancel={() => {
            this.setState({ exitModal: false })
          }}
        >
          <p>Your changes will not be saved. Are you sure you want to exit.</p>

        </Modal>
        {this.state.newProjectModal ? <NewProjectModal setModalFalse={this.setModalFalse.bind(this)} label={this.state.projectModalTitle} /> : null}
        <div className="logo">
          {/* <img style={{cursor:'pointer'}} src={im} /> */}
          <img style={{ width: '32px', height: '32px' }} src={DSImg} />
          {/* <i className="zmdi zmdi-grain"></i> */}
          <h2>
            {this.props.workboardConfig.name}
          </h2>
        </div>

        <div className="navigation__wrapper">

          <div className="tabs-file-menu">
            <ul>
              <li>
                <Dropdown overlay={fileMenu}>
                  <a className="ant-dropdown-link" href="#" style={{ "textTransform": "capitalize" }}>
                    File
                    </a>
                </Dropdown>
              </li>
              <li>
                <Dropdown overlay={dataMenu}>
                  <a className="ant-dropdown-link" href="#" style={{ "textTransform": "capitalize" }}>
                    Data
                    </a>
                </Dropdown>
              </li>
              <li>
                <Dropdown overlay={viewMenu}>
                  <a className="ant-dropdown-link" href="#" style={{ "textTransform": "capitalize" }}>
                    View
                    </a>
                </Dropdown>
              </li>
            </ul>

          </div>


          {
            (Object.keys(this.props.DataSources).length && this.props.url != '/kpibank/app') ?
              <div className="application__tabs">
                <ul>


                  {/* <li onClick={(e) => {
                  $(e.target.parentElement).children().removeClass('active'); e.target.classList.add('active'); self.props.history.push("/Home")
                }}>Home</li> */}

                  <li onClick={(e) => {
                    self.props.changeTab(1); self.props.history.push("/JointPanel")
                  }} class={this.props.activeTab == 1 ? 'active' : ''}>MetaData</li>
                  <li onClick={
                    (e) => {
                      self.props.changeTab(2); self.props.history.push("/visualization")
                    }} class={this.props.activeTab == 2 ? 'active' : ''}>Visualization</li>
                  <li onClick={(e) => {
                    self.props.changeTab(3); self.props.history.push("/newDashboard")
                  }} class={this.props.activeTab == 3 ? 'active' : ''}>Dashboard Designer</li>

                </ul>
              </div> : <span></span>
          }</div>
        <div className="rigntIcon"  >
          {/* <img style={{ width: '25px', marginRight: '20px', cursor: 'pointer' }} src={minimize} />
          <img style={{ width: '17px', cursor: 'pointer' }} src={zoomimg} /> */}
          <i class="zmdi zmdi-close" onClick={() => {

            this.setState({ exitModal: true })
          }}></i>
        </div>

        {/* <h1>Self-Service</h1>
          <Link to="/JointPanel" >MetaData</Link>        
          <Link to="/visualization" >visualization</Link>        
          <Link to="/newDashboard" >designer</Link>
          <span><i className="fa fa-times-circle" aria-hidden="true"></i></span> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    actions: bindActionCreators({
      saveWorkboardValues
    }, dispatch)
  }
}
const mapStateToProps = (state) => {
  return {
    DataSources: state.DataSources,
    workboardConfig: state.WorkboardList

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
