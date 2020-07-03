google.charts.load("current", { packages: ["corechart", "timeline"] });
google.charts.setOnLoadCallback(drawTimeline);

const array = [["Activity", "Start Time", "End Time"]];
const raw_array = JSON.parse(localStorage.getItem("array"));
let length = raw_array.length;

//generating arrays from string data
for (let i = 0; i < length; i++) {
  const temp_arr = raw_array[i];
  const activity = temp_arr[0];
  const hours1 = parseInt(temp_arr[1]);
  const minutes1 = parseInt(temp_arr[2]);
  const hours2 = parseInt(temp_arr[3]);
  const minutes2 = parseInt(temp_arr[4]);
  console.log(hours1);
  console.log(minutes1);
  let datefrom = new Date(0, 0, 1, hours1, minutes1);
  let dateto = new Date(0, 0, 1, hours2, minutes2);
  if (hours1 > hours2 || (hours1 == hours2 && minutes1 > minutes2)) {
    datefrom = new Date(0, 0, 0, hours1, minutes1);
    dateto = new Date(0, 0, 1, hours2, minutes2);
  }
  array.push([activity, datefrom, dateto]);
}

function drawTimeline() {
  var data = google.visualization.arrayToDataTable(array);

  var options = {
    height: 450,
  };

  var chart = new google.visualization.Timeline(
    document.getElementById("chart_div")
  );

  chart.draw(data, options);
}
