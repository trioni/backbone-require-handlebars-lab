define([
	'backbone',
	'underscore'
], function(Backbone, _){
	var Artist = Backbone.Model.extend({
		name:'',
		listeners: 0,
		url: '',
		cid: '',
		image: [],
		cover: function() {
			return this.image[1]['#text'];
		},
		parse:function(response) {
			this.name = response.name;
			this.listeners = parseInt(response.listeners,0);
			this.url = response.url;
			this.image = response.image;
			this.cid = response.cid;
			return this;
		}
	});
	return Artist;
});