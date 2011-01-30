{
	xtype: 'gvisualization',
	id: 'wb-google-GeoMap',
	visualizationPkg: 'geomap',
	visualizationCfg: {
		region: 'world',
		dataMode: 'regions',
		height: Ext.getCmp('wb-center-geomap-tabpanel').getHeight() - Ext.getCmp('wb-center-geomap-tabpanel').getFrameHeight(),
		width: Ext.getCmp('wb-center-geomap-tabpanel').getWidth()
	},
	store : 'wbGGeomapDataStore'
}