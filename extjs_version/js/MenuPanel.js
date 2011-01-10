
var leftTreeMenuPanel = {
    xtype: 'treepanel',
    id: 'wb-west-tree-menu-panel',
    region: 'center',
    title:'Menu',
    split:true,
    width: 225,
    minSize: 175,
    maxSize: 400,
    collapsible: true,
    margins:'0 0 0 0',
    rootVisible:false,
    lines:false,
    autoScroll:true,
    collapseFirst:false,
    root: new Ext.tree.AsyncTreeNode(),
    dataUrl:'./json/left_menu.json',

    listeners: {
        'render': function(tp){
            // Ext.getCmp('wb-center-content-panel').layout.setActiveItem('wb-center-source-content-panel');
            tp.getSelectionModel().on('selectionchange', function(tree, node){
                var el = Ext.getCmp('details-panel').body;
                if(node && node.leaf){
                     if (node.id == 'gmap') {
                    	 Ext.getCmp('wb-east-property-grid').collapse(); // close east property panel
                    	 Ext.getCmp('wb-west-tree-menu-panel').collapse(); // close west menu panel
                    	 Ext.getCmp('wb-center-' + node.id + '-content-panel').addMarker();
                    	 Ext.getCmp('wb-center-' + node.id + '-content-panel').addMarkers();
                    	 markers = [{lat: 42.339641,'long': -71.094224,marker: {title: 'Boston Museum of Fine Arts'}},
                    	            {lat: 42.339419,'long': -71.09077,marker: {title: 'Northeastern University'}}
                    	 ];
                     }
                     Ext.getCmp('wb-center-content-panel').layout.setActiveItem('wb-center-' + node.id + '-content-panel');
                } else {
                    // el.update(detailsText);
                }
            })
        }
    }
};

var leftMenuDetailPanel = {
    region: 'south',
    title: 'Menu Brief Description',
    id: 'details-panel',
    autoScroll: true,
    collapsible: true,
    split: true,
    margins: '0 0 0 0',
    height: 220,
    html: '<p class="details-info">When you select a layout from the tree, additional details will display here.</p>'
    // html: detailsText
};

var leftMenuPanel = {
    layout: 'border',
    title: 'West Side (Left Menu Panel)',
    id: 'layout-browser',
    region:'west',
    collapsible: true,
    split : true,
    margins: '0 0 0 5',
    width: 215,
    minSize: 100,
    maxSize: 500,
    items: [leftTreeMenuPanel, leftMenuDetailPanel]
}


