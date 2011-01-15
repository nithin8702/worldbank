var rightPropertyPanel = {
	id: 'wb-east-property-panel',
	region: 'east',
	title: 'Selected Property',
    collapsible: true,
    split: true,
    width: 225, // give east and west regions a width
    minSize: 175,
    maxSize: 400,
    margins: '0 5 0 0',
    layout: 'fit', // specify layout manager for items
    items:         // this TabPanel is wrapped by another Panel so the title will be applied
    new Ext.TabPanel({
    	id: 'wb-east-property-grid-tabpanel',
        border: false, // already wrapped so don't add another border
        enableTabScroll : true,
        activeTab: 1, // second tab initially active
        tabPosition: 'bottom',
        items: [new Ext.grid.PropertyGrid({
        	id: 'wb-east-source-country-property-grid',
            title: 'Source Country'
        }), new Ext.grid.PropertyGrid({
        	id: 'wb-east-topic-country-property-grid',
            title: 'Topic Country'
        }), new Ext.grid.PropertyGrid({
            title: 'Indicator',
            id: 'wb-east-indicator-property-grid'
        }), new Ext.grid.PropertyGrid({
        	id: 'wb-east-parameter-property-grid',
            title: 'Parameter'
        })]
    })
};

