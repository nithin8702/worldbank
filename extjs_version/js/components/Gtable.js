{
    xtype: 'gvisualization',
    id: 'wb-google-DataTable',
    visualizationPkg: 'table',
	visualizationCfg: {
		width: 800, 
		height: 420,
		allowHtml: true,
		showRowNumber: true
	},
	// height: 420,
    store : Ext.StoreMgr.lookup('wbGCommonDataStore')
}
