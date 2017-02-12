# Textbox Styling

See the [live demo](//mikewesthad.com/twine-resources/css/textbox/example.html). You can import example.html into Twine and open it up. The demo is heavily commented.

![Demo](textbox.png)

## Story Stylesheets

CSS from example.html:

```css
/* Text box styling */

#passages {
	/* Base size for the font inside the passage */
  	font-size: 20px;
  
  	/* Set a maximum width for the textbox */
  	max-width: 800px;
  
  	/* An outline around the textbox */
  	border: 5px solid white;
  	
  	/* A semi-transparent background color */
  	background-color: rgba(136, 0, 119, 0.7);
  
  	/* Space between the edges of the textbox and the text */
  	padding: 50px;
  
  	/* Round off the edges of the textbox */
  	border-radius: 5px;  
}
```