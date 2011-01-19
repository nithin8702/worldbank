
/** Ext JsonReader for World Bank Data**/
Ext.namespace('Ext.ux.component');

Ext.ux.component.wbCountryTreePanel = Ext.extend(Ext.tree.TreePanel, {
    title: 'Country List',
    useArrows:true,
    autoScroll:true,
    animate:true,
    enableDD:true,
    containerScroll: true,
    loader: new Ext.ux.tree.wbTreeLoader({dataUrl: './json/countries.json'}),
    root: {
        nodeType: 'async',
        text: 'Ext JS',
        draggable: false,
        id: 'source',
        expanded: true
    },
    rootVisible: false,
    preloadChildren : true,
    frame: true,
    listeners: {
       'checkchange': function(node, checked){
           var wbWestMenuPanel = Ext.getCmp('wb-west-tree-menu-panel');
           var selectedNode = wbWestMenuPanel.getSelectionModel().getSelectedNode();
    	   var wbEastCountryProperty = Ext.getCmp('wb-east-' + selectedNode.id + '-country-property-grid');
           if(checked){
               node.getUI().addClass('complete');
               wbEastCountryProperty.setProperty(node.text, node.id, true);
           }else{
               node.getUI().removeClass('complete');
               wbEastCountryProperty.removeProperty(node.text);
           }
       }
   },
   buttons: [{
        text: 'show graph',
        handler: function(){
            var wbWestMenuPanel = Ext.getCmp('wb-west-tree-menu-panel');
            var selectedNode = wbWestMenuPanel.getSelectionModel().getSelectedNode();
            
        	var dataStore = new Ext.data.Store ( {
        		// url: Ext.ux.util.getWBRequestURL( selectedNode.id ),
        		url: "./json/countries/AU;BE;BR;FR;KR/indicators/BM.GSR.TOTL",
                autoLoad: true,
        	    reader: new Ext.ux.data.wbReader( {
        	        root: 'results',
        	        fields: [ {name: 'date', mapping: 'date'},
        	                  {name: 'value', mapping: 'value'},
        	                  {name: 'country', mapping: 'country'} ]
        	    } )
            } );
            var tabPanel = Ext.getCmp('wb-center-' + selectedNode.id + '-content-panel');
            if (tabPanel.items.getCount() < 2) {
                Ext.iterate(gCharts, function(key, val) {
                    tabPanel.add({
                        title: val,
                        plugins: [ new Ext.ux.Plugin.RemoteComponent( {
			                        	url : "./js/components/G" + key + ".js",
			                        	loadOn: 'show',
			                            listeners: {
				                            'success' : {fn: function(){

				                            }},
				                            'beforeadd' : {fn: function(JSON){
				                            	JSON['store'] = dataStore;
				                            	JSON['columns'] = Ext.getCmp('wb-east-' + selectedNode.id + '-country-property-grid').getSource();
				                            }}
				                    	} 
                        		} ) ]
                    });
                } );
            }
/*
                     new Ext.data.Connection({
                         url: 'js/extjs/components/Gtimeline.js',

                         listeners: {
                             beforerequest : function( conn, options ) {
                                 Ext.Msg.wait('Loading data','Please wait..'); 
                             },
                             requestcomplete : function( conn, response, options ){
                                 eval(resp.responseText);
                                 tabPanel.add({
                                     title: val.trim(),
                                     iconCls: 'tabs',
                                     html: val + '<br/><br/>',
                                     items: [timeline]
                                     // closable:true
                                 });
                                 Ext.Msg.hide(); 
                             }
                         } 
                     });
*/

            var msg = '', selNodes = Ext.getCmp('wb-center-' + selectedNode.id + '-tree-panel').getChecked();
            Ext.each(selNodes, function(node){
                if(msg.length > 0){
                    msg += ', ';
                }
                msg += node.text;
            });
            Ext.Msg.show({
                title: 'Completed Tasks',
                msg: msg.length > 0 ? msg : 'None',
                icon: Ext.Msg.INFO,
                minWidth: 200,
                buttons: Ext.Msg.OK
            });
        }
    }]
});

Ext.ux.component.wbIndicatorFormPanel = Ext.extend(Ext.form.FormPanel, {
    region:'north',
    height: 120,
    border: false,
    labelWidth: 125,
    frame: true,
    title: 'Date Range',
    bodyStyle:'padding:5px 5px 0',
    labelPad: 20,
    layoutConfig: {
        labelSeparator: ''
    },
    defaults: {
        msgTarget: 'side'
    },
    // defaultType: 'datefield',
//     items : [ ]
});

Ext.ux.component.wbDataStore = Ext.extend(Ext.data.Store, {
    url: '',
    autoload: true,
    reader: new Ext.ux.data.wbReader({
        root: 'results',
        fields: [{name: 'value', mapping: 'id'},
                 {name: 'label', mapping: 'name'}
        ]
    }),
    listeners : {
        beforeload : function( store, options ) {
        }
    }
});

Ext.ux.component.wbComboBox= Ext.extend(Ext.form.ComboBox, {
    mode:           'remote',
    value:          'choose options',
    triggerAction:  'all',
    forceSelection: true,
    boxMinWidth :   300,
    boxMaxWidth :   500,
    width :         400,
    editable:       false,
    fieldLabel:     'WB Combo Box',
    name:           'wbCombo',
    hiddenName:     'wbCombo',
    displayField:   'label',
    valueField:     'value',
    store:          new Ext.data.Store({
                        url: '',
                        autoload: true,
                        reader: new Ext.ux.data.wbReader({
                            root: 'results',
                            fields: [{name: 'value', mapping: 'id'},
                                     {name: 'label', mapping: 'name'}
                            ]
                        }),
                        listeners : {
                            beforeload : function( store, options ) {
                                var wbWestMenuPanel = Ext.getCmp('wb-west-tree-menu-panel');
                                var selectedNode = wbWestMenuPanel.getSelectionModel().getSelectedNode();
                                // store.proxy.url = './json/' + selectedNode.id + '.json';
                                // console.log("combox box loaded !!!!!!!!!!!!!!!!" + store.proxy.url);
                            }
                        }
                    })
});

Ext.reg('wbdatastore', Ext.ux.component.wbDataStore);

Ext.reg('wbcombobox', Ext.ux.component.wbComboBox);

Ext.reg('wbindicatorformpanel', Ext.ux.component.wbIndicatorFormPanel);

Ext.reg('wbcountrytreepanel', Ext.ux.component.wbCountryTreePanel);
