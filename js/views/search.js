define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'text!../../templates/search.html'
], function($, _, Backbone, Handlebars, viewTemplate){

	var appConfig = {
		defaultSortOrder: "listeners"
	};

	Handlebars.registerHelper('selectedFilter', function(){
		var currentSortOrder = common.getResultSortOrder(),
			classes = false;

		if(this.action === currentSortOrder || (this.action === appConfig.defaultSortOrder && currentSortOrder === "")) {
			classes = "selected";
		}
		// getResultSortOrder();
		return (classes) ? " class=" + classes : "";
	});

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