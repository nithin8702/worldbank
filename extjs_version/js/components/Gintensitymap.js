{
    xtype: 'gvisualization',
    id: 'intensityMap',
    visualizationPkg: 'intensitymap',
    title: 'Intensity Map Sample',
    store: new Ext.data.SimpleStore({
    fields: [{
        name: 'Country',
        type: 'string'
    },{
 
        name: 'pop',
        type: 'int'
    },{
        name: 'area',
        type: 'int'
    }],
    data: [
        ['CN', 1324, 9640821],        
        ['IN', 1134, 3287263],
        ['US', 304, 9629091],
        ['ID', 232, 1904569],
        ['BR', 187, 8514877]        
    ]
}),
    columns:  Ext.getCmp('wb-center-' + selectedNode.id + '-tree-panel').getChecked()
}
