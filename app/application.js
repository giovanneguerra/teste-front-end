var $ = require('jquery');
var chalk = require('chalk');
var smoothScroll = require('smooth-scroll');
var ejs = require('ejs');
smoothScroll.init();
var form = $('#search-film');
var search_field = $('#search-film-input');
var results = $('#results');

form.on('submit', function(e) {
  e.preventDefault();

  var url_search = 'http://www.omdbapi.com/?s=' + search_field.val();
  $.get(url_search, function(response) {
    results.empty();
    $.each(response.Search, function(index, item) {
      $('<div />')
        .append($('<h4 />').html(item.Title))
        .append($('<img />').attr('src', item.Poster))
        .append($('<hr />'))
        .appendTo(results);
    });
  });
});

// fucking test
var users = ['Alcest', 'Richard', 'Vincent'];
ejs.render('<%= users.join(" | "); %>', {users: users},
    {delimiter: '?'});
console.log("começou");
$.getJSON("teste.json", function(data){
    var items = [];
    $.each(data, function(k , v){
        console.log(v[0]);
    });
});
