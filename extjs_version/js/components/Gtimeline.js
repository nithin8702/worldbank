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
	height: 600,
	title: 'Greatest DJIA Daily Point Gains',
store: new Ext.data.Store( {
    url: '',
    autoload: true,
    reader: new Ext.ux.data.wbReader({
        root: 'results',
        fields: [{name: 'country', mapping: 'country'},
                 {name: 'value', mapping: 'value'},
                 {name: 'date', mapping: 'date'}
        ]
    }),
    listeners : {
        beforeload : function( store, options ) {
        }
    }
}),
/*
        store:  new Ext.data.JsonStore({
                                        storeId: 'dsChart',
                                        url:     'gen.column.chart.data.php',
                                        root:    'rows',
                                        fields:
                                        [
                                                { name: 'name', type: 'string'},
                                                { name: 'ds1',  type: 'int'   },
                                                { name: 'ds2',  type: 'int'   }
                                        ]
                                }),

	store: new Ext.data.SimpleStore({
	fields: [
		{
			name: 'pointDate',
			type: 'date'
		},
		{
			name: 'pointClose',
			type: 'float'
		},
		{
			name: 'pointNetChg',
			type: 'float'
		},
		{
			name: 'pointPctChg',
			type: 'float'
		},
		{
			name: 'pointNews',
			type: 'string'
		}
	],
	data: [
		['10/13/2008',9387.61,936.42,11.10,' U.S. stocks join global rally on <a href=\"http://www.marketwatch.com/news/story/us-stocks-end-sharply-higher/story.aspx?guid={CA02B2A7-AB72-466D-BA2A-25A2EDD97B29}\" target=\"_blank\">government plans<\/a>.'],
		['3/16/2000',10630.60,499.19,4.93,' Mar 16, 2000 highlights here.'],
		['7/24/2002',8191.29,488.95,6.35,' Jul 24, 2002 highlights here.'],
		['9/30/2008',10850.66,485.21,4.68,' Sep 30, 2008 highlights here.'],
		['7/29/2002',8711.88,447.49,5.41,' Jul 29, 2002 highlights here.'],
		['3/18/2008',12392.66,420.41,3.51,' Mar 18, 2008 highlights here.'],
		['3/11/2008',12156.81,416.66,3.55,' Mar 11, 2008 highlights here.'],
		['9/18/2008',11019.69,410.03,3.86,' Sep 18, 2008 highlights here.'],
		['4/5/2001',9918.05,402.63,4.23,' Apr 5, 2001 highlights here.'],
		['4/18/2001',10615.83,399.10,3.91,' Apr 18, 2001 highlights here.'],
		['4/1/2008',12654.36,391.47,3.19,' April Fools Day, 2008'],
		['9/8/1998',8020.78,380.53,4.98,'Sep 8, 1998 highlights here.'],
		['10/15/2002',8255.68,378.28,4.80,'Oct 15, 2002 highlights here.'],
		['9/19/2008',11388.44,368.75,3.35,'Sep 19, 2008 highlights here.'],
		['9/24/2001',8603.86,368.05,4.47,'Sep 24, 2001 highlights here.'],
		['10/1/2002',7938.79,346.86,4.57,''],
		['5/16/2001',11215.92,342.95,3.15,''],
		['2/5/2000',10898.72,338.62,3.21,''],
		['10/28/1997',7498.32,337.17,4.71,''],
		['9/18/2007',13739.39,335.97,2.51,''],
		['8/5/2008',11615.77,331.62,2.94,'']
	]
}),
*/
	columns:  Ext.getCmp('wb-center-' + selectedNode.id + '-tree-panel').getChecked()
}
