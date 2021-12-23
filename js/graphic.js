google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
  
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            [('string', 'x'), 'Sales'],
            ['2001', 100 ],
            ['2002', 800 ],
            ['2003', 900 ],
            ['2004', 1000 ],
            ['2005', 1170],
            ['2006', 660],
            ['2007', 1030],      
          ]);
          data.addColumn('number', 'X');
          var options = {
            legend: 'none',
            backgroundColor:'transparent',
            curveType: 'function',
            legend:'none',
            
            width: 400,
            height: 280,
            vAxis: {
                maxValue: 10
            },


            annotations: {
                annotations: {
                    style: 'line'
                },
                textStyle: {
                  fontName: 'Times-Roman',
                  fontSize: 18,
                  bold: true,
                  italic: true,
                  // The color of the text.
                  color: '#3dd705',
                  // The color of the text outline.
                  auraColor: '#3dd705',
                  // The transparency of the text.
                  opacity: 0.8
                }
              },
              

          };
  
          var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  
          chart.draw(data, options);
        }