//Ari Summer
//Testing HTML5 permanent local storage in chrome

//Filesystem pointer
var fs = null;
var fileNum = 0;
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


function loadVideo(num){
	var fileName; 
	var videoId;
	
	fileName = 'media_' + num.toString() + '.mp4';
	videoId = '#video_' + num.toString();
	console.log(fileName);
	console.log(videoId);

	fs.root.getFile(fileName, {videoId: videoId}, function(fileEntry) {

		// Get a File object representing the file,
		// then use FileReader to read its contents.
		
		$(videoId).attr("src", fileEntry.toURL());
	}, errorHandler);
}

function loadVideos(numToLoad){ 
	for(var i = 0; i < numToLoad; i ++){
		loadVideo(i);
	}
}

function playVideos(num){
	var videos = $("video").get();
	for(var i = 0; i < num; i++){
		videos[i].play();
	}
}

function pauseVideos(num){
	var videos = $("video").get();
	for(var i = 0; i < num; i++){
		videos[i].pause();
	}
}

function addFile(data, fileName){

	
	fileName = fileName + "_" + fileNum.toString() + '.mp4';
	fileNum = fileNum + 1;

	fs.root.getFile(fileName, {create: true}, function(fileEntry) {

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
	navigator.webkitPersistentStorage.requestQuota (1024*1024*1024*1024, function(grantedBytes) {
		console.log("==================================");
		console.log("PERSISTENT STORAGE");
		console.log("==================================");

		console.log("**********************************");
		console.log ('requestQuota: ', arguments);
		
		requestFS(grantedBytes);

	}, onError);
}

function byteCount(s) {
	return s.byteLength;
}

function handleFileSelect(ev) {
	var files = ev.target.files; // FileList object

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
	  output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
				  f.size, ' bytes, last modified: ',
				  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
				  '</li>');
	}
	$('#list').html('<ul>' + output.join('') + '</ul>');

	//ari's code below
	var f = ev.target.files[0];
	var fr = new FileReader();

	//Callback for loading video
	fr.onload = function(ev2) {
		var resultDiv = $("#result");
		console.dir(ev2);

		//console.log("Size of data: " + byteCount(ev2.target.result) + " bytes.");
		/*console.log("Data: ");

		var int32View = new Int8Array(ev2.target.result);
		
		for (var i=0; i<50; i++) {
			console.log(int32View[i]);
		}*/

		addFile(ev2.target.result, 'media');
	};

	fr.readAsArrayBuffer(f);
	//fr.readAsBinaryString(f);
}

window.onload = function(){

	getGranted();

	$('.f').on('change', handleFileSelect);
}