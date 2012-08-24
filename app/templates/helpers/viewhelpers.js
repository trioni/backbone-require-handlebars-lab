define([
	'jquery',
	'underscore',
	'config'
],function($, _, config){
	var viewHelpers = {
		selectedFilter: function(action) {
			var currentSortOrder = common.getResultSortOrder(),
				classes = false;

			if(action === currentSortOrder || (action === config.defaultSortOrder && currentSortOrder === "")) {
				classes = "selected";
			}
			return (classes) ? " class=" + classes : "";
		},
		popular: function(listeners, collection) {
			var mostListeners, prefix;
			mostListeners = collection.getMax().listeners;
			prefix ='';

			if(listeners == mostListeners) {
				prefix = "most ";
			}
			return (listeners > 1000) ? ' class="'+ prefix +'popular"' : '';
		}
	};
	return viewHelpers;
});