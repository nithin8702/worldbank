{
    xtype: 'grid',
    id: 'wb-data-grid',
    store: store,
    columns: [
        {
            id       :'company',
            header   : 'Company', 
            width    : 160, 
            sortable : true, 
            dataIndex: 'company'
        },
        {
            header   : 'Price', 
            width    : 75, 
            sortable : true, 
            renderer : 'usMoney', 
            dataIndex: 'price'
        },
        {
            header   : 'Change', 
            width    : 75, 
            sortable : true, 
            renderer : change, 
            dataIndex: 'change'
        },
        {
            header   : '% Change', 
            width    : 75, 
            sortable : true, 
            renderer : pctChange, 
            dataIndex: 'pctChange'
        },
        {
            header   : 'Last Updated', 
            width    : 85, 
            sortable : true, 
            renderer : Ext.util.Format.dateRenderer('m/d/Y'), 
            dataIndex: 'lastChange'
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            items: [{
                icon   : '../shared/icons/fam/delete.gif',  // Use a URL in the icon config
                tooltip: 'Sell stock',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = store.getAt(rowIndex);
                    alert("Sell " + rec.get('company'));
                }
            }, {
                getClass: function(v, meta, rec) {          // Or return a class from a function
                    if (rec.get('change') < 0) {
                        this.items[1].tooltip = 'Do not buy!';
                        return 'alert-col';
                    } else {
                        this.items[1].tooltip = 'Buy stock';
                        return 'buy-col';
                    }
                },
                handler: function(grid, rowIndex, colIndex) {
                    var rec = store.getAt(rowIndex);
                    alert("Buy " + rec.get('company'));
                }
            }]
        }
    ],
    stripeRows: true,
    autoExpandColumn: 'company',
    title: 'Array Grid',
    // config options for stateful behavior
    stateful: true,
    stateId: 'grid'
}
