document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.createElement('canvas');
    document.body.appendChild(ctx);

    const data = {
        labels: ['Mechani...', 'Broken / ...', 'Burrs / S...', 'Lead D...', 'Rough/Ti...', 'Noisy', 'Missing P...', ''], // Add an empty label for the invisible bar
        datasets: [
            {
                type: 'line',
                label: 'Cumulative Percentage',
                data: [25, 50, 65, 75, 85, 95, 100, 100], // Include the extra data point
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
                fill: false,
                yAxisID: 'y1',
                tension: 0.4,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 7
            },
            {
                type: 'bar',
                label: '',
                data: [13, 12, 7, 6, 4, 4, 3, 0], // Add an invisible bar with value 0
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                yAxisID: 'y',
            }   
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                ticks: {
                    callback: function(value) {
                        if ([2, 6, 10, 14].includes(value)) {
                            return value;
                        }
                        return '';
                    },
                },
                min: 0,
                max: 14, // Adjust the max value as needed
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                }
            },
            y1: {
                type: 'linear',
                position: 'right',
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    },
                    stepSize: 20, // Adjust this value to get the desired step interval
                },
                min: 0,
                max: 100, // Adjust the max value as needed
                grid: {
                    drawOnChartArea: false,
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        }
    };

    new Chart(ctx, {
        data: data,
        options: options
    });
});