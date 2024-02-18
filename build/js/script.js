
// Select the DOM element that we wish to append to
var articleContainer = $('#article-container')
var loader = $('.loader')
var itemsPerPage = 12
loader.hide()


// Changing sections 
function changeSection(event) {
	console.log(event.value)
	// Set the container to have blank contents as we're requesting new data
	articleContainer.html('');
	loadData(event.value)
}

// load data from the Api
function loadData(section) {
	loader.show()
	var url = `https://api.nytimes.com/svc/topstories/v2/${section}.json`;
url += '?' + $.param({
  'api-key': "0751ffff01d7a70710354972fa0ad4a9"
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(data) {
  loader.hide()
	// append the result
	// loop through result
	// slice the results array to only 12 items
	data.results.slice(0,itemsPerPage).forEach(result => {

		var item = `<div class="article">
			<a href="${result.url}">
				<div class="article-image" style="background-image: url(${result.multimedia[3] && result.multimedia[4].url})"/>
				<div class="article-abstract">${result.abstract.slice(0,80)}...</div>
			</a>
			</div>`
		// timer to load item
		articleContainer.append(item);
	})

}).fail(function(err) {
  throw err;
  loader.hide()
});
}

loadData('sports')





