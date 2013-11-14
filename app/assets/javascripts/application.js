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
//= require turbolinks
//= require_tree .
//= require bootstrap
//= require underscore
//= require gmaps/google


/* Author: Martin Bravo, Base Design. [email] martin@basedesign.com
   Date: Feb 2013

*/

var Get = {
    geo: {lat: null, lon : null },
    created_at : null,
    updated_at : null,
    age: function(){ return Date.now() - this.updated_at },
    sent : 0
}

var OC = (function(oc, $, _) {
    oc.settings = {
        initialized: false,
        throttle: true,
        siteRoot: '/'
    }
    oc.data = {
        w: {
            width: 0,
            height: 0
        },
        geo : {}, // current geolocation
        gets : [],
        files : []
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
            oc.modules.run('juanito');
            if (!Modernizr.touch) oc.modules.run('clickInit');
            if (Modernizr.touch) oc.modules.run('touchInit');

            $(window).resize(function() {
                if (oc.settings.throttle && undefined != _) {
                    _.throttle(function() {
                        oc.modules.run('resize');
                    }, 50)();
                } else {
                    oc.modules.run('resize');
                }
            });
            oc.settings.initialized = true;
        });


    }

    oc.fn = {
        calculateSize: function() {
            oc.data.w.width = (Modernizr.touch) ? window.innerWidth : $(window).width();
            oc.data.w.height = (Modernizr.touch) ? window.innerHeight : $(window).height();
        },
        isVisible: function(el) {
            if (!el) return;
            var top = el.offsetTop,
                left = el.offsetLeft,
                width = el.offsetWidth,
                height = el.offsetHeight;
            while (el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }
            return (
            top < (window.pageYOffset + window.innerHeight) && left < (window.pageXOffset + window.innerWidth) && (top + height) > window.pageYOffset && (left + width) > window.pageXOffset);
        },
        loadimages: function() {
            //this assumes there is a non-image object (i.e. figure) with the class .notloaded
            // with a data-src attribute.
            // if a data-mobile-src is defined, will be used in mobile devices : )
            // mobile device is defined as a touch device with a screen width less than 640px

            $('.notloaded').each(function() {
                var $figure = $(this),
                    src = (Modernizr.touch && oc.data.w.width < 640 & undefined != $figure.data('mobile-src')) ? 'mobile-src' : "src";
                $figure.removeClass('notloaded').addClass('loading');
                var img = new Image();
                $(img).load(function() {
                    $(this).hide();
                    $figure.prepend(this);
                    $(this).fadeIn('250', function() {
                        $figure.removeClass('loading');
                    });
                }).error(function() {
                    console.log("loading error!!");
                }).attr('src', $figure.data(src));
            });
        },
     
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
                file;

            if (files && files.length > 0) {
                file = files[0];
                oc.data.files.push(file);
                console.log(Date.now() - file.lastModifiedDate );
                // if (Date.now() - file.lastModifiedDate > 1000 ) 
                try {
                    // Get window.URL object
                    var URL = window.URL || window.webkitURL;
                    // Create ObjectURL
                    var imgURL = URL.createObjectURL(file);
                    // Set img src to ObjectURL
                    $pic.attr("src", imgURL);
                    oc.data.filename = imgURL;

                    // Revoke ObjectURL
                    // URL.revokeObjectURL(imgURL);
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
                oc.fn.calculateSize();
            },
            resize: function() {
                oc.fn.calculateSize();
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
                	console.log("click");
                	$cmr.trigger("click");
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


        //GENERAL

        keys: {
            init: function() {
                if (typeof(key) == "undefined") return false;
                key('up, pageup', function() {
                    //on key up
                    return false;
                });
                key('down, pagedown', function() {
                    // on key down
                    return false;
                });
                key('left', function() {
                    // on key left
                    return false;
                });
                key('right', function() {
                    // on key left
                    return false;
                });
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