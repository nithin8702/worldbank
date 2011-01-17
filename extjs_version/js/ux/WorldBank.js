
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
	// private override
    processResponse : function(response, node, callback, scope){ 
        var json = response.responseText;
        try {
            var o = response.responseData || Ext.decode(json);
            
            node = this.parseWbCountryData(node, o[1]);
            // node.expandChildNodes();

            this.runCallback(callback, scope || node, [node]);
        } catch(e) {
            this.handleFailure(response);
        }
    },
	parseWbCountryData : function(node, o) {
        var regionCode = new Array("EAP", "EAS", "ECA", "ECS", "LAC", "LCN", "MNA", "MEA", "NAC", "SAS", "SSA",  "SSF");
        var incomeLevel = new Array("NOC", "OEC", "HIC", "HPC", "LIC", "LMC", "LMY", "MIC", "UMC");

		var countryChildren = new Array();
		var regionChildren = new Array();
		var inclvlChildren = new Array();
        for(var i = 0, len = o.length; i < len; i++) {
            switch (true) {
	            case ( regionCode.indexOf( o[i]['id'] )  > -1 ):
	            	regionChildren.push({id : o[i]['id'], text : o[i]['name'], leaf : true, checked : false});
	                break;
	            case ( incomeLevel.indexOf( o[i]['id'] ) > -1 ):
	            	inclvlChildren.push({id : o[i]['id'], text : o[i]['name'], leaf : true, checked : false});
	                break;
	            default:
	            	countryChildren.push({id : o[i]['iso2Code'], text : o[i]['name'], leaf : true, checked : false});
	                break;
            }

        }

        node.beginUpdate();
        node.appendChild(this.createNode({ id : "country", text: "country", cls: "folder", leaf : false, children: countryChildren} ) );
        node.appendChild(this.createNode({ id : "region", text: "region", cls: "folder", leaf : false, children: regionChildren} ) );
        node.appendChild(this.createNode({ id : "inclvl", text: "income level", cls: "folder", leaf : false, children: inclvlChildren} ) );
        node.endUpdate();
        return node;
    }
});