var E = null;
var Editor = {
	start : function() {
		var elements = document.querySelectorAll('.editable');
	    E = new MediumEditor(elements);
	    	    
	    Editor.activate();
	},
	activate : function() {
		E.activate();	
	},
	deactivate : function() {
		E.deactivate();	
	}
}
var EN = {
	show : function() {
		$('#resume').children().remove();

		var t = document.querySelector("#template-en");
		
		var body = document.querySelector('#resume');
		body.appendChild(t.content.cloneNode(true));		
		$("#btn-save span").text("Save Html");
		document.documentElement.lang = 'en';

		Editor.start();
	}	
}
var PT = {
	show : function() {
		$('#resume').children().remove();
	
		var t = document.querySelector("#template-pt-br");
		
		var body = document.querySelector('#resume');
		body.appendChild(t.content.cloneNode(true));		
		$("#btn-save span").text("Salvar Html");
		document.documentElement.lang = 'pt-br';
		
		Editor.start();
	}	
}
var Resume = {
	save : function() {
	    $('#btn-save').click(function() {
	    	Editor.deactivate();
	    	
			var view = {
				lang : document.documentElement.lang,
				resume : $('#resume').html().trim(),
				script : [{
					url : '<script type="text/javascript" src="http://emalherbi.github.io/curriculum/js/jquery.min.js"></script>'
				},{
					url : '<script type="text/javascript" src="http://emalherbi.github.io/curriculum/js/bootstrap.min.js"></script>'
				}]
			};
			
			var template = document.getElementById('template').innerHTML;
			var output = Mustache.render(template, view);
			
			var zip = new JSZip();
			zip.file("index.html", output);
				
			var content = zip.generate({type:"blob"});
			saveAs(content, "curriculum.zip");   
			
	    	Editor.activate();
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