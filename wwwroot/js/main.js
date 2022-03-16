
anychart.onDocumentReady(function () {

    var setupSeries = function (series, color) {
        series.direction("up");
        //marker
        series.normal().stroke({ color: 'black', thickness: 1, lineCap: 'round' });
        series.normal().markers().size(8);
        series.markers().type("diamond");
        series.markers().fill([color + ' 0.7', color + ' 1.0'], 270);
        //label
        series.labels().width(150);
        series.labels().useHtml(true);
        var momentLabelFormat = "<font style='font-size:12px; font-weight:bold'>{%y}</font> <br/> {%x}{dateTimeFormat:dd MMM}";
        series.labels().format(momentLabelFormat);
        series.labels().background().fill(["1.0 white"]).stroke("white");
    };

    var setupYear = function (chart, oriData) {
        var data = [];
        data.push([Date.UTC(oriData.minYear, oriData.minMonth - 1, oriData.minDay), oriData.minYear]);
        for (var i = 0; i < oriData.yearFlags.length; i++) {
            var year = oriData.yearFlags[i];
            data.push([Date.UTC(year, 0, 1), year.toString()]);
        }
    };

    var setupAxis = function (chart, color) {
        chart.axis().height(40);
        chart.axis().fill([color + ' 0.7', color + ' 1.0'], 270);
        chart.axis().stroke("white");
        chart.axis().ticks().stroke("white 0.1", 3);
        // format labels of the axis
        chart.axis().labels().format(
            "{%tickValue}{dateTimeFormat: MMM}"
        );
    };

    var setupData = function (data, originalData) {
        for (var i = 0; i < originalData.data.length; i++) {
            var d = originalData.data[i];
            data.push(
                {
                    moment: [Date.UTC(d.year, d.month - 1, d.day), d.title],
                    color: d.color,
                }
            );
        }
    };

    var setupRange = function (chart, data) {
        chart.scale().maximum(Date.UTC(data.maxYear, data.maxMonth - 1, data.maxDay));
        chart.scale().minimum(Date.UTC(data.minYear, data.minMonth - 1, data.minDay));
        chart.scale().zoomLevels([
            [
                { "unit": "month", count: 1 },
            ]
        ]);
    };

    var importData = function (chart, data) {
        for (var i = 0; i < data.length; i++) {
            var momentSeries = chart.moment([data[i].moment]);
            setupSeries(momentSeries, data[i].color);
        }
    };

    // create a chart
    var chart = anychart.timeline();
    //line
    setupYear(chart, originalData);
    // range
    setupRange(chart, originalData);
    // data init
    setupData(data, originalData);
    //import data
    importData(chart, data);
    //axis
    setupAxis(chart, '#5b6e89');
    //set the container id
    chart.container("container");
    //initiate drawing the chart  
    chart.draw();
});