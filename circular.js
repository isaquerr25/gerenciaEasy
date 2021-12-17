
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Data', 'Valor'],
        ['2013',  1000],
        ['2014',  1170],
        ['2015',  660],
        ['2016',  1030]
    ]);

    var options = {
        hAxis: {
            format: 'MMM/yyyy',
            gridlines: {
                count: 5
            },
            title: 'Data'
        },
        vAxis: {
            format: 'currency',
            title: 'Valor'
        },
        colors: ['#4f70ce'],
        trendlines: {
            1: { 
                type: 'linear', 
                color: '#111', 
                opacity: .5 
            }
        },
        animation: {
            "startup": true,
            duration: 1000,
            easing: 'out',
        },
        legend: {
            position: 'bottom',
        },
        chartArea: {
            width: '80%', 
            height: '75%',
            left: '13%',
            top: '5%'
        },
        pointsVisible: true,
        backgroundColor:'transparent'
    };

    let container = document.getElementById('chart_div')
    var chart = new google.visualization.LineChart(container);
    
    google.visualization.events.addListener(chart, 'ready', function () {
        var observer = new MutationObserver(function () {

            container.getElementsByTagName('svg')[0].setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            Array.prototype.forEach.call(container.getElementsByTagName('path'), function(rect) {

                if (rect.getAttribute('fill') === '#94915e') {
                rect.setAttribute('fill', 'url(#MyGradient) red');
                }
            });
        });
        observer.observe(container, {
            childList: true,
            subtree: true
        });
    });



    chart.draw(data, options);
    
    setTimeout(()=>{
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales'],
            ['2013',  10],
            ['2014',  10],
            ['2015',  60],
            ['2016',  710],
            ['2017',  710],
            ['2018',  210],
            ['2019',  910]
        ]);
        chart.draw(data, options);
        
    },5000
    )
    
    
}


function applyGradient() {

    console.log("pato")
}


