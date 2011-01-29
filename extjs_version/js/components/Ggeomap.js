{
	xtype: 'gvisualization',
	id: 'wb-google-GeoMap',
	visualizationPkg: 'geomap',
	visualizationCfg: {
		region: 'world',
		dataMode: 'regions'
	},
	store : Ext.StoreMgr.lookup('wbGGeomapDataStore')
}