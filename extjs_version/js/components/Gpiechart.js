{
	xtype: 'gvisualization',
	id: 'wb-google-GeoMap',
	visualizationPkg: 'piechart',
	visualizationCfg: {
		pieSliceText: 'value',
		height: Ext.getCmp('wb-center-geomap-tabpanel').getHeight() - Ext.getCmp('wb-center-geomap-tabpanel').getFrameHeight(),
		width: Ext.getCmp('wb-center-geomap-tabpanel').getWidth()
	},
	store : 'wbGIntensitymapDataStore'
}