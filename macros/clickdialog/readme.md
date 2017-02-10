# Macro Readme

## clickdialog

`<<clickdialog selector dialogTitle (dialogClasses)>>`, `<<whenclosed>>`, `<</clickdialog>>`

Uses SugarCube's built-in dialog system to create a custom dialog box when a target element is clicked. The contents of the macro will be directly put into the body of the dialog box body. SugarCube markdown and HTML elements are both valid as contents. 

If a `<<whenclosed>>` tag is specified, the contents of that tag will be executed when the dialog box is closed. This is useful for setting variables upon closing a dialog box.

**Arguments:**

- **selector**: The CSS/jQuery-style selector used to target element(s).
- **dialogTitle**: A string text to show up in the title of the dialog box.
- **dialogClasses**: (optional) A string of class(es) to be added to the dialog box body and dialog box title bar.

**Usage:**

```
➡️ A simple popup that displays when a link is clicked

→ Create an element that has a selector
<a id="simple-popup">Simple demo</a>

→ Link the element to the dialog, with a CSS class added to the dialog box
<<clickdialog "#simple-popup" "A Simple Demo" "red-popup">>\
	This text shows up in the dialog.
	Markup will work fine: //italic//
	<img src="party.gif">
	(Hint: you'll probably want to escape the whitespace on the first line.)
<</clickdialog>>

→ CSS styling for this dialog box in Story Stylesheets
#ui-dialog-titlebar.red-popup {
	background-color: #fd4747;
}
#ui-dialog-body.red-popup {
	background-color: #fd4747;
  	border: none;
}


➡️ A popup that sets a variable when it is closed

→ Create an element that has a selector
<a id="pick-up">Pick up key</a>

→ Link the element to the dialog and set a variable when the dialog is closed 
<<clickdialog "#pick-up" "A Key">>\
	Wow, a //shiny// key.
	You drop it into your pocket.
<<whenclosed>>
	<<set $hasKey = true>>
	<<remove "#pick-up">>
<</clickdialog>>
```

## clickdialogchoice

`<<clickdialogchoice selector dialogTitle "$buttonResponse" (dialogClasses)>>`, `<<whenclosed>>`, `<</clickdialogchoice>>`

Similar to the clickdialog macro, but this one allows you to add buttons. Uses SugarCube's built-in dialog system to create a custom dialog box when a target element is clicked. Buttons can be added to the contents of the macro. The $buttonResponse story variable will be updated to reflect which button was pressed. 

The contents of the `<<whenclosed>>` tag will be executed when the dialog box is closed. The $buttonResponse variable will be updated to reflect which button was pressed. If the buttons have ids, then $buttonResponse will contain the id of the button that was clicked. If the buttons don't have ids, then the $buttonResponse will be a number. E.g. if there are three buttons and the first button is clicked, the response will be `1`. If no button was clicked, $buttonResponse will be `null`.

Note: all buttons will automatically be set up to close the dialog box when clicked.

**Arguments:**

- **selector**: The CSS/jQuery-style selector used to target element(s).
- **dialogTitle**: A string text to show up in the title of the dialog box.
- **$buttonResponse**: The story variable that should be updated to reflect the button that was pressed. Note: this needs to be a _string_, e.g. `"$whichButton"` instead of `$whichButton`.
- **dialogClasses**: (optional) A string of class(es) to be added to the dialog box body and dialog box title bar.

**Usage:**

```html
➡️ A dialog box that pops up with choice

→ Create an element that has a selector
<a id="choice-trigger">Make a choice</a>\
<span id="response"></span>\

→ Create dialog box with a choice of three pills
<<clickdialogchoice "#choice-trigger" "Some Pills" "$buttonChoice">>\
	You look down and see:
	<button id="red-pill">Red pill</button>\
	<button id="blue-pill">Blue pill</button>
	(Note: escaping the whitespace to allow buttons to appear on the same line)
<<whenclosed>>
	<<if $buttonChoice == "red-pill">>
		<<remove "#choice-trigger">>
		<<replace "#response">>You stay in Wonderland<</replace>>
	<<elseif $buttonChoice == "blue-pill">>
		<<remove "#choice-trigger">>
		<<replace "#response">>You wake up in your bed and believe whatever you want to believe<</replace>>
	<<else>>
		<<replace "#choice-trigger">>You didn't make a choice.<</replace>>
	<</if>>
<</clickdialogchoice>>


➡️ Same example, but without IDs

→ Create an element that has a selector
<a id="choice-trigger">Make a choice</a>

→ Create dialog box using the button macro
<<clickdialogchoice "#choice-trigger" "Some Pills" "$buttonChoice">>\
	You look down and see:
	<<button "Red pill">><</button>>\
	<<button "Blue pill">><</button>>
<<whenclosed>>
	<<if $buttonChoice == 1>>
		<<remove "#choice-trigger">>
		<<replace "#response">>You stay in Wonderland<</replace>>
	<<elseif $buttonChoice == 2>>
		<<remove "#choice-trigger">>
		<<replace "#response">>You wake up in your bed and believe whatever you want to believe<</replace>>
	<<else>>
		<<replace "#choice-trigger">>You didn't make a choice.<</replace>>
	<</if>>
<</clickdialogchoice>>
```

