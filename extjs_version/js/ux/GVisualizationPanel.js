Ext.ux.wbGDataTableBuilderAdapter = function(columns) {
    // hashmap to convert from Ext data types
    // datatypes
    var convert = {
        'auto': 'string',
        'string': 'string',
        'int': 'number',
        'float': 'number',
        'boolean': 'boolean',
        'date':'date'
    };
    var tbl = new google.visualization.DataTable();
    Ext.each(columns, function(node, index){
    	indexVal = store.fields.getCount() < index ? index : store.fields.getCount();
    	var f = store.fields.get(indexVal);
    	tbl.addColumn(convert[f.type.type], node.text, node.id);
    });
    return tbl;
}

Ext.ux.wbGDataTableAdapter = function(config) {
    // hashmap to convert from Ext data types
    // datatypes
    var convert = {
        'value': 'number',
        'string': 'string',
        'int': 'number',
        'float': 'number',
        'boolean': 'boolean',
        'date':'date'
    };

    return {
        adapt: function(config) {
    		var store = Ext.StoreMgr.lookup(config.store || config.ds);
            var tbl = new google.visualization.DataTable();

    		tbl.addColumn('date', "Date", 'date');
            Ext.iterate(config.columns, function(key, val){
            	tbl.addColumn('number', key, val);
            });

            console.log("length : " + store.data.length);
            console.log(store);
            console.log(store.data);

            tbl.addRows(config.store.data.length);
            var colIdx = 0;
            Ext.iterate(config.columns, function(key, val){
	            fld = config.store.fields.itemAt(colIdx);
	            console.log(fld);
            	config.store.data.each(function(record, rowIdx) {
            		console.log(record.get('country').value + " = " + val)
            		if (record.get('country').value == val) {
            			console.log("is set? ");
            			console.log(record);
	            		if (colIdx < 1) {
	            			tbl.setValue(rowIdx, colIdx, new Date('01/01/' + record.get('date') ));
	            			tbl.setValue(rowIdx, colIdx+1, parseFloat(record.get('value')));
	            		} else {
	            			tbl.setValue(rowIdx, colIdx+1, parseFloat(record.get('value')));
	            		}
            		}
	            });
            	colIdx++;
            });
            return tbl;
        }
    };
      
}();

Ext.ux.GDataTableAdapter = function(config) {
    // hashmap to convert from Ext data types
    // datatypes
    var convert = {
        'auto': 'string',
        'string': 'string',
        'int': 'number',
        'float': 'number',
        'boolean': 'boolean',
        'date':'date'    
    };
      
    return {
        adapt: function(config) {
            var store = Ext.StoreMgr.lookup(config.store || config.ds);
            var tbl = new google.visualization.DataTable();
            var cols = config.columns;
            for (var i = 0; i < cols.length; i++) {
                var c = cols[i];
                var id = c.dataIndex || c;
                var f = store.fields.get(id);
                // console.log(" f.type : " + f.type + " c.label : " + c.label + " id : " + id); f.type is object not string
                tbl.addColumn(convert[f.type.type], c.label || c, id);
            }
            var rs = store.getRange();
            tbl.addRows(rs.length);
            for (var i = 0; i < rs.length; i++) {
                for (var j = 0; j < cols.length; j++) {
                    var fld = store.fields.itemAt(j);        
                    tbl.setValue(i, j, rs[i].get(fld.name));
                }
            }
            return tbl;
        }
    };
      
}();



Ext.ux.GVisualizationPanel = Ext.extend(Ext.Panel, {
    // These are required by Google API
    // To add more visualizations you can extend
    // visualizationPkgs
    visualizationAPI: 'visualization',
    visualizationAPIVer: '1',
    visualizationPkgs: {
        'intensitymap': 'IntensityMap',
        'orgchart': 'OrgChart',
        'linechart': 'LineChart',
        'gauge': 'Gauge',
        'scatterchart': 'ScatterChart' 
/*
        'barchart': 'BarChart',
        'columnchart': 'ColumnChart',
        'motionchart': 'MotionChart',
        'geomap': 'Geomap'
*/
    },
    
    /**
     * visualizationPkg {String} 
     * (Required) Valid values are intesitymap, orgchart, gauge and scatterchart
     * The error "Module: 'visualization' with package: '' not found!" will be
     * thrown if you do not use this configuration.
     */
    visualizationPkg: '',
    
    /**
     * html {String}
     * Initial html to show before loading the visualization
     */
    html: 'Loading...',
    
    /**
     * store {Ext.data.Store/String}
     * Any valid instance of a store and/or storeId
     */    
    store: null,

    // Overriden methods
    initComponent: function() {
        if (typeof this.visualizationPkg === 'object') {
            Ext.apply(this.visualizationPkgs, this.visualizationPkg);            
            for (var key in this.visualizationPkg) {
                this.visualizationPkg = key;
                break;
            }
        }
        console.log(this);
        google.load(
            this.visualizationAPI,
            this.visualizationAPIVer,
            {
                packages: [this.visualizationPkg],
                callback: this.onLoadCallback.createDelegate(this)
            }
        );
        this.store = Ext.StoreMgr.lookup(this.store);
        Ext.ux.GVisualizationPanel.superclass.initComponent.call(this);
    },
    
    // custom methods
    onLoadCallback: function() {
        var tableCfg = {
            store: this.store,
            columns: this.columns
        };

        this.datatable = Ext.ux.wbGDataTableAdapter.adapt(tableCfg);
        
        var cls = this.visualizationPkgs[this.visualizationPkg];
        this.body.update('');
        this.visualization = new google.visualization[cls](this.body.dom);
        
        var relaySelect = function() {
            this.fireEvent('select', this, this.visualization);
        };
        google.visualization.events.addListener(this.visualization, 'select', relaySelect.createDelegate(this));
        this.visualization.draw(this.datatable, Ext.apply({}, this.visualizationCfg));

    }    
});
Ext.reg('gvisualization', Ext.ux.GVisualizationPanel);

