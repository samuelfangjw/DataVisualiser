google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);

const array = [['Activity', 'Start Time', 'End Time']];
const raw_array = JSON.parse(localStorage.getItem("array"));
const length = raw_array.length;

for(let i = 0; i < length; i++) {
  const temp_arr = raw_array[i];
  const activity = temp_arr[0];
  const hours1 = temp_arr[1];
  const minutes1 = temp_arr[2];
  const hours2 = temp_arr[3];
  const minutes2 = temp_arr[4];
  const datefrom = new Date(2020, 01, 01, hours1, minutes1);
  const dateto = new Date(2020, 01, 01, hours2, minutes2);
  array.push([activity,datefrom,dateto]);
}

function drawChart() {
  var data = google.visualization.arrayToDataTable(array);

  var options = {
    height: 450,
  };

  var chart = new google.visualization.Timeline(document.getElementById('chart_div'));

  chart.draw(data, options);
}