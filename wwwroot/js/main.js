
function setupSeries(series, color) {
    series.direction("up");
    series.normal().stroke("black", 1, "0", "diamond");
    series.normal().markers().size(8);
    series.markers().type("diamond");
    series.markers().fill([color + ' 0.7', color + ' 1.0'], 270);
    //label
    series.labels().width(150);
    // series.labels().height('auto');
    series.labels().useHtml(true);
    var momentLabelFormat = "<font style='font-size:12px; font-weight:bold'>{%y}</font> <br/> {%x}{dateTimeFormat:dd MMM}";
    series.labels().format(momentLabelFormat);
    series.labels().background().fill(["1.0 white"]).stroke("white");
}

function setupYear(chart, oriData) {
    let data = [];
    // data.push([Date.UTC(oriData.minYear, oriData.minMonth - 1, oriData.Day), oriData.minYear.toString()]);
    data.push([Date.UTC(oriData.minYear, oriData.minMonth - 1, oriData.minDay), oriData.minYear]);
    oriData.yearFlags.forEach(y => {
        data.push([Date.UTC(y, 0, 1), y.toString()]);
    });
    yearMnt = chart.moment(data);
    yearMnt.direction("up");
    yearMnt.normal().stroke("white 0", 0, "0", "diamond");
    var momentLabelFormat = "<font style='font-size:12px; font-weight:bold; color: orange'>{%y}</font>";
    yearMnt.labels().width(50);
    yearMnt.labels().useHtml(true);
    yearMnt.labels().format(momentLabelFormat);
    yearMnt.labels().background().fill(["0 white 0"]).stroke("white 0");
}

function setupAxis(chart, color) {
    chart.axis().height(40);
    chart.axis().fill([color + ' 0.7', color + ' 1.0'], 270);
    chart.axis().stroke("white");
    chart.axis().ticks().stroke("white 0.1", 3);

    // format labels of the axis
    chart.axis().labels().format(
        "{%tickValue}{dateTimeFormat: MMM}"
    );
}

function setupData(data, originalData) {
    originalData.data.forEach(d => {
        data.push(
            {
                moment: [Date.UTC(d.year, d.month - 1, d.day), d.title],
                color: d.color,
            }
        );
    });
}

function setupRange(chart, data) {
    chart.scale().maximum(Date.UTC(data.maxYear, data.maxMonth - 1, data.maxDay));
    chart.scale().minimum(Date.UTC(data.minYear, data.minMonth - 1, data.minDay));
    chart.scale().zoomLevels([
        [
            { "unit": "month", count: 1 },
        ]
    ]);
}
// create a chart
var chart = anychart.timeline();
//line
setupYear(chart, originalData);
//range
setupRange(chart, originalData);
//data init
setupData(data, originalData);
//import data
data.forEach(row => {
    const momentSeries = chart.moment([row.moment]);
    setupSeries(momentSeries, row.color);
});
//axis
setupAxis(chart, '#5b6e89');

//set the container id
chart.container("container");
//initiate drawing the chart  
chart.draw();