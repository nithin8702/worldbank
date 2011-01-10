            var sources_url = "/worldbank/json/sources.json";
            $.getJSON(sources_url, function(response) {
                $.each(response[1] , function(key, value) { 
                    $("#sourceCode").append("<option value=" + value['id'] + ">" + value['name'] + "</option>");
                    // console.log (' key : ' + key + ' value : ' + value); 
                });
            });

            $("#indicatorCode").hide();
            $("#sourceCode").change( function() {
                $('#loadingDialog').dialog( "open" );
                $("#indicatorCode").show();
                // $("#result").html(Retrieving ...);
                var indicator_url = "/worldbank/json/source/"+$("#sourceCode").val()+"/indicators.json";
                $.getJSON(indicator_url, function(response) {
                    $('#indicatorCode').empty(); // clear all options
                    $.each(response[1] , function(key, value) { 
                        $("#indicatorCode").append("<option value=" + value['id'] + ">" + value['name'] + "</option>");
                        // console.log (' key : ' + key + ' value : ' + value); 
                    });
                    $('#loadingDialog').dialog( "close" );
                });
            });
