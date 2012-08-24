define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/resultfilter.html',
	'viewhelpers'
], function($, _, Backbone, viewTemplate, viewHelpers){

	var FilterView = Backbone.View.extend({
		tagName: "aside",
		attributes: {
			class:'filter'
		},
		template: null,
		defaults: {
			tpl: "#filterView"
		},
		initialize: function() {
			_.extend(this.defaults,this.defaults,this.options);
			this.template = _.template(viewTemplate);
		},
		render: function(segments) {
			// The segments are used to create correct hrefs in the template.
			var data = {
				label: "Sortera i listan",
				segments: segments,
				filters: [
					{name:'Bokstavsordning',base:segments,action:'alpha'},
					{name:'Popularitet',base:segments,action:'listeners'} 
				]				
			};

			_.extend(data, viewHelpers);
			$(this.el).html(this.template(data));
		}
	});
	return FilterView;
});