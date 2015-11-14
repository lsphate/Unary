
// Parse JSON
var testJSON = [{"id":"1","hostusr":{"name":"David","availible":[1,2,3,4,5]},"guestusr":[{"name":"Ann","availible":[1,3,5],"color":"#FFA500"},{"name":"Don","availible":[2,5],"color":"#458B00"},{"name":"Cathy","availible":[2,3,4],"color":"#00BFFF"}],"dates":["2015-11-16","2015-11-17","2015-11-18","2015-11-19","2015-11-20"],"describe":"Birthday party for Ann!!"}];
var textarea = "",
    events = "[";

for (recIdx in testJSON) {
    textarea += "Event ID:\t" + testJSON[recIdx]["id"] + "\n";
    textarea += "\tNote\t" + testJSON[recIdx]["describe"] + "\n";
    textarea += "\tHost:\t" + testJSON[recIdx]["hostusr"]["name"] + "\n";
    var dateString = "",
        guestString = "";


    for (dateIdx in testJSON[recIdx]["dates"]) {
        if (dateIdx > 0) {
            dateString += "\t\t\t";
        }
        events += "{\"date\":\"" + testJSON[recIdx]["dates"][dateIdx] + "\"}"
        dateString += testJSON[recIdx]["dates"][dateIdx] + "\n";
        if (dateIdx < testJSON[recIdx]["dates"].length - 1) {
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
$('textarea#test').val(textarea);
$('#colsel').colorselector();
events = JSON.parse(events);

// Multi-layer Rainbow Chart
var guests = testJSON[0]["guestusr"],
    dates = testJSON[0]["dates"],
    size = dates.length,
    innerR = 100,
    slice = (2 * Math.PI * 0.75) / size,
    arc =[],
    k = 0;

var vis = d3.select("#svg_donut");

for (i = 0; i < guests.length; i++) {
    innerR += 20;
    for (j = 0; j < guests[i]["availible"].length; j++) {
        arc.push(d3.svg.arc().innerRadius(innerR).outerRadius(innerR + 15).startAngle((guests[i]["availible"][j] - 1) * slice).endAngle(guests[i]["availible"][j] * slice));
    }
}

for (i = 0; i < guests.length; i++) {
    var lab = guests[i]["name"];
    var col = guests[i]["color"];
    for (j = 0; j < guests[i]["availible"].length; j++) {
        vis.append("path").attr("d", arc[k]).attr("transform", "translate(300,200)").attr("fill", col);
        k++;
    }
}
