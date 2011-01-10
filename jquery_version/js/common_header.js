    var region_code = new Array("EAP", "EAS", "ECA", "ECS", "LAC", "LCN", "MNA", "MEA", "NAC", "SAS", "SSA",  "SSF");
    var incomeLevel = new Array("NOC", "OEC", "HIC", "HPC", "LIC", "LMC", "LMY", "MIC", "UMC");
    var countries_url = "/worldbank/json/countries.json";
    $.getJSON(countries_url, function(response) {
        $.each(response[1] , function(key, value) { 
            switch (true) {
                case ( $.inArray( value['id'], region_code ) > -1 ):
                    $("#regionCode").append("<option value=" + value['id'] + ">" + value['name'] + "</option>");
                    // console.log (' id: ' + value['id'] + ' value : ' + value['name']); 
                    break;
                case ( $.inArray( value['id'], incomeLevel ) > -1 ):
                    $("#incomeLevelCode").append("<option value=" + value['id'] + ">" + value['name'] + "</option>");
                    // console.log (' id: ' + value['id'] + ' value : ' + value['name']); 
                    break;
                default:
                    $("#countryCode").append("<option value=" + value['id'] + ">" + value['name'] + "</option>");
                    // console.log (' id : ' + value['id'] + ' value : ' + value['name']); 
                    break;
            }
        });

        $("#countryCode").multiselect({
            noneSelectedText: 'Select countries',
            selectedList: 10,
            selectedText: function(numChecked, numTotal, checkedItems) {
                return numChecked + ' of ' + numTotal + ' checked';
            },
            close: function(){
                var array_of_checked_values = $("select").multiselect("getChecked").map(function(){ return this.value; });
                var selected_countries = $.makeArray(array_of_checked_values).join(";");
                var proxy_url = "/lib/ajax-proxy.php?route=";
                var url = "/countries/"+ selected_countries +"/indicators/"+ $("#indicatorCode").val() +"?format=json&per_page=10000";
            }
        }).multiselectfilter();
    });

    // Tabs
    $('#tabs').tabs();

    var now = new Date();
    var thisYear = now.getFullYear();
    for (var idx = 0; idx < 50; idx++) {
        var yearVal = parseInt( thisYear - idx );
        $("#yearTo").append("<option value=" + yearVal + ">" + yearVal + " year </option>");
        $("#yearFrom").append("<option value=" + yearVal + ">" + yearVal + " year </option>");
    }

    $('#yearTo option[value=2009]').attr('selected', 'selected');
    $('#yearFrom option[value=1990]').attr('selected', 'selected');

    $('select#yearFrom, select#yearTo').selectToUISlider({
        labels: 12
    });
