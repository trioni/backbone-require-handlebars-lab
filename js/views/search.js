define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'text!../../templates/search.html',
	'config',
	'helpers'
], function($, _, Backbone, Handlebars, viewTemplate){

	var SearchView = Backbone.View.extend({
		defaults: {
			label: "Search on Last.fm"
		},
		initialize: function() {
			this.render();
		},
		render: function() {
			var template = Handlebars.compile($(viewTemplate).html());
			$(this.el).html(template(this.defaults));
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