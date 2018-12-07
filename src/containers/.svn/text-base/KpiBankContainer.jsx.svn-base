import React, { Component } from 'react'
import { connect } from 'react-redux'
import KpiBank from '../MainComponent/KPIBank/KPIBank'
class KpiBankContainer extends Component {
    constructor(props) {
        super(props)
    }
}
const mapStateToProps = (state, props) => {
    let columns = []
    state.DataSources.map(ds => {
        ds.tables.map(table => {
            columns = [...columns, ...table.dimensions, ...table.measures]

        })
    })


    return {
        columns,
        uniqueFileName: state.FileDetails,
        sheetName: state.DataSources[0].tables[0].alias
    }
}
export default connect(
    mapStateToProps
)(KpiBank)