
// Read JSON
// var testJSON = {hostusr":{"name":"David","availible":[1,2,3,4,5]},"guestusr":[{"name":"Ann","availible":[1,3,5],"color":"#FFA500"},{"name":"Don","availible":[2,5],"color":"#458B00"},{"name":"Cathy","availible":[2,3,4],"color":"#00BFFF"},{"name":"Eve","availible":[1,4],"color":"#AB82FF"},{"name":"Frank","availible":[1,5],"color":"#1C86EE"},{"name":"George","availible":[2,3],"color":"#FFD700"}],"timestamps":["2015-11-16","2015-11-17","2015-11-18","2015-11-19","2015-11-20"],"describe":"Birthday party for Ann!!"};
function GetUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var eid = GetUrlVars()["eventid"],
    url = "https://raw.githubusercontent.com/lsphate/Unary/feature/frontend/asset/js/" + eid + ".json";

$.getJSON(url, function(data) {
    var testJSON = data,
        textarea = "",
        events = "[";

    // for (recIdx in testJSON) {
        textarea += "Event ID:\t" + eid + "\n";
        textarea += "\tNote:\t" + testJSON["describe"] + "\n";
        textarea += "\tHost:\t" + testJSON["hostusr"]["name"] + "\n";
        var dateString = "",
            guestString = "";


        for (dateIdx in testJSON["timestamps"]) {
            if (dateIdx > 0) {
                dateString += "\t\t\t";
            }
            events += "{\"date\":\"" + testJSON["timestamps"][dateIdx] + "\"}"
            dateString += testJSON["timestamps"][dateIdx] + "\n";
            if (dateIdx < testJSON["timestamps"].length - 1) {
                events += ","
            }
        }
        events += "]";
        textarea += "\tDates:\t" + dateString;

        for (guestIdx in testJSON["guestusr"]) {
            if (guestIdx > 0) {
                guestString += "\t\t\t";
            }
            guestString += testJSON["guestusr"][guestIdx]["name"] + "\n";
        }
        textarea += "\tGuests:\t" + guestString;

    // }
    $('textarea#test').val(textarea);

    events = JSON.parse(events);
    var divSize = ($('div.container').width())/12*7;
    $('#svg_donut').width(divSize).height(divSize);

    var eventName = testJSON["describe"],
        hostname = testJSON["hostusr"]["name"],
        guests = testJSON["guestusr"],
        dates = testJSON["timestamps"],
        size = dates.length,
        innerR = divSize/(5*guests.length),
        stroke = 30,
        slice = (2*Math.PI*0.8)/size,
        arc =[],
        k = 0;

    // Host name
    $('p#hostname').append(hostname);

    // Event name
    $('p#eventname').append(eventName);

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

});









