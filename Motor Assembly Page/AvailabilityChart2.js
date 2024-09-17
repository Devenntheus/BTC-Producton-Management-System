document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.createElement('canvas');
    document.body.appendChild(ctx);

    const data = {
        labels: ['Assembly', 'Other', 'Equipment', 'Part Qual...', 'No Materi...'],
        datasets: [
            {
                type: 'bar',
                label: 'Duration - Sum',
                data: [1500, 1300, 200, 100, 50], // Example data, replace with your actual data
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                yAxisID: 'y',
            },
            {
                type: 'line',
                label: 'Cumulative Percentage',
                data: [50, 88, 97, 99, 100], // Example cumulative percentages, replace with your actual data
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
                fill: false,
                yAxisID: 'y1',
                tension: 0.4,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 7
            }
        ]
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                ticks: {
                    callback: function(value) {
                        const hours = Math.floor(value / 3600);
                        const minutes = Math.floor((value % 3600) / 60);
                        const seconds = value % 60;
                        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                    },
                    stepSize: 500, // Adjust this value to get the desired step interval
                },
                min: 0,
                max: 2000, // Adjust the max value as needed
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