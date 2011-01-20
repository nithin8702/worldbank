{
	xtype: 'gvisualization',
	id: 'wb-google-timeline',
	visualizationPkg: {'annotatedtimeline': 'AnnotatedTimeLine'},
	visualizationCfg: {
		allowHtml: true,
		displayAnnotations: true,
		displayExactValues: true,
		wmode: 'transparent'
	},
	height: 400,
    store : Ext.StoreMgr.lookup('wbGCommonDataStore')
}
