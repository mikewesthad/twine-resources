`<<clickdialog selector dialogTitle (dialogClasses)>>`, `<<whenclosed>>`, ` <</clickdialog>>`

Uses SugarCube's built-in dialog system to create a custom dialog box when a target element is clicked. The contents of the macro will be directly put into the body of the dialog box body. SugarCube markdown and HTML elements are both valid as contents. 

If a `<<whenclosed>>` tag is specified, the contents of that tag will be executed when the dialog box is closed. This is useful for setting variables upon closing a dialog box.

**Arguments:**

- selector: The CSS/jQuery-style selector used to target element(s).
- dialogTitle: A string text to show up in the title of the dialog box
- dialogClasses: (optional) A string of class(es) to be added to the dialog box body and dialog box title bar.

**Usage:**

```html
➡️ A simple popup that displays when a link is clicked

<!-- Create an element that has a selector -->
<a id="simple-popup">Simple demo</a>

<!-- Link the element to the dialog -->
<<clickdialog "#simple-popup" "A Simple Demo">>\
	This text shows up in the dialog.
	Markup will work fine: //italic//
    <img src="party.gif">
	(Hint: you'll probably want to escape the whitespace on the first line.)
<</clickdialog>>


➡️ A popup that sets a variable when it is closed

<!-- Create an element that has a selector -->
<a id="pick-up">Pick up key</a>

<!-- Link the element to the dialog -->
<<clickdialog "#pick-up" "A Key">>\
	Wow, a //shiny// key.
	You drop it into your pocket.
<<whenclosed>>
	<<set $hasKey = true>>
	<<remove "#pick-up">>
    <!-- This removes the link from the page -->
<</clickdialog>>
```
