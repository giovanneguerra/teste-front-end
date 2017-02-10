function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
var movieId = getURLParameter("movie");
var $loading = $('#loadingDiv').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });
$(function() {

    var app = {

        init: function() {
            app.loadData();
        },

        loadData: function() {
            $.getJSON('http://www.omdbapi.com/?i=' + movieId, {timeout: 0}).done(function(json) {
                allData = json;
                app.loadGrid(allData);
            });
        },

        loadGrid: function() {
            $.get('templates/mTemplate.html', function(template) {
                var rendered = Mustache.render(template, allData);
                $('#mContainer').html(rendered);
            });
            $.get('templates/title.html', function(template) {
                var rendered = Mustache.render(template, allData);
                $('#title').html(rendered);
            });
        }

    };

    app.init();

});
