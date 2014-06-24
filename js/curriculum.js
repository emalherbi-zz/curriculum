$(document).ready(function() {
	var elements = document.querySelectorAll('.editable'),
    editor = new MediumEditor(elements);
    
    $('#export-html').click(function() {
    	var index = $('html').html().trim();

		var zip = new JSZip();
		zip.file("index.html", index);

		var content = zip.generate({type:"blob"});
		saveAs(content, "curriculum.zip");    	    	
    });
});