odoo.define('product_listing_extension.listing_url', function (require) {
"use strict";

var core = require('web.core');
var FormWidgets = require('web.form_widgets')

var ListingUrl = FormWidgets.FieldChar.extend({
    template: 'FieldListingUrl',
    initialize_content: function() {
        this._super();
        var $button = this.$el.find('button');
        $button.click(this.on_button_clicked);
        this.setupFocus($button);
    },
    render_value: function() {
        if (!this.get("effective_readonly")) {
            this._super();
        } else {
            var tmp = this.get('value');
            var s = /(\w+):(.+)|^\.{0,2}\//.exec(tmp);
            if (!s) {
                tmp = "http://" + this.get('value');
            }
            this.$el.find('a').attr('href', tmp).text('Go to Store');
        }
    },
    on_button_clicked: function() {
        if (!this.get('value')) {
            this.do_warn(_t("Resource Error"), _t("This resource is empty"));
        } else {
            var url = $.trim(this.get('value'));
            if(/^www\./i.test(url))
                url = 'http://'+url;
            window.open(url);
        }
    }
});

core.form_widget_registry
    .add('listing_url', ListingUrl);
});
