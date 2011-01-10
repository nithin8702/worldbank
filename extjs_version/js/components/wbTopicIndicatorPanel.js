{ 
    xtype: 'tabpanel',
    activeTab: 0, 
    items:[ {
        id:'config-main-panel',
        layout:'border',
        title:'Loading...',
        items:[ {
           xtype: 'wbcountrytreepanel',
           id: 'wb-center-topic-tree-panel',
        }, {
           id : 'wb-center-topic-indicator-main-panel',
           region:'center',
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
                      wbIndicatorCombo.store = new Ext.ux.component.wbDataStore ( {url: indicator_url} );
                      console.log("change event");
                   } 
               }
         }, { xtype : 'wbcombobox',
              name:  'topic-indicator',
              fieldLabel : 'Indicator : ',
              id : 'wb-center-topic-indicator-combo',
              lazyRender : true,
              width : 400,
              listeners: {
                  // delete the previous query in the beforequery event or set
                  // combo.lastQuery = null (this will reload the store the next time it expands)
                  beforequery: function(qe){
                      qe.combo.clearValue();
                      delete qe.combo.lastQuery;
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
          items: [{
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
      }]
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
}
