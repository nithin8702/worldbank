
var leftTreeMenuPanel = {
    xtype: 'treepanel',
    id: 'wb-west-tree-menu-panel',
    flex: 1,
    title: 'Menu',
    split: true,
    collapsible: true,
    rootVisible:false,
    lines:false,
    autoScroll:true,
    root: new Ext.tree.AsyncTreeNode(),
    dataUrl: Ext.wb.variables.json_data_url_prefix + 'left_menu.json',
    listeners: {
        'render': function(tp){
            tp.getSelectionModel().on('selectionchange', function(tree, node){
                var el = Ext.getCmp('wb-west-detail-panel').body;
                if(node && node.leaf) {
                	switch (true) {
                		case (node.id == 'gmap'):
                			if (!Ext.getCmp('wb-west-menu-panel').collapsed) {
                				Ext.getCmp('wb-west-menu-panel').collapseFirst = false;
                				Ext.getCmp('wb-west-menu-panel').hideCollapseTool = false;
                				Ext.getCmp('wb-west-menu-panel').toggleCollapse(); // close west menu panel
                			}
                			if (!Ext.getCmp('wb-east-property-panel').collapsed)
                				Ext.getCmp('wb-east-property-panel').toggleCollapse(); // close east property panel
                			break;
                		case (node.id == 'geomap'):
                			if (!Ext.getCmp('wb-east-property-panel').collapsed)
                				Ext.getCmp('wb-east-property-panel').toggleCollapse(); // close east property panel
                			if (Ext.getCmp('wb-west-menu-panel').collapsed)
                				Ext.getCmp('wb-west-menu-panel').toggleCollapse(); // close west menu panel
                			break;
                		default:
                        	Ext.getCmp('wb-east-property-grid-tabpanel').activate('wb-east-country-property-grid');
                			if (Ext.getCmp('wb-east-property-panel').collapsed) {
                				Ext.getCmp('wb-east-property-panel').toggleCollapse(); // close east property panel
                				Ext.getCmp('wb-east-property-panel').hideCollapseTool = false;
                			}
                			if (Ext.getCmp('wb-west-menu-panel').collapsed) {
                				Ext.getCmp('wb-west-menu-panel').toggleCollapse(); // close west menu panel
                				Ext.getCmp('wb-west-menu-panel').hideCollapseTool = false;
                			}
                			break;
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
    title: 'Menu Brief Description',
    id: 'wb-west-detail-panel',
    flex: 1,
    autoScroll: true,
    collapsible: true,
    split: true,
    bodyStyle: 'padding-bottom:15px;background:#eee;',
    html: '<p class="details-info"></p>'
};

var leftMenuPanel = {
    id: 'wb-west-menu-panel',
	title: 'WB unite data menu',
    region:'west',
    collapsible: true,
    split : true,
    margins: '0 0 0 5',
    width: 215,
    minSize: 190,
    maxSize: 240,
    layout:'vbox',
    layoutConfig: {
        align : 'stretch',
        pack  : 'start'
    },
    items: [leftTreeMenuPanel, leftMenuDetailPanel]
}


