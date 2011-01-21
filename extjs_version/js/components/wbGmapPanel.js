{
    xtype: 'gmappanel',
    region: 'center',
    zoomLevel: 2,
    gmapType: "map",
    mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
    mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
    setCenter: {
        lat: 42.339641,
        lng: -71.094224
    },
    iconCls: 'tabs',
    autoScroll:false,
    tbar: {
    	xtype: 'toolbar',
        enableOverflow: true,
        items: [{
            text: 'Load Kiva Loans',
            iconCls: 'kivaLoanMarkers',
            enableToggle: true,
            handler: function(item, pressed) {

        		var store = new Ext.data.JsonStore({
        	        root: 'loans',
        	        totalProperty: 'total',
        	        idProperty: 'id',
	                url: '../lib/ajax-proxy.php?route=http://api.kivaws.org/v1/loans/newest.json',
	                autoLoad: true,
        	        fields: [ {name: 'name',           mapping: 'name'},
        	                  {name: 'location',       mapping: 'location'},
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
        	                  {name: 'sector',         mapping: 'sector'} ],
	                listeners: {
	                    load : function( store, records ) {
							var markers = new Array();
				            Ext.each(records, function(node){
			            		var geoLoc = node.get('location').geo.pairs.split(" ");
				            	console.log(geoLoc);
			                    markers.push({
		                            lat: geoLoc[0],
		                            lng: geoLoc[1],
		                            marker: {
		                                icon: "http://www.google.com/mapfiles/marker.png",
		                                title: 'Click to view more details',
		                                infoWindow: {
		                                    content: GmapKivaLoanInfoWindowTpl.apply(Ext.apply({msg:'',br:'<br/>'}, node.data))
		                                }
		                            }
		                        });
				            });
				        	google_map_component.addMarkers(markers);
	                    }
	                }
	            } );
        	}
        }, '-', {
            text: 'Load Kiva Partners',
            iconCls: 'kivaPartnersMarkers',
            enableToggle: true,
            handler: function(item, pressed) {
    		var store = new Ext.data.JsonStore({
    	        root: 'partners',
    	        totalProperty: 'total',
    	        idProperty: 'id',
                url: '../lib/ajax-proxy.php?route=http://api.kivaws.org/v1/partners.json',
                autoLoad: true,
    	        fields: [ {name: 'id',                mapping: 'id'},
    	                  {name: 'name',              mapping: 'name'},
    	                  {name: 'status',            mapping: 'status'},
    	                  {name: 'rating',            mapping: 'rating'},
    	                  {name: 'image',             mapping: 'image'},
    	                  {name: 'start_date',        mapping: 'start_date'},
    	                  {name: 'countries',         mapping: 'countries'},
    	                  {name: 'delinquency_rate',  mapping: 'delinquency_rate'},
    	                  {name: 'default_rate',      mapping: 'default_rate'},
    	                  {name: 'total_amount_raised', mapping: 'total_amount_raised'},
    	                  {name: 'loans_posted',       mapping: 'loans_posted'} ],
                listeners: {
                    load : function( store, records ) {
						var markers = new Array();
			            Ext.each(records, function(node){
			            	Ext.each(node.get('countries'), function(country){
			            		var geoLoc = country.location.geo.pairs.split(" ");
			                    markers.push({
		                            lat: geoLoc[0],
		                            lng: geoLoc[1],
		                            marker: {
		                                icon: "http://www.google.com/mapfiles/marker.png",
		                                title: 'Click to view more details',
		                                infoWindow: {
		                                    content: GmapKivaPartnersInfoWindowTpl.apply(Ext.apply({msg:'',br:'<br/>'}, node.data))
		                                }
		                            }
		                        });
			            	});
			            });
			        	google_map_component.addMarkers(markers);
                    }
                }
            } );
    		}
        }]
    },
    listeners: {
        'mapready': function(map) {
    		google_map_component = map;
        	var dataStore = new Ext.data.Store ( {
        		url: "./json/countries.json",
                autoLoad: true,
        	    reader: new Ext.ux.data.wbReader( {
        	        root: 'results',
        	        fields: [ {name: 'ISO Code',     mapping: 'iso2Code'},
        	                  {name: 'Name',         mapping: 'name'},
        	                  {name: 'Region',       mapping: 'region'},
        	                  {name: 'AdminRegion',  mapping: 'adminregion'},
        	                  {name: 'IncomeLevel',  mapping: 'incomeLevel'},
        	                  {name: 'LendingType',  mapping: 'lendingType'},
        	                  {name: 'CapitalCity',  mapping: 'capitalCity'},
        	                  {name: 'longitude',    mapping: 'longitude'},
        	                  {name: 'latitude',     mapping: 'latitude'} ]
        	    } ),
                listeners: {
                    load : function( store ) {
						var markers = new Array();
		            	store.each(function(record, rowIdx) {
		                    markers.push({
	                            lat: record.get('latitude'),
	                            lng: record.get('longitude'),
	                            marker: {
	                                icon: "http://www.google.com/mapfiles/marker_green.png",
	                                title: GmapInfoWindowTpl.apply(Ext.apply({msg:'Click to view more details', br:''}, record.data)),
	                                infoWindow: {
	                                    content: GmapInfoWindowTpl.apply(Ext.apply({msg:'',br:'<br/>'}, record.data))
	                                }
	                            }
	                        });
		                });
			        	google_map_component.addMarkers(markers);
                    }
                }
            } );
        }
    }
}

