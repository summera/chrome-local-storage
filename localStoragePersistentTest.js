//Ari Summer
//Testing HTML5 permanent local storage in chrome

/*
navigator.webkitPersistentStorage.requestQuota(
                    5 * 1024 * 1024,
                    function (grantedBytes) {
                        // we request a handle to the file system
                        window.webkitRequestFileSystem(
                            PERSISTENT,
                            grantedBytes,
                            // the fs arg in this callback is our filesystem ref
                            function (fs) {
                                self.fs = fs;
                                self.loadExistingPrefs(function(contents) {
                                    if(contents.length) {
                                        console.log("We already have content we'll use");
                                        self.emit("prefs.exist", contents);
                                    } else {
                                        console.log("We need to load seed data....");
                                        self.loadSeedData(function() {
                                            self.loadExistingPrefs(); 
                                        });   
                                    }
                                });
                            },
                            errorHandler);
                    },
                    errorHandler
                );
*/



function getGranted(){
	navigator.webkitPersistentStorage.requestQuota(1024*1024,
		function(grantedBytes) {
			console.log("==========================");
			console.log("PERSISENT STORAGE");
			console.log("==========================");

			window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);

			console.log("**********************************");
			console.log("Granted bytes: " + grantedBytes);
	 		console.log("**********************************");
		}, function(e) {
	  		console.log('Error', e); 
	});
}

function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}


window.onload = function(){

	getGranted();

	$('#f').on('change', function(ev) {
		var f = ev.target.files[0];
		var fr = new FileReader();

		//Callback for loading image
		fr.onload = function(ev2) {
			console.dir(ev2);

			console.log("Size of data: " + byteCount(ev2.target.result) + " bytes.");
			
			localStorage["file"] = ev2.target.result;


			console.log("Pull file data from local storage:");
			console.log(localStorage["file"]);

			getGranted();

		};

		//Start loading image
		fr.readAsDataURL(f);
	});
}