{
	id: 'wb-main-extjs-grid-chart-panel',
    title: 'Line / Column Chart',
    layout:'vbox',
    layoutConfig: {
        align : 'stretch',
        pack  : 'start'
    },
    items: [ {
    	id: 'wb-main-extjs-data-grid-chart-panel',
    	flex:1,
        layout: 'card',
        activeItem: 0,
        margins: '5 5 0',
        split: true,
        items: [{
    		id: 'wb-main-extjs-data-grid-columnchart',
            xtype: 'columnchart',
            url:'../lib/ext-3.3.1/resources/charts.swf',
            store : Ext.StoreMgr.lookup('wbExtjsGridDataStore'),
            xField: 'date',
            xAxis: new Ext.chart.CategoryAxis({
                displayName: 'Date',
                labelRenderer : Ext.util.Format.dateRenderer('Y-m-d')
            }),
            yAxis: new Ext.chart.NumericAxis({
                displayName: 'Value',
                labelRenderer : Ext.util.Format.numberRenderer('0,0')
            }),
            tipRenderer : function(chart, record, index, series){
                return Ext.util.Format.number(record.data[series.yField], '0,0') + ' in ' + Ext.util.Format.date(record.data.date, 'Y-m-d');
            },
            // style chart so it looks pretty
            chartStyle: {
                padding: 10,
                animationEnabled: true,
                font: {
                    name: 'Tahoma',
                    color: 0x444444,
                    size: 11
                },
                dataTip: {
                    padding: 5,
                    border: {
                        color: 0x99bbe8,
                        size:1
                    },
                    background: {
                        color: 0xDAE7F6,
                        alpha: .9
                    },
                    font: {
                        name: 'Tahoma',
                        color: 0x15428B,
                        size: 10,
                        bold: true
                    }
                },
                xAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xeeeeee}
                },
                yAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xdfe8f6}
                }
            },
            series: [{
		        type: 'column',
		        displayName: Ext.StoreMgr.lookup('wbExtjsGridDataStore').fields.itemAt(1).name,
		        yField: Ext.StoreMgr.lookup('wbExtjsGridDataStore').fields.itemAt(1).name,
		        style: {
		            image:'../lib/ext-3.3.1/examples/chart/bar.gif',
		            mode: 'stretch',
		            color:0x99BBE8
		        }
		    }]
    	}, {
    		id: 'wb-main-extjs-data-grid-linechart',
            xtype: 'linechart',
            url:'../lib/ext-3.3.1/resources/charts.swf',
            store : Ext.StoreMgr.lookup('wbExtjsGridDataStore'),
            xField: 'date',
            xAxis: new Ext.chart.CategoryAxis({
                displayName: 'Date',
                labelRenderer : Ext.util.Format.dateRenderer('Y-m-d')
            }),
            yAxis: new Ext.chart.NumericAxis({
                displayName: 'Value',
                labelRenderer : Ext.util.Format.numberRenderer('0,0')
            }),
            tipRenderer : function(chart, record, index, series){
    			return Ext.util.Format.number(record.data[series.yField], '0,0') + ' in ' + Ext.util.Format.date(record.data.date, 'Y-m-d');
            },
            // style chart so it looks pretty
            chartStyle: {
                padding: 10,
                animationEnabled: true,
                font: {
                    name: 'Tahoma',
                    color: 0x444444,
                    size: 11
                },
                dataTip: {
                    padding: 5,
                    border: {
                        color: 0x99bbe8,
                        size:1
                    },
                    background: {
                        color: 0xDAE7F6,
                        alpha: .9
                    },
                    font: {
                        name: 'Tahoma',
                        color: 0x15428B,
                        size: 10,
                        bold: true
                    }
                },
                xAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xeeeeee}
                },
                yAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xdfe8f6}
                }
            },
            series: [{
		    	type:'line',
		        displayName: Ext.StoreMgr.lookup('wbExtjsGridDataStore').fields.itemAt(1).name,
		        yField: Ext.StoreMgr.lookup('wbExtjsGridDataStore').fields.itemAt(1).name,
		        style: {
		            color: 0x15428B
		        }
		    }]
    	}],
    	bbar : new Ext.Toolbar({
    		id: 'wb-main-extjs-data-grid-chart-panel-bbar',
            enableOverflow: true,
            items: [{
            	id: 'wb-main-extjs-data-grid-chart-panel-bbar-country-btn',
                text: 'Select Country',
                iconCls: 'add16',
                menu: [ ]
            }, '-', {
            	id: 'wb-main-extjs-data-grid-chart-panel-bbar-chart-type-btn',
                text: 'Select Chart Type',
                iconCls: 'add16',
                menu: [{
                	text: 'column chart', 
                	handler: function(action) {
                		Ext.getCmp('wb-main-extjs-data-grid-chart-panel').layout.setActiveItem('wb-main-extjs-data-grid-columnchart');
                	}
                }, {
                	text: 'line chart', 
                	handler: function(action) {
                		Ext.getCmp('wb-main-extjs-data-grid-chart-panel').layout.setActiveItem('wb-main-extjs-data-grid-linechart');
                	}
                }]
            }]
        }),
        listeners: {
        	beforerender : function( cmp ) { 
        		var store = Ext.StoreMgr.lookup('wbExtjsGridDataStore');
        		var country_btn = cmp.bottomToolbar.get('wb-main-extjs-data-grid-chart-panel-bbar-country-btn');

        		store.fields.each(function(field, rowIdx) {
        			if (rowIdx > 0) {
	        			country_btn.menu.add({
	                    	text: field.name, 
	                    	handler: function(action) {
	        					var series = new Array();
	        					if (cmp.layout.activeItem.getXType() == 'linechart') {
	        						Ext.wb.variables.chart_line_series.displayName = field.name;
	        						Ext.wb.variables.chart_line_series.yField = field.name;
	        						series.push(Ext.wb.variables.chart_line_series);
	        					} else {
	        						Ext.wb.variables.chart_column_series.displayName = field.name;
	        						Ext.wb.variables.chart_column_series.yField = field.name;
	        						series.push(Ext.wb.variables.chart_column_series);
	        					}
	        					cmp.layout.activeItem.setSeries(series);
	        				}
	        			});
        			} else {
        				
        			}
        		});
        		store.load({params:{start:0, limit:100}});
        	}
        }
    }, {
        xtype: 'grid',
        flex: 1,
        id: 'wb-main-extjs-data-grid-panel',
        viewConfig: {
            forceFit:true
        },
        // plugins: expander,
        collapsible: true,
        animCollapse: false,
        title: 'Grid data for the chart',
        iconCls: 'icon-grid',
        // paging bar on the bottom
        bbar: new Ext.PagingToolbar({
            pageSize: 25,
            store: Ext.StoreMgr.lookup('wbExtjsGridDataStore'),
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No datas to display",
            items:[ /*
                '-', {
                pressed: true,
                enableToggle:true,
                text: 'Show Preview',
                cls: 'x-btn-text-icon details',
                toggleHandler: function(btn, pressed){
                    var view = grid.getView();
                    view.showPreview = pressed;
                    view.refresh();
                }
            } */
            ]
        }),
        listeners: {
        	beforerender : function( cmp ) { 
        		var store = Ext.StoreMgr.lookup('wbGCommonDataStore');
        		var columns = new Array( new Ext.grid.RowNumberer() );
        		store.fields.each(function(field, rowIdx) {
        			if (rowIdx == 0) {
        				columns.push({ id : field.name, header : field.name, dataIndex : field.name, renderer: Ext.util.Format.dateRenderer('Y-m-d')});
        			} else {
        				columns.push({ header : field.name, dataIndex : field.name });
        			}
        		});
    	        var columnModel = new Ext.grid.ColumnModel( {
				        	            defaults: {
				        	            width: 100,
				        	            sortable: true
				        	        },
				        	        columns: columns} );
        		cmp.reconfigure( store, columnModel );
            }
        }
    } ]
}