{
    xtype: 'gvisualization',
    id : 'wb-google-barchart',
    visualizationPkg: 'barchart',
	visualizationCfg: {
		fontSize : 10,
		hAxis: {baseline : 'automatic',
				logScale : false,
				direction : 1,
				baselineColor : 'black'
				// maxValue : 'automatic',
				// minValue : 'automatic'
				},
		vAxis: { title: 'Year', 
				titleTextStyle: {color: 'red'}
				}
	},
    store : 'wbGCommonDataStore'
}
