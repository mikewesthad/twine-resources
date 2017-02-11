// clickdialog macro v1.0.1
// clickdialogchoice macro v1.0.0
(function () {
	var clickCount = 0;

	// <<clickdialog selector dialogTitle (dialogClasses)>>
	// <<whenclosed>>
	// <</clickdialog>> 
	Macro.add("clickdialog", {
		skipArgs: false,
		tags: ["whenclosed", "/clickdialog"],
		handler: function() {
			var args = this.args;

			// Do some simple error processing
			if (args.length < 2) {
				return this.error("clickdialog missing selector and/or title");
			}

			// Extract the arguments and contents of the macros
			var dialogSelector = args[0];
			var dialogTitle = args[1];
			var dialogContents = this.payload[0].contents;
			var dialogClasses = (args.length >= 3) ? args[2] : "";
			var dialogCloseContents = null;
			if (this.payload[1]) {
				dialogCloseContents = this.payload[1].contents;
			}
			var taskName = "clickdialog-" + clickCount++;

			// Set up a task to run when the page has displayed
			addOneTimeTask(postdisplay, taskName, function () {
				var dialogElement;

				// Function to run when click handler is added
				var startFunction = function() {
					dialogElement = Dialog.setup(dialogTitle, dialogClasses);
					// Add class to the dialog's title bar
					$(dialogElement).parent()
						.find("#ui-dialog-titlebar")
						.addClass(dialogClasses)
					Dialog.wiki(dialogContents);
				}.bind(this);

				// Function to run when the dialog box is closed
				var closeFunction = function() {
					if (dialogCloseContents) {
						new Wikifier(this.output, dialogCloseContents);
					}
					// Remove class from the dialog's title bar
					$(dialogElement).parent()
						.find("#ui-dialog-titlebar")
						.removeClass(dialogClasses)
				}.bind(this);
				
				Dialog.addClickHandler(dialogSelector, null, startFunction, 
					null, closeFunction);
			}.bind(this));
		}
	});

	// <<clickdialogchoice selector dialogTitle "$buttonResponse" (dialogClasses)>>
	// <<whenclosed>>
	// <</clickdialogchoice>>
	Macro.add("clickdialogchoice", {
		skipArgs: false,
		tags: ["whenclosed", "/clickdialogchoice"],
		handler: function() { 
			var args = this.args;

			// Do some simple error processing
			var errors = [];
			if (args.length < 1) errors.push("Missing selector.");
			if (args.length < 2) errors.push("Missing dialogTitle.");
			if (args.length < 3) errors.push("Missing button response variable.");
			if (errors.length) return this.error(errors.join(" "));

			// Extract the arguments and contents of the macros
			var dialogSelector = args[0];
			var dialogTitle = args[1];
			var responseStoryVariable = args[2].slice(1); // Remove dollar sign
			var dialogContents = this.payload[0].contents;
			var dialogClasses = (args.length >= 4) ? args[3] : "";
			var dialogCloseContents = null;
			if (this.payload[1]) {
				dialogCloseContents = this.payload[1].contents;
			}
			var taskName = "clickdialog-" + clickCount++;

			// Set up a task to run when the page has displayed
			addOneTimeTask(postdisplay, taskName, function () {
				var dialogElement;
				State.variables[responseStoryVariable] = null;

				// Function to run when click handler is added
				var startFunction = function() {
					dialogElement = Dialog.setup(dialogTitle, dialogClasses);
					// Add class to the dialog's title bar
					$(dialogElement).parent()
						.find("#ui-dialog-titlebar")
						.addClass(dialogClasses)
					Dialog.wiki(dialogContents);
					// Find the buttons and make sure they close the ui
					var $buttons = $(dialogElement).find("button");
					$buttons.each(function (i, button) {
						$(button).data("button-number", i + 1);
					});
					$buttons.click(function () {
						var $this = $(this);
						var response = null;
						if ($this.attr("id")) response = $this.attr("id");
						else response = $this.data("button-number");
						State.variables[responseStoryVariable] = response;
						Dialog.close();
						closeFunction();
					});
				}.bind(this);

				// Function to run when the dialog box is closed
				var closeFunction = function() {
					if (dialogCloseContents) {
						new Wikifier(this.output, dialogCloseContents);
					}
					// Remove class from the dialog's title bar
					$(dialogElement).parent()
						.find("#ui-dialog-titlebar")
						.removeClass(dialogClasses)
				}.bind(this);
				
				Dialog.addClickHandler(dialogSelector, null, startFunction, 
					null, closeFunction);
			}.bind(this));
		}
	});

	// Add a task that cleans up after itself
	function addOneTimeTask(taskObject, taskName, taskFunction) {
		taskObject[taskName] = function () {
			taskFunction();
			delete taskObject[taskName];
		}
	} 

})();