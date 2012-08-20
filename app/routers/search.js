define([
	'jquery',
	'underscore',
	'handlebars',
	'backbone',
	'views/search',
	'views/lists/result',
	'collections/artists'	
], function($, _, Handlebars, Backbone, SearchView, ResultView, Artists){

	var SearchController = Backbone.Router.extend({
		routes: {
			"search/:query": "search",
			"search/:query/:sortorder": "sort"
		},
		_lastQuery: "",
		views: {
			resultView: false,
			searchView: false,
		},
		collections: {
			artists: false
		},
		initialize: function() {
			this.collections.artists = new Artists;
			this.views.searchView = new SearchView({el:'#search'});

			this.views.searchView.on('search', this.onSearch, this);
			this.views.resultView = new ResultView({el:'#list',collection:this.collections.artists});
		},
		onSearch: function(query) {
			// Navigate will trigger a route callback. In this case the search method below
			this.navigate("search/" + query, {trigger:true});
		},
		search: function(query, params) {
			console.log("QueryParams",params);

			// Reset the sortorder due to missing sorting argument
			this.resetSortOrderToDefault();
			this.requestData(query);

		},
		requestData: function(query) {
			// Give visual feedback that we are loading new data
			this.views.resultView.setLoading(true);
			
			// Save the query for future reference
			this._lastQuery = query;		

			// Fetch the actual data	
			this.collections.artists.fetch({
				data:$.param({artist:query}),
				error:this.searchError
			});
		},
		resetSortOrderToDefault: function() {
			this.collections.artists.comparator = common.comparators.byPopularity;
		},
		checkReloadData: function(query) {
			// Make sure we have data. If the page is reloaded, the collection will be empty.
			// Also, this check allows manually manipulating the url :query segement with a selected sortorder
			// i.e. changing from #search/kent/alpha/ to #search/loreen/alpha/
			if(query !== this._lastQuery || this.collections.artists.length === 0) {
				this.requestData(query);
			}
		},
		sort: function(query, order) {
			switch(order) {
				case "alpha":
					this.collections.artists.comparator = common.comparators.byAlpha;
					break;
				case "listeners":
					this.collections.artists.comparator = common.comparators.byPopularity;
					break;
			}
			this.checkReloadData(query);
			this.collections.artists.sort();				
		},
		searchError: function(e) {
			console.log("Error searching for " + e);
		}
	});
	return SearchController;
});