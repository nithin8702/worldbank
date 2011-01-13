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
    region:'center',
    layout:'border',
    items: [ {
        xtype : 'wbindicatorformpanel',
        id : 'wb-center-source-indicator-form-panel',
        region: 'north',
        labelWidth: 60,
        title: 'Source Indicator Selection',
        items : [ { xtype : 'wbcombobox',
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
                      var wbEastIndicatorProperty = Ext.getCmp('wb-east-indicator-property-grid');
                      wbEastIndicatorProperty.setProperty('source', newValue, true);
                   }   
               }
         },{ xtype : 'wbcombobox',
             fieldLabel : 'Indicator : ',
             name:   'source-indicator',
             id : 'wb-center-source-indicator-combo',
             width : 400,
             listeners: {
	             change : function( field, newValue, oldValue ) {
		             var wbEastIndicatorProperty = Ext.getCmp('wb-east-indicator-property-grid');
		             wbEastIndicatorProperty.setProperty('source-indicator', newValue, true);
		        } 
             }
         } ]
    }, {
      xtype: 'wbindicatorformpanel',
      region:'center',
      items: [ {
          layout: 'column',
          border: false,
          width: 460,
          // defaults are applied to all child items unless otherwise specified by child item
          defaults: {
              columnWidth: '.5',
              border: false
          },
          items: [ {
              xtype : "datefield",
              fieldLabel: 'Start Date',
              name: 'source-startdt',
              id: 'wb-center-source-startdt',
              style: {width: '100'},
              vtype: 'daterange',
              width: 100,
              endDateField: 'wb-center-source-enddt' // id of the end date field
          },{
              xtype : "datefield",
              fieldLabel: 'End Date',
              name: 'source-startdt',
              fieldLabel: 'Start Date',
              name: 'source-enddt',
              id: 'wb-center-source-enddt',
              style: {width: '100'},
              vtype: 'daterange',
              width: 100,
              startDateField: 'wb-center-source-startdt' // id of the start date field
          } ]
      } ]
   } ]
};

var individual = [{
    bodyStyle: 'padding-right:5px;',
    items: {
        xtype: 'fieldset',
        title: 'Individual Checkboxes',
        autoHeight: true,
        defaultType: 'checkbox', // each item will be a checkbox
        items: [{
            xtype: 'textfield',
            name: 'txt-test1',
            width: 50,
            fieldLabel: 'Alignment Test'
        }, {
            fieldLabel: 'Favorite Animals',
            boxLabel: 'Dog',
            name: 'fav-animal-dog'
        }, {
            fieldLabel: '',
            labelSeparator: '',
            boxLabel: 'Cat',
            name: 'fav-animal-cat'
        }, {
            checked: true,
            fieldLabel: '',
            labelSeparator: '',
            boxLabel: 'Monkey',
            name: 'fav-animal-monkey'
        }]
    }
}, {
    bodyStyle: 'padding-left:5px;',
    items: {
        xtype: 'fieldset',
        title: 'Individual Radios',
        autoHeight: true,
        defaultType: 'radio', // each item will be a radio button
        items: [{
            xtype: 'textfield',
            name: 'txt-test2',
            width: 50,
            fieldLabel: 'Alignment Test'
        }, {
            checked: true,
            fieldLabel: 'Favorite Color',
            boxLabel: 'Red',
            name: 'fav-color',
            inputValue: 'red'
        }, {
            fieldLabel: '',
            labelSeparator: '',
            boxLabel: 'Blue',
            name: 'fav-color',
            inputValue: 'blue'
        }, {
            fieldLabel: '',
            labelSeparator: '',
            boxLabel: 'Green',
            name: 'fav-color',
            inputValue: 'green'
        }]
    }
}];

var wbTopicIndicatorPanel = {
    id : 'wb-center-topic-indicator-main-panel',
    region:'center',
    width: .7,
    layout:'border',
    items: [ {
        xtype : 'wbindicatorformpanel',
        id : 'wb-center-topic-indicator-form-panel',
        region: 'north',
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
                      var wbEastIndicatorProperty = Ext.getCmp('wb-east-indicator-property-grid');
                      wbEastIndicatorProperty.setProperty('topic', newValue, true);
                   } 
               }
         }, { xtype : 'wbcombobox',
              name:  'topic-indicator',
              fieldLabel : 'Indicator : ',
              id : 'wb-center-topic-indicator-combo',
              lazyRender : true,
              width : 400,
              listeners: {
		         change : function( field, newValue, oldValue ) {
		             var wbEastIndicatorProperty = Ext.getCmp('wb-east-indicator-property-grid');
		             wbEastIndicatorProperty.setProperty('topic-indicator', newValue, true);
		         } 
              }
         }  ]
    }, {
      xtype: 'wbindicatorformpanel',
      region:'center',
      items: [ {
          layout: 'column',
          border: false,
          width: 460,
          // defaults are applied to all child items unless otherwise specified by child item
          defaults: {
              columnWidth: '.5',
              border: false
          },            
          items: individual
      },{
          xtype : 'slider',
          fieldLabel: 'Ambient Sounds',
          value: 2000,
          increment: 1,
          minValue: 1976,
          maxValue: 2009,
          name: 'ambient',
          tabTip : "sdlkf"
      }]
    }]
};

var countriesSourceTreePanel = {
    xtype: 'wbcountrytreepanel',
    region:'east',
    width: 250,
    id: 'wb-center-source-tree-panel'
};

var countriesTopicTreePanel= {
    xtype: 'wbcountrytreepanel',
    region:'east',
    width: 250,
    id: 'wb-center-topic-tree-panel'
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
    activeTab: 0, 
    items:[ {
        id:'wb-center-source-config-main-panel',
        layout:'border',
        title:'Loading...',
        items:[countriesSourceTreePanel, wbSourceIndicatorPanel]
    } ]
});

var topicMainPanel = new Ext.TabPanel({ 
    id: 'wb-center-topic-content-panel', 
    title: 'Topic Content Panel', 
    activeTab: 0, 
    items: [{
        id:'wb-center-topic-config-main-panel',
        layout:'border',
        title:'Loading...',
        items:[countriesTopicTreePanel, wbTopicIndicatorPanel]
    }]
});

var mainContentPanel = {
    id: 'wb-center-content-panel',
    region: 'center', // this is what makes this panel into a region within the containing layout
    layout: 'card',
    margins: '0 0 0 0',
    activeItem: 0,
    border: false,
    items: [ {
         title: 'introduction',
         iconCls: 'tabs',
         autoScroll:true,
         margins: '10 10 10 10',
         autoLoad: {url: 'abc.html', scripts: true}
    }, topicMainPanel, sourceMainPanel,
    {
        title: 'google map',
        id: 'wb-center-gmap-content-panel',
        iconCls: 'tabs',
        autoScroll:false,
        plugins: [new Ext.ux.Plugin.RemoteComponent({
            url : './js/components/wbGmapPanel.js',
            loadOn: 'show'
        })]
    }

]
};
