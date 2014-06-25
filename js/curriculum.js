var Editor = {
	start : function() {
		var elements = document.querySelectorAll('.editable'),
	    editor = new MediumEditor(elements);
	}	
}
var EN = {
	show : function() {
		$('#resume').children().remove();

		var t = document.querySelector("#template-en");
		
		var body = document.querySelector('#resume');
		body.appendChild(t.content.cloneNode(true));

		Editor.start();
	}	
}
var PT = {
	show : function() {
		$('#resume').children().remove();
	
		var t = document.querySelector("#template-pt-br");
		
		var body = document.querySelector('#resume');
		body.appendChild(t.content.cloneNode(true));
		
		Editor.start();
	}	
}
var Resume = {
	save : function() {
	    $('#btn-save').click(function() {
			var view = {
				lang : "en",
				resume : $('#resume').html().trim(),
				script : [{
					url : '<script type="text/javascript" src="http://emalherbi.github.io/curriculum/js/jquery.min.js"></script>'
				},{
					url : '<script type="text/javascript" src="http://emalherbi.github.io/curriculum/js/bootstrap.min.js"></script>'
				},{
					url : '<script type="text/javascript" src="http://emalherbi.github.io/curriculum/js/medium-editor.min.js"></script>'
				},{
					url : '<script type="text/javascript" src="http://emalherbi.github.io/curriculum/js/FileSaver.js"></script>'
				},{
					url : '<script type="text/javascript" src="http://emalherbi.github.io/curriculum/js/jszip.min.js"></script>'
				},{
					url : '<script type="text/javascript" src="http://emalherbi.github.io/curriculum/js/curriculum.js"></script>'
				}]
			};
			
			var template = document.getElementById('template').innerHTML;
			var output = Mustache.render(template, view);
			
			var zip = new JSZip();
			zip.file("index.html", output);
				
			var content = zip.generate({type:"blob"});
			saveAs(content, "curriculum.zip");   	    	
	    });
	},
	pt : function() {
	    $('#btn-pt').click(function() {
	    	PT.show();
	    });
	},
	en : function() {
	    $('#btn-en').click(function() {
	    	EN.show();
	    });
	}
}

$(document).ready(function() {
	EN.show();
	
	Resume.pt();
	Resume.en();
	Resume.save();
});