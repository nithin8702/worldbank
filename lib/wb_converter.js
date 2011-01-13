
jQuery.extend({
	convertWBData: function( rowData ) {
	    var rows = new Array();
            var debug = false;

	    jQuery.each(rowData, function(rowKey, rowVal) {
	        var col = new Array();
	        jQuery.each(rowVal, function(colKey, colVal) {
	            switch ( true ) {
	                case ( typeof( colVal ) === "object" && jQuery.isArray( colVal ) ):
	                    while ( colVal.length ) {
	                        arrayVal = colVal.pop();
	                        jQuery.each(arrayVal, function(nestedRowKey, nestedRowVal) {
	                            if (debug) { console.log( "nested Col Val : " + nestedRowVal ); }
	                            col.push( { "v" : jQuery.typeCheck( jQuery.trim(nestedRowVal) ) } );
	                        });
	                    }
	                    break;
	                case ( typeof( colVal ) === "object" && jQuery.isPlainObject( colVal ) ):
	                    jQuery.each(colVal, function(nestedRowKey, nestedRowVal) {
	                        if (debug) { console.log( "nested Col Val : " + nestedRowVal ); }
	                        col.push( { "v" : jQuery.typeCheck( jQuery.trim(nestedRowVal) ) } );
	                    });
	                    break;
	                default:
	                    if ( jQuery.trim(colKey).toLowerCase() == "date" ) {
	                        if (debug) { console.log( "date col : " + colVal ); }
	                        col.push( { "v" : new Date(colVal, 1, 1) } );
	                    } else {
	                        col.push( { "v" : jQuery.typeCheck( jQuery.trim( colVal )) } );
	                    }
	                    if (debug) { console.log( "col Val : " + colVal ); }
	                    break;
	            }
	        });
	        rows.push( { "c" : col } );
	    });

	    if (debug) { console.log("column info : " + rows); }
	    return {"rows" : rows};
	},

	typeCheck: function( chkVal ) {
	    switch ( true ) {
	        case ( "true" === chkVal || "false" === chkVal ):
	            return new Boolean(chkVal);
	            break;
	        case ( !isNaN( chkVal ) ):
	            return parseFloat(chkVal);
	            break;
	        default:
	            return chkVal;
	    }
	}

});

function getTypeCheck( chkVal ) {
}
