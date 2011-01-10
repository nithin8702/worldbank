
{
    xtype: 'gmappanel',
    region: 'center',
    zoomLevel: 14,
    gmapType: 'map',
    addControl: new GSmallMapControl(),
    setCenter: {
        geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
        marker: {title: 'Fenway Park'}
    },
/*
    markers: [{
        lat: 42.339641,
        'long': -71.094224,
        marker: {title: 'Boston Museum of Fine Arts'}
    },{
        lat: 42.339419,
        'long': -71.09077,
        marker: {title: 'Northeastern University'}
   }]
*/
}

