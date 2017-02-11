// onmouse macro v1.0.0
(function () {
	var count = 0;
	var validMouseEvents = "enter,leave,over,out,move".split(",");
	
	// <<onmouse mouseEventName targetSelector shouldWrap>>
	// <<andonmouse eventName>>
	// <</onmouse>> 
	Macro.add(["onmouse"], {
		skipArgs: false,
		tags: ["andonmouse", "/onmouse"],
		handler: function() {
			var args = this.args;
				
			// Do some simple error processing
			var errors = [];
			if (args.length < 1) errors.push("Missing event name.");
			if (args.length < 2) errors.push("Missing target selector.");
			if ((args.length >= 3) && (typeof args[2] !== "boolean")) {
				errors.push("shouldWrap argument needs to be true or false");
			}
			if (!this.payload.length) errors.push("Missing closing /onmouse");
			if (errors.length) return this.error(errors.join(" "));

			// Extract the arguments
			var selector = args[1];
			var shouldWrap = (args.length >= 3) ? args[2] : false;

			// Function used to execute payloads for the various events. Named
			// function so that it can be unbound later.
			var executePayload = function (payloadContents) {
				console.log("triggered", payloadContents);
				new Wikifier(this.output, payloadContents);
			};

			// Check and parse the mouse events from the macro and its tags
			var eventsToBind = [];
			for (var i = 0; i < this.payload.length; i++) {
				var payload = this.payload[i];
				var pArgs = payload.args;
				if (!pArgs.length) {
					return this.error(payload.name + 
						" is missing an event name (e.g. \"over\").");
				}
				var eventName = pArgs[0];
				if (!isInArray(eventName, validMouseEvents)) {
					return this.error(payload.name + 
						" event name \"" + eventName + "\" is invalid.");
				}
				// Whew... a valid event, cache it
				eventsToBind.push({
					mouseEventName: "mouse" + eventName, 
					payloadRunner: executePayload.bind(this, payload.contents)
				});
			}

			var mouseEventContents = this.payload[0].contents;
			var taskName = "onmouse-" + count++;
			
			// Set up a task to run when the page has displayed
			addOneTimeTask(postdisplay, taskName, function () {
				// Look up the target
				var $target = $(selector);

				if ($target.length === 0) {
					return this.error("Check your target selector, no such " +
						"element was found with the selector: \"" 
						+ selector + "\"'");
				}
				
				// Wrapping logic
				if (shouldWrap) {
					// Check for an existing wrapper created by this macro
					if (!$target.parent().data("isMouseMacroWrapper")) {
						// Create the wrapper div
						$target.wrap("<div></div>");
						// Change target to the wrapper
						$target = $target.parent()
							.css("display", "inline-block");
						// Mark the wrapper as created by this macro
						$target.data("isMouseMacroWrapper", true);
					}
				}

				// For each event in the macro, bind an event handler that runs
				// the payload
				for (var i = 0; i < eventsToBind.length; i++) {
					$target.on(
						eventsToBind[i].mouseEventName, 
						eventsToBind[i].payloadRunner
					);
					console.log("binding", eventsToBind[i].mouseEventName);
				}
				
				// Before the next passage is displayed, unbind this macro's
				// set of payload runner functions
				addOneTimeTask(predisplay, taskName, function () {
					for (var i = 0; i < eventsToBind.length; i++) {
						$target.off(
							eventsToBind[i].mouseEventName, 
							eventsToBind[i].payloadRunner
						);
						console.log("unbinding", eventsToBind[i].mouseEventName);
					}
				});
			}.bind(this));
		}

	});

	function isInArray(element, array) {
		return (array.indexOf(element) !== -1);
	} 

	// Add a task that cleans up after itself
	function addOneTimeTask(taskObject, taskName, taskFunction) {
		taskObject[taskName] = function () {
			taskFunction();
			delete taskObject[taskName];
		}
	} 

})();