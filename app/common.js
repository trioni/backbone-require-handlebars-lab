String.prototype.urlify = function() {
	var tmp = this.replace(new RegExp('%2B','g'),'+');
	return tmp.replace(new RegExp(' ','g'), '+');
};	
String.prototype.decodeSearchUri = function() {
	var urlEncoded = decodeURIComponent(this);
	return urlEncoded.toString().replaceAll('%2B',' ');
};
String.prototype.replaceAll = function(replace, with_this) {
	return this.replace(new RegExp(replace, 'g'), with_this);
};	


var common = (function(){
	var hi = function(name) {
		return "Hello there " + name;
	}
	var getUrlHash = function() {
		return window.location.hash;
	}

	var getResultSortOrder = function() {
		var hash = window.location.hash,
			segments;
		segments = hash.split("/");

		if(segments.length < 3) {
			// throw new Error("No explicit sortorder is applied.");
			return "";
		} else {
			return segments[2];
		}
	}
	//--- Comparators --//
	var byAlpha = function(artist) {
		return artist.name;
	};
	var byPopularity = function(artist) {
		return -artist.listeners;
	};			
	return {
		getUrlHash: getUrlHash,
		getResultSortOrder: getResultSortOrder,
		comparators: {
			byAlpha: byAlpha,
			byPopularity: byPopularity
		},
		hi: hi
	};
}());