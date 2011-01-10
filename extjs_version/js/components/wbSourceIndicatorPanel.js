
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
                      wbIndicatorCombo.getStore().removeAll();
                      wbIndicatorCombo.getStore().add(new Ext.ux.component.wbDataStore ( {url: indicator_url} )); 
                      console.log("new value : " + newValue);
                   }   
               }
         },{ xtype : 'wbcombobox',
             fieldLabel : 'Indicator : ',
             name:   'source-indicator',
             id : 'wb-center-source-indicator-combo',
             width : 400,
             listeners: {
                 // delete the previous query in the beforequery event or set
                 // combo.lastQuery = null (this will reload the store the next time it expands)
                 beforequery: function(qe){
                     delete qe.combo.lastQuery;
                 }
             }
         } ]
    }, {
      xtype: 'wbindicatorformpanel',
      region:'center',
      items: [{
        fieldLabel: 'Start Date',
        name: 'source-startdt',
        id: 'wb-center-source-startdt',
        vtype: 'daterange',
        endDateField: 'wb-center-source-enddt' // id of the end date field
      },{
        fieldLabel: 'End Date',
        name: 'source-enddt',
        id: 'wb-center-source-enddt',
        vtype: 'daterange',
        startDateField: 'wb-center-source-startdt' // id of the start date field
      }]
    }]
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
