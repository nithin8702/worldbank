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
            text: 'Region',
            iconCls: 'region',
            menu: {
                xtype: 'menu',
                plain: true,
	            items: [
	                {
	                    text: 'East Asia & Pacific (developing only)',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'Region', 'EAP');
	                	}
	                }, {
	                    text: 'East Asia & Pacific (all income levels)',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'Region', 'EAS');
	                	}
	                }, {
	                    text: 'Europe & Central Asia (developing only)',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'Region', 'ECA');
	                	}
	                }, {
	                    text: 'Europe & Central Asia (all income levels)',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'Region', 'ECS');
	                	}
	                }, {
	                    text: 'Latin America & Caribbean (developing only)',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'Region', 'LAC');
	                	}
	                }, {
	                    text: 'Latin America & Caribbean (all income levels)',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'Region', 'LCN');
	                	}
	                }, {
	                    text: 'Middle East & North Africa (all income levels)',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'Region', 'MEA');
	                	}
	                }, {
	                    text: 'Middle East & North Africa (developing only)',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'Region', 'MNA');
	                	}
	                }, {
	                    text: 'Sub-Saharan Africa (developing only)',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'Region', 'SSA');
	                	}
	                }, {
	                    text: 'Sub-Saharan Africa (all income levels)',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'Region', 'SSF');
	                	}
	                }
	            ]
        	}
        }, {
            text: 'Income Level',
            iconCls: 'incomeLevel',
            menu: {
                xtype: 'menu',
                plain: true,
	            items: [
	                {
	                    text: 'High income',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'IncomeLevel', 'HIC');
	                	}
	                }, {
	                    text: 'Heavily indebted poor countries (HIPC)',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'IncomeLevel', 'HPC');
	                	}
	                }, {
	                    text: 'Low income',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'IncomeLevel', 'LIC');
	                	}
	                }, {
	                    text: 'Lower middle income',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'IncomeLevel', 'LMC');
	                	}
	                }, {
	                    text: 'Low & middle income',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'IncomeLevel', 'LMY');
	                	}
	                }, {
	                    text: 'Middle income',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'IncomeLevel', 'MIC');
	                	}
	                }, {
	                    text: 'High income: nonOECD',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'IncomeLevel', 'NOC');
	                	}
	                }, {
	                    text: 'High income: OECD',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'IncomeLevel', 'OEC');
	                	}
	                }, {
	                    text: 'Upper middle income',
	                    handler: function(item) {
	                		Ext.ux.data.wbGoogleMapMarkers(google_map_component, 'IncomeLevel', 'UMC');
	                	}
	                }
	            ]
        	}
        }, {
            text: 'Load Kiva Loans',
            iconCls: 'kivaLoanMarkers',
            enableToggle: true,
            handler: function(item, pressed) {

        		if (pressed) {
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
					            	// console.log(geoLoc);
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
        		} else {
        			google_map_component.clearMarkers();
        		}
        	}
        }, '-', {
            text: 'Load Kiva Partners',
            iconCls: 'kivaPartnersMarkers',
            enableToggle: true,
            handler: function(item, pressed) {
	        	
	        	if (pressed) {
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
	        	} else {
	        		google_map_component.clearMarkers();
	        	}
    		}
        }, '-', {
            text: 'Clear All Icons',
            iconCls: 'clsAllIcons',
            handler: function(item, pressed) {
        		google_map_component.clearMarkers();
        	}
        }]
    },
    listeners: {
        'mapready': function(map) {
    		// TODO find the usage of global variable in the Extjs.
    		// How to make local variable into global variable.
    		google_map_component = map;
        }
    }
}

