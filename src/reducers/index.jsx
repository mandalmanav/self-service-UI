import { combineReducers } from 'redux';
import FetchDatasourceReducer from '../reducers/UpdateDatasource-reducer.jsx';
import ServiceResponse from './FetchServiceData.jsx';
import DataSourceList from './DataSourceListReducer.jsx';
import SelfServiceObjectList from './SelfServiceObjectListReducer.jsx';
import TableList from './TableListReducer.jsx';
import ColumnList from './ColumnListReducer.jsx';
import url from './url.jsx';
import WorkboardList from './WorkboardListReducer.jsx';
import Page from './Page.jsx';
import DataSources from './DataSources'
import SelectedRows from './SelectedRows'
import Join from './Join.jsx'
import Tables from './Tables.jsx';
import SelectedColumns from './SelectedColumns'
import Dashboard from './Dashboard'
import BusinessObjects from './BusinessObjects'
import SavedObjects from './SavedObjects'
import SavedDashboardObjects from './SavedDashboardObjects'
import DataObjects from './DataObjects'
import FileDetails from './FileDetails'
//import { posts, postsHasErrored, postsIsLoading } from './posts';


const allReducers = combineReducers({
  Join, Tables, SavedObjects, SavedDashboardObjects,
  FetchDatasourceReducer,
  DataSourceList,
  SelfServiceObjectList,
  TableList,
  url,
  Page,
  WorkboardList,
  ServiceResponse,
  DataSources,
  Dashboard,
  BusinessObjects,
  DataObjects,
  FileDetails
  // add multiple reducers here
});

export default allReducers;
