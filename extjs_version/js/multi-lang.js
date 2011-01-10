/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
MultiLang= function() {
    // get the selected language code parameter from url (if exists)
    var params = Ext.urlDecode(window.location.search.substring(1));
    Ext.form.Field.prototype.msgTarget = 'side';
                
    return {
        init: function() {
            Ext.QuickTips.init();
            
            /* Language chooser combobox  */
            var store = new Ext.data.ArrayStore({
                fields: ['code', 'language', 'charset'],
                data : Ext.wbpyg.languages // from languages.js
            });
            var combo = new Ext.form.ComboBox({
                renderTo: 'languages',
                store: store,
                displayField:'language',
                typeAhead: true,
                mode: 'local',
                triggerAction: 'all',
                emptyText: 'Select a language...',
                selectOnFocus: true,
                onSelect: function(record) {
                    window.location.search = Ext.urlEncode({"lang":record.get("code"),"charset":record.get("charset")});
                }
            });
        
            if (params.lang) {
                // check if there's really a language with that language code
                record = store.data.find(function(item, key){
                    if (item.data.code == params.lang) {
                        return true;
                    }
                    return false;
                });
                // if language was found in store assign it as current value in combobox
                if (record) {
                    combo.setValue(record.data.language);
                }
            }            
            
            if (params.lang) {
                var url = String.format("../lib/ext-3.3.1/src/locale/ext-lang-{0}.js", params.lang);
                
                Ext.Ajax.request({
                    url: url,
                    success: this.onSuccess,
                    failure: this.onFailure,
                    scope: this 
                });
            } else {
                
            }
        },
        onSuccess: function(response, opts) {
            eval(response.responseText);
        },
        onFailure: function() {
            Ext.Msg.alert('Failure', 'Failed to load locale file.');
        }
    };
    
}();
