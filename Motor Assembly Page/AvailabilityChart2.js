document.addEventListener("DOMContentLoaded", async function() {
    const ctx = document.createElement('canvas');
    document.body.appendChild(ctx);

    // Fetch the data from the API
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/availability2');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching the availability chart data:', error);
            return [];
        }
    };

    const rawData = await fetchData();
    
    // Process the data
    const labels = rawData.map(item => item.label);
    const durationSumData = rawData.map(item => item.duration_sum);
    const cumulativePercentageData = rawData.map(item => item.cumulative_percentage);

    const data = {
        labels: labels,
        datasets: [
            {
                type: 'line',
                label: 'Cumulative Percentage',
                data: cumulativePercentageData,
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
                label: 'Duration - Sum',
                data: durationSumData,
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