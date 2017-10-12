// thanks @Mello-Yello :)

var id = 'BEnJCuXHtdE';

var page = require('webpage').create();

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36';

page.onInitialized = function() {

  page.evaluate(function() {
	
    // delete window._phantom;
    delete window.callPhantom;
  });
};

console.log('https://openload.co/embed/' + id + '/');

page.open('https://openload.co/embed/' + id + '/', function(status) {

  var info = page.evaluate(function() {
	
    return {
		
      decoded_id: document.getElementById('streamurl').innerHTML
      // title: document.querySelector('meta[name="og:title"],' + 'meta[name=description]').content
    };
  });
	
  var url = 'https://openload.co/stream/' + info.decoded_id + '?mime=true';
	
  console.log(url);
	
  phantom.exit();
});