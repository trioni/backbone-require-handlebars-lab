require.config({
	// Map commonly used libraries to their file location
	paths: {
		jquery: 'libs/jquery/jquery-min',
		underscore: 'libs/underscore/1.3.1-amdjs/underscore', // AMD Support
		handlebars: 'libs/handlebars/amd/Handlebars', // AMD Support
		backbone: 'libs/backbone/backbone', // Standard. No AMD support
		'backbone.params': 'libs/backbone/plugins/backbone.queryparams',
		text: 'libs/require/text',
		hbs: 'hbs'
	},
	// The shim section is used to load scripts that doesn't support AMD
	// and make sure their dependencies is loaded before executing the plugin.
	// In this case backbone.params doesn't support AMD. Without the shim section
	// errors will occur after running the code through r.js
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
            exports: 'Backbone'			
		},
		'backbone.params':['backbone']
	}
});

require([
	'app'
], function(App) {
	App.initialize();
	App.config = {
		defaultSortOrder: "listeners"
	};
});
