
// Parse JSON
var testJSON = [{"id":"1","hostusr":{"name":"David","availible":[1,2,3,4,5]},"guestusr":[{"name":"Ann","availible":[1,3,5],"color":"#FFA500"},{"name":"Don","availible":[2,5],"color":"#458B00"},{"name":"Cathy","availible":[2,3,4],"color":"#00BFFF"},{"name":"Eve","availible":[1,4],"color":"#AB82FF"},{"name":"Frank","availible":[1,5],"color":"#1C86EE"},{"name":"George","availible":[2,3],"color":"#FFD700"}],"timestamps":["2015-11-16","2015-11-17","2015-11-18","2015-11-19","2015-11-20"],"describe":"Birthday party for Ann!!"}];
var textarea = "",
    events = "[";

for (recIdx in testJSON) {
    textarea += "Event ID:\t" + testJSON[recIdx]["id"] + "\n";
    textarea += "\tNote:\t" + testJSON[recIdx]["describe"] + "\n";
    textarea += "\tHost:\t" + testJSON[recIdx]["hostusr"]["name"] + "\n";
    var dateString = "",
        guestString = "";


    for (dateIdx in testJSON[recIdx]["timestamps"]) {
        if (dateIdx > 0) {
            dateString += "\t\t\t";
        }
        events += "{\"date\":\"" + testJSON[recIdx]["timestamps"][dateIdx] + "\"}"
        dateString += testJSON[recIdx]["timestamps"][dateIdx] + "\n";
        if (dateIdx < testJSON[recIdx]["timestamps"].length - 1) {
            events += ","
        }
    }
    events += "]";
    textarea += "\tDates:\t" + dateString;

    for (guestIdx in testJSON[recIdx]["guestusr"]) {
        if (guestIdx > 0) {
            guestString += "\t\t\t";
        }
        guestString += testJSON[recIdx]["guestusr"][guestIdx]["name"] + "\n";
    }
    textarea += "\tGuests:\t" + guestString;

}
// $('textarea#test').val(textarea);

events = JSON.parse(events);
var divSize = ($('div.container').width())/12*7;
$('#svg_donut').width(divSize).height(divSize);

var eventName = testJSON[0]["describe"],
    hostname = testJSON[0]["hostusr"]["name"],
    guests = testJSON[0]["guestusr"],
    dates = testJSON[0]["timestamps"],
    size = dates.length,
    innerR = divSize/(5*guests.length),
    stroke = 30,
    slice = (2*Math.PI*0.8)/size,
    arc =[],
    k = 0;

// Event name
$('p#eventname').append(eventName);

//
$('p#hostname').append(hostname);


// Color picker
// $("#colorpicker").spectrum({
//     color: "#f00"
// });

// $('#colorpicker').colorselector();
// for (i = 0; i < guests.length; i++) {
//     var c = guests[i]["color"];
//     $('#colorpicker > option').each(function() {
//         if ($(this).attr("data-color") == c)
//             $(this).prop("disabled", true);
//     });
//     $('a.color-btn').each(function() {
//         if ($(this).attr("data-color") == c) {
//             $(this).attr("style", "background-color: rgb(125, 125, 125)");
//         }
//     });
// }


// Checkboxes
var ckbox = $("div.col-md-12#ckbox");

for (i = 1; i <= dates.length; i++) {
    ckbox.append('<div class="checkbox"><label><input type="checkbox" value="' + i + '" name="availible" />' + dates[i - 1] + '</label></div>');
}


// Multi-layer rainbow chart
var svg = d3.select("#svg_donut");

for (i = 0; i < guests.length; i++) {
    innerR += (stroke + 5);
    var lab = guests[i]["name"];
    arc.push(d3.svg.arc().innerRadius(innerR + (stroke/2)-0.5).outerRadius(innerR + (stroke/2)+0.5).startAngle(0).endAngle(2*Math.PI*0.8));
    for (j = 0; j < guests[i]["availible"].length; j++) {
        arc.push(d3.svg.arc().innerRadius(innerR).outerRadius(innerR + stroke).startAngle((guests[i]["availible"][j] - 1) * slice).endAngle(guests[i]["availible"][j] * slice));
    }
    svg.append("text").style("text-anchor", "end").text(lab)
                      .attr("font-size","20")
                      .attr("transform", "translate(" + (divSize/2-10) + "," + (divSize/2 - innerR - (stroke/2) + 5) + ")");
                      // .attr("transform", "translate(" + (divSize/2-10) + "," + (divSize/2-0-(stroke+7)*i) + ")");
}

for (i = 0; i < guests.length; i++) {

    var col = guests[i]["color"];
    svg.append("path").attr("d", arc[k]).attr("transform", "translate(" + divSize/2 + "," + divSize/2+")").attr("fill", "grey").style("stroke-opacity", 0.25);
    k++;
    for (j = 0; j < guests[i]["availible"].length; j++) {
        svg.append("path").attr("d", arc[k]).attr("transform", "translate(" + divSize/2 + "," + divSize/2+")").attr("fill", col).attr().style('stroke', 'black');
        k++;
    }

}









