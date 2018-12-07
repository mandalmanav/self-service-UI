import $ from 'jquery'
import { format } from 'util';

const formatter=(d, options) =>{
    var data = JSON.parse(JSON.stringify(d));
    if (options.hasOwnProperty('useNumeral') && options.useNumeral && options.hasOwnProperty('format') && options.hasOwnProperty('name')) {
      var locale =  "en";
      if (typeof locale != 'undefined'){}
       
    } else {
      var abbr = [{
          "symbol": "T",
          "value": 1000000000000000000
        }, {
          "symbol": "B",
          "value": 1000000000000
        }, {
          "symbol": "M",
          "value": 1000000
        }, {
          "symbol": "K",
          "value": 1000
        }],
        symbol = [];
      for (var i = 0, j = data.length; i < j; i++) {
        if (options.hasOwnProperty('abbreviation')) {
          if (options.abbreviation.toLowerCase() == 'auto') {
            for (var k = 0; k <= 3; k++) {
              if (data[i] == null) {
                data[i] = null;

              }
                else if(data[i] == "**"){
                    data[i] = "**"
                }
               else if (Math.abs(Number(data[i]) / abbr[k].value) >= 1) {
                data[i] = Number(data[i]) / abbr[k].value;
                symbol[i] = abbr[k].symbol;
                break;
              }
            }
          }
        }
        if (options.hasOwnProperty('decimalPoint')) {
          if (data[i] !== null && data[i] !== "**") {
            data[i] = Number(data[i]).toFixed(options.decimalPoint);
          }
        }
        if (options.hasOwnProperty('thousandSeperator') && options.thousandSeperator == true) {
          if (data[i] !== null && data[i] !== "**") {
            data[i] = data[i].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          }
        }
        if (typeof symbol[i] !== 'undefined' && data[i] !== "**") {
          if (data[i] !== null) {
            data[i] += ' ' + symbol[i];
          }
        }
        if (options.hasOwnProperty('symbol') && data[i] !== null && data[i] !== "**") {
          if (options.hasOwnProperty('symbolPosition')) {
            if (options.symbolPosition.toLowerCase() == 'left') {
              data[i] = options.symbol + data[i];
            } else {
              data[i] += options.symbol;
            }
          } else {
            data[i] += options.symbol;
          }
        }
      }

    }
    for(var i =0;i<data.length;i++){
      if(isNaN(data[i]) || data[i] == null)
      break;
      else
      data[i]=+data[i]
    }
    return data;
  }
const processor = (seriesArray, data, yAxis) => {
    seriesArray.map((series, index) => {
        let seriesData = []


        data[series.data.y.columnMapping].map((dataTemp, index) => {
            let point = {}
            point["name"] = data[series.data.name.columnMapping][index]
            point["y"] = data[series.data.y.columnMapping][index]
            point["tooltip"] = formatter([data[series.data.tooltip.columnMapping][index]],series.data.tooltip.formatter)
            if (yAxis != "")
                point["yAxis"] = yAxis
            if (series.data.stack)
                point["stack"] = data[series.data.stack.columnMapping][index] || false
            seriesData.push(point)
        })
        seriesArray[index].data = seriesData;
        


    })
    return seriesArray

}
const makeColumns = (d) => {
    var rows = {};
    var data = JSON.parse(JSON.stringify(d));
    if (data.length) {
        for (var i = 0, j = data[0].length; i < j; i++) {
            var column = [];
            for (var k = 0, l = data.length; k < l; k++) {
                var item = data[k][i];
                if (item == null) {
                    column.push(item);
                }
                else if (isNaN(item)) {
                    column.push(item);
                } else {
                    column.push(Number(item));
                }
            }
            rows[i] = column;
        }
    }
    return rows;
}

const templateProcessor = (config, data, oneSeries = false) => {
    var self = this;
    var seriesConfig = {}
    $.each(data, function (i) {
        if (!seriesConfig[data[i][config.series.name.columnMapping]] && !oneSeries) {
            let defaultConf = {};
            $.each(config.series, function (k, l) {
                if (l.hasOwnProperty('columnMapping')) {
                    defaultConf[k] = data[i][l.columnMapping];


                } else {
                    defaultConf[k] = l;
                }
            });

            seriesConfig[data[i][config.series.name.columnMapping]] = $.extend(true, {}, config.series, defaultConf);
        };
        var newData = seriesConfig[data[i][config.series.name.columnMapping]].data
        $.each(newData, function (k, j) {
            if (!j.data) {
                newData[k].data = []
            }
            newData[k].data.push(data[i][j.columnMapping]);

        });
    });

    var actualData = {},
        counter = -1
    var actualSeries = [];
    $.each(seriesConfig, function (i, j) {
        $.each(j.data, function (ii, jj) {
            actualData[++counter] = jj.data;
            jj.columnMapping = counter;
            delete (jj.data)
        })
        actualSeries.push(j);
    });
    return {
        config: actualSeries,
        data: actualData
    }

}


const generateWithMarker = (configToSave, configuration, props, mark, xAxis, yAxis, series, category, yValue,chartType,formatter,fireObject={}) => {
    configToSave["template"]={
        "series":{
            "type": chartType || "column",
            name:{
                columnMapping:series
            },
            data:{
                name:{
                   columnMapping: category
                },
                y:{
                    columnMapping:yValue
                },
                "tooltip": {
                    "columnMapping": yValue,
                    "formatter": formatter
                }
            }
        }
    }
   
    let templateObject = {
        "series": {

            "name": {
                "columnMapping": series
            },
            "type": chartType || "column",
            "data": {
                "y": {
                    "columnMapping": yValue
                },
                "name": {
                    "columnMapping": category
                },
                "tooltip": {
                    "columnMapping": yValue,
                    "formatter": formatter
                }
            }
        }
    }

    let templateResponse = templateProcessor(templateObject,(fireObject.data||props.DataObjects[props.Dashboard.activeBO]).resultSet)
    configuration["series"]=templateResponse.config
    let seriesArray = processor(templateResponse.config, templateResponse.data, yAxis)
    let config = configuration
    config['template'] = { series: templateObject }
    config["series"] = seriesArray
    if(!Object.keys(fireObject).length)
   props.setConfiguration([props.Dashboard.activeBO,configToSave,JSON.parse(JSON.stringify(config))])
   
    return config
}

const generateWithxAxis = (configToSave,configuration, props, xAxis, yAxis, series, category, yValue, chartType,formatter,fireObject={},xAlias) => {
    let data = makeColumns((fireObject.data||props.DataObjects[props.Dashboard.activeBO]).resultSet)


    let template = [{
        type:chartType|| 'column',
        name:xAlias,
        data: {
            type:chartType || "column",
            name: {
                columnMapping: category,
            },
            "tooltip": {
                "columnMapping": yValue,
                "formatter": formatter
            },
            y: {
                columnMapping: yValue
            }
        }


    }
    ]
    configToSave["series"]=JSON.parse(JSON.stringify(template))
    configToSave.chart.type = chartType || "column"
    let seriesArray = processor(template, data, "")
    configuration["series"] = seriesArray
    configuration['template'] = { series: template }
    configuration.chart.type = chartType|| 'column'
    if(!Object.keys(fireObject).length)
    props.setConfiguration([props.Dashboard.activeBO,configToSave,JSON.parse(JSON.stringify(configuration))])
  
    return configuration
}

const generateWithGroup = (configToSave,configuration, props, mark, xAxis, yAxis, group, series, category, yValue, groupValue, chartType,formatter,fireObject={}) => {
    configToSave["template"]={
        "series": {

            "name": {
                "columnMapping": series
            },
            "type": chartType || "column",
            "data": {
                "y": {
                    "columnMapping": yValue
                },
                "tooltip": {
                    "columnMapping": yValue,
                    "formatter": formatter
                },
                "name": {
                    "columnMapping": category
                },
                "stack": {
                    "columnMapping": groupValue
                }
            }
        }
    }
   
    let templateObject = {
        "series": {

            "name": {
                "columnMapping": series
            },
            "type": chartType || "column",
            "data": {
                "y": {
                    "columnMapping": yValue
                },
                "tooltip": {
                    "columnMapping": yValue,
                    "formatter": formatter
                },
                "name": {
                    "columnMapping": category
                },
                "stack": {
                    "columnMapping": groupValue
                }
            }
        }
    }

    let templateResponse = templateProcessor(templateObject, (fireObject.data||props.DataObjects[props.Dashboard.activeBO]).resultSet)
    let seriesArray = processor(templateResponse.config, templateResponse.data, yAxis)
    let config = configuration
    config["series"]=templateResponse.config
    config["series"] = seriesArray
    config.plotOptions["column"] = {
        stacking: false,
        depth: 40
    }
    if(!Object.keys(fireObject).length)
    props.setConfiguration([props.Dashboard.activeBO,configToSave,JSON.parse(JSON.stringify(config))])
   
    return config
}
const oneValue = (configToSave,configuration,props,y, label,formatter,fireObject={}) => {
    {
        let config = configuration
        config["series"]=[{
            type:'wordcloud',
            data:{
                name:{
                    columnMapping:label,
                    weight:1
                }
            },
            name:{
                columnMapping:0
            }
        }]
     
    let saveConf=Object.assign({},config);
        config["series"] = [{
            type: 'wordcloud',
            data: [{ name: label, weight: 1 }],
            name: y,
            "tooltip": {
                    "columnMapping": y,
                    "formatter": formatter
                }
        }]
        if(!Object.keys(fireObject).length)
        props.setConfiguration([props.Dashboard.activeBO,saveConf,config])
   
        return config
    }
}
export default (props, chartType,fireObject={}) => {

    let configuration = {
        "chart": {
            "animation": true,
            "selectionMarkerFill": "rgba(69,114,167,0.25)",
            "backgroundColor": "transparent",
            "borderColor": "transparent",
            "borderRadius": 0,
            "borderWidth": 0,
            "ignoreHiddenSeries": true,
            "panKey": "shift",
            "plotBackgroundColor": "transparent",
            "plotBackgroundImage": "",
            "plotBorderColor": "transparent",
            "plotBorderWidth": 0,
            "plotShadow": false,
            "reflow": true,
            "shadow": false,
            zoomType:'xy'
    
        },
    
        plotOptions: {
            series: {
                stacking: false,
                shadow: false,
                groupPadding: 0
            }
        },
        "credits": {
            "enabled": false
        },
    
        "xAxis": {
            "type": "category",
            scrollbar: {
                enabled: false
            },  
            "labels": {
                
                "style": {
                    "color": "black"
                }
            }
        },
        "title": {
            "text": "",
            "style": {
                "font-size": "11px",
                "color": "black",
                "font-weight": "bold"
            }
        },
        "legend": {
            "enabled": true,
            "squareSymbol": true
    
        },
        "tooltip": {
            "enabled": true,
            "style": {
                "fontSize": "10px"
            },
            "shared": false,
            "useHTML": false,
            "headerFormat": "",
            "pointFormat": "<b>{point.stack}</b><br/><b>{point.series.name}<b><br><b>{point.name}</b><br/>{point.yAxis}<b>{point.tooltip}</b></b>",
            "backgroundColor": "rgba(255, 255, 255, .7)"
        },
        "exporting": {
            "enabled": true
        },
        yAxis:{
            gridLineWidth:0
        },
        "series": []
    }
    
    let configToSave = {
        "chart": {
            "animation": true,
            "selectionMarkerFill": "rgba(69,114,167,0.25)",
            "backgroundColor": "transparent",
            "borderColor": "transparent",
            "borderRadius": 0,
            "borderWidth": 0,
            "ignoreHiddenSeries": true,
            "panKey": "shift",
            "plotBackgroundColor": "transparent",
            "plotBackgroundImage": "",
            "plotBorderColor": "transparent",
            "plotBorderWidth": 0,
            "plotShadow": false,
            "reflow": true,
            "shadow": false,
            zoomType:'xy'
    
        },
    
        plotOptions: {
            series: {
                stacking: false,
                shadow: false,
                groupPadding: 0
            }
        },
        "credits": {
            "enabled": false
        },
    
        "xAxis": {
            "type": "category",
            scrollbar: {
                enabled: false
            },
            "labels": {
                
                "style": {
                    "color": "black"
                }
            }
        },
        "title": {
            "text": "",
            "style": {
                "font-size": "11px",
                "color": "black",
                "font-weight": "bold"
            }
        },
        "legend": {
            "enabled": true,
            "squareSymbol": true
    
        },
        "tooltip": {
            "enabled": true,
            "style": {
                "fontSize": "10px"
            },
            "shared": false,
            "useHTML": false,
            "headerFormat": "",
            "pointFormat": "<b>{point.stack}</b><b>{point.series.name}<b><br><b>{point.name}</b><br/>{point.yAxis}<b>{point.tooltip}</b></b>",
            "backgroundColor": "rgba(255, 255, 255, .7)"
        },
        "exporting": {
            "enabled": true
        },
        yAxis:{
            gridLineWidth:0
        },
        "series": []
    }
    let activeBo =fireObject.activeBO||props.Dashboard.activeBO
    let businessObjects = props.Dashboard.businessObjects
    let businessObject = businessObjects[activeBo]
    let formatter = businessObject.formatter || {}
    let xAxis = businessObject.xAxis != "" ? props.getColumnDetails(props.DataSources, [businessObject.xAxis], props.Tables.selectedIds)[0].name : ""
    let yAxis = props.getColumnDetails(props.DataSources, [businessObject.yAxis], props.Tables.selectedIds)[0].name

    let mark = businessObject.mark != "" ? props.getColumnDetails(props.DataSources, [businessObject.mark], props.Tables.selectedIds)[0].name : ""
    let group = businessObject.group != "" ? props.getColumnDetails(props.DataSources, [businessObject.group], props.Tables.selectedIds)[0].name : ""

    let xAlias = businessObject.xAxis != "" ? props.getColumnDetails(props.DataSources, [businessObject.xAxis], props.Tables.selectedIds)[0].alias : ""
    let yAlias = props.getColumnDetails(props.DataSources, [businessObject.yAxis], props.Tables.selectedIds)[0].name

    let markAlias = businessObject.mark != "" ? props.getColumnDetails(props.DataSources, [businessObject.mark], props.Tables.selectedIds)[0].name : ""
    let groupAlias = businessObject.group != "" ? props.getColumnDetails(props.DataSources, [businessObject.group], props.Tables.selectedIds)[0].name : ""


    let metaData = (fireObject.data||props.DataObjects[activeBo]).metaData;
    let series = null, category = null, yValue = null, groupValue = null;
    if (mark != "")
        series = metaData.filter(column => column.colName == mark)[0].colIndex
    if (xAxis != "")
        category = metaData.filter(column => column.colName == xAxis)[0].colIndex

    yValue = metaData.filter(column => column.colName == yAxis)
   
    if(yValue.length){
        yValue=yValue[0].colIndex
    }
    else{
       yAxis = props.getColumnDetails(props.DataSources, [businessObject.yAxis], props.Tables.selectedIds)[0].alias
       yValue = metaData.filter(column => column.colName == yAxis)[0].colIndex
    }
    if (group != "")
        groupValue = metaData.filter(column => column.colName == group)[0].colIndex
    
    // Merge formatter options

    if(formatter.hasOwnProperty('legend')){
        configToSave.legend = formatter.legend;
        configuration.legend = formatter.legend;
    }
    if(formatter.hasOwnProperty('tooltip')){
        configToSave.tooltip=Object.assign(configToSave.tooltip,formatter.tooltip)
        configuration.tooltip=Object.assign(configuration.tooltip,formatter.tooltip)
  

    }
    if(formatter.hasOwnProperty('chart')){
        configToSave.chart=Object.assign(configToSave.chart,formatter.chart)
        configuration.chart=Object.assign(configuration.chart,formatter.chart)
  

    }
    if(formatter.hasOwnProperty('plotOptions')){
        configToSave.plotOptions=Object.assign(configToSave.plotOptions,formatter.plotOptions)
        configuration.plotOptions=Object.assign(configuration.plotOptions,formatter.plotOptions)
  

    }
    

    if(formatter.hasOwnProperty('xAxis')){
        if(formatter.xAxis.hasOwnProperty('reversed')&& formatter.xAxis.reversed){
            configToSave.xAxis["reversed"]=true
            configuration.xAxis["reversed"]=true
        }
        if(formatter.xAxis.hasOwnProperty('max')){
            configToSave.xAxis["max"]=formatter.xAxis.max
            configuration.xAxis["max"]=formatter.xAxis.max
        }
        if(formatter.xAxis.hasOwnProperty('scrollbar')){
            configToSave.xAxis["scrollbar"]=formatter.xAxis.scrollbar
            configuration.xAxis["scrollbar"]=formatter.xAxis.scrollbar
        }
    }

    if(formatter.hasOwnProperty('yAxis')){
        if(formatter.yAxis.hasOwnProperty('gridLineWidth')){
            configToSave.yAxis["gridLineWidth"]=formatter.yAxis.gridLineWidth
            configuration.yAxis["gridLineWidth"]=formatter.yAxis.gridLineWidth
        }
        if(formatter.hasOwnProperty('plotOptions')){
            if(formatter.plotOptions.hasOwnProperty('series')){
                if(formatter.plotOptions.series.hasOwnProperty('pointWidth')){
                    configToSave.plotOptions["series"]["pointWidth"]= formatter.plotOptions.series.pointWidth
                    configuration.plotOptions["series"]["pointWidth"]= formatter.plotOptions.series.pointWidth
                }
            }
        }
        if(formatter.hasOwnProperty('title')){
         configToSave.title = formatter.title
         configuration.title = formatter.title   
        }
        if(formatter.yAxis.hasOwnProperty('plotBands')){
            
            configToSave.yAxis["plotBands"]=formatter.yAxis.plotBands
            configuration.yAxis["plotBands"]=formatter.yAxis.plotBands
        }
    }

    //
    if (group != "")
        return generateWithGroup(configToSave,configuration, props, mark, xAxis, yAxis, group, series, category, yValue, groupValue, chartType,formatter,fireObject)
    else if (mark != "")
        return generateWithMarker(configToSave,configuration,props, mark, xAxis, yAxis, series, category, yValue, chartType,formatter,fireObject)
    else if (xAxis != "") {
        return generateWithxAxis(configToSave,configuration,props, xAxis, yAxis, series, category, yValue, chartType,formatter,fireObject,xAlias)
    }
    else if (yAxis != "")
        return oneValue(configToSave,configuration,props,yAxis, (fireObject.data||props.DataObjects[props.Dashboard.activeBO]).resultSet[0][0],formatter)

    else
        return {}
}