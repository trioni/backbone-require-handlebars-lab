define([
	'jquery',
	'underscore',
	'handlebars',
	'backbone',
	'views/resultfilter',
	'text!../../templates/lists/result.html',
	'config',
	'helpers'
], function($, _, Handlebars, Backbone, FilterView, viewTemplate, config){

	var ResultView = Backbone.View.extend({
		defaults: {
			label: "Resultat",
			collection: false
		},
		_term: "empty",
		initialize: function() {
			_.extend(this.defaults,this.defaults,this.options);

			// Listen for reset, when new data is fetched from endpoint
			this.collection.on("reset", this.render, this);	
			this.filterView = new FilterView();
		},
		setLoading: function(isLoading) {
			if(isLoading) {
				this.addLoader();				
			} else {
				this.removeLoader();
			}
		},
		addLoader: function() {
			$('<img/>',{
				'src':'img/ui/preloader.gif',
				'id': 'loader'
			}).prependTo(this.$el);
		},
		removeLoader: function() {
			this.$el.find('#loader').remove();
		},
		render: function(collection,search) {

			this.setLoading(false);

			if(search.data) {
				this._term = search.data.split("=")[1];
			}

			var template = Handlebars.compile($(viewTemplate).html());
			$(this.el).html(template({
				label:this.defaults.label,
				artist:collection.models,
				prefix: "för ",
				query: this._term.toString().decodeSearchUri(),
				collection:collection // Makes the collection avaiable in helpers
			}));

			var segments = "#search/" + this._term.toString().urlify();
			this.filterView.render(segments);
			$(this.el).append(this.filterView.el);

			return this;
		}		
	});	
	return ResultView;
});