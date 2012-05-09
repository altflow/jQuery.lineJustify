(function(){
	TestCase("JqueryLineJustifyTest", {
		"test should be object": function(){
			assertObject($("<div>").lineJustify());
		}
	});
	
	TestCase("JqueryLineJustifyWrapBySpanTest", {
		setUp: function(){
			/*:DOC element = <div style="width: 300px;">
								 line 1
							     line 2
							 </div>
			*/
		},
		
		"test should wrap an inner text by span tag": function(){
			/*:DOC element = <div>test string</div> */
			
			var object  = $(this.element).lineJustify();
			
			assertTagName("span", object[0].firstChild);
		},
		
		"test should wrap each line by span tag": function(){
			var object = $(this.element).lineJustify();
			
			assertEquals(2, object.children().length);
			var children = object.children();
			assertTagName("span", children[0]);
			assertTagName("span", children[1]);
		},
		
		"test should only apply textNode": function(){
			/*:DOC element = <div>
								 <p>line 1</p>
							     line 2, 16 chars
							 </div>
			*/
			var object = $(this.element).lineJustify();
			
			var children = object.children();
			assertTagName("p", children[0]);
			assertTagName("span", children[1]);
		},
		
		"test should set width between 90% and 100% of parent element": function(){
			var object = $(this.element).lineJustify();
			
			var children  = object.children();
			var width     = $(this.element).width();
			var width1    = $(children[0]).width();
			
			assertTrue( width*0.9 <= width1 && width1 <= width );
		},
		
		"test should set text-align justify for css of span tags": function(){
			var object = $(this.element).lineJustify();
			
			var children   = object.children();
			var textAlign1 = $(children[0]).css("text-align");
			var textAlign2 = $(children[1]).css("text-align");
			assertEquals("justify", textAlign1);
			assertEquals("justify", textAlign2);
		},
		
		"test should set class name 'l-justified' for span tags": function(){
			var object = $(this.element).lineJustify();
			
			var children = object.children();
			assertClassName("l-justified", children[0]);
			assertClassName("l-justified", children[1]);
		},
		
		"test should set id 'lj-lineX (X is line num) for span tags": function(){
			var object = $(this.element).lineJustify();
			
			var children = object.children();
			assertElementId("lj-line1", children[0]);
			assertElementId("lj-line2", children[1]);
		}
	});
	
	TestCase("JqueryLineJustifyApplyingFontTest", {
		"test should apply font size for single-byte chars based on parent width": function(){
			/*:DOC element = <div style="width: 300px;">
							     line 1 (17 chars)
							     line 2, 21 characters
							     <p>line 1=34px, line 2=28px</p>
							 </div>
			*/
			
			// for single-byte characters, calculate font-size
			// size = parent width / (num of chars / 2)
			
			var object = $(this.element).lineJustify();
			
			var children  = object.children();
			var fontSize1 = $(children[0]).css("font-size");
			var fontSize2 = $(children[1]).css("font-size");
			assertEquals("35px", fontSize1);
			assertEquals("28px", fontSize2);
		},
		
		"should apply font size for multi-byte chars based on parent width": function(){
			// NOTE:
			// This test doesn't work properly until jsTestDriver supports function
			// to configure charset or change charset to UTF-8 from iso-8859-1.
			// See http://code.google.com/p/js-test-driver/issues/detail?id=85
			
			/*:DOC element = <div style="width: 300px;">
							     日本語の文字列
							     フォントサイズを以下のように調整
							     <p>line 1=42px, line 2=18px</p>
							 </div>
			*/
			
			// for multi-byte characters, calculate font-size
			// size = parent width / (num of chars)
			
			var object = $(this.element).lineJustify();
			
			var children  = object.children();
			var fontSize1 = $(children[0]).css("font-size");
			var fontSize2 = $(children[1]).css("font-size");
			assertEquals("42px", fontSize1);
			assertEquals("18px", fontSize2);
		},
		
		"test should apply font-family": function(){
			/*:DOC element = <div style="width: 300px;">
							     line 1 (17 chars)
							     line 2, 21 characters
							     <p>line 1=34px, line 2=28px</p>
							 </div>
			*/
			
			var fontFamilies = [
					"Arial",
					"'Times New Roman'"
				];
			var object = $(this.element).lineJustify(fontFamilies);
			
			var children = object.children();
			var font1    = $(children[0]).css("font-family");
			var font2    = $(children[1]).css("font-family");
			assertEquals("Arial", font1);
			assertEquals("'Times New Roman'", font2);
		}
	});
}());