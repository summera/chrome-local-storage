//Ari Summer
//Testing HTML5 permanent local storage in chrome

//Filesystem pointer
var fs = null;
function onError () { console.log ('Error : ', arguments); }

function errorHandler(e) {
	var msg = '';

	switch (e.code) {
		case FileError.QUOTA_EXCEEDED_ERR:
			msg = 'QUOTA_EXCEEDED_ERR';
			break;
		case FileError.NOT_FOUND_ERR:
			msg = 'NOT_FOUND_ERR';
			break;
		case FileError.SECURITY_ERR:
			msg = 'SECURITY_ERR';
			break;
		case FileError.INVALID_MODIFICATION_ERR:
			msg = 'INVALID_MODIFICATION_ERR';
			break;
		case FileError.INVALID_STATE_ERR:
			msg = 'INVALID_STATE_ERR';
			break;
		default:
			msg = 'Unknown Error';
			break;
	};

	console.log('Error: ' + msg);
}

function playFile(){ 
	fs.root.getFile('media.txt', {}, function(fileEntry) {

    // Get a File object representing the file,
    // then use FileReader to read its contents.

	    fileEntry.file(function(file) {
	       var reader = new FileReader();

	       reader.onloadend = function(e) {
	         //$('#vid').src = this.result;
	         //console.log(btoa(this.result));
	         $("#video").attr("src", this.result)
	       };

	       reader.readAsText(file);
	    }, errorHandler);
	}, errorHandler);
}


function addFile(data){

  fs.root.getFile('media.mp4', {create: true}, function(fileEntry) {

		// Create a FileWriter object for our FileEntry (log.txt).
		fileEntry.createWriter(function(fileWriter) {

			fileWriter.onwriteend = function(e) {
				console.log('Write completed.');
			};

			fileWriter.onerror = function(e) {
				console.log('Write failed: ' + e.toString());
			};

			// Create a new Blob and write it to log.txt.
			var blob = new Blob([data], {type: 'application/octet-stream'});

			fileWriter.write(blob);

		}, errorHandler);

	}, errorHandler);

}


function requestFS(grantedBytes) {
	window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, function(filesystem) {
		fs = filesystem;
		console.log ('fs: ', arguments); // I see this on Chrome 27 in Ubuntu
		console.log("Granted Bytes: " + grantedBytes);
		console.log("**********************************");
	}, onError);
}

function getGranted(){
	navigator.webkitPersistentStorage.requestQuota (1024*1024*1024, function(grantedBytes) {
		console.log("==================================");
		console.log("PERSISTENT STORAGE");
		console.log("==================================");

		console.log("**********************************");
		console.log ('requestQuota: ', arguments);
		
		requestFS(grantedBytes);

	}, onError);
}

function byteCount(s) {
	return encodeURI(s).split(/%..|./).length - 1;
}

function clearStorage(){
	localStorage.clear();
}

function printStorage(){
	for(key in localStorage) {
		console.log(key);
		console.log(localStorage[key]);
	}
}

function handleFileSelect(url) {
	console.log("Retrieving data from url " + url);
	$.get(url,function(data){
		console.log("Data retrieved");
		console.dir(data);
		console.log("Size of data: " + byteCount(data) + " bytes.");
			
		addFile(data);
	});
}

window.onload = function(){
	getGranted();
	
	$('#fb').click(function(){
		var url = $('#f').val();
		handleFileSelect(url);
	});
}