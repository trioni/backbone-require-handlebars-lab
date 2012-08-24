define([
	'jquery',
	'underscore',
	'backbone',
	'views/resultfilter',
	'text!../../templates/lists/result.html',
	'config',
	'viewhelpers'
], function($, _, Backbone, FilterView, viewTemplate, config, viewHelpers){

	var ResultView = Backbone.View.extend({
		defaults: {
			label: "Resultat",
			collection: false
		},
		_term: "empty",
		template: null,
		initialize: function() {
			_.extend(this.defaults,this.defaults,this.options);

			this.template = _.template(viewTemplate);
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
			var data;

			this.setLoading(false);

			if(search.data) {
				this._term = search.data.split("=")[1];
			}

			data = {
				label:this.defaults.label,
				artists: collection.models,
				prefix: "för ",
				query: this._term.toString().decodeSearchUri(),
				collection: collection
			};

			// Make the viewHelpers available in the template
			_.extend(data, viewHelpers);
			var templateHtml = this.template(data);
			$(this.el).html(templateHtml);

			var segments = "#search/" + this._term.toString().urlify();
			this.filterView.render(segments);
			$(this.el).append(this.filterView.el);

			return this;
		}		
	});	
	return ResultView;
});