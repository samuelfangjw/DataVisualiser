const table = document.getElementById('table');
const activity = document.getElementById('activity');
const timefrom = document.getElementById('timefrom');
const timeto = document.getElementById('timeto');
const add = document.getElementById('add');
const generate = document.getElementById('generate');

var array = [];

function create_row (activity_val, timefrom_val, timeto_val) {
    const row = document.createElement('tr');
    const data1 = document.createElement('td');
    const data2 = document.createElement('td');
    const data3 = document.createElement('td');
    data1.textContent = activity_val;
    data2.textContent = timefrom_val;
    data3.textContent = timeto_val;
    row.appendChild(data1);
    row.appendChild(data2);
    row.appendChild(data3);
    return row;
}

function add_data () {
    const activity_value = activity.value;
    const timefrom_value = timefrom.value;
    const timeto_value = timeto.value;
    const row = create_row(activity_value, timefrom_value, timeto_value);
    table.appendChild(row);
    add_activity(activity_value, timefrom_value, timeto_value);
}

function add_activity(activity_val, timefrom_val, timeto_val) {
    const hours1 = timefrom_val.split(":")[0];
    const minutes1 = timefrom_val.split(":")[1];
    const hours2 = timeto_val.split(":")[0];
    const minutes2 = timeto_val.split(":")[1];
    array.push([activity_val, hours1, minutes1, hours2, minutes2]);
};

function generate_data () {
    localStorage.setItem('array', JSON.stringify(array));
    window.location.href = "visualiser.html";
}

add.addEventListener("click", add_data);
generate.addEventListener("click", generate_data);