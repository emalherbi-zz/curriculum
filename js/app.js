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

		document.documentElement.lang = 'pt-br';
		Editor.start();
	}
}
var PDF = {
	make : function() {
		var pdf = new jsPDF('p', 'pt', 'a4');

		$('#name_details h1 span').css('float', 'none');

		source = $('#resume')[0];

		specialElementHandlers = {
		};

		margins = {
			top : 55,
			bottom : 60,
			left : 40,
			width : 522
		};

		pdf.fromHTML(
			source,
			margins.left,
			margins.top,

			{
				'width' : margins.width,
				'elementHandlers' : specialElementHandlers
			},

			function(dispose) {
				pdf.save('curriculum.pdf');
			},

			margins
		);
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
	},
	pdf : function() {
			$('#btn-pdf').click(function() {
				PDF.make();
			});
	}
}

$(document).ready(function() {
	EN.show();

	Resume.pt();
	Resume.en();
	Resume.save();
	Resume.pdf();
});
