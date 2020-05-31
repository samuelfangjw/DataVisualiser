google.charts.load('current', {'packages':['corechart','timeline']});
google.charts.setOnLoadCallback(drawTimeline);
google.charts.setOnLoadCallback(drawPieChart);

const array = [['Activity', 'Start Time', 'End Time']];
const pie_array = [['Task', 'Hours per Day']];
const bar_array = [['Task', 'Hours per Day', {role: 'style'}]];
const raw_array = JSON.parse(localStorage.getItem("array"));
let length = raw_array.length;
const colors = [
  "#3366cc",
  "#dc3912",
  "#ff9900",
  "#109618",
  "#990099",
  "#0099c6",
  "#dd4477",
  "#66aa00",
  "#b82e2e",
  "#316395",
  "#994499",
  "#22aa99",
  "#aaaa11",
  "#6633cc",
  "#e67300",
  "#8b0707",
  "#651067",
  "#329262",
  "#5574a6",
  "#3b3eac",
  "#b77322",
  "#16d620",
  "#b91383",
  "#f4359e",
  "#9c5935",
  "#a9c413",
  "#2a778d",
  "#668d1c",
  "#bea413",
  "#0c5922",
  "#743411",
]

//generating arrays from string data
for(let i = 0; i < length; i++) {
  const temp_arr = raw_array[i];
  const activity = temp_arr[0];
  const hours1 = temp_arr[1];
  const minutes1 = temp_arr[2];
  const hours2 = temp_arr[3];
  const minutes2 = temp_arr[4];
  let datefrom = new Date(0, 0, 1, hours1, minutes1);
  let dateto = new Date(0, 0, 1, hours2, minutes2);
  if (hours1 > hours2 || (hours1 == hours2 && minutes1 > minutes2)) {
    datefrom = new Date(0, 0, 0, hours1, minutes1);
    dateto = new Date(0, 0, 1, hours2, minutes2);
  }
  array.push([activity,datefrom,dateto]);
}

for(let i = 1; i <= length; i++) {
  const temp_arr = array[i];
  const activity = temp_arr[0];
  const time_spent = Math.abs(temp_arr[1] - temp_arr[2]) / 36e5;
  let index = 0;
  for (j = 1; j <= i - 1; j++) {
    if (array[j][0] == activity) {
        index = j;
        break;
    }
  }
  if (index == 0) {
    pie_array.push([activity, time_spent]);
  } else {
    pie_array[index][1] += time_spent;
  }
  
}

length = pie_array.length;

for (let i = 1; i < length; i++){ 
  const temp_arr = pie_array[i];
  const activity = temp_arr[0];
  const time_spent = temp_arr[1];
  const color = colors[((i-1) % 32)];
  bar_array.push([activity, time_spent, color]);
}

function drawTimeline() {
  var data = google.visualization.arrayToDataTable(array);

  var options = {
    height: 450,
  };

  var chart = new google.visualization.Timeline(document.getElementById('chart_div'));

  chart.draw(data, options);
}

function drawPieChart() {
  var data = google.visualization.arrayToDataTable(pie_array);
  var bardata = google.visualization.arrayToDataTable(bar_array);

  var pieoptions = {
    title: 'Pie Chart',
    titleTextStyle: { fontSize: 20},
    height: 300,
    width: 500,
  };

  var baroptions = {
    title: 'Bar Chart',
    titleTextStyle: { fontSize: 20},
    width: 700,
    height: 300,
    //to hide the lengend
    legend: {position: 'none'}
  };

  var piechart = new google.visualization.PieChart(document.getElementById('piechart'));
  var barchart = new google.visualization.ColumnChart(document.getElementById('barchart'));

  piechart.draw(data, pieoptions);
  barchart.draw(bardata, baroptions);
}