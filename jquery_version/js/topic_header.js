            var topics_url = wb_json_data_url_prefix + "topics.json";
            $.getJSON(topics_url, function(response) {
                $.each(response[1] , function(key, value) { 
                    $("#topicCode").append("<option value=" + value['id'] + ">" + value['value'] + "</option>");
                    // console.log (' key : ' + key + ' value : ' + value); 
                });
            });

            $("#indicatorCode").hide();
            $("#topicCode").change( function() {
                $("#indicatorCode").show();
                // $("#result").html(Retrieving ...);
                var indicator_url = wb_json_data_url_prefix + "topic/"+$("#topicCode").val()+"/indicator.json";
                $.getJSON(indicator_url, function(response) {
                    $('#indicatorCode').empty(); // clear all options
                    $.each(response[1] , function(key, value) { 
                        $("#indicatorCode").append("<option value=" + value['id'] + ">" + value['name'] + "</option>");
                        // console.log (' key : ' + key + ' value : ' + value); 
                    });
                });
            });

