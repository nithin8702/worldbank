
/** Ext JsonReader for World Bank Data**/
Ext.namespace('Ext.ux.data', 'Ext.ux.util', 'Ext.ux.tree');

Ext.ux.util.OnDemandLoadByAjax = function() {
    loadComponent = function(component) {
        var sURL = null;
        var sCALLBACK = null;

        if (typeof component === "string") {
            sURL = component;
        } else if (typeof component === "object") {
            sURL = component[0];
            sCALLBACK = component[1];
        }

        handleSuccess = function(response, options) {
            var head = document.getElementsByTagName("head")[0];
            var js = document.createElement('script');
            js.setAttribute("type", "text/javascript");
            js.text = response.responseText;
            if (!document.all) {
                js.innerHTML = response.responseText;
            }

            head.appendChild(js);
            if (typeof sCALLBACK == "function") {
                if (document.all) {
                    sCALLBACK();
                } else {
                    sCALLBACK.defer(50);
                }
            }
        }

        handleFailure = function(response, options) {
            alert('Dynamic load script: [' + sURL + '] failed!');
        }

        Ext.Ajax.request({
            url: sURL ,method: 'GET' ,success: handleSuccess ,failure: handleFailure ,disableCaching : false
        });

    }
    
    return {
        load: function(components) {
            Ext.each(components, function(component) {
                loadComponent(component);
            });
        }
    }
}();

/** end of code **/

/** example of use, one callback only **/
/*
var oScripts = [
    'dependence1.js', 'dependence2.js', [ 'script.php', function(options) {
            alert('this is a callback after script.php');
        }
    ]
];
Ext.ux.OnDemandLoadByAjax.load(oScripts);
*/

/** example of use, multiples callbacks **/
/*
var oScripts = [
    [ 'script1.php', function(options) {
            alert('this is a callback after script1.php');
        }
    ] ,[ 'script2.php', function(options) {
        alert('this is a callback after script2.php');
        }
    ]
];
*/

Ext.ux.data.wbReader = function(meta, recordType){
  meta = meta || {};
  Ext.ux.data.wbReader.superclass.constructor.call(this, meta, recordType || meta.fields);
};

Ext.extend(Ext.ux.data.wbReader, Ext.data.JsonReader, {
    readRecords : function(o){
    this.jsonData = o;
    if(o.metaData){
        this.onMetaChange(o.metaData);
    }
    var s = this.meta, Record = this.recordType,
        f = Record.prototype.fields, fi = f.items, fl = f.length, v;

    var root = o[1], c = root.length, totalRecords = c, success = true;
    if(s.totalProperty){
        v = parseInt(this.getTotal(o), 10);
        if(!isNaN(v)){
            totalRecords = v;
        }
    }
    if(s.successProperty){
        v = this.getSuccess(o);
        if(v === false || v === 'false'){
            success = false;
        }
    }

    // TODO return Ext.data.Response instance instead.  @see #readResponse
    return {
        success : success,
        records : this.extractData(root, true), // <-- true to return [Ext.data.Record]
        totalRecords : totalRecords
    };
    }
});

Ext.ux.tree.wbTreeLoader = Ext.extend(Ext.tree.TreeLoader, {
	load : function( node, callback, scope ) {
	    console.log(node);
	},
	// private override
    processResponse : function(response, node, callback, scope){ 
        var json = response.responseText;
        try {
            var o = response.responseData || Ext.decode(json);
            // node = new Ext.tree.AsyncTreeNode({ text: "country", cls: "folder"});
            o = o[1];
            node.beginUpdate();
            node.removeAll();
            var countries = node.appendChild( this.createNode( { text: "Countries", cls: "folder", expanded: true} ) );
            var incomeLevel = node.appendChild( this.createNode( { text: "Income Level", cls: "folder", expanded: true} ) );
            var region = node.appendChild( this.createNode( { text: "Region", cls: "folder", expanded: true} ) );
            for(var i = 0, len = o.length; i < len; i++) {
                var treeNode = {id : o[i]['id'], text : o[i]['name'], leaf : true, checked : false};
                var n = this.createNode(treeNode);
                if(n){
                    countries.appendChild(n);
                }
            }
            node.endUpdate();
            this.runCallback(callback, scope || node, [node]);
        } catch(e) {
            this.handleFailure(response);
        }
    }
});