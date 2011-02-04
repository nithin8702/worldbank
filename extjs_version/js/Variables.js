Ext.namespace('Ext.wb.variables');

var wb_json_data_url_prefix = "../data/json/";

// TODO 'datagrid':'Data Grid', add to the gchart
var gCharts = {'timeline':'Timeline', 'barchart':'Bar Chart', 'linechart':'Line Chart', 'columnchart':'Column Chart', 'motionchart':'Motion Chart', 'ChartDataTable':'Data Table'};
var gMaps = {'geomap':'Geo Map', 'intensitymap':'Intensity Map', 'GeomapDataTable':'Data Table'};

var worldbank_api_url = "http://api.worldbank.org";
var worldbank_api_jsonp = "?format=jsonP&prefix=Getdata";

var google_map_component = null;

var GmapInfoWindowTpl = new Ext.XTemplate('Name: {Name}\n{br} ' +
										'Region: {[values.Region.value]}\n{br}' +
										'Admin Region: {[values.AdminRegion.value]}\n{br}' +
										'Income Level: {[values.IncomeLevel.value]}\n{br}' +
										'Lending Type: {[values.LendingType.value]}\n{br}' +
										'Capital City: {CapitalCity}\n{br}' +
										'{msg}');
/*
fields: [ {name: 'name',           mapping: 'name'},
          {name: 'location',    mapping: 'location'},
          {name: 'posted_date',    mapping: 'posted_date'},
          {name: 'activity',       mapping: 'activity'},
          {name: 'id',             mapping: 'id'},
          {name: 'use',            mapping: 'use'},
          {name: 'description',    mapping: 'description'},
          {name: 'funded_amount',  mapping: 'funded_amount'},
          {name: 'partner_id',     mapping: 'partner_id'},
          {name: 'image',          mapping: 'image'},
          {name: 'borrower_count', mapping: 'borrower_count'},
          {name: 'loan_amount',    mapping: 'loan_amount'},
          {name: 'status',         mapping: 'status'},
          {name: 'sector',         mapping: 'sector'} ]
*/
var GmapKivaLoanInfoWindowTpl = new Ext.XTemplate('Name: {name}\n{br} ' +
												'Description : {description}\n{br}' +
												'Funded Amount : {funded_amount}\n{br}' +
												'Borrower Count : {borrower_count}\n{br}' +
												'Loan Amount : {loan_amount}\n{br}' +
												'Activity : {activity}\n{br}' +
												'Status : {status}\n{br}' +
												'Use : {use}\n{br}' +
												'Activity : {activity}\n{br}' +
												'Posted Date : {posted_date}\n{br}' +
												'{msg}');

/*
{name: 'id',                mapping: 'id'},
{name: 'name',              mapping: 'name'},
{name: 'status',            mapping: 'status'},
{name: 'rating',            mapping: 'rating'},
{name: 'image',             mapping: 'image'},
{name: 'start_date',        mapping: 'start_date'},
{name: 'countries',         mapping: 'countries'},
{name: 'delinquency_rate',  mapping: 'delinquency_rate'},
{name: 'default_rate',      mapping: 'default_rate'},
{name: 'total_amount_raised', mapping: 'total_amount_raised'},
{name: 'loans_posted',       mapping: 'loans_posted'}
*/
var GmapKivaPartnersInfoWindowTpl = new Ext.XTemplate('Name: {name}\n{br} ' +
												'Status: {status}\n{br}' +
												'Rating: {rating}\n{br}' +
												'Delinquency Rate: {delinquency_rate}\n{br}' +
												'Default Rate: {default_rate}\n{br}' +
												'Total Amount Raised: {total_amount_raised}\n{br}' +
												'Loans Posted: {loans_posted}\n{br}' +
												'Start Date: {start_date}\n{br}' +
												'{msg}');