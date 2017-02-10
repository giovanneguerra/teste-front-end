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


$(search_field).keypress(function(e) {
    if(e.which == 13){
        e.preventDefault();
        console.log(search_field.val());
        $(submit).trigger('click');
    }
});

//Templating
$(submit).click(function(){
    var nomeFilme = search_field.val().replace(/ /g, "+");
    console.log(nomeFilme);
    $(function() {

        var app = {

            init: function() {
                app.loadData();
                app.filterChange();
            },

            loadData: function() {
                $.getJSON('http://www.omdbapi.com/?s=' + nomeFilme).done(function(json) {
                    allData = json;
                    app.loadIndustryGrid(allData);
                });
            },

            loadIndustryGrid: function() {
                $.get('templates/template.html', function(template) {
                    var rendered = Mustache.render(template, allData);
                    $('#results').html(rendered);
                });
            },

            filterChange: function() {
                $('#filter-industry').change(function() {
                    var selectedIndustry = $(this).val();
                    app.applyFilter(selectedIndustry);
                });
            },

            applyFilter: function(selectedIndustry) {
                var $industry = $('#industry-grid-container').find('.industry');

                $industry.each(function(i, val) {
                    var $industryData = $(this).data('industry');
                    if ($industryData.indexOf(selectedIndustry) >= 0 || selectedIndustry === '') {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
                if ($.browser.chrome) {
                    $('.industry-container').masonry('layout');
                }
            },

            filterChange2: function() {
                $('#filter-industry2').change(function() {
                    var selectedIndustry2 = $(this).val();
                    app.applyFilter2(selectedIndustry2);
                });
            },

            applyFilter2: function(selectedIndustry) {
                var $industry = $('#industry-grid-container').find('.industry');

                $industry.each(function(i, val) {
                    var $industryData = $(this).data('industry');
                    if ($industryData.indexOf(selectedIndustry) >= 0 || selectedIndustry === '') {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
                if ($.browser.chrome) {
                    $('.industry-container').masonry('layout');
                }
            }

        };

        app.init();

    });

});
