Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return false;
        }
        if (field.startDateField) {
            var start = Ext.getCmp(field.startDateField);
            if (!start.maxValue || (date.getTime() != start.maxValue.getTime())) {
                start.setMaxValue(date);
                start.validate();
            }
        }
        else if (field.endDateField) {
            var end = Ext.getCmp(field.endDateField);
            if (!end.minValue || (date.getTime() != end.minValue.getTime())) {
                end.setMinValue(date);
                end.validate();
            }
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    }
});

var wbSourceIndicatorPanel = {
    id : 'wb-center-source-indicator-main-panel',
    flex: 2,
    layout:'anchor',
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
        labelWidth: 86,
        title: 'Parameter selection',
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
	        id : 'wb-center-source-geomapdt',
	        fieldLabel: 'Geomap Date : ',
	        increment: 1,
	        minValue: 1960,
	        maxValue: 2010,
            anchor: '100%',
            value: 2000,
            tipText: function(thumb) {
                return String(thumb.value) + ' year';
            }
	    }, {
        	id:             'wb-center-source-lendingTypes',
        	xtype:          'combo',
            width:          70,
            mode:           'local',
            value:          '',
            triggerAction:  'all',
            forceSelection: true,
            editable:       false,
            fieldLabel:     'Lending Types : ',
            name:           'lendingTypes',
            hiddenName:     'lendingTypes',
            displayField:   'name',
            valueField:     'value',
            store:          new Ext.data.JsonStore({
                fields : ['name', 'value'],
                data   : [
                    {name : 'IBRD',   value: 'IBD'},
                    {name : 'Blend',  value: 'IDB'},
                    {name : 'IDA',   value: 'IDX'},
                    {name : 'Not classified',   value: 'NC'}
                ]
            })
        }, {
            xtype:'fieldset',
            checkboxToggle:true,
            title: 'MRV - fetches most recent values based on the number specified',
            autoHeight:true,
            defaults: {width: 210},
            defaultType: 'combo',
            collapsed: true,
            items :[{
            	id:             'wb-center-source-gapfill',
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
            	id:             'wb-center-source-frequency',
                width:          80,
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
};

var wbTopicIndicatorPanel = {
    id : 'wb-center-topic-indicator-main-panel',
    flex: 2,
    layout:'anchor',
    items: [ {
        xtype : 'wbindicatorformpanel',
        id : 'wb-center-topic-indicator-form-panel',
        anchor:'100% 25%',
        labelWidth: 60,
        title: 'Topic Indicator selection',
        items : [ { xtype : 'wbcombobox',
               name:  'topic',
               fieldLabel : 'Topic : ',
               id : 'wb-center-topic-combo',
               store : new Ext.ux.component.wbDataStore ( {
                       url: './json/topics.json',
                       reader: new Ext.ux.data.wbReader({
                           root: 'results',
                           fields: [{name: 'value', mapping: 'id'},
                                    {name: 'label', mapping: 'value'}
                            ]
                      })
               }),
               listeners : {
                   change : function( field, newValue, oldValue ) {
                      var wbWestMenuPanel = Ext.getCmp('wb-west-tree-menu-panel');
                      var selectedNode = wbWestMenuPanel.getSelectionModel().getSelectedNode();
                      var wbIndicatorCombo = Ext.getCmp('wb-center-' + selectedNode.id + '-indicator-combo');
                      // in case of topic, file name is indicator
                      var indicator_url = './json/' + selectedNode.id + '/' + newValue + '/indicator.json';
                      wbIndicatorCombo.setDisabled(true);
                      wbIndicatorCombo.setValue('');
                      wbIndicatorCombo.store.removeAll();
                      wbIndicatorCombo.store.proxy = new Ext.data.HttpProxy({url: indicator_url});
                      wbIndicatorCombo.store.reload();
                      wbIndicatorCombo.setDisabled(false);
                      // This is for the property setting.
                      Ext.getCmp('wb-east-property-grid-tabpanel').activate('wb-east-indicator-property-grid');
                      var wbEastIndicatorProperty = Ext.getCmp('wb-east-indicator-property-grid');
                      wbEastIndicatorProperty.setProperty('topic', newValue, true);
                   } 
               }
         }, { xtype : 'wbcombobox',
              name:  'topic-indicator',
              fieldLabel : 'Indicator : ',
              id : 'wb-center-topic-indicator-combo',
              lazyRender : true,
              listeners: {
		         change : function( field, newValue, oldValue ) {
		             var wbEastIndicatorProperty = Ext.getCmp('wb-east-indicator-property-grid');
		             wbEastIndicatorProperty.setProperty('topic-indicator', newValue, true);
		         } 
              }
         }  ]
    }, {
		xtype: 'wbindicatorformpanel',
        labelWidth: 86,
        anchor:'100% 75%',
        title: 'Parameter selection',
		items: [ {
			xtype: 'compositefield',
	        fieldLabel: 'Date Range : ',
	        msgTarget : 'side',
	        items: [ {
					xtype : "datefield",
					name: 'source-startdt',
					id: 'wb-center-topic-startdt',
					vtype: 'daterange',
					value: '2001-01-01',
					format: 'm/d/Y',
					endDateField: 'wb-center-source-enddt' // id of the end date field
				},{xtype: 'displayfield', value: ' ~ '},
				{
					xtype : "datefield",
					name: 'source-enddt',
					id: 'wb-center-topic-enddt',
					vtype: 'daterange',
					value: '2010-01-01',
					format: 'm/d/Y',
					startDateField: 'wb-center-source-startdt' // id of the start date field
			} ]
		}, {
	        xtype: 'sliderfield',
	        id : 'wb-center-topic-geomapdt',
	        fieldLabel: 'Geomap Date : ',
	        increment: 1,
	        minValue: 1960,
	        maxValue: 2010,
            anchor: '100%',
            value: 2000,
            tipText: function(thumb) {
                return String(thumb.value) + ' year';
            }
	    }, {
        	id:             'wb-center-topic-lendingTypes',
        	xtype:          'combo',
            width:          70,
            mode:           'local',
            value:          '',
            triggerAction:  'all',
            forceSelection: true,
            editable:       false,
            fieldLabel:     'Lending Types : ',
            name:           'lendingTypes',
            hiddenName:     'lendingTypes',
            displayField:   'name',
            valueField:     'value',
            store:          new Ext.data.JsonStore({
                fields : ['name', 'value'],
                data   : [
                    {name : 'IBRD',   value: 'IBD'},
                    {name : 'Blend',  value: 'IDB'},
                    {name : 'IDA',   value: 'IDX'},
                    {name : 'Not classified',   value: 'NC'}
                ]
            })
        }, {
            xtype:'fieldset',
            checkboxToggle:true,
            title: 'MRV - fetches most recent values based on the number specified',
            autoHeight:true,
            defaults: {width: 210},
            defaultType: 'combo',
            collapsed: true,
            items :[{
            	id:             'wb-center-topic-gapfill',
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
            	id:             'wb-center-topic-frequency',
                width:          80,
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
	  }]
};

var countriesSourceTreePanel = {
    xtype: 'wbcountrytreepanel',
    id: 'wb-center-source-tree-panel',
    flex: 1
};

var countriesTopicTreePanel= {
    xtype: 'wbcountrytreepanel',
    id: 'wb-center-topic-tree-panel',
    flex: 1
};

/*
            var ds = new Ext.data.Store({
                url: './json/countries.json',
                autoLoad: true,
                reader: new Ext.ux.data.wbReader({
                    root: 'results',
                    totalProperty: 'total',
                    fields: [{name: 'value', mapping: 'iso2Code'},
                             {name: 'label', mapping: 'name'}
                    ]
                }),
                listeners:{
                   load:{ scope:this, fn:function(store) {
                       console.log("listners load for data store");
                       console.log(store);
                       var countryTreeRoot = new Ext.tree.AsyncTreeNode({expanded:true,leaf:false,text:'countries',children: []});
                       Ext.each(store.data.items, function(val, key) {
                           console.log(val);
                           console.log(key);
                           countryTreeRoot.appendChild(new Ext.tree.TreeNode({
            text:val.label,
            leaf:true,
            cls:"country"
        }));

                           // console.log(item.label );
                       });
                       countriesSourceTreePanel.root = countryTreeRoot;
                   }}
                }
            });
*/

var sourceMainPanel = new Ext.TabPanel({ 
    id: 'wb-center-source-content-panel', 
    title: 'Source Content Panel', 
    border: false,
    activeTab: 0, 
    items:[ {
        id:'wb-center-source-config-main-panel',
        layout:'hbox',
        layoutConfig: {
            align : 'stretch',
            pack  : 'start',
        },
        title:'Configuration',
        items:[wbSourceIndicatorPanel, countriesSourceTreePanel]
    } ]
});

var topicMainPanel = new Ext.TabPanel({ 
    id: 'wb-center-topic-content-panel', 
    title: 'Topic Content Panel', 
    border: false,
    activeTab: 0, 
    items: [{
        id:'wb-center-topic-config-main-panel',
        layout:'hbox',
        layoutConfig: {
            align : 'stretch',
            pack  : 'start',
        },
        title:'Configuration',
        items:[wbTopicIndicatorPanel, countriesTopicTreePanel]
    }]
});

var mainContentPanel = {
    id: 'wb-center-content-panel',
    region: 'center', // this is what makes this panel into a region within the containing layout
    layout: 'card',
    margins: '0 0 0 0',
    activeItem: 0,
    border: true,
    items: [ {
	         title: 'introduction',
	         iconCls: 'tabs',
	         autoScroll:true,
	         margins: '10 10 10 10',
	         autoLoad: {url: './templates/introduction.htm', scripts: true}
	    }, topicMainPanel, sourceMainPanel,
	    {
	        title: 'google map',
	        id: 'wb-center-gmap-content-panel',
	        plugins: [new Ext.ux.Plugin.RemoteComponent({
	            url : './js/components/wbGmapPanel.js',
	            // loadOn: 'show',
                listeners: {
	                'beforeadd' : {fn: function(JSON) {
			        	// JSON['markers'] = markers;
	                } }
        		}
	        })]
	    } ],
    bbar: new Ext.ux.StatusBar({
        id: 'main-panel-statusbar',
        defaultText: 'Default status text',
        //defaultIconCls: 'default-icon',
        // values to set initially:
        text: 'Ready',
        iconCls: 'x-status-valid',
        items: [
            {
                text: 'Show Warning & Clear',
                handler: function (){
                    var sb = Ext.getCmp('main-panel-statusbar');
                    sb.setStatus({
                        text: 'Oops!',
                        iconCls: 'x-status-error',
                        clear: true // auto-clear after a set interval
                    });
                }
            },
            {
                text: 'Show Busy',
                handler: function (){
                    var sb = Ext.getCmp('main-panel-statusbar');
                    // Set the status bar to show that something is processing:
                    sb.showBusy();
                }
            },
            {
                text: 'Clear status',
                handler: function (){
                    var sb = Ext.getCmp('main-panel-statusbar');
                    // once completed
                    sb.clearStatus(); 
                }
            },
            '-',
            {xtype: 'tbtext', id: 'main-panel-clock-status-bar', text: ' '},            	
            ' '
        ]
    }),
    listeners: {
	    render: {
	        fn: function(){
	            // Kick off the clock timer that updates the clock el every second:
			    Ext.TaskMgr.start({
			        run: function(){
			            Ext.fly(Ext.getCmp('main-panel-clock-status-bar').getEl()).update(new Date().format('g:i:s A'));
			        },
			        interval: 1000
			    });
	        },
	        delay: 100
	    }
	}

};
