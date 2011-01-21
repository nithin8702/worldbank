{
    xtype: 'gvisualization',
    id: 'wb-google-columnchart',
    visualizationPkg: 'columnchart',
	visualizationCfg: {
		fontSize : 10,
		hAxis: {title: 'Year', 
				titleTextStyle: {color: 'red'}
				},
		vAxis: {baseline : 'automatic',
				baselineColor : 'black',
				direction : 1,
				logScale : false,
				textPosition : 'out',
				title : null,
				textStyle : "{color: 'black', fontName: 'Arial', fontSize: 9}"
				// maxValue : 'automatic',
				// minValue : 'automatic'
				}
	},
    height: 400,
    store : Ext.StoreMgr.lookup('wbGCommonDataStore')
}
