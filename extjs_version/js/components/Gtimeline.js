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
	store: new Ext.data.Store ( {
		url: '../lib/ajax-proxy.php?route=/countries/CUB;CRI/indicators/SP.POP.TOTL?format=json',
        autoLoad: true,
	    reader: new Ext.ux.data.wbReader({
	        root: 'results',
	        fields: [{name: 'date', mapping: 'date'},
	                 {name: 'value', mapping: 'value'},
	                 {name: 'country', mapping: 'country'}]
	    })
    } ),
	columns: Ext.getCmp('wb-east-' + Ext.getCmp('wb-west-tree-menu-panel').getSelectionModel().getSelectedNode().id + '-country-property-grid').getSource()
}
