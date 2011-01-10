
// {"id":"EN.ATM.PM10.MC.M3","name":"PM10, country level (micrograms per cubic meter)","source":{"id":"2","value":"World Development Indicators"},"sourceNote":"Particulate matter concentrations refer to fine suspended particulates less than 10 microns in diameter (PM10) that are capable of penetrating deep into the respiratory tract and causing significant health damage. Data for countries and aggregates for regions and income groups are urban-population weighted PM10 levels in residential areas of cities with more than 100,000 residents. The estimates represent the average annual exposure level of the average urban resident to outdoor particulate matter. The state of a country's technology and pollution controls is an important determinant of particulate matter concentrations.","sourceOrganization":"Kiren Dev Pandey, David Wheeler, Bart Ostro, Uwe Deichmann, Kirk Hamilton, and Katherine Bolt. \"Ambient Particulate Matter Concentrations in Residential and Pollution Hotspot Areas of World Cities: New Estimates Based on the Global Model of Ambient Particulates (GMAPS),\" World Bank, Development Research Group and Environment Department (2006).","topics":[{"id":"16","value":"Urban Development "}]}

var indicator_list = { cols: [{id: 'id', label: 'ID', type: 'string'},
                              {id: 'name', label: 'Name', type: 'string'},
                              {id: 'source_id', label: 'Source ID', type: 'number'},
                              {id: 'source_value', label: 'Source Value', type: 'string'},
                              {id: 'topics_id', label: 'Topics ID', type: 'number'},
                              {id: 'topics_value', label: 'Topics Value', type: 'string'}]};

// {"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"","value":"East Asia & Pacific (all income levels)"},"value":"2056420052.36983","decimal":"0","date":"2001"}
var indicator = { cols: [{id: 'indicator_id', label: 'Indicator ID', type: 'string'},
                         {id: 'indicator_value', label: 'Indicator Value', type: 'string'},
                         {id: 'country_id', label: 'Country ID', type: 'string'},
                         {id: 'country_value', label: 'Country Value', type: 'string'},
                         {id: 'value', label: 'Value', type: 'number'},
                         {id: 'decimal', label: 'Decimal', type: 'number'},
                         {id: 'date', label: 'Date', type: 'date'}]};

// {"id":"11","name":"Africa Development Indicators","description":"","url":""}
var source_list = { cols: [{id: 'id', label: 'ID', type: 'number'},
                           {id: 'name', label: 'Name', type: 'string'},
                           {id: 'description', label: 'Description', type: 'string'},
                           {id: 'url', label: 'URL', type: 'string'}]};

// {"id":"IC.BUS.EASE.XQ","name":"Ease of doing business index (1=most business-friendly regulations)","source":{"id":"1","value":"Doing Business"},"sourceNote":"Ease of doing business index ranks economies from 1 to 183, with first place being the best. A high ranking means that the regulatory environment is conducive to business operation. The index ranks the simple average of the country's percentile rankings on 10 topics covered in the World Bank's Doing Business. The ranking on each topic is the simple average of the percentile rankings on its component indicators.","sourceOrganization":"World Bank, Doing Business project (http:\/\/www.doingbusiness.org\/).","topics":[{"id":"12","value":"Private Sector"}]}
var source_indicator = { cols: [{id: 'id', label: 'ID', type: 'number'},
                           {id: 'name', label: 'Name', type: 'string'},
                           {id: 'source_id', label: 'Source ID', type: 'number'},
                           {id: 'source_value', label: 'Source Value', type: 'string'},
                           {id: 'source_note', label: 'Source Note', type: 'string'},
                           {id: 'source_organization', label: 'Source Organization', type: 'string'},
                           {id: 'topics_id', label: 'Topics ID', type: 'string'},
                           {id: 'topics_value', label: 'Topics Value', type: 'string'}]};

// {"id":"KOR","iso2Code":"KR","name":"Korea, Rep.","region":{"id":"EAS","value":"East Asia & Pacific (all income levels)"},"adminregion":{"id":"EAS","value":"East Asia & Pacific (all income levels)"},"incomeLevel":{"id":"OEC","value":"High income: OECD"},"lendingType":{"id":"IBD","value":"IBRD"},"capitalCity":"Seoul","longitude":"126.957","latitude":"37.5323"}
var country = { cols: [{id: 'id', label: 'ID', type: 'string'},
                       {id: 'iso2Code', label: 'ISO2Code', type: 'string'},
                       {id: 'name', label: 'Name', type: 'string'},
                       {id: 'region_id', label: 'Region ID', type: 'string'},
                       {id: 'region_value', label: 'Region Value', type: 'string'},
                       {id: 'adminregion_id', label: 'Adminregion ID', type: 'string'},
                       {id: 'adminregion_value', label: 'Adminregion Value', type: 'string'},
                       {id: 'incomeLevel_id', label: 'IncomeLevel ID', type: 'string'},
                       {id: 'incomeLevel_value', label: 'IncomeLevel Value', type: 'string'},
                       {id: 'lendingType_id', label: 'LendingType ID', type: 'string'},
                       {id: 'lendingType_value', label: 'LendingType Value', type: 'string'},
                       {id: 'capitalCity', label: 'Capital City', type: 'string'},
                       {id: 'longitude', label: 'Longitude', type: 'number'},
                       {id: 'latitude', label: 'Latitude', type: 'number'}]};

