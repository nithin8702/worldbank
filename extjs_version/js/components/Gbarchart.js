{
        xtype: 'gvisualization',
        id: 'lineChart',
        visualizationPkg: 'linechart',
        title: 'Company Performance Sample',
        store: new Ext.data.SimpleStore({
        fields: [
            {name: 'yr', type: 'string'}
            ,{name: 'sales', type: 'int'}
            ,{name: 'expenses', type: 'int'}
        ],
        data: [['2004',1000,400],['2005',1170,460],['2006',860,580],['2007',1030,540]]
    }),
        columns: Ext.getCmp('wb-center-' + selectedNode.id + '-tree-panel').getChecked()
}
