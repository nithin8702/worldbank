{
    // anchorSize: {width:800, height:600},
    items: [ {
        xtype : 'wbindicatorformpanel',
        id : 'wb-center-source-indicator-form-panel',
        labelWidth: 60,
        title: 'Source Indicator Selection',
        anchor:'100% 25%',
        items : [ { 
        	xtype : 'wbcombobox',
            id : 'wb-center-source-combo',
            fieldLabel : 'Source : ',
            name:  'source',
            store : new Ext.ux.component.wbDataStore ( {url: './json/sources.json'}),
            listeners : {
                 change : function( field, newValue, oldValue ) {
                     var wbWestMenuPanel = Ext.getCmp('wb-west-tree-menu-panel');
                     var selectedNode = wbWestMenuPanel.getSelectionModel().getSelectedNode();
                     var wbIndicatorCombo = Ext.getCmp('wb-center-' + selectedNode.id + '-indicator-combo');
                     // in case of source, file name is indicators pl
                     var indicator_url = './json/' + selectedNode.id + '/' + newValue + '/indicators.json';
                     wbIndicatorCombo.setDisabled(true);
                     wbIndicatorCombo.setValue('');
                     // wbIndicatorCombo.store.proxy.setUrl(indicator_url); 
                     wbIndicatorCombo.store.removeAll();
                     wbIndicatorCombo.store.proxy = new Ext.data.HttpProxy({url: indicator_url});
                     wbIndicatorCombo.store.reload();
                     wbIndicatorCombo.setDisabled(false);
                      
                     Ext.getCmp('wb-east-property-grid-tabpanel').activate('wb-east-indicator-property-grid');
                     var wbEastIndicatorProperty = Ext.getCmp('wb-east-indicator-property-grid');
                     wbEastIndicatorProperty.setProperty('source', newValue, true);
                 }   
            }
	        },{ xtype : 'wbcombobox',
	            fieldLabel : 'Indicator : ',
	            name:   'source-indicator',
	            id : 'wb-center-source-indicator-combo',
	            listeners: {
		            change : function( field, newValue, oldValue ) {
			            var wbEastIndicatorProperty = Ext.getCmp('wb-east-indicator-property-grid');
			            wbEastIndicatorProperty.setProperty('source-indicator', newValue, true);
			        } 
	            }
	         } ]
	}, {
		xtype: 'wbindicatorformpanel',
        labelWidth: 80,
        anchor:'100% 75%',
		items: [ {
			xtype: 'compositefield',
	        fieldLabel: 'Date Range : ',
	        msgTarget : 'side',
	        items: [ {
					xtype : "datefield",
					name: 'source-startdt',
					id: 'wb-center-source-startdt',
					vtype: 'daterange',
					value: '2001-01-01',
					format: 'm/d/Y',
					endDateField: 'wb-center-source-enddt' // id of the end date field
				},{xtype: 'displayfield', value: ' ~ '},
				{
					xtype : "datefield",
					name: 'source-enddt',
					id: 'wb-center-source-enddt',
					vtype: 'daterange',
					value: '2010-01-01',
					format: 'm/d/Y',
					startDateField: 'wb-center-source-startdt' // id of the start date field
			} ]
		}, {
	        xtype: 'sliderfield',
	        fieldLabel: 'Geomap Date',
	        increment: 1,
	        minValue: 1960,
	        maxValue: 2010,
            anchor: '100%',
            value: 2000,
            tipText: function(thumb) {
                return String(thumb.value) + ' year';
            }
	    }, {
            xtype:'fieldset',
            checkboxToggle:true,
            title: 'MRV - fetches most recent values based on the number specified',
            autoHeight:true,
            defaults: {width: 210},
            defaultType: 'combo',
            collapsed: true,
            items :[{
                //the width of this field in the HBox layout is set directly
                //the other 2 items are given flex: 1, so will share the rest of the space
                width:          50,
                mode:           'local',
                value:          'Y',
                triggerAction:  'all',
                forceSelection: true,
                editable:       false,
                fieldLabel:     'Gapfill',
                name:           'gapfill',
                hiddenName:     'gapfill',
                displayField:   'name',
                valueField:     'value',
                store:          new Ext.data.JsonStore({
                    fields : ['name', 'value'],
                    data   : [
                        {name : 'Yes',   value: 'Y'},
                        {name : 'No',  value: 'N'}
                    ]
                })
            }, {
                //the width of this field in the HBox layout is set directly
                //the other 2 items are given flex: 1, so will share the rest of the space
                width:          80,
                xtype:          'combo',
                mode:           'local',
                value:          'Y',
                triggerAction:  'all',
                forceSelection: true,
                editable:       false,
                fieldLabel:     'Frequency',
                name:           'frequency',
                hiddenName:     'frequency',
                displayField:   'name',
                valueField:     'value',
                store:          new Ext.data.JsonStore({
                    fields : ['name', 'value'],
                    data   : [
                        {name : 'yearly',   value: 'Y'},
                        {name : 'monthly',  value: 'M'},
                        {name : 'quarterly', value: 'Q'}
                    ]
                })
            }
            ]
        } ]
	  } ]
}