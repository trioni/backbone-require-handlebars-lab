define([
	'jquery',
	'underscore',
	'backbone',
	'routers/search',
	'backbone.params'
],function($, _, Backbone, SearchController) {

	var App = App || {};
	App.initialize = function() {
		var searchController = new SearchController;		
		Backbone.history.start();
	};
	return App;
});