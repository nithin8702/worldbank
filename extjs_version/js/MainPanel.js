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

var wbChartIndicatorPanel = {
    id : 'wb-center-chart-indicator-main-panel',
    flex: 2,
    layout:'anchor',
    items: [ {
        xtype : 'wbindicatorformpanel',
        id : 'wb-center-chart-indicator-form-panel',
        labelWidth: 60,
        title: 'Indicator Selection',
        anchor:'100% 50%',
        items : [ {
            xtype:'fieldset',
            id : 'wb-center-source-indicator-fieldset',
            checkboxToggle:true,
            title: 'By Source - fetches most recent values based on the number specified',
            autoHeight:true,
            collapsed: true,
            onCheckClick : function(){
                this[this.checkbox.dom.checked ? 'expand' : 'collapse']();
            	if (Ext.getCmp('wb-center-topic-indicator-fieldset').checkbox.dom.checked)
            		Ext.getCmp('wb-center-topic-indicator-fieldset').collapse();
            },
            items :[{ 
		        	xtype : 'wbcombobox',
		            id : 'wb-center-source-combo',
		            fieldLabel : 'Source',
		            name:  'source',
		            store : new Ext.ux.component.wbDataStore ( {url: './json/sources.json'}),
		            listeners : {
		                 change : function( field, newValue, oldValue ) {
		                     var wbIndicatorCombo = Ext.getCmp('wb-center-source-indicator-combo');
		                     // in case of source, file name is indicators pl
		                     var indicator_url = './json/source/' + newValue + '/indicators.json';
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
		            fieldLabel : 'Indicator',
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
            xtype:'fieldset',
            id : 'wb-center-topic-indicator-fieldset',
            checkboxToggle:true,
            title: 'By Topic - fetches most recent values based on the number specified',
            autoHeight:true,
            collapsed: true,
            onCheckClick : function(){
            	this[this.checkbox.dom.checked ? 'expand' : 'collapse']();
            	if (Ext.getCmp('wb-center-source-indicator-fieldset').checkbox.dom.checked)
            		Ext.getCmp('wb-center-source-indicator-fieldset').collapse();
        	},
            items :[{ xtype : 'wbcombobox',
                name:  'topic',
                fieldLabel : 'Topic ',
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
                       var wbIndicatorCombo = Ext.getCmp('wb-center-topic-indicator-combo');
                       // in case of topic, file name is indicator
                       var indicator_url = './json/topic/' + newValue + '/indicator.json';
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
         			fieldLabel : 'Indicator ',
         			id : 'wb-center-topic-indicator-combo',
         			lazyRender : true,
         			listeners: {
         				change : function( field, newValue, oldValue ) {
         					var wbEastIndicatorProperty = Ext.getCmp('wb-east-indicator-property-grid');
         					wbEastIndicatorProperty.setProperty('topic-indicator', newValue, true);
         				} 
         			}
         		} ]
 		} ]
    }, {
		xtype: 'wbindicatorformpanel',
        labelWidth: 86,
        title: 'Parameter Selection',
        anchor:'100% 50%',
		items: [ {
			xtype: 'compositefield',
	        fieldLabel: 'Date Range : ',
	        msgTarget : 'side',
	        items: [ {
					xtype : "datefield",
					name: 'chart-startdt',
					id: 'wb-center-chart-startdt',
					vtype: 'daterange',
					value: '2001-01-01',
					format: 'm/d/Y',
					endDateField: 'wb-center-chart-enddt' // id of the end date field
				},{xtype: 'displayfield', value: ' ~ '},
				{
					xtype : "datefield",
					name: 'chart-enddt',
					id: 'wb-center-chart-enddt',
					vtype: 'daterange',
					value: '2010-01-01',
					format: 'm/d/Y',
					startDateField: 'wb-center-chart-startdt' // id of the start date field
			},{xtype: 'checkbox', id : 'wb-center-chart-month-checkbox', boxLabel: 'Month use flag'} ]
		}, {
        	id:             'wb-center-chart-lendingTypes',
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
            xtype: 'numberfield',
            id: 'wb-center-chart-mrv',
            fieldLabel: 'MRV',
            name: 'MRV'
    	}, {
        xtype:'fieldset',
        checkboxToggle:true,
        title: 'MRV - fetches most recent values based on the number specified',
        autoHeight:true,
        defaults: {width: 210},
        defaultType: 'combo',
        collapsed: true,
        items :[ {
        	id:             'wb-center-chart-gapfill',
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
        	id:             'wb-center-chart-frequency',
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
        } ]
        } ]
	  } ]
};

var countriesChartTreePanel = {
    xtype: 'wbcountrytreepanel',
    id: 'wb-center-chart-tree-panel',
    flex: 1
    /* =============================== TODO ===========================================
    tbar:[ ' ',
   		new Ext.form.TextField({
   			width: 215,
   			emptyText:'Find a Class',
   			enableKeyEvents: true,
   			listeners:{
   				render: function(f){
   	               	this.filter = new Ext.tree.TreeFilter(Ext.getCmp('wb-center-chart-tree-panel'), {
   	               		clearBlank: true,
   	               		autoClear: true
   	               	});
   				},
   				keydown: {
   					fn: function(t, e){
   						var treePnl = Ext.getCmp('wb-center-chart-tree-panel');
   						var text = t.getValue();
   						Ext.each(this.hiddenPkgs, function(n){
   							n.ui.show();
   						});
   						if(!text){
   							treePnl.filter.clear();
   							return;
   						}
   						treePnl.expandAll();
   						
   						var re = new RegExp('^' + Ext.escapeRe(text), 'i');
   						this.filter.filterBy(function(n){
   							return !n.attributes.isClass || re.test(n.text);
   						});
   						
   						// hide empty packages that weren't filtered
   						this.hiddenPkgs = [];
   				        var me = this;
   				        treePnl.root.cascade(function(n){
   							if(!n.attributes.isClass && n.ui.ctNode.offsetHeight < 3){
   								n.ui.hide();
   								me.hiddenPkgs.push(n);
   							}
   						});
   					},
   					buffer: 350,
   					scope: Ext.getCmp('wb-center-chart-tree-panel')
   				},
   				scope: this
   			}
   		}), ' ', ' ',
   		{
              iconCls: 'icon-expand-all',
   			tooltip: 'Expand All',
              handler: function(){ this.root.expand(true); },
              scope: this
        }, '-', {
              iconCls: 'icon-collapse-all',
              tooltip: 'Collapse All',
              handler: function(){ this.root.collapse(true); },
              scope: this
       } ]
       ============================================================================================= */
};

var chartMainPanel = new Ext.TabPanel({ 
    id: 'wb-center-chart-content-panel', 
    title: 'Source Content Panel', 
    border: false,
    activeTab: 0, 
    items:[ {
        id:'wb-center-chart-config-main-panel',
        layout:'hbox',
        layoutConfig: {
            align : 'stretch',
            pack  : 'start'
        },
        title:'Configuration',
        items:[wbChartIndicatorPanel, countriesChartTreePanel]
    } ]
});

var geomapMainPanel = { 
    id: 'wb-center-geomap-content-panel', 
    layout: 'anchor',
    // title: 'GeoMap Content Panel', 
    border: false,
    items: [{
    	xtype : "tabpanel",
    	title: 'google geo map',
        anchor: '100%, 80%',
        id: 'wb-center-geomap-tabpanel',
        tabPosition: 'bottom',
        items:[ {
            	title: "Geomap",
             	id: 'wb-center-geomap-content-panel',
        		plugins: [new Ext.ux.Plugin.RemoteComponent({
		            url : './js/components/Ggeomap.js',
		            loadOn: 'show',
	                listeners: {
		                'beforeadd' : {fn: function(JSON) {
        					var tabPanel = Ext.getCmp('wb-center-geomap-tabpanel');
        					JSON['height'] = tabPanel.getFrameHeight();
        					JSON['width'] = tabPanel.getFrameWidth();
		                } }
	        		}
	            })]
        	}, { 
            	title: "intensity map",
             	id: 'wb-center-intensitymap-content-panel',
                plugins: [new Ext.ux.Plugin.RemoteComponent({
    	            url : './js/components/Gintensitymap.js',
    	            loadOn: 'show',
                    listeners: {
    	                'beforeadd' : {fn: function(JSON) {
							var tabPanel = Ext.getCmp('wb-center-geomap-tabpanel');
                			JSON['height'] = tabPanel.getFrameHeight();
                			JSON['width'] = tabPanel.getFrameWidth();
    	                } }
            		}
                })]
    		} ]
		}, {
            xtype : 'wbindicatorformpanel',
            id : 'wb-center-geomap-indicator-form-panel',
            anchor: '100%, 20%',
            labelWidth: 90,
            title: 'Indicator selection',
            items : [ {
            		xtype		 : 'combo',
            		id			 : 'wb-center-geomap-combo',
                    fieldLabel   : 'Query Indicator',
                    // typeAhead    : true,
                    loadingText  : 'Searching...',
                    pageSize     : 5,
                    width        : 400,
                    store        : new Ext.data.JsonStore({
                    	// baseParams : {q: ''},
                    	// url : '../lib/indicator-query.php',
	                    storeId: 'geomapStore',
	                    // root: 'results',
	                    idProperty: 'id',
                    	fields : ['id', 'value'],
                    	data : []
                    }),
                    valueField: 'id',
                    displayField: 'value',
            		/*
                    store        : new Ext.data.JsonStore({
                        autoDestroy: true,
                        baseParams : {q : "tax"},
                        url: '../lib/indicator-query.php',
                        storeId: 'geomapStore',
                        root: 'results',
                        idProperty: 'id',
                        fields: ['id', 'value']
                    }),
                    */
                    listeners : {
		                keyup : {fn: function( txtFld, eventObj ) {
            				if (txtFld.getValue().length == 3) {
            					this.store.proxy = new Ext.data.HttpProxy({url: '../lib/indicator-query.php' +txtFld.getValue()});
            					this.store.root = 'results';
            					this.store.setBaseParam('q', txtFld.getValue());
				            	this.store.reload( );
            				}
            			}
        			} }
            		/*

                    */
                 }, {
        	        xtype: 'sliderfield',
        	        id : 'wb-center-geomapdt',
        	        fieldLabel: 'Geomap Date : ',
        	        increment: 1,
        	        minValue: 1960,
        	        maxValue: 2010,
                    anchor: '100%',
                    value: 2000,
                    tipText: function(thumb) {
                        return String(thumb.value) + ' year';
                    },
                    onChange : function(slider, v){
                    	console.log(v);
                        this.setValue(v, undefined, true);
                    }
        	    } ]
		} ]
};

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
	    }, chartMainPanel, geomapMainPanel, 
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
