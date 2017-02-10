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
            app.filterChange();
        },

        loadData: function() {
            $.getJSON('http://www.omdbapi.com/?i=' + movieId, {timeout: 0}).done(function(json) {
                allData = json;
                app.loadIndustryGrid(allData);
            });
        },

        loadIndustryGrid: function() {
            $.get('templates/mTemplate.html', function(template) {
                var rendered = Mustache.render(template, allData);
                $('#mContainer').html(rendered);
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
