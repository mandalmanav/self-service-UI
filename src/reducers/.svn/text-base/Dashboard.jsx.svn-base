const dashboard = (state =
    {
        title: 'My Dashboard',
        filters: [],
        parameters: {},
        appliedParameters: {},
        activeBO: "1",

        businessObjects: {
            "1": {
                title: "Unnamed Kpi 1",
                x: 0,
                y: 0,
                "configuration": {},
                "sql": "",
                height: 12,
                width: 12,
                dims: [],
                meas: [],
                xAxis: "",
                yAxis: "",
                mark: "",
                group: "",
                conditions: []
            }
        }
    }, action) => {
    switch (action.type) {
        case 'ADD_BO':
            let s = state;

            s.businessObjects[action.payLoad] = {
                title: "Unnamed Kpi",
                x: 0,
                y: 0,
                "configuration": {},
                "sql": "",
                height: 12,
                width: 12,
                dims: [],
                meas: [],
                xAxis: "",
                yAxis: "",
                mark: "",
                group: "",
                conditions: []
            }
            s.activeBO = action.payLoad
            return s

        case 'UPDATE_DASHBOARD_TITLE':
            return { ...state, title: action.payLoad }
            break;
        case 'ADD_TO_FILTERS':
            let s1 = {};
            var pl = [...state.filters, action.payLoad];
            pl.map(itm => { return s1['p' + itm.tName + itm.name] = Object.assign({ id: 'p' + itm.tName + itm.name, value: itm.value, show: itm.value, name: itm.alias, isVisible: true, tName: itm.tName, cName: itm.name }, state.parameters['p' + itm.tName + itm.name] || {}) })
            let sx1 = {};

            var pl1 = [...state.filters, action.payLoad];
            pl1.map(itm => { return sx1['p' + itm.tName + itm.name] = Object.assign({ id: 'p' + itm.tName + itm.name, value: itm.value, show: itm.value, name: itm.alias, isVisible: true, tName: itm.tName, cName: itm.name }, state.appliedParameters['p' + itm.tName + itm.name] || {}) })

            return { ...state, filters: [...state.filters, action.payLoad], parameters: s1, appliedParameters: sx1 }
            break;
        case 'REMOVE_FROM_FILTERS':
            return { ...state, filters: state.filters.filter(filter => filter.id !== action.payLoad) }
            break;
        case 'SET_BO_ACTIVE':
            return { ...state, activeBO: action.payLoad }
            break;
        case 'ADD_TO_MEASURE':
            let bo = state.businessObjects
            bo[action.payLoad[0]].meas.push(action.payLoad[1])
            return { ...state, businessObjects: bo }
            break;
        case 'ADD_TO_DIMENSION':
            let bos = state.businessObjects
            bos[action.payLoad[0]].dims.push(action.payLoad[1])
            return { ...state, businessObjects: bos }
            break;
        case 'ADD_TO_CONDITION':
            let cbo = state.businessObjects;
            cbo[action.payLoad[0]].conditions.push(action.payLoad[1])
            return { ...state, businessObjects: cbo }
            break;
        case 'REMOVE_FROM_DIMENSION':
            let dimBO = state.businessObjects
            dimBO[action.payLoad[0]].dims = dimBO[action.payLoad[0]].dims.filter(dim => dim != action.payLoad[1])
            return { ...state, businessObjects: dimBO }
            break;

        case 'REMOVE_FROM_MEASURE':
            let mBO = state.businessObjects
            mBO[action.payLoad[0]].meas = mBO[action.payLoad[0]].meas.filter(dim => dim != action.payLoad[1])
            return { ...state, businessObjects: mBO }
            break;
        case 'REMOVE_FROM_CONDITION':
            let rbo = state.businessObjects;
            rbo[action.payLoad[0]].conditions = rbo[action.payLoad[0]].conditions.filter(condition => condition.id != action.payLoad[1])
            return { ...state, businessObjects: rbo }
            break;
        case 'SET_AS_XAXIS':
            let xBo = state.businessObjects
            xBo[action.payLoad[0]].xAxis = action.payLoad[1]
            return { ...state, businessObjects: xBo }
            break;

        case 'SET_AS_YAXIS':
            let yBo = state.businessObjects
            yBo[action.payLoad[0]].yAxis = action.payLoad[1]
            return { ...state, businessObjects: yBo }
            break;

        case 'SET_AS_MARK':
            let markBo = state.businessObjects
            markBo[action.payLoad[0]].mark = action.payLoad[1]
            return { ...state, businessObjects: markBo }
            break;
        case 'SET_AS_GROUP':
            let groupBo = state.businessObjects
            groupBo[action.payLoad[0]].group = action.payLoad[1]
            return { ...state, businessObjects: groupBo }
            break;
        case 'SET_CONFIGURATION':
            let confBo = state.businessObjects
            confBo[action.payLoad[0]].configuration = action.payLoad[1];
            confBo[action.payLoad[0]].completeConfiguration = action.payLoad[2];

            confBo[action.payLoad[0]]["formatter"] = action.payLoad[3] || confBo[action.payLoad[0]]["formatter"] || {};
            if (confBo.chart && confBo.chart.renderTo)
                delete confBo.chart.renderTo;
           //confBo["exporting"]={enabled:false}
            return { ...state, businessObjects: confBo }
        case 'SET_SQL':
            let sqlBo = state.businessObjects
            sqlBo[action.payLoad[0]].sql = action.payLoad[1]
            return { ...state, businessObjects: sqlBo }
            break;
        case 'UPDATE_BO_TITLE':
            let titleBo = state.businessObjects
            titleBo[action.payLoad[0]].title = action.payLoad[1]
            return { ...state, businessObjects: titleBo }
            break;


        case 'UPDATE_PARAM':
            let s2 = state.parameters;
            s2[action.payLoad.id] = Object.assign(s2[action.payLoad.id] || {}, action.payLoad)
            return { ...state, parameters: s2 }
            break;

        case 'UPDATE_DASHBOARD_PARAM':
            let sx2 = state.appliedParameters;
            Object.keys(action.payLoad).forEach(itm => {
                sx2[itm] = Object.assign(sx2[itm] || {}, action.payLoad[itm])

            });



            return { ...state, appliedParameters: sx2 }
            break;

        default:
            return state
    }
}
export default dashboard;   