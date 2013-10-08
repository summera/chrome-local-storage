//Ari Summer
//Testing HTML5 permanent local storage in chrome

function onError () { console.log ('Error : ', arguments); }

function requestFS(grantedBytes) {
	window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, function(fs) {
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

	//Callback for loading image
	fr.onload = function(ev2) {
		var resultDiv = $("#result");
		console.dir(ev2);

		console.log("Size of data: " + byteCount(ev2.target.result) + " bytes.");
		
		localStorage["file"] = ev2.target.result;
		localStorage.setItem("file", ev2.target.result);

		console.log("Pull file data from local storage:");
		console.log(localStorage["file"]);

		//show image
		var picFile = ev2.target;
        var div = document.createElement("div");
        div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                "title='" + picFile.name + "'/>";
        resultDiv.html(div);
	};

	//Start loading image
	fr.readAsDataURL(f);
}

window.onload = function(){

	getGranted();

	$('#f').on('change', handleFileSelect);
}