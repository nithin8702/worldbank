{
    xtype: 'gvisualization',
    id: 'wb-google-IntensityMap',
    visualizationPkg: 'intensitymap',
	visualizationCfg: {
		region: 'world',
		height: Ext.getCmp('wb-center-geomap-tabpanel').getHeight() - Ext.getCmp('wb-center-geomap-tabpanel').getFrameHeight(),
		width: Ext.getCmp('wb-center-geomap-tabpanel').getWidth()
	},
	store : 'wbGGeomapDataStore'
}
