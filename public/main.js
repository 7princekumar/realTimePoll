/*global fetch*/
/*global Headers*/
/*global CanvasJS*/
/*global Pusher*/
// contains all client side JS

const webURL = "https://sit-a7princekumar.c9users.io";

// FORM SUBMIT EVENT
const form = document.getElementById('vote-form');

form.addEventListener('submit', e => {
    // e -> event parameter
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};
    
    //send post request
    fetch('https://sit-a7princekumar.c9users.io/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers : new Headers({
                      'Content-Type': 'application/json'
                  })
    })
    .then(res => res.json()) //when post req done, save the res
    .then(data => console.log(data)) //then print the data
    .catch(err => console.log(err)); //if error, print error
    
    e.preventDefault();
});



let dataPoints = [ //let, cuz we will be changing the data later on
    {label: 'Windows', y: 0},
    {label: 'MacOS', y: 0},
    {label: 'Linux', y: 0},
    {label: 'Other', y: 0},
];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer){
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'OS Results'
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }    
        ]
    });
    chart.render();
    
    
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('1c784d448207656eb4f6', {
      cluster: 'ap2',
      encrypted: true
    });

    var channel = pusher.subscribe('os-poll'); //my-channel -> os-poll
    channel.bind('os-vote', function(data) { //my-event -> os-vote
      dataPoints = dataPoints.map(x => {
          if(x.label == data.os){
              x.y += data.points;
              return x;
          } else {
              return x;
          }
      });
      chart.render(); //re-render the chart as we changed some data
    });
    
}