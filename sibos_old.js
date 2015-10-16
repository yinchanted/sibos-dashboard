'use strict';
var sessionnameChart = dc.rowChart('#session-name-chart');
var dataset = []
d3.csv("Sibos_2015_day1.csv", function(data) {
    dataset=data;
    console.log(dataset);
    var ndx = crossfilter(dataset);
    var sessionnameDim = ndx.dimension(function(d) { return d.SESSIONNAME; });  
    var sessionname_Future = sessionnameDim.filter("Future of Money: A burning platform?");
    print_filter("sessionname_Future");
    
    function print_filter(filter){
	var f=eval(filter);
	if (typeof(f.length) != "undefined") {}else{}
	if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
	if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
	console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
};

    var seesionnameGroup = sessionnameDim.group().reduceCount(function(d) {return d.SESSIONNAME;}); ;
    
     sessionnameChart /* dc.rowChart('#day-of-week-chart', 'chartGroup') */
        .width(180)
        .height(180)
        .margins({top: 20, left: 10, right: 10, bottom: 20})
        .group(seesionnameGroup)
        .dimension(sessionnameDim)

 
        .ordinalColors(['#9ecae1'])
        .label(function (d) {
            return d.key.split('.')[1];
        })

 
        .title(function (d) {
            return d.value;
        })
        .elasticX(true)
        .xAxis().ticks(4);
});

