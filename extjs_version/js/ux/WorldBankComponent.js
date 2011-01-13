
/** Ext JsonReader for World Bank Data**/
Ext.namespace('Ext.ux.component');

Ext.ux.component.wbCountryTreePanel = Ext.extend(Ext.tree.TreePanel, {
    title: 'Country List',
    region:'east',
    width: 300,
    useArrows:true,
    autoScroll:true,
    animate:true,
    enableDD:true,
    containerScroll: true,
    rootVisible: true,
    root:{ expanded: true,
           text: "",
           draggable: false,
           async: true},
    loader: new Ext.ux.tree.wbTreeLoader({dataUrl: './json/countries.json'}),
    frame: true,
    listeners: {
       'load' : function ( node ) {
           console.log("fire before load event");
       },
       'checkchange': function(node, checked){
    	   var wbEastCountryProperty = Ext.getCmp('wb-east-country-property-grid');
    	   console.log(node)
           if(checked){
               node.getUI().addClass('complete');
               wbEastCountryProperty.setProperty(node.id, node.text, true);
           }else{
               node.getUI().removeClass('complete');
               wbEastCountryProperty.removeProperty(node.id);
           }
       }
   },
   buttons: [{
        text: 'Get Completed Tasks',
        handler: function(){
            var wbWestMenuPanel = Ext.getCmp('wb-west-tree-menu-panel');
            var selectedNode = wbWestMenuPanel.getSelectionModel().getSelectedNode();
            var tabPanel = Ext.getCmp('wb-center-' + selectedNode.id + '-content-panel');
            if (tabPanel.items.getCount() < 3) {
                 Ext.each(gCharts, function(val, key) {
                     tabPanel.add({
                                 title: val.trim(),
                                 iconCls: 'tabs',
                                 plugins: new Ext.ux.Plugin.RemoteComponent({
                                      url : './js/components/Gtimeline.js',
                                      loadOn: 'show'
                                 }),
                                 autoShow: true
                                 // closable:true
                    });
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
                });
            }

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
    height: 270,
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
        width: 230,
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