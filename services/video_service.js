// Video Service

var realm = require('../realm/datastore.js').realm;
var BASE_URL = 'http://127.0.0.1:8000'
var pages_url = BASE_URL + '/pages.json'
// var pages_url = 'www.google.com'
var videos_url = BASE_URL + '/videos.json'

module.exports = {
	fetchPages: function() {
		console.log("Fetching from " + pages_url);
		fetch(pages_url)
      .then((response) => response.json())
      .then((responseJson) => {
      	for (i = 0; i < responseJson.length; i++){
      		var page = responseJson[i];
      		console.log(page.name);
	      	realm.write(() => {
					  let myPage = realm.create('Page', {
					    name: page.name,
					    fbid: page.fbid,
					    image_url: page.image_url
					  }, true);
					});
	      }
	      var pages = realm.objects('Page');
	      for (i = 0; i < pages.length; i++){
	      	var page = pages[i];
	      	console.log(page.name + page.fbid);
	      }
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });

		// fetch(pages_url).done();
			// .then((response) => response.json())
	  //     .then((responseData) => {
	  //     	console.log(responseData);
	  //     	for (var page in responseData.data) {
		 //      	realm.write(() => {
			// 			  let myCar = realm.create('Page', {
			// 			    name: page.name,
			// 			    fbid: page.fbid,
			// 			    image_url: page.image_url
			// 			  });
			// 			});
		 //      }

	  //     }).done();
	},

	fetchVideos: function() {
		console.log("Fetching from " + videos_url);
		fetch(videos_url)
      .then((response) => response.json())
      .then((responseJson) => {
      	for (i = 0; i < responseJson.length; i++){
      		var video = responseJson[i];
	      	realm.write(() => {
					  let myVideo = realm.create('Video', {
					  	created: 			new Date(video.created),
					  	image_url: 		video.image_url,
					  	fbid: 				video.fbid,
					  	page_url: 		video.page_url,
					  	recipe_text: 	video.recipe_text,
					  	description: 	video.description,
					  	// host_page: 		realm.objects('Page').filtered('fbid = \"' + video.host_id + '\"'),
					  }, true);
					});
      	}
	      var videos = realm.objects('Video');
	      console.log("Saved " + videos.length + " videos");
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
	}
}; // Module Exports
