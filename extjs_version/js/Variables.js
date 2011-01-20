Ext.namespace('Ext.wb.variables');

var gCharts = {'datagrid':'Data Grid', 'timeline':'Timeline', 'barchart':'Bar Chart', 'linechart':'Line Chart', 'columnchart':'Column Chart', 'motionchart':'Motion Chart', 'table':'Data Table'};

var worldbank_api_url = "http://api.worldbank.org";
var worldbank_api_jsonp = "?format=jsonP&prefix=Getdata";

var google_map_component = null;