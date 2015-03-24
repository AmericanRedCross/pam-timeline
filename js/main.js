$(document).ready(function() {
  d3.csv("data/timeline.csv", function(data){
    // build an array of dates
    var dates = [];
    $.each(data, function(a, b){
      if($.inArray(b["date_local"], dates) === -1){
        dates.push(b["date_local"]);
      }
    });
    var timelinetimes = d3.select("#timeline").selectAll('div')
      .data(dates).enter().append('div')
      .attr('class', 'timeline-wrapper')
      .attr('data-date', function(d){
        return d;
      })
      .html(function(d){
        // event date
    		var dateObject = new Date(d);
    		// numeric day of month for event
    		var day = dateObject.getDate();
    		// d3 helper to return abbreviated month
    		var monthFormatter = d3.time.format('%b');
    		// abbreviated month for event
    		var month = monthFormatter(dateObject);
        return '<h4 class="timeline-time">' + day + ' ' + month + '</h4>' + '<dl class="timeline-series"></dl>';
      });
    $.each(data, function(a, b){
      var thisId = b['date_local'] + '_' + a;
      var thisHtml = '<dt class="timeline-event" id="e' + thisId + '"><a>' +
        '<img class="icon-category" src="img/' + b['category'] + '.png">' +
        b['title'] + "</a></dt>" +
        '<dd class="timeline-event-content" id="e' + thisId + 'EX"><p>' + b['description'] + '</p></dd>';
      $("[data-date='" + b['date_local'] + "'] " + ".timeline-series").append(thisHtml);
    })

    // // sort ascending (in case data wasn't in order by date)
    // displayedEvents.sort(function(a,b){
    //     return new Date(a.properties.date) - new Date(b.properties.date);
    //   });



    $.timeliner({});
  });
});
