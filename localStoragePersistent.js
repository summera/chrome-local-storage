// Request storage usage and capacity left
navigator.webkitPersistentStorage.queryUsageAndQuota(1024*1024,
	function(grantedBytes) {
		console.log("**********************************");
		console.log("Quota info BEFORE storing vars:");
 		console.log("Used quota: " + used + ", remaining quota: " + remaining);
	}, function(e) {
  		console.log('Error', e); 
} );


//New
// Request storage usage and capacity left
/*navigator.webkitPersistentStorage.queryUsageAndQuota(
	function(used, remaining) {

		console.log("**********************************");
		console.log("Quota info AFTER storing vars:");
		
		var foo1 = "foo1";
		var foo2 = "foo2";

		localStorage["test1"] = foo1;

		localStorage["test2"] = foo2;

		console.log("Test 1: " + localStorage["test1"]);

		console.log("Test 2: " + localStorage["test2"]);

 		console.log("Used quota: " + used + ", remaining quota: " + remaining);
	}, function(e) {
  		console.log('Error', e); 
} );*/


function getUsedAndQuota(){
	navigator.webkitPersistentStorage.queryUsageAndQuota(
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