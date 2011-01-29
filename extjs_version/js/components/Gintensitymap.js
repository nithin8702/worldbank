{
    xtype: 'gvisualization',
    id: 'wb-google-IntensityMap',
    visualizationPkg: 'intensitymap',
	visualizationCfg: {
		region: 'world'
	},
	store : Ext.StoreMgr.lookup('wbGGeomapDataStore')
}
