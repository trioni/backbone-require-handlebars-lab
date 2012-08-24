define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/search.html',
], function($, _, Backbone, viewTemplate){

	var SearchView = Backbone.View.extend({
		defaults: {
			label: "Search on Last.fm"
		},
		template: null,
		initialize: function() {
			this.template = _.template(viewTemplate);
			this.render();
		},
		render: function() {
			$(this.el).html(this.template(this.defaults));
			return this;
		},		
		events: {
			"click input[type=button]": "search",
			"keypress input[type=text]": "enterHandler"
		},
		enterHandler: function(e) {
			if(e.keyCode == 13) {
				this.search(e);
			}
		},
		search: function(event) {
			var searchTerm = $(this.el).find('#search_input').val();
			searchTerm = searchTerm.urlify();
			this.trigger('search', searchTerm);
		}
	});
	return SearchView;
});