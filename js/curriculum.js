$(document).ready(function() {
	var elements = document.querySelectorAll('.editable'),
    editor = new MediumEditor(elements);
    
    $('#export-html').click(function() {
    	var index = $('html').html().trim();

		var zip = new JSZip();
		zip.file("index.html", index);

		var img = zip.folder("img");
		img.file("glyphicons-halflings.png", "img/glyphicons-halflings.png", {base64: true});

		console.log( '2' );

		var content = zip.generate({type:"blob"});
		saveAs(content, "curriculum.zip");    	    	

		console.log( '3' );

    	var index = $('html').html().trim();
		// var blob = new Blob([html, html], {type: "application/xhtml+xml;charset=utf-8"});
		// saveAs(blob, "curriculum.html");    	
    });
});