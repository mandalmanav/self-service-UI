import React from 'react';
import { Tabs, Checkbox, Button } from 'antd';
import makeRequest from '../../utilities/MakeRequest'
import { connect } from 'react-redux';
import '../visualization/css/visualization.css'
import '../visualization/css/kpi-bank.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import KPIUSERIMG from '../../assets/images/kpiuser.png'
import ContactCenterImg from '../../assets/images/contactcenterImg.png'
import RentalImg from '../../assets/images/rentalImg.png'
import TelecomImg from '../../assets/images/telecomImg.png'
import FilterImg from '../../assets/images/filterImg.png'
import InfoImg from '../../assets/images/infoImg.png'
import ArrowiconImg from '../../assets/images/arrowiconImg.png'
import DraggableColumn from './DraggableColumn'
import DroppableColumn from './DroppableColumn'
import { orgUrl } from '../../constants/constants'
import { Tooltip, Modal ,Icon} from 'antd';
const TabPane = Tabs.TabPane;

class KPIBank extends React.Component {

  constructor(props) {
    super(props)
    // this.connectColumns.bind(this)
    this.state = {
      connectColumns: (from, to) => {
        let columnConnects = this.state.columnConnects;
        columnConnects[to] = from;
        this.setState({
          columnConnects
        })
      },
      columnConnects: {

      },
      activeKey: "1",
      domains: {
        1: "Contact Center",
        2: "Retail",
        3: "Telecom"
      },
      selectedDomain: "1",

      reqColumn: {

        "kpiId": [],
        "1": [
          {
            id: "1",
            name: "Abandoned Call"
          }, {
            id: "2",
            name: "Call Answered"
          }
        ], "2": [
          {
            id: "1",
            name: "ACW Min"
          }
        ], "3": [
          {
            id: "1",
            name: "Talk Min"
          }, {
            id: "2",
            name: "Hold Min"
          }, {
            id: "3",
            name: "ACW Min"
          }, {
            id: "4",
            name: "Call Answered"
          }
        ], "4": [
          {
            id: "1",
            name: "Sales"
          }, {
            id: "2",
            name: "Call Answered"
          }
        ], "5": [
          {
            id: "1",
            name: "Call Answered"
          }
        ], "6": [
          {
            id: "1",
            name: "Transfer Count"
          }, {
            id: "2",
            name: "Call Answered"
          }
        ], "7": [
          {
            id: "1",
            name: "CSAT"
          }, {
            id: "2",
            name: "Surveys"
          }
        ], "8": [
          {
            id: "1",
            name: "DSAT"
          }, {
            id: "2",
            name: "Surveys"
          }
        ], "9": [
          {
            id: "1",
            name: "FCR"
          }, {
            id: "2",
            name: "Surveys"
          }
        ], "10": [
          {
            id: "1",
            name: "Hold Min"
          }
        ], "11": [
          {
            id: "1",
            name: "Login Min"
          }
        ], "12": [
          {
            id: "1",
            name: "Repeat Calls"
          }
        ], "13": [
          {
            id: "1",
            name: "Talk Min"
          }
        ], "14": [
          {
            id: "1",
            name: "Aux Total Min"
          }
        ]
      },

      attributeList: {

        "1": [{
          id: "1",
          name: "date"
        }, {
          id: "2",
          name: "vendor"
        }, {
          id: "3",
          name: "site"
        }, {
          id: "4",
          name: "LOB"
        }, {
          id: "5",
          name: "agent"
        }]
      }, kpiList: {
        "1": [{
          id: 1,
          title: "Abandoned Rate",
          definition: "Abandon rate is the percentage of inbound calls made to a contact center  that are abandoned by the customer before speaking to an agent. It is calculated as abandoned calls ",
          formula: "Sum('Abandoned Call') /Sum('Call Answered')",
          details: ""
        }, {
          id: 2,
          title: "After Call Work(Min)",
          definition: "Measure the amount of time call agents take to complete their post-call work. This metric allows managers to monitor the efficiency of your agents in completing the required post-call work, and enables managers to gauge how much time must be allotted for post-call work.",
          formula: "Sum('ACW Min')",
          details: ""
        }, {
          id: 3,
          title: "AHT",
          definition: "This metric enables managers to monitor the average amount of time a single call lasts. Knowing the average handle time helps managers and team members understand the workload, in terms of time, that is required with every customer call, while also helping the call center manager knows agent performance and efficiency.",
          formula: "Sum( ('Talk Min' +'Hold Min' +'ACW Min' )/sum('Call Answered')",
          details: ""
        }, {
          id: 4,
          title: "Conversion Rate",
          definition: "The conversion rate is the number of Sales divided by the total number of Calls.",
          formula: "Sum(Sales) /sum('Call Answered')",
          details: ""
        }, {
          id: 5,
          title: "Call Answer",
          definition: "Total Number of Calls Answered by an Agent",
          formula: "Sum('Call Answered')",
          details: ""
        }, {
          id: 6,
          title: "Transfer Rate",
          definition: "This KPI measures the accuracy in which callers are routed to the correct representative as well as the ability of representatives to resolve caller issues",
          formula: "Sum('Transfer Count') /sum('Call Answered')",
          details: ""
        }, {
          id: 7,
          title: "CSAT %",
          definition: "Customer Satisfaction (CSAT) is an indication of customer happiness. It’s usually based on a survey that customers fill out,after a Call",
          formula: "Sum(CSAT /'Surveys ')",
          details: ""
        }, {
          id: 8,
          title: "DSAT%",
          definition: "Customer Dissatisfaction  (DSAT) is an indication of customer dissatisfaction . It’s usually based on a survey that customers fill out, after a Call",
          formula: "Sum(DSAT /'Surveys ')",
          details: ""
        }, {
          id: 9,
          title: "FCR%",
          definition: "",
          formula: "Sum(FCR) /sum('Surveys ')",
          details: ""
        }, {
          id: 10,
          title: "Hold Time",
          definition: "Putting customer calls on hold is never ideal, but as with any busy call center not every call can be taken as soon as it comes in. This metric gives managers a view into how long the average caller waits on hold before they are connected to a call agent.",
          formula: "Sum('Hold Min')",
          details: ""
        }, {
          id: 11,
          title: "Login Min",
          definition: "Total available time of an agent ",
          formula: "Sum('Login Min')",
          details: ""
        }, {
          id: 12,
          title: "Repeat Call",
          definition: "The Repeat Calls metric gives call center managers the ability to identify recurring issues that are brought up in support calls. When particular issues have high occurrence rates, teams can prioritize their work to ensure the fix positively impacts the most amount of customers, hereby decreasing the total number of support calls coming in",
          formula: "Sum('Repeat Calls')",
          details: ""
        }, {
          id: 13,
          title: "Talk Time",
          definition: "Total time of an agent on calls ",
          formula: "Sum('Talk Min')",
          details: ""
        }, {
          id: 14,
          title: "Aux Total Min",
          definition: "Total break Time ",
          formula: "SUM( Aux Total Min)",
          details: ""
        }]
      },
      selectedKpis: [],
      dataLoadSuccess: false,
      dataLoaded:false

    }
    this.uniqueColumns = this.uniqueColumns.bind(this)
  }
  uniqueColumns(state) {
    let selectedCol = [];
    let uniqueColumns = [];
    state.selectedKpis.map(kpiId => {
  
      state.reqColumn[kpiId]
        .sort(function (a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        }).map(
          attribute => {
            if (selectedCol.indexOf(attribute.name) === -1) {
              selectedCol.push(attribute.name);
              uniqueColumns.push(attribute)
            }
          })
  
    })
   
    return uniqueColumns
  }
  onChange(e) {
    this.setState({ selectedKpis: e })
  }
  autoMap() {
    let uniqueColumns = this.uniqueColumns(this.state)
   
    let attrs =[ ...this.state.attributeList[this.state.selectedDomain],...uniqueColumns];
    for (let i = 0; i < attrs.length; i++) {
      let to = attrs[i].name;
      let from = this.props.columns.filter(col => col.alias == to)[0]
      if (from)
        this.state.connectColumns(from.alias, to)
      // else
      // {
      //   from = uniqueColumns.filter(col => col.name == to)[0]
      //   if (from)
      //   this.state.connectColumns(from.name, to)
      // }
    }

  }
  next() {
    if (Number(this.state.activeKey) < 3)
      this.setState({ activeKey: String(Number(this.state.activeKey) + 1) })
    else if (Number(this.state.activeKey) == 3) {
      let columnConnects = []
      let keys = Object.keys(this.state.columnConnects);
      for (let i = 0; i < keys.length; i++) {
        let c = this.state.columnConnects[keys[i]] + ":" + keys[i]
        columnConnects.push(c)
      }
      let data = {
        "data": {
          "workboard_id": 1109,
          "params": {
            "mapping": columnConnects,
            "pUniqueFileName": [this.props.uniqueFileName],
            "pIndexColumn": this.props.columns.map(col => col.index + ":" + col.alias + ":" + col.dataType),
            "pDelimiter": [","],
            pSheetName: [this.props.sheetName],
            "pkpi": this.state.kpiList[this.state.selectedDomain].filter(kpi => {
              return this.state.selectedKpis.indexOf(kpi.id) != -1

            }).map(kpi => {
              return kpi.title
            })
          },
          "enableCache": false,
          businessobject_name: "KPI_Mapper"
        }
      }
      this.setState({ dataLoadSuccess: true })
      makeRequest.post('data/getKettleData', data)
        .then((response) => {
          this.setState({ dataLoaded: true })
        })
    }
  }
  render() {
    var self = this;
    return (
      <div className="Kpi_container">
        <Modal
         
          //visible={true}
          visible={this.state.dataLoadSuccess}
          // onOk={}
          onCancel={() => { 
            this.setState({ dataLoadSuccess: false });
            this.props.history.push('/')
          
          }}
          footer={null}
        >
         {
         !this.state.dataLoaded?
        <div>
           <Icon style={{fontSize:"50px",color:"green"}} type="loading" theme="outlined" /> &nbsp;&nbsp;&nbsp;Almost there. Please wait, we are preparing your dashboard
        </div>:null
        }
        {
         this.state.dataLoaded?
          <div >
            <Icon type="smile" style={{fontSize:"40px",color:"green"}} theme="outlined" />
            
              &nbsp;&nbsp;&nbsp;Your dashboard is ready. &nbsp;
              <a
              style={{
                color: "#007bff",
                textDecoration: "underline"
              }}
              onClick={() => {
                window.open(`${orgUrl}?auth_token=${window.sessionStorage.getItem('accessToken')}#dashboard?id=3112&name=KPI Mapper Grid`)
              }}>Click to open
             </a>
          </div>:null
        
        }
        </Modal>
        <div className="kpi-bodysection">
          <h3><img src={KPIUSERIMG} />KPI Bank</h3>
          <Tabs defaultActiveKey="1" activeKey={this.state.activeKey} >
            <TabPane tab="Choose Domain" key="1" className="tabs-onewidth">
              <div className="domain-list">
                <ul>
                  <li onClick={() => {
                    this.setState({ activeKey: "2" })
                  }}><img src={ContactCenterImg} /><span>Contact Center</span></li>
                  <li onClick={() => {
                    this.setState({ activeKey: "2" })
                  }}><img src={RentalImg} /><span>Retail</span></li>
                  <li onClick={() => {
                    this.setState({ activeKey: "2" })
                  }}><img src={TelecomImg} /><span>Telecom</span></li>
                </ul>
              </div>
            </TabPane>

            <TabPane tab="Choose Domain KPI'S" key="2" className="tabshrightcal">
              <div className="domainkpi-section">
                <div className="leftpanel">
                  <div className="kpibank__list_widget">
                    <div className="kpibank__list_widget_header">
                      Domain
                  </div>

                    <div className="kpibank__list_widget_content">
                      {this.state.domains[this.state.selectedDomain]}
                    </div>
                  </div>

                </div>
                <div className="rightpanel">
                  <p>We have <span className="numeric-text">{this.state.kpiList[this.state.selectedDomain].length}</span> {this.state.domains[this.state.selectedDomain]} KPI's for you, choose atleast one KPI to create dashboard</p>
                  <ul>
                    {/* <Checkbox.Group style={{ width: '100%' }} > */}

                    <li>
                      <span class="colone" style={{ fontWeight: 'bold' }}>KPI name</span>
                      <span class="coltwo" style={{ fontWeight: 'bold' }}>Description</span>
                      <span class="coltwo" style={{ fontWeight: 'bold' }}>Formula</span>
                      <span class="coltwo" style={{ fontWeight: 'bold' }}>Detail</span>

                    </li>
                    {/* </Checkbox.Group> */}
                    {/* <li className="firstchild"><span className="colone"><input type="checkbox" /><label>All</label></span></li> */}
                    <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange.bind(this)}>


                      {
                        this.state.kpiList[this.state.selectedDomain].map(item => {
                          return (
                            <li key={item.id}>
                              <span className="colone">
                                <Checkbox value={item.id}></Checkbox>
                                <label>{item.title}</label></span>
                              <span className="coltwo"
                                style={{
                                  whiteSpace: "nowrap",
                                  width: "52px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "block"

                                }}
                              >{item.definition}</span>
                              <span className="coltwo">{item.formula}</span>
                              <span className="coltwo">
                                <Tooltip title={item.definition}>
                                  <span> <a >View detail</a></span>
                                </Tooltip>

                              </span>
                            </li>
                          )
                        })
                      }
                    </Checkbox.Group>


                  </ul>
                </div>
              </div>
            </TabPane>

            <TabPane tab="KPI Attributes" key="3" className="tabshrightcal">
              <div className="domainkpi-section kpiattributes-section">
                <div className="leftpanel">


                  <div className="kpibank__list_widget">
                    <div className="kpibank__list_widget_header">
                      Domain
</div>

                    <div className="kpibank__list_widget_content">
                      {this.state.domains[this.state.selectedDomain]}
                    </div>
                  </div>

                  <div className="kpibank__list_widget">
                    <div className="kpibank__list_widget_header">
                      Selected Kpi's
</div>

                    <div className="kpibank__list_widget_content">
                      <ul className="kpibank__kpi_list">
                        {

                          this.state.kpiList[this.state.selectedDomain].map(kpi => {
                            if (this.state.selectedKpis.indexOf(kpi.id) != -1) {
                              return <li>{kpi.title}</li>
                            }
                          })
                          //  this.state.selectedKpis.map(kpi=>{

                          //  <li>{this.state.kpiList[this.state.selectedDomain].filter(kpi=>kpi.id == kpi)[0].title}</li>   
                          //   })
                        }

                      </ul>
                    </div>

                  </div>




                </div>
                <div className="rightpanel">
                  <p>
                    <span style={{ color: 'red' }}>*</span> Drag the fields to attributes and required columns
                    <Button style={{ width: "100px", margin: "0 10px" }} onClick={this.autoMap.bind(this)}>Auto Map </Button>

                  </p>
                  <div className="attributesbuild-section">
                    <div className="attributesbuild-section-one">
                      <h5>Input Fields
                         {/* <span><img src={FilterImg} /></span> */}
                      </h5>
                      <ul>
                        {
                          this.props.columns
                            .sort(function (a, b) {
                              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                              return 0;
                            })
                            .map(column => <DraggableColumn column={column} />)
                        }

                      </ul>
                    </div>
                    <div className="attributesbuild-section-one attributesbuild-section-two">
                      <h5>Recommended attributes <span>
                        {/* <img src={FilterImg} /> */}
                      </span></h5>
                      <ul>
                        {
                          //   this.state.selectedKpis.map(kpiId=>{
                          //return 
                          this.state.attributeList[this.state.selectedDomain]
                            .sort(function (a, b) {
                              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                              return 0;
                            }).map(attribute => <DroppableColumn attribute={attribute} connectColumns={this.state.connectColumns.bind(this)} mappedColumn={this.state.columnConnects[attribute.name] || ''} />)

                          //    })
                        }


                      </ul>
                    </div>
                    <div className="attributesbuild-section-one attributesbuild-section-two">
                      <h5>Required Columns <span>
                        {/* <img src={FilterImg} /> */}
                      </span></h5>
                      <ul>

                        {
                          this.uniqueColumns(this.state).sort(function (a, b) {
                            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                            return 0;
                          }).map(attribute => <DroppableColumn attribute={attribute} connectColumns={this.state.connectColumns.bind(this)} mappedColumn={this.state.columnConnects[attribute.name] || ''} />)


                        }


                      </ul>
                    </div>
                    {/* <div className="attributesbuild-section-three">
                      <h5>Add new attribute <span><img src={InfoImg} /></span></h5>
                      <div className="form-container">
                        <div className="form-group">
                          <label for="">Input field</label>
                          <input type="text" />
                        </div>
                        <div className="form-group">
                          <label for="">Attribute name</label>
                          <input type="text" />
                        </div>
                        <div className="form-group">
                          <label for="">Description(Optional)</label>
                          <input type="textarea" />
                        </div>
                        <a href="#">Create attribute</a>
                      </div>
                    </div> */}

                  </div>
                </div>
              </div>
            </TabPane>

            {/* <TabPane tab="KPI Buider" key="4" className="tabshrightcal">
              <div className="domainkpi-section kpiattributes-section">
                <div className="leftpanel">
                  <h5>DOMAIN</h5>
                  <ul>
                    <li>Contact Center</li>
                  </ul>

                  <div className="kpi-sectionlist">
                    <h5>KPI's</h5>
                    <ul>
                      <li>Overall Index by Site</li>
                      <li>Overall Index by Supervisor</li>
                      <li>Overall Index by Manager</li>
                    </ul>
                  </div>

                </div>
                <div className="rightpanel">
                  <p><span style={{ color: 'red' }}>*</span> Map Input fields with recommended attributes</p>
                  <div className="attributesbuild-section">
                    <div className="attributesbuild-section-one">
                      <h5>Input Fields <span><img src={FilterImg} /></span></h5>
                      <ul>
                        <li>Metrics Value</li>
                        <li>Metrics Aggragation</li>
                        <li>Metrics weighting in ranking</li>
                        <li>OPID</li>
                        <li>Program</li>
                        <li className="active">Record ID</li>
                        <li>Recruiting applicant source</li>
                        <li>Customer</li>
                      </ul>
                    </div>
                    <div className="attributesbuild-section-one attributesbuild-section-two">
                      <h5>Required Fields <span><img src={FilterImg} /></span></h5>
                      <ul>
                        <li className="active">Record ID <span><img src={ArrowiconImg} style={{ paddingRight: '10px' }} />Record ID</span></li>
                        <li>Customer</li>
                        <li>Division</li>
                        <li>LOB</li>
                        <li className="active">Program <span><img src={ArrowiconImg} style={{ paddingRight: '10px' }} />Record ID</span></li>
                        <li>Campaign</li>
                        <li>Skill</li>
                        <li>VDN</li>
                      </ul>

                    </div>

                    <div className="attributesbuild-section-one">
                      <h5>Available attributes <span><img src={FilterImg} /></span></h5>
                      <ul>
                        <li>Metrics Value</li>
                        <li>Metrics Aggragation</li>
                        <li>Metrics weighting in ranking</li>
                        <li>OPID</li>
                        <li>Program</li>
                        <li>Record ID</li>
                        <li>Recruiting applicant source</li>
                        <li>Customer</li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </TabPane> */}
          </Tabs>
        </div>


        <div style={{ position: 'absolute' }} className="kpi-footersection">

          {
            this.state.activeKey != "1" ? <a onClick={() => {
              if (this.state.activeKey == "3")
                this.setState({ activeKey: "2" })
              if (this.state.activeKey == "2")
                this.setState({ activeKey: "1" })
            }
            } style={{
              float: "left",
              left: 0,
              position: "absolute",
              color: 'white',
              margin: "0 15px",
              background: '#2257CE', 
              borderRadius: '20px'
            }}>Back</a>
              : null}

          {
            this.state.activeKey != "1" ?
              <a style={{ color: 'white', background: '#2257CE', borderRadius: '20px' }} onClick={this.next.bind(this)}>
                {this.state.activeKey == "2" ? 'Next' : 'Publish'}
              </a> : null
          }

        </div>
      </div>
    );
  }
}


export default DragDropContext(HTML5Backend)(KPIBank);
// export default KPIBank;
