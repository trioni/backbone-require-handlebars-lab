define([
	'backbone',
	'underscore',
	'models/artist',
	'private/keys'
], function(Backbone, _, Artist, Keys){
	console.log("Keys",Keys);

	var Artists = Backbone.Collection.extend({
		model: Artist,
		apiKey: Keys.apiKey,
		format: "format=json",
		limit: "limit=50",
		method: "method=artist.search",
		baseUrl: "http://ws.audioscrobbler.com/2.0/?",
		url: function() {
			return this.baseUrl + this.method + "&" + this.format + "&" + this.limit + "&" + this.apiKey;
		},
		_max:false,
		getMax: function() {
			// Cache the max-value
			if(!this._max) {
				this._max = _.max(this.models, function(model){
					return model.listeners;
				});
			}
			return this._max;
		},
		afterReset: function() {
			// Reset the max since we got new data to work on
			this._max = false;
		},
		initialize: function() {
			// Reset is triggered when the data is replaced
			this.bind("reset", this.afterReset, this);
		},
		parse: function(response) {
			return response.results.artistmatches.artist;
		}
	});
	return Artists;
});