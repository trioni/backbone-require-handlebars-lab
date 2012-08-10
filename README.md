# Labs
This is just a labs repo trying to tie togather various parts of a SPA ( Single Page Applicaion )

## Making it work
This demo app uses the last.fm API to load data. To be able to make requests you will need an apikey.

* [Apply for one at Last.fm]( http://www.last.fm/api )
* Create a new file `js/private/keys.js` with the following content

```javascript
define(function(){
	return {
		apiKey:[ENTER YOUR APIKEY HERE]
	}
}
```

* Open index.html in your browser. Done.