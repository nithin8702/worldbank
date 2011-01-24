var rightPropertyPanel = {
	id: 'wb-east-property-panel',
	region: 'east',
	title: 'Selected Property',
    collapsible: true,
    split: true,
    width: 225, // give east and west regions a width
    minSize: 200,
    maxSize: 250,
    margins: '0 5 0 0',
    layout: 'fit', // specify layout manager for items
    items:         // this TabPanel is wrapped by another Panel so the title will be applied
    new Ext.TabPanel({
    	id: 'wb-east-property-grid-tabpanel',
        border: false, // already wrapped so don't add another border
        enableTabScroll : true,
        activeTab: 1, // second tab initially active
        tabPosition: 'bottom',
        items: [ new Ext.grid.PropertyGrid({
        	id: 'wb-east-country-property-grid',
            title: 'Country',
            source: {}
        }), new Ext.grid.PropertyGrid({
            id: 'wb-east-indicator-property-grid',
        	title: 'Indicator',
        	source: {}
        }), new Ext.grid.PropertyGrid({
        	id: 'wb-east-parameter-property-grid',
            title: 'Parameter',
            source: {}
        })]
    })
};

