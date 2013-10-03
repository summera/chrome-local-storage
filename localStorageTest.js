function getUsedAndQuota(){
	navigator.webkitTemporaryStorage.queryUsageAndQuota(
		function(used, remaining) {
			console.log("**********************************");
			console.log("Get used and Quota:")

	 		console.log("Used quota: " + used + ", remaining quota: " + remaining);
	 		console.log("**********************************");
		}, function(e) {
	  		console.log('Error', e); 
	} );
}

function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}


window.onload = function(){

	getUsedAndQuota();

	$('#f').on('change', function(ev) {
		var f = ev.target.files[0];
		var fr = new FileReader();

		//console.log('here');

		//Callback for loading image
		fr.onload = function(ev2) {
			//console.log('here2');
			console.dir(ev2);
			//console.log(ev2.target.result);

			console.log("Size of data: " + byteCount(ev2.target.result) + " bytes.");
			
			localStorage["file"] = ev2.target.result;


			console.log("Pull file data from local storage:");
			console.log(localStorage["file"]);

			getUsedAndQuota();

		};

		//Start loading image
		fr.readAsDataURL(f);
	});
}