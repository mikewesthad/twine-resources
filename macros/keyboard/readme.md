# <<keydown>> and <<keyup>>

See the [live demos](//mikewesthad.com/twine-resources/macros/keyboard/example.html) in example.html to see the macros in action. You can import example.html into Twine and open it up. The demos are heavily commented.

## Installation

- Copy the contents of [keyboard.js](//raw.githubusercontent.com/mikewesthad/twine-resources/master/macros/keyboard/keyboard.js) into story javascript.

## <<keydown>>

`<<keydown keyName (keyName2) (keyName3) ...>>`, `<</keydown>>`

The contents of the macro won't be executed unless one of the specified keys is pressed down. Any number of keys can be specified. 

Note: if you hold a key down, the contents of the macro will fire multiple times. If you only want it to fire once, see `<<keyup>>`.

**Arguments:**

- **keyName**: A key name (see key names section).

**Usage:**

```
➡️ Simple key detection
<<keydown "a">>
	"a" was pressed!
<</keydown>>

➡️ One of many keys
<<keydown "1" "2" "3" "4">>
	You pressed a number between 1 and 4.
<</keydown>>
```

## <<keyup>>

Same as `<<keydown>>`, except the contents of the macro are only run after a key (that has been pressed) is released.

```
➡️ Button mashing
<<set $presses = 0>>
<span id="press-counter"><<print $presses>> presses</span>

<<silently>>
	<<keydown "space">>
		<<set $presses = $presses + 1>>
		<<replace "#press-counter">>$presses presses<</replace>>
	<</keydown>>
<</silently>>
```

## Key Names

To detect a particular key, you must use the extact name from the list below:

- "0"
- "1"
- "2"
- "3"
- "4"
- "5"
- "6"
- "7"
- "8"
- "9"
- "backspace"
- "tab"
- "enter"
- "shift"
- "ctrl"
- "alt"
- "caps lock"
- "escape"
- "space"
- "page up"
- "page down"
- "end"
- "home"
- "left"
- "up"
- "right"
- "down"
- "insert"
- "delete"
- "a"
- "b"
- "c"
- "d"
- "e"
- "f"
- "g"
- "h"
- "i"
- "j"
- "k"
- "l"
- "m"
- "n"
- "o"
- "p"
- "q"
- "r"
- "s"
- "t"
- "u"
- "v"
- "w"
- "x"
- "y"
- "f1"
- "f2"
- "f3"
- "f4"
- "f5"
- "f6"
- "f7"
- "f8"
- "f9"
- "f10"
- "f11"
- "f12"
- "semi-colon"
- "equal sign"
- "comma"
- "dash"
- "period"
- "forward slash"
- "single tick"
- "open bracket"
- "back slash"
- "close bracket"
- "single quote"