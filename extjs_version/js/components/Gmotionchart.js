{
    xtype: 'gvisualization',
    id: 'wb-google-motionChart',
    visualizationPkg: 'motionchart',
	visualizationCfg: {
		height : 350,
		width : 800,
		showChartButtons : true,
		showHeader : true,
		showSelectListComponent : true,
		showSidePanel : true,
		showXMetricPicker : true,
		showYMetricPicker : true,
		showXScalePicker : true,
		showYScalePicker : true,
		showAdvancedPanel : true
	},
	height : 440,
    store : Ext.StoreMgr.lookup('wbGMotionDataStore')
}
