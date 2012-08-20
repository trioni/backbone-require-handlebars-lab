define([
	'jquery',
	'underscore',
	'handlebars',
	'backbone',
	'routers/search',
	'backbone.params'
],function($, _, Handlebars, Backbone, SearchController) {

	var App = App || {};
	App.initialize = function() {
		var searchController = new SearchController;		
		Backbone.history.start();
	};
	return App;
});