var $ = require('jquery');
var chalk = require('chalk');
var smoothScroll = require('smooth-scroll');
var ejs = require('ejs');
smoothScroll.init();
var form = $('#search-film');
var search_field = $('#search-film-input');
var submit = $("#search-film-submit");
var results = $('#results');
var movie = $("#btn-movie");



$(search_field).keypress(function(e){
    if(e.which == 13){
        e.preventDefault();
        $(submit).trigger('click');
    }
});

var $loading = $('#loadingDiv').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });
//Templating
$(submit).click(function(){
    var nomeFilme = search_field.val().replace(/ /g, "+");
    $(function() {

        var app = {

            init: function() {
                app.loadData();
            },

            loadData: function() {
                $.getJSON('http://www.omdbapi.com/?s=' + nomeFilme).done(function(json) {
                    allData = json;
                    app.loadGrid(allData);
                });
            },

            loadGrid: function() {
                $.get('templates/template.html', function(template) {
                    var rendered = Mustache.render(template, allData);
                    $('#results').html(rendered);
                });
            }

        };

        app.init();

    });

});
