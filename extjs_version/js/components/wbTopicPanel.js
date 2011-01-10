{
    id:'config-main-panel',
    layout:'border',
    title:'Loading...',
    items:[ {
           xtype: 'wbcountrytreepanel',
           region: 'east',
           id: 'wb-center-topic-tree-panel',
        },{
        id : 'wb-center-topic-indicator-main-panel',
        region:'center',
      //  plugins: [new Ext.ux.Plugin.RemoteComponent({
      //      url : './js/extjs/components/wbTopicIndicatorPanel.js',
      //    loadOn: 'show'
      //        })]
    } ]
}

