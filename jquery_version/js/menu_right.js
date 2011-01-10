//    var proxy_url = "./ajax-proxy.php?route=";
//    var array_of_checked_values = new Array("AU", "GB", "JP", "US");
//    var url = "/countries/AU;GB;JP;US/indicators/BM.GSR.TOTL.CD?format=json&per_page=10000&date=1990:2009";
function makeQueryURL() {
    var array_of_checked_values = $("#countryCode").multiselect("getChecked").map(function(){ return this.value; });
    var proxy_url = "./ajax-proxy.php?route=";
    var selected_countries = $.makeArray(array_of_checked_values).join(";");
    var date_range = "&date=" + $("#yearFrom").val() + ":" + $("#yearTo").val()
    return proxy_url + "/countries/"+ selected_countries +"/indicators/"+ $("#indicatorCode").val() +"?format=json&per_page=10000"+date_range;
}

$("#linechart_btn").button().click( function() {
    $("#main_body").html("<div id='lineChart_div'>Loading...</div><div><br/></div> <div id='indicator_table_div'>Loading...</div>");
    var array_of_checked_values = $("#countryCode").multiselect("getChecked").map(function(){ return this.value; });
    $.getJSON(makeQueryURL(), function(response) {
         var cols = $.convertWBData(response[1]);
         var jsonData = $.extend(indicator, cols);
         console.log("json data ");

         var data = new google.visualization.DataTable(jsonData, 0.6);
         var chartData = new google.visualization.DataTable();
         chartData.addColumn('date', 'Year');
         console.log("before loop");
         console.log("lenght : " + array_of_checked_values.length);
         
         for (var countryIdx = 0; countryIdx < array_of_checked_values.length; countryIdx++) {
             filteredRows = data.getFilteredRows([{column: 3, value: array_of_checked_values[countryIdx]}]);
             console.log("filter length: " + filteredRows.length);
             chartData.addColumn('number', data.getValue(filteredRows[0], 3));
             $.each(filteredRows, function(rowKey, rowVal) {
                 console.log("each loop");
                 if ( countryIdx == 0) {
                     chartData.addRow();
                     chartData.setValue( rowKey, countryIdx, data.getValue(rowVal, 6) );
                     chartData.setValue( rowKey, countryIdx+1, data.getValue(rowVal, 4) );
                 } else {
                     chartData.setValue( rowKey, countryIdx+1, data.getValue(rowVal, 4) );
                 }
             });
         }

         console.log("line chat");
         chartData.sort([{column: 0}]); // sort by year
         var chart = new google.visualization.LineChart(document.getElementById('lineChart_div'));
         chart.draw(chartData, {width: 700, height:500});

         console.log("table chat");
         var table = new google.visualization.Table(document.getElementById('indicator_table_div'));
         table.draw(chartData, {showRowNumber: true});
    });
});

$("#barchart_btn").button().click( function() {
    $("#main_body").html("<div id='barChart_div'>Loading...</div><div><br/></div> <div id='indicator_table_div'>Loading...</div>");
    $('#yearFrom option[value=2000]').attr('selected', 'selected'); // set years within ten years
    var array_of_checked_values = $("#countryCode").multiselect("getChecked").map(function(){ return this.value; });
    $.getJSON(makeQueryURL(), function(response) {
        var cols = $.convertWBData(response[1]);
        var jsonData = $.extend(indicator, cols);

        var data = new google.visualization.DataTable(jsonData, 0.6);
        var chartData = new google.visualization.DataTable();
        chartData.addColumn('date', 'Year');
        for (var countryIdx = 0; countryIdx < array_of_checked_values.length; countryIdx++) {
             filteredRows = data.getFilteredRows([{column: 2, value: array_of_checked_values[countryIdx]}]);
             chartData.addColumn('number', data.getValue(filteredRows[0], 3));
             $.each(filteredRows, function(rowKey, rowVal) {
                 if ( countryIdx == 0) {
                     chartData.addRow();
                     chartData.setValue( rowKey, countryIdx, data.getValue(rowVal, 6) );
                     chartData.setValue( rowKey, countryIdx+1, data.getValue(rowVal, 4) );
                 } else {
                     chartData.setValue( rowKey, countryIdx+1, data.getValue(rowVal, 4) );
                 }
             });
        }

        chartData.sort([{column: 0}]); // sort by year
        var chart = new google.visualization.BarChart(document.getElementById('barChart_div'));
        chart.draw(chartData, {width: 700, height: 500, title: 'Company Performance',
                               vAxis: {title: 'Year', titleTextStyle: {color: 'red'}}
                              });
         var table = new google.visualization.Table(document.getElementById('indicator_table_div'));
         table.draw(chartData, {showRowNumber: true});
    });
});

$("#columnchart_btn").button().click( function() {
    $("#main_body").html("<div id='columnChart_div'>Loading...</div><div><br/></div> <div id='indicator_table_div'>Loading...</div>");
    $('#yearFrom option[value=2000]').attr('selected', 'selected'); // set years within ten years
    var array_of_checked_values = $("#countryCode").multiselect("getChecked").map(function(){ return this.value; });
    $.getJSON(makeQueryURL(), function(response) {
        var cols = $.convertWBData(response[1]);
        var jsonData = $.extend(indicator, cols);

        var data = new google.visualization.DataTable(jsonData, 0.6);
        var chartData = new google.visualization.DataTable();
        chartData.addColumn('date', 'Year');
        for (var countryIdx = 0; countryIdx < array_of_checked_values.length; countryIdx++) {
            filteredRows = data.getFilteredRows([{column: 2, value: array_of_checked_values[countryIdx]}]);
            chartData.addColumn('number', data.getValue(filteredRows[0], 3));
            $.each(filteredRows, function(rowKey, rowVal) {
                if ( countryIdx == 0) {
                    chartData.addRow();
                    chartData.setValue( rowKey, countryIdx, data.getValue(rowVal, 6) );
                    chartData.setValue( rowKey, countryIdx+1, data.getValue(rowVal, 4) );
                } else {
                    chartData.setValue( rowKey, countryIdx+1, data.getValue(rowVal, 4) );
                }
            });
        }

        chartData.sort([{column: 0}]); // sort by year
        var chart = new google.visualization.ColumnChart(document.getElementById('columnChart_div'));
        chart.draw(chartData, {width: 700, height: 500, title: 'Company Performance',
                               hAxis: {title: 'Year', titleTextStyle: {color: 'red'}}
                              });
         var table = new google.visualization.Table(document.getElementById('indicator_table_div'));
         table.draw(chartData, {showRowNumber: true});
    });
});

$("#motionchart_btn").button().click( function() {
    $("#main_body").html("<div id='motionChart_div'>Loading...</div><div><br/></div> <div id='indicator_table_div'>Loading...</div>");
    $.getJSON(makeQueryURL(), function(response) {
         var cols = $.convertWBData(response[1]);
         var jsonData = $.extend(indicator, cols);

         var data = new google.visualization.DataTable(jsonData, 0.6);
         data.sort([{column: 6}]);
         var view = new google.visualization.DataView(data);
         view.setColumns([6, 3, 4]);

         var chart = new google.visualization.MotionChart(document.getElementById('motionChart_div'));
         chart.draw(view, {width: 700, height:500});

         var table = new google.visualization.Table(document.getElementById('indicator_table_div'));
         table.draw(view, {showRowNumber: true});
    });
});

$("#geomap_btn").button().click( function() {
    $("#main_body").html("<div id='geomap_div'>Loading...</div><div><br/></div> <div id='indicator_table_div'>Loading...</div>");
    $.getJSON(makeQueryURL(), function(response) {
        var cols = $.convertWBData(response[1]);
        var jsonData = $.extend(indicator, cols);

        var geoMapDataTbl = new google.visualization.DataTable(jsonData);
        var geoMapDataView = new google.visualization.DataView(geoMapDataTbl);
        geoMapDataView.setColumns([2, 4]);

        var table = new google.visualization.Table(document.getElementById('indicator_table_div'));
        table.draw(geoMapDataView, {showRowNumber: true});

        var geomap = new google.visualization.GeoMap(document.getElementById('geomap_div'));
        geomap.draw(geoMapDataView, {dataMode: 'regions'});
    });
});
