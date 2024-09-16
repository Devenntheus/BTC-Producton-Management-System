document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.createElement('canvas');
    document.body.appendChild(ctx);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '', '02:00', '', '04:00', '', '06:00', '', '08:00', '', '10:00', '', '12:00', ''],
            datasets: [{
                label: 'Performance',
                data: [108, 93, 98, 98, 104, 105, 102, 103, 104, 101, 102, 109, 100, 113],
                fill: false,
                borderColor: '#4BC0C0',
                pointBackgroundColor: '#FF5733', // Color of the dots
                tension: 0.4
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: '#000000'
                    },
                    grid: {
                        color: '#FFF' // white
                    }
                },
                y: {
                    min: 90, // Minimum value for y-axis
                    max: 115, // Maximum value for y-axis
                    ticks: {
                        color: '#000000'
                    },
                    grid: {
                        color: '#EBEBEB' // Light gray
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 100, // Adjust this value to the center of your chart
                            yMax: 100, // Adjust this value to the center of your chart
                            borderColor: 'black', // Color of the line
                            borderWidth: 2,
                            borderDash: [5, 5] // Dotted line
                        }
                    }
                }
            }
        }
    });
});