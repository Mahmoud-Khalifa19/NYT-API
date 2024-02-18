
// Select the DOM element that we wish to append to
const articleContainer = $('#article-container')
const loader = $('.loader')
const itemsPerPage = 12
loader.hide();


// Changing sections 
function changeSection(event) {
	console.log(event.value);

	// Set the container to have blank contents as we're requesting new data
	articleContainer.html('');
	loadData(event.value)
}

// load data from the Api
function loadData(section) {
	loader.show();
	const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json`;


$.ajax({
  url: url,
  method: 'GET',
  dataType: 'json', 
  data: {
		'api-key': "yeKXMSVZUVUAd8qQKrK1HTd7dmnvAECb"
	}

}).done(function(data) {
  loader.hide()


	// Append the result
	// loop through result
	data.results.forEach(result => {
		const multimediaUrl = result.multimedia[0]?.url || ''; // Check if multimedia exists
		const item = `<div>
			<a href="${result.url}">
			<div class="article" style= "background: url(${multimediaUrl})"/>
			<p>${result.abstract}</p>
			</div>
			</a>
			</div>`;
		articleContainer.append(item);
	})

}).fail(function(xhr, status, error) {
  console.error("Failed to fetch data: ", error);
  loader.hide()
});
}

loadData('sports')





