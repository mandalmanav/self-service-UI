export const UPDATE_DATASOURCE= 'UPDATE_DATASOURCE';


export  default function updateDatasource(updatesource){
    return{
        type : UPDATE_DATASOURCE,
        payload: updatesource.datasource
      }
        
}

