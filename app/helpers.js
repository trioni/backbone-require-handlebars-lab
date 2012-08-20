define([
	'underscore',
	'handlebars',
	'config'
], function(_, Handlebars, config){
	Handlebars.registerHelper('selectedFilter', function(){
		var currentSortOrder = common.getResultSortOrder(),
			classes = false;

		if(this.action === currentSortOrder || (this.action === config.defaultSortOrder && currentSortOrder === "")) {
			classes = "selected";
		}
		// getResultSortOrder();
		return (classes) ? " class=" + classes : "";
	});

	Handlebars.registerHelper('popular', function(listeners, context){
		var mostListeners = context.collection.getMax().listeners,
			prefix ='';
		if(listeners == mostListeners) {
			prefix = "most ";
		}

		return (listeners > 1000) ? ' class="'+ prefix +'popular"' : '';
	});	
});