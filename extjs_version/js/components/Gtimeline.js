{
	xtype: 'gvisualization',
	id: 'timeline',
	visualizationPkg: {'annotatedtimeline': 'AnnotatedTimeLine'},
	visualizationCfg: {
		allowHtml: true,
		displayAnnotations: true,
		displayExactValues: true,
		wmode: 'transparent'
	},
	height: 480,
	title: 'Greatest DJIA Daily Point Gains',
	columns: Ext.getCmp('wb-east-' + Ext.getCmp('wb-west-tree-menu-panel').getSelectionModel().getSelectedNode().id + '-country-property-grid').getSource()
}
