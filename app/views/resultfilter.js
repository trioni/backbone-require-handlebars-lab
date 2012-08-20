define([
	'jquery',
	'underscore',
	'handlebars',
	'backbone',
	'text!../templates/resultfilter.html'
], function($, _, Handlebars, Backbone, viewTemplate){

	var FilterView = Backbone.View.extend({
		tagName: "aside",
		attributes: {
			class:'filter'
		},
		defaults: {
			tpl: "#filterView"
		},
		initialize: function() {
			_.extend(this.defaults,this.defaults,this.options);
		},
		render: function(segments) {
			// The segments are used to create correct hrefs in the template.
			var template = Handlebars.compile($(viewTemplate).html());
			$(this.el).html(template({
				label: "Sortera i listan",
				segments: segments,
				filter: [
					{name:'Bokstavsordning',base:segments,action:'alpha'},
					{name:'Flest lyssnare',base:segments,action:'listeners'} 
				]
			}));
		}
	});
	return FilterView;
});