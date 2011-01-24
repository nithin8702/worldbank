
var leftTreeMenuPanel = {
    xtype: 'treepanel',
    id: 'wb-west-tree-menu-panel',
    anchor: '100%, 50%',
    title:'Menu',
    split:true,
    collapsible: true,
    margins:'0 0 0 0',
    rootVisible:false,
    lines:false,
    autoScroll:true,
    collapseFirst:false,
    root: new Ext.tree.AsyncTreeNode(),
    dataUrl:wb_json_data_url_prefix + 'left_menu.json',
    listeners: {
        'render': function(tp){
            tp.getSelectionModel().on('selectionchange', function(tree, node){
                var el = Ext.getCmp('wb-west-detail-panel').body;
                if(node && node.leaf){
                    Ext.getCmp('wb-center-content-panel').layout.setActiveItem('wb-center-' + node.id + '-content-panel');
                	Ext.getCmp('wb-east-property-grid-tabpanel').activate('wb-east-country-property-grid');
                	
                	switch (true) {
                		case (node.id == 'gmap'):
                			if (!Ext.getCmp('wb-east-property-panel').collapsed)
                				Ext.getCmp('wb-east-property-panel').toggleCollapse(); // close east property panel
                			if (!Ext.getCmp('wb-west-menu-panel').collapsed)
                				Ext.getCmp('wb-west-menu-panel').toggleCollapse(); // close west menu panel
                			break;
                		case (node.id == 'geomap'):
                			if (!Ext.getCmp('wb-east-property-panel').collapsed)
                				Ext.getCmp('wb-east-property-panel').toggleCollapse(); // close east property panel
                			if (Ext.getCmp('wb-west-menu-panel').collapsed)
                				Ext.getCmp('wb-west-menu-panel').toggleCollapse(); // close west menu panel
                			break;
                		default:
                			if (Ext.getCmp('wb-east-property-panel').collapsed)
                				Ext.getCmp('wb-east-property-panel').toggleCollapse(); // close east property panel
                			if (Ext.getCmp('wb-west-menu-panel').collapsed)
                				Ext.getCmp('wb-west-menu-panel').toggleCollapse(); // close west menu panel
                			break;
                	}
                } else {
                    // el.update(detailsText);
                }
            })
        }
    }
};

var leftMenuDetailPanel = {
    anchor: '100%, 50%',
    title: 'Menu Brief Description',
    id: 'wb-west-detail-panel',
    autoScroll: true,
    collapsible: true,
    split: true,
    margins: '0 0 0 0',
    height: 220,
    bodyStyle: 'padding-bottom:15px;background:#eee;',
    html: '<p class="details-info"></p>'
    // html: detailsText
};

var leftMenuPanel = {
    layout: 'anchor',
    title: 'WB unite data menu',
    id: 'wb-west-menu-panel',
    region:'west',
    collapsible: true,
    split : true,
    margins: '0 0 0 5',
    width: 215,
    minSize: 200,
    maxSize: 230,
    items: [leftTreeMenuPanel, leftMenuDetailPanel]
}


