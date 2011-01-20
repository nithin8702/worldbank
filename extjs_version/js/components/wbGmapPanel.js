{
    xtype: 'gmappanel',
    region: 'center',
    zoomLevel: 2,
    gmapType: "map",
    mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
    mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
    setCenter: {
        geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
        marker: {
          title: 'Fenway Park'
        }
    },
    iconCls: 'tabs',
    autoScroll:false,
    tbar: {
    	xtype: 'toolbar',
        enableOverflow: true,
        items: [{
            text: 'Load Country Markers',
            iconCls: 'countryMarkers',
            enableToggle: true,
            handler: function(item, pressed) {

	        	var dataStore = new Ext.data.Store ( {
	        		url: "./json/countries.json",
	                autoLoad: true,
	        	    reader: new Ext.ux.data.wbReader( {
	        	        root: 'results',
	        	        fields: [ {name: 'ISO Code',     mapping: 'iso2Code'},
	        	                  {name: 'Name',         mapping: 'name'},
	        	                  {name: 'Region',       mapping: 'region'},
	        	                  {name: 'Admin Region', mapping: 'adminregion'},
	        	                  {name: 'Income Level', mapping: 'incomeLevel'},
	        	                  {name: 'Lending Type', mapping: 'lendingType'},
	        	                  {name: 'Capital City', mapping: 'capitalCity'},
	        	                  {name: 'longitude',    mapping: 'longitude'},
	        	                  {name: 'latitude',     mapping: 'latitude'} ]
	        	    } ),
	                listeners: {
	                    load : function( record ) {
							var markers = new Array();
			            	record.each(function(record, rowIdx) {
			            		var rowRec = {};
			                    record.fields.each(function(f, colIdx) {
			                    	rowRec[f.name] = record.get( f.name );
			                    });
			                    markers.push(rowRec);
			                });
				        	console.log(markers);
				        	console.log( Ext.getCmp('wb-center-gmap-content-panel') );
				        	// Ext.getCmp('wb-center-gmap-content-panel').addMarkers(markers);
				        	this.addMarkers(markers);
	                    }
	                }
	            } );
	            
        	}
        }, '-', {
            text: 'Load Kiva Markers',
            iconCls: 'kivaMarkers',
            enableToggle: true,
            handler: function(item, pressed) {
        		Ext.example.msg('Button Toggled', 'Button "{0}" was toggled to {1}.', item.text, pressed);
    		}
        }]
    },
    listeners: {
        'mapready': function(map) {
            // store.load();
        }
    }
/*
    markers: [{
        lat: 42.339641,
        'long': -71.094224,
        marker: {title: 'Boston Museum of Fine Arts'}
    },{
        lat: 42.339419,
        'long': -71.09077,
        marker: {title: 'Northeastern University'}
   }]
*/
}

