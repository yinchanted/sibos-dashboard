var appropriationTypeColors =
    ["#74C365", // light green 
    "#006600",  // dark green 
    "#007BA7"]; // blue


d3.csv("./Sibos_2015_day1234.csv", function (data) {
    data.forEach(function (d) {
        d.count = 1; // add column "count", set value to "1"
    });
    // put data in crossfilter
    var facts = crossfilter(data);

    // 01 group for grand total number of attendees
    var totalGroup = facts.groupAll().reduce(
        function (p, v) { // add finction
            return p += v.count;
        },
        function (p, v) { // subtract function
            return p -= v.count;
        },
        function () { return 0 } // initial function
    );
    // or you could use this convenience function: 
    // var totalGroup = facts.groupAll().reduceSum(dc.pluck("amount"));


    // 02 display grand total
    dc.numberDisplay("#dc-chart-total")
        .group(totalGroup)
        .valueAccessor(function (d) {
            return d; 
        })
        //.formatNumber(function (d) { return Math.round(d) + " attendees"; });
        .formatNumber(function (d) { return d + " scans"; });

    // 03 dimension, rowchart, STREAM
    var streamDim = facts.dimension(dc.pluck('STREAM'));
    var streamGroupSum = streamDim.group().reduceSum(dc.pluck("count"));
    
     dc.rowChart("#dc-chart-stream")
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
    
    dc.rowChart("#dc-chart-institutiontype")
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
    
    dc.rowChart("#dc-chart-businessfocus")
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
    
    dc.rowChart("#dc-chart-responsibility")
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
        .xAxis().ticks(4).tickFormat(d3.format(".2s"));
    
    // 07 dimension, rowchart, SESSIONNAME  
    var sessionNameDim = facts.dimension(dc.pluck('SESSIONNAME'));
    var sessionNameGroupSum = sessionNameDim.group().reduceSum(dc.pluck("count"));
    
    dc.rowChart("#dc-chart-sessionname")
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
    
    dc.rowChart("#dc-chart-function")
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
    
    dc.rowChart("#dc-chart-agerange")
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
        .xAxis().ticks(4).tickFormat(d3.format(".2s"));
    
    // 10 dimension, rowchart, SESSIONDATE  
    var sessionDateDim = facts.dimension(dc.pluck('SESSIONDATE'));
    var sessionDateGroupSum = sessionDateDim.group().reduceSum(dc.pluck("count"));
    
    dc.rowChart("#dc-chart-sessiondate")
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
        .xAxis().ticks(4).tickFormat(d3.format(".2s"));
    
    // 11 dimension, rowchart, ROOM  
    var roomDim = facts.dimension(dc.pluck('ROOM'));
    var roomGroupSum = roomDim.group().reduceSum(dc.pluck("count"));
    
    dc.rowChart("#dc-chart-room")
        .dimension(roomDim)
        .group(roomGroupSum)
        .data(function (d) { return d.top(15); })
        .width(300)
        .height(220)
        //.height(15 * 22)
        .margins({ top: 0, right: 10, bottom: 20, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(0)
        .xAxis().ticks(4).tickFormat(d3.format(".2s"));
        
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

    // 08 make row charts
    new RowChart(facts, "operatingUnit", 300, 100);
    new RowChart(facts, "agency", 300, 10);
    new RowChart(facts, "category", 300, 10);
    new RowChart(facts, "sector", 300, 50);
    new RowChart(facts, "account", 300, 50);

    // draw all dc charts. w/o this nothing happens!  
    dc.renderAll();
});

// 07 constructor function for row charts
var RowChart = function (facts, attribute, width, maxItems) {
    this.dim = facts.dimension(dc.pluck(attribute));
    dc.rowChart("#dc-chart-" + attribute)
        .dimension(this.dim)
        .group(this.dim.group().reduceSum(dc.pluck("amount")))
        .data(function (d) { return d.top(maxItems); })
        .width(width)
        .height(maxItems * 22)
        .margins({ top: 0, right: 10, bottom: 20, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(5)
        .xAxis().ticks(4).tickFormat(d3.format(".2s"));
}


