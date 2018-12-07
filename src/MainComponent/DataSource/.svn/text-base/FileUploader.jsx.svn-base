import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import "babel-polyfill";
import { bindActionCreators } from 'redux';
// import './connections.css';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Dropzone from 'react-fine-uploader/dropzone';
import Filename from 'react-fine-uploader/filename';
import ProgressBar from 'react-fine-uploader/progress-bar';
import DeleteButton from 'react-fine-uploader/delete-button';
import FileInput from 'react-fine-uploader/file-input';
import Filesize from 'react-fine-uploader/filesize';
import { message, Modal, Button, Select, Table ,Icon} from 'antd';
import axios from "axios";
import { baseUrl } from '../../constants/constants'
import svguploader from './fileuploaderImg.svg';
import kpiImg from '../../assets/images/kpicon.png';
import selfserviceImg from '../../assets/images/selfserviceIcon.png';

const confirm = Modal.confirm;
const uploader = new FineUploaderTraditional({
  options: {
    autoUpload: false,
    deleteFile: {
      enabled: true
    },
    chunking: {
      enabled: false
    },
    validation: {
      allowedExtensions: ['xlsx', 'xls', 'csv'],
      itemLimit: 1,
      maxFileSize: 99999999999,
      minFileSize: 1,
      acceptFiles: ".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    request: {
      customHeaders: {
        "Authorization": 'bearer ' + sessionStorage.getItem('accessToken')
      },
      endpoint: `${baseUrl}publish/upload`,
      params: {
        'token': sessionStorage.getItem('accessToken'),
        "type": 'selfService'
      }
    },
    callbacks: {},
    retry: {
      enableAuto: false
    }
  }
});

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

const Option = Select.Option;

const dropzone = (
  <Dropzone
    uploader={uploader}
  >
    <p className="uploadtext">Upload .csv or .xls file to explore data!</p>
    <div className="image-upload-wrap">
      <img style={{ width: '100%', height: '200px' }} src={svguploader} />
    </div>
  </Dropzone>
)

const fileInput = (
  <FileInput 
    uploader={uploader} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
  >
    <div className="browser-section">
      <span style={{ display: 'block' }}>Or</span>
      <button className="bttn icon ion-upload">Browse Files</button>
    </div>

  </FileInput>
)


class FileUploader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submittedFiles: [],
      modal1Visible: false,
      delimeter: ",",
      chooseAppModal: false
    }
  }
  componentDidMount() {
    var root = this;
    uploader.on('onSubmit',(id,name)=>{
      console.log(uploader.methods)
    })
    uploader.on('submitted', (id, name) => {
      const submittedFiles = this.state.submittedFiles
      submittedFiles.push(id)
      this.setState({ submittedFiles })
      let uploadfile = uploader.methods.getName(0).split('.');
      let filetype = uploadfile[uploadfile.length - 1]
      if (filetype == "csv") {
        this.setState({
          modal1Visible: true
        })
      } else {
        this.setState({
          isFileUploading:true
        })
        uploader.methods.uploadStoredFiles()
      }
    })

    uploader.on('complete', (id, name, response, xhr) => {
      
      if (JSON.parse(xhr.response).success == true) {
        // message.success('File Uploaded Successfully');

        const obj = {};
        obj["filename"] = response.uniqueFileName;
        if (response.uniqueFileName.split('.')[1] && response.uniqueFileName.split('.')[1].toLowerCase() == 'csv') {
          obj['delimeter'] = this.state.delimeter;
          
        }
        obj["projectName"]=this.props.workboardConfig.name;
        this.props.updateFileName(response.uniqueFileName)
        axios({
          method: 'post',
          url: `${baseUrl}self/createTable`,
         
          contentType: "application/json",
          data: JSON.stringify({ data: obj }),
          async: true,
          dataType: 'json',
          headers: {
            "Accept-Language": sessionStorage.getItem('locale') || 'en',
            "authorization": 'bearer ' + sessionStorage.getItem('accessToken'),
            "content-type": "application/json"
          },
        }).then((response) => {
          this.setState({
            isFileUploading:false
          })
          let b = response.data.data.DS;
          this.props.updateDS(b)
          this.props.updateTbDs([b[0].conId])
          var tables = {};
          b.map((item) => {
            return item.tables.map((item_drill0) => {
              item_drill0['dbId'] = item.id;
              item_drill0['dbName'] = item.name;
              item_drill0['dbAlias'] = item.alias;
              return tables[item_drill0.id] = item_drill0;
            })
          })[0]
          this.props.updateTbObject(tables)
          this.setState({
            chooseAppModal: true
          })

        })
        .catch((error)=>{
          this.setState({
            isFileUploading:false
          })
        })
      } else {
        message.error('Something went wrong!!')
      }
    })
  }
  handleOk = () => {
    uploader.methods.setParams({ ...uploader.options.request.params, delimeter: this.state.delimeter })
    uploader.methods.uploadStoredFiles();
    this.setState({ modal1Visible: false });
  }

  handleCancel = () => {
    uploader.methods.cancelAll();
    this.setState({ modal1Visible: false });
  }

  handleChange = (value, self) => {
    self.setState({ delimeter: value })
  }
  gotoKpiBank() {
    this.props.history.push("/kpibank")
  }
  gotoSelfService() {
    this.props.history.push("/JointPanel")
  }
  render() {
    var self = this;
    return (
      <div style={{ width: '100%', padding: '15px' }}>
        {dropzone}
        {fileInput}
        {
          this.state.submittedFiles.map(id => (
            <div>
              <span id="fileSizeID">File Size :-<Filesize id={id} uploader={uploader} /> </span>
              <Filename multiple id={id} uploader={uploader} />
              {/* <ProgressBar id={ id } uploader={ uploader } /> */}
            </div>
          ))
        }
        <Modal
          title="Add Delimiter"
          closable={false}
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.handleOk()}
          // onCancel={() => this.handleCancel()}
          footer={[
            //<Button key="back" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Ok
          </Button>,
          ]}
        >
          <p>Please select a Delimiter</p>
          <Select defaultValue="," style={{ width: '100%' }}
            onChange={
              (e) => {
                this.handleChange(e, self)
              }
            } >
            <Option value=",">Comma(,)</Option>
            <Option value="/t">Tab (\t)</Option>
            <Option value="!">Exclamation mark(!)</Option>
            <Option value="#">Hash(#)</Option>
            <Option value=";">Semicolon(;)</Option>
          </Select>
        </Modal>
        <Modal
         
         //visible={true}
         visible={this.state.isFileUploading}
         // onOk={}
        
         footer={null}
       >
       <div>
       <Icon style={{fontSize:"50px",color:"green"}} type="loading" theme="outlined" /> &nbsp;&nbsp;&nbsp;Please wait. We are processing your data.
       </div>
       </Modal>
        <Modal
          title="Explore your data"
       visible={this.state.chooseAppModal}
      //  visible={true}  
        width={'800px'}
          // bodyStyle={{display: "flex", alignItems: "center", justifyContent: "space-around"}}
          onCancel={()=>{this.setState({chooseAppModal:false})}}
          footer={null}
      >
         {/* <Button onClick={this.gotoKpiBank.bind(this)} className="choose__btn">
           Kpi Bank
         </Button>
          <Button onClick={this.gotoSelfService.bind(this)} className="choose__btn">
           Self service
         </Button> */}

         <div className="sheetselectionmodelbox-container">
           <div className="kpi-container">
              <div className="image-section"> 
                <div class="img">
                  <img src={kpiImg} />
                </div>             
                  
                   <h5>KPI Bank</h5> 
              </div>

                <p>We have prebuild KPI's ready for you. Use our KPI Bank on top of your data to generate insights within minutes.</p> 

                  <div className="footer-container">
                    <button className="bttn" type="button" onClick={this.gotoKpiBank.bind(this)}>Use KPI Bank</button>
                  </div>            
           </div>

           <div className="self-container">
           <div className="image-section"> 
            <div class="img">
                <img src={selfserviceImg} />
            </div>               
                  
                   <h5>Self Service</h5> 
              </div>

                <p>Create you own KPI and build a customized dashboard. Explore the power of Self Service to turn your data into insights.</p> 

                <span className="footer-container">
                  <button className="bttn bttngreen" type="button" onClick={this.gotoSelfService.bind(this)}>Use Self Service</button> 
                </span>
                  
           </div>
         </div>

        </Modal>

      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  updateDS: payLoad => dispatch(({
    type: 'UPDATE_DS',
    payLoad: payLoad
  })),
  updateFileName: payLoad => dispatch(({
    type: 'SET_FILENAME',
    payLoad: payLoad
  })),
  updateTbObject: payLoad => dispatch(({
    type: 'UPDATE_TB_OBJECT',
    payLoad: payLoad
  })),
  updateTbDs: payLoad => dispatch(({
    type: 'UPDATE_TB_DS',
    payLoad: payLoad
  }))

})

const mapStateToProps = (state) => {
  return {
    url: state.url,
    PageLoader: state.Page.loaded,
     workboardConfig: state.WorkboardList
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);