var rightPropertyPanel = {
	id: 'wb-east-property-grid',
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
        border: false, // already wrapped so don't add another border
        activeTab: 1, // second tab initially active
        tabPosition: 'bottom',
        items: [new Ext.grid.PropertyGrid({
        	id: 'wb-east-country-property-grid',
            title: 'Country',
            source: {}
        }), new Ext.grid.PropertyGrid({
            title: 'Indicator',
            id: 'wb-east-indicator-property-grid',
            source: {}
        }), new Ext.grid.PropertyGrid({
        	id: 'wb-east-parameter-property-grid',
            title: 'Parameter',
            source: {}
        })]
    })
};

