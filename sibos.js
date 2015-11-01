// wider scope for these charts so that we can reference them from the reset and filter utility functions
var totalNumber;
var uniqueNumber;
var streamRowChart;
var insititutionRowChart;
var bussiFocusRowChart;
var responsibilityRowChart;
var sessionRowChart;
var functionRowChart;
var ageRowChart;
var sessiondateRowChart;
var roomRowChart;

// load the data file
d3.csv("./Sibos_2015_day1234.csv", function (data) {
    
    // associate the charts with their html elements
    totalNumber = dc.numberDisplay("#dc-chart-total");
    uniqueNumber = dc.numberDisplay("#dc-chart-unique");
	streamRowChart = dc.rowChart("#dc-chart-stream");
	insititutionRowChart = dc.rowChart("#dc-chart-institutiontype");
	bussiFocusRowChart = dc.rowChart("#dc-chart-businessfocus");
	responsibilityRowChart = dc.rowChart("#dc-chart-responsibility");
	sessionRowChart = dc.rowChart("#dc-chart-sessionname");
	functionRowChart = dc.rowChart("#dc-chart-function");
    ageRowChart = dc.rowChart("#dc-chart-agerange");
    sessiondateRowChart = dc.rowChart("#dc-chart-sessiondate");
    roomRowChart = dc.rowChart("#dc-chart-room");
    
    data.forEach(function (d) {
        d.count = 1; // add column "count", set value to "1"
    });
    // put data in crossfilter
    var facts = crossfilter(data);

    var updateUnique = function (unique, key, increment) {
	    var value = unique["" + key];

	    // not initialized
	    if (typeof value === 'undefined')
		value = 0;

	    // update with increment
	    if (value + increment > 0) {
		unique["" + key] = value + increment;
	    } else {
		delete unique["" + key];
	    }
	}

    // group for grand total number of attendees
    var totalGroup = facts.groupAll().reduce(
        function (p, v) { // add finction
            ++p.count;
            console.log(v["BADGEID"]);
            updateUnique(p.uAttendees, v["BADGEID"], 1);
	    return p;
        },
        function (p, v) { // subtract function
            --p.count;
            updateUnique(p.uAttendees, v["BADGEID"], -1);
            return p;
        },
        function () {
            return {
                count: 0,
                uAttendees: {} // unique Attendees
            }
        } // initial function
    );

    // 01 display grand total
    totalNumber
        .group(totalGroup)
        .valueAccessor(function (d) {
            console.log(d.uAttendees);
            return d.count;
        })
        .formatNumber(function (d) { return d + " scans"; });

    // 02 display grand total
    uniqueNumber
        .group(totalGroup)
        .valueAccessor(function (d) {
            var keys = 0;
            for (k in d.uAttendees) ++keys;
	    return keys;
        })
        //.formatNumber(function (d) { return Math.round(d) + " attendees"; });
        .formatNumber(function (d) { return d + " attendees"; });


    // 03 dimension, rowchart, STREAM
    var streamDim = facts.dimension(dc.pluck('STREAM'));
    var streamGroupSum = streamDim.group().reduceSum(dc.pluck("count"));
    
    streamRowChart
        .dimension(streamDim)
        .group(streamGroupSum)
        .data(function (d) { return d.top(15); })
        .width(300)
        .height(220)
        //.height(15 * 22)
        .margins({ top: 0, right: 10, bottom: 20, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(0)
        .xAxis().ticks(4).tickFormat(d3.format(".2s"));

    // 04 dimension, rowchart, INSTITUTION_TYPE  
    var institutionTypeDim = facts.dimension(dc.pluck('INSTITUTION_TYPE'));
    var institutionTypeGroupSum = institutionTypeDim.group().reduceSum(dc.pluck("count"));
    
    insititutionRowChart
        .dimension(institutionTypeDim)
        .group(institutionTypeGroupSum)
        .data(function (d) { return d.top(15); })
        .width(300)
        .height(220)
        //.height(15 * 22)
        .margins({ top: 0, right: 10, bottom: 20, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(0)
        .xAxis().ticks(5).tickFormat(d3.format(".2s"));
    
    // 05 dimension, rowchart, BUSINESS_FOCUS  
    var businessFocusDim = facts.dimension(dc.pluck('BUSINESS_FOCUS'));
    var businessFocusGroupSum = businessFocusDim.group().reduceSum(dc.pluck("count"));
    
    bussiFocusRowChart
        .dimension(businessFocusDim)
        .group(businessFocusGroupSum)
        .data(function (d) { return d.top(15); })
        .width(300)
        .height(220)
        //.height(15 * 22)
        .margins({ top: 0, right: 10, bottom: 20, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(0)
        .xAxis().ticks(4).tickFormat(d3.format(".2s"));
    
    // 06 dimension, rowchart, RESPONSIBILITY  
    var responsibilityDim = facts.dimension(dc.pluck('RESPONSIBILITY'));
    var responsibilityGroupSum = responsibilityDim.group().reduceSum(dc.pluck("count"));
    
    responsibilityRowChart
        .dimension(responsibilityDim)
        .group(responsibilityGroupSum)
        .data(function (d) { return d.top(15); })
        .width(300)
        .height(220)
        //.height(15 * 22)
        .margins({ top: 0, right: 10, bottom: 20, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(0)
        .xAxis().ticks(5).tickFormat(d3.format(".2s"));
    
    // 07 dimension, rowchart, SESSIONNAME  
    var sessionNameDim = facts.dimension(dc.pluck('SESSIONNAME'));
    var sessionNameGroupSum = sessionNameDim.group().reduceSum(dc.pluck("count"));
    
    sessionRowChart
        .dimension(sessionNameDim)
        .group(sessionNameGroupSum)
        .data(function (d) { return d.top(80); })
        .width(500)
        .height(1010)
        //.height(15 * 22)
        .margins({ top: 0, right: 10, bottom: 20, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(0)
        .xAxis().ticks(6).tickFormat(d3.format(".2s"));
    
    // 08 dimension, rowchart, FUNCTION  
    var functionDim = facts.dimension(dc.pluck('FUNCTION'));
    var functionGroupSum = functionDim.group().reduceSum(dc.pluck("count"));
    
    functionRowChart
        .dimension(functionDim)
        .group(functionGroupSum)
        .data(function (d) { return d.top(15); })
        .width(300)
        .height(220)
        //.height(15 * 22)
        .margins({ top: 0, right: 10, bottom: 20, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(0)
        .xAxis().ticks(4).tickFormat(d3.format(".2s"));
    
    // 09 dimension, rowchart, AGE_RANGE  
    var ageRangeDim = facts.dimension(dc.pluck('AGE_RANGE'));
    var ageRangeGroupSum = ageRangeDim.group().reduceSum(dc.pluck("count"));
    
    ageRowChart
        .dimension(ageRangeDim)
        .group(ageRangeGroupSum)
        .data(function (d) { return d.top(15); })
        .width(300)
        .height(220)
        //.height(15 * 22)
        .margins({ top: 0, right: 10, bottom: 20, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(0)
        .xAxis().ticks(5).tickFormat(d3.format(".2s"));
    
    // 10 dimension, rowchart, SESSIONDATE  
    var sessionDateDim = facts.dimension(dc.pluck('SESSIONDATE'));
    var sessionDateGroupSum = sessionDateDim.group().reduceSum(dc.pluck("count"));
    
    sessiondateRowChart
        .dimension(sessionDateDim)
        .group(sessionDateGroupSum)
        .data(function (d) { return d.top(5); })
        .width(300)
        .height(220)
        //.height(15 * 22)
        .margins({ top: 0, right: 10, bottom: 20, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(0)
        .xAxis().ticks(5).tickFormat(d3.format(".2s"));
    
    // 11 dimension, rowchart, ROOM  
    var roomDim = facts.dimension(dc.pluck('ROOM'));
    var roomGroupSum = roomDim.group().reduceSum(dc.pluck("count"));
    
    roomRowChart
        .dimension(roomDim)
        .group(roomGroupSum)
        .data(function (d) { return d.top(15); })
        .width(300)
        .height(220)
        .margins({ top: 0, right: 10, bottom: 20, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(0)
        .xAxis().ticks(4).tickFormat(d3.format(".2s"));

    // TODO: add fiscalYear
    /*
    var fiscalYearDim = facts.dimension(dc.pluck('SESSIONDATE'));
    var fiscalYearGroupSum = fiscalYearDim.group().reduceSum(dc.pluck("count"));

    // 05 stacked bar chart for fiscal year w/appropriation types  
    var bar = dc.barChart("#dc-chart-fiscalYear")
        .dimension(fiscalYearDim)
        .group(fiscalYearGroupSum, "Base").valueAccessor(function (d) { return d.value.Base; })
        .stack(fiscalYearGroupSum, "Supplemental", function (d) { return d.value.Supplemental; })
        .stack(fiscalYearGroupSum, "Request", function (d) { return d.value.Request; })
        .width(650)
        .height(200).margins({ top: 10, right: 30, bottom: 20, left: 50 })
        .legend(dc.legend().x(60).y(20))
        .gap(10)  // space between bars
        .centerBar(true)
        .filter([2005.5, 2015.5])
        .x(d3.scale.linear().domain([2005.5, 2015.5]))
        .elasticY(true)
        .ordinalColors(appropriationTypeColors);

    // 06 Set format. These don't return the chart, so can't chain them 
    bar.xAxis().tickFormat(d3.format("d")); // need "2005" not "2,005" 
    bar.yAxis().tickFormat(function (v) { return v / billion + " B"; });
    */

    // draw all dc charts. w/o this nothing happens!  
    dc.renderAll();
});


