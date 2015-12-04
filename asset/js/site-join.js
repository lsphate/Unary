// Prepare variables
var divSize = ($('div.container').width())/12*7;
$('#svg_donut').width(divSize).height(divSize);

var str = $('input#response').val(),
// var str = '{"hostusr":"David","describe":"Birthday party for Ann!!","timestamps":["2015-11-16","2015-11-17","2015-11-18","2015-11-19","2015-11-20"],"guestusr":[{"name":"Ann","available":[1,3,5],"color":"#FFA500"},{"name":"Don","available":[2,5],"color":"#458B00"},{"name":"Cathy","available":[2,3,4],"color":"#00BFFF"},{"name":"Eve","available":[1,4],"color":"#AB82FF"},{"name":"Frank","available":[1,5],"color":"#1C86EE"},{"name":"George","available":[2,3],"color":"#FFD700"}]}',
    testJSON = $.parseJSON(str);

var eventName = testJSON["describe"],
    hostname = testJSON["hostusr"],
    guests = testJSON["guestusr"],
    dates = testJSON["timestamps"],
    size = dates.length,
    innerR = divSize/(5*guests.length),
    stroke = 30,
    slice = (2*Math.PI*0.8)/size,
    arc =[],
    k = 0;

// Multi-layer rainbow chart
var svg = d3.select("#svg_donut");

for (i = 0; i < guests.length; i++) {
    innerR += (stroke + 5);
    var lab = guests[i]["guestname"];
    arc.push(d3.svg.arc().innerRadius(innerR + (stroke/2)-0.5).outerRadius(innerR + (stroke/2)+0.5).startAngle(0).endAngle(2*Math.PI*0.8));
    for (j = 0; j < guests[i]["available"].length; j++) {
        arc.push(d3.svg.arc().innerRadius(innerR).outerRadius(innerR + stroke).startAngle((guests[i]["available"][j] - 1) * slice).endAngle(guests[i]["available"][j] * slice));
    }
    svg.append("text").style("text-anchor", "end").text(lab)
                      .attr("font-size","20")
                      .attr("transform", "translate(" + (divSize/2-10) + "," + (divSize/2 - innerR - (stroke/2) + 5) + ")");
}

for (i = 0; i < guests.length; i++) {

    var col = guests[i]["guestcolor"];
    svg.append("path").attr("d", arc[k]).attr("transform", "translate(" + divSize/2 + "," + divSize/2+")").attr("fill", "grey").style("stroke-opacity", 0.25);
    k++;
    for (j = 0; j < guests[i]["available"].length; j++) {
        svg.append("path").style('stroke', 'black')
                          .attr("d", arc[k])
                          .attr("transform", "translate(" + divSize/2 + "," + divSize/2+")")
                          .attr("fill", col)
                          .attr("data-toggle","tooltip")
                          .attr("title", dates[guests[i]["available"][j] - 1]);
        k++;
    }

}

$('[data-toggle="tooltip"]').tooltip({ container: 'body' });


