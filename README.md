jQuery.lineJustify
----

jQuery plugin to adjust font-size and letter-spacing for each line to fit the width to the element.

### Usage
	$(element).lineJustify(["fontname1","fontname2",...]);
	
Example:

	<div id="justify" style="width:300px;text-align:center">
	an example of jQuery Plugin
	lineJustify
	adjusting font size to
	fit to the element
	</div>
	
	<script type="text/javascript">
	$("#justify").lineJustify(["'Times New Roman'", "Arial"]);
	</script>

Results:

	<div id="justify1" style="width:300px;text-align:center">
		<span id="lj-line1" class="l-justified" style="text-align: justify; font-size: 22px; font-family: 'Times New Roman'; letter-spacing: 1px; width: 283px; ">an example of jQuery Plugin<br></span>
		<span id="lj-line2" class="l-justified" style="text-align: justify; font-size: 54px; font-family: Arial; letter-spacing: 5px; width: 292px; ">lineJustify<br></span>
		<span id="lj-line3" class="l-justified" style="text-align: justify; font-size: 27px; font-family: 'Times New Roman'; letter-spacing: 3px; width: 300px; ">adjusting font size to<br></span>
		<span id="lj-line4" class="l-justified" style="text-align: justify; font-size: 33px; font-family: Arial; letter-spacing: 3px; width: 293px; ">fit to the element<br></span>
	</div>
	
### Notes

- If you have more lines than fonts that are specified in the option, it repeats the fonts from the first font of the list
- It doen't work properly with some web fonts
