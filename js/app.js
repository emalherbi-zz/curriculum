function age(birthday) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
var E = null;
var Editor = {
  start: function() {
    var elements = document.querySelectorAll('.editable');
    E = new MediumEditor(elements);
    Editor.activate();
  },
  activate: function() {
    E.setup();
    toastr.success('Edit mode: ON.');
  },
  deactivate: function() {
    E.destroy();
    E = null;
    toastr.success('Edit mode: OFF.');
  }
};
var EN = {
  show: function() {
    $('#resume').children().remove();
    $.get('lang/en.json', function(json) {
      var source = document.getElementById('template').innerHTML;
      var output = Mustache.render(unescape(source), json);
      $('#resume').html(output);
      $('.age').html(age(new Date($('#birthday').html())));
    });
    document.documentElement.lang = 'en';
    $('.active').removeClass();
    $('#btn-en').parent().addClass('active');
  }
};
var PT = {
  show: function() {
    $('#resume').children().remove();
    $.get('lang/pt-br.json', function(json) {
      var source = document.getElementById('template').innerHTML;
      var output = Mustache.render(unescape(source), json);
      $('#resume').html(output);
      $('.age').html(age(new Date($('#birthday').html())));
    });
    document.documentElement.lang = 'pt-br';
    $('.active').removeClass();
    $('#btn-pt').parent().addClass('active');
  }
};
var PDF = {
  make: function() {
    var pdf = new jsPDF('p', 'pt', 'A4');
    var source = $('#resume')[0];
    var specialElementHandlers = {
      '#birthday': function(element, renderer) {
        return true;
      },
      '#phone': function(element, renderer) {
        return true;
      }
    };
    var margins = {
      top: 55,
      bottom: 60,
      left: 40,
      width: 522
    };
    pdf.fromHTML(
      source,
      margins.left,
      margins.top, {
        'width': margins.width,
        'elementHandlers': specialElementHandlers
      },
      function(dispose) {
        pdf.save('résumé-' + document.documentElement.lang + '.pdf');
      },
      margins
    );
  }
};
var Resume = {
  save: function() {
    $('#btn-save').click(function() {
      var view = {
        lang: document.documentElement.lang,
        resume: $('#resume').html().trim()
      };
      var template = document.getElementById('template-zip').innerHTML;
      var output = Mustache.render(template, view);
      var zip = new JSZip();
      zip.file("index.html", output);
      var content = zip.generate({
        type: "blob"
      });
      saveAs(content, 'résumé-' + document.documentElement.lang + '.zip');
    });
  },
  pt: function() {
    $('#btn-pt').click(function() {
      PT.show();
    });
  },
  en: function() {
    $('#btn-en').click(function() {
      EN.show();
    });
  },
  edit: function() {
    $('#btn-edit').click(function() {
      (E) ? Editor.deactivate(): Editor.start();
    });
  },
  pdf: function() {
    $('#btn-pdf').click(function() {
      PDF.make();
    });
  }
};
$(document).ready(function() {
  Resume.pt();
  Resume.en();
  Resume.edit();
  Resume.save();
  Resume.pdf();
  // init
  EN.show();
  //
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
});
