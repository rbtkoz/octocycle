// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require underscore-min
//= require modernizr.custom.08015
//= require jquery-fileupload
//= require turbolinks
//= require_tree .


/* Author: Martin Bravo.
   Date: November 2013

*/

var OC = (function(oc, $, _) {
    oc.settings = {
        initialized: false,
        throttle: true,
        siteRoot: '/',
        maxImageSize : 800
    }
    oc.data = {
        w: {
            width: 0,
            height: 0
        },
        geo : {}, // current geolocation
        gets : []
    }
    oc.cfg = {
        //if you want to set global identifiers
        $image : $("#image")

    }

    // SMALL HELPER FOR BODY CLASS MATCHING
    oc.is = function(classname) {
        return $('body').hasClass(classname);
    }

    oc.init = function() {
        if (oc.settings.initialized) return false;
        $(document).ready(function() {
            oc.modules.run('init');
            if (!Modernizr.touch) oc.modules.run('clickInit');
            if (Modernizr.touch) oc.modules.run('touchInit');

            oc.settings.initialized = true;
        });


    };

    oc.geo = {

    	get : function(){
 			if (Modernizr.geolocation) {
			    navigator.geolocation.getCurrentPosition(oc.geo.save, oc.geo.error, {enableHighAccuracy: true});
  			} else {
    			console.log("no geolocation");
  			}
		},
		save : function(position) {
			var lat = position.coords.latitude,
  				lon = position.coords.longitude,
  				accuracy = position.coords.accuracy;
  				oc.data.geo = {lat : lat,lon : lon, accuracy : accuracy, updated_at : Date.now()};
  				console.log(position);
		}  
    }

    oc.camera = {

    	grab : function(event,$pic,$cmr){
            	console.log(event);
				var files = event.target.files,
                file, resized, img,
                max = oc.settings.maxImageSize;


            if (files && files.length > 0) {
                file = files[0];
                oc.data.files.push(file);
                console.log(Date.now() - file.lastModifiedDate );
                // if (Date.now() - file.lastModifiedDate > 1000 ) 
                try {
                    // Get window.URL object
                    var URL = window.URL || window.webkitURL;
                    
                    // Create ObjectURL
                    img = document.createElement("img");
                    img.src = URL.createObjectURL(file);


                    var width = img.width;
                    var height = img.height;
                     
                    if (width > height) {
                      if (width > max) {
                        height *= max / width;
                        width = max;
                      }
                    } else {
                      if (height > max) {
                        width *= max / height;
                        height = max;
                      }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    resized = canvas.getContext("2d");
                    resized.drawImage(img, 0, 0, width, height);


                    // Set img src to ObjectURL
                    $pic.attr("src", resized.toDataURL("image/jpeg") );
                    oc.data.filename = imgURL;

                    // Revoke ObjectURL
                    URL.revokeObjectURL(imgURL);
                }
                catch (e) {
                    try {
                        // Fallback if createObjectURL is not supported
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                        	var imgURL = event.target.result;
                            $pic.attr("src", imgURL);
                            oc.data.filename = imgURL;
                            ImageInfo.loadInfo(oc.data.filename, mycallback);
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        //
                        var $error = $("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }
            }




            }
    }


    oc.modules =  {
        //COMMON TASKS
        common: {
            init: function() {
                if ($.hasOwnProperty("address")) $.address.state(oc.settings.siteRoot);
            }
        },
        // SECTIONS
        get : {
            init: function() {
            	oc.geo.get();
                var $btn = $("#getbutton"),
                	$cmr = $("#getcamera"),
                	$pic = $("#picture");
                // init stuff for navigation        
                $btn.click(function(){
                	console.log("turning on camera");
                	$cmr.trigger("click");
                });

                $("#getcamera").fileupload({
                    url: '/gets/new',
                    formData : {get : {longitude: oc.data.geo.lon, latitude : oc.data.geo.lat }},
                    imageMaxHeight : 800,
                    imageMaxWidth : 800,
                    // Enable image resizing, except for Android and Opera,
                    // which actually support image resizing, but fail to
                    // send Blob objects via XHR requests:
                    disableImageResize: /Android(?!.*Chrome)|Opera/
                        .test(window.navigator.userAgent),
                    imageOrientation : true,
                    imageQuality : 90
                })
                .on('fileuploadadd', function (e, data) {
                    console.log("file being uploaded");
                    var file = data.files[0];
                    if (file.preview) $pic.attr('src', file.preview);
                });
                $cmr.change(function(event){
                	oc.camera.grab(event,$pic,$cmr);
                });


            },
            clickInit: function() {
                // specific things for click interfaces
            },
            touchInit: function() {
                // specific things for touch interfaces
            },
            resize: function() {
                // do stuff when window resizes
            }
            

        },


        // HELPER TO RUN EACH MODULE
        run: function(group) {
            for (module in oc.modules) {
                if (_.isObject(oc.modules[module]) && group in oc.modules[module] && _.isFunction(oc.modules[module][group])) {
                    // console.log('running: '+ module + " : " + group );
                    oc.modules[module][group]();
                }
            }
        }
    }
    oc.init();
    return oc;

})(OC || {}, jQuery, _); // load with jquery and underscore 