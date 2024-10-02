document.addEventListener("DOMContentLoaded", async function() {
    const ctx = document.createElement('canvas');
    document.body.appendChild(ctx);

    try {
        const response = await fetch('http://localhost:3001/api/availability');
        const availabilityData = await response.json();

        // Transform the data into the format required by Chart.js
        const labels = [];
        const datasets = {};
        
        availabilityData.forEach(record => {
            if (!labels.includes(record.label)) {
                labels.push(record.label);
            }
            if (!datasets[record.category]) {
                datasets[record.category] = {
                    label: record.category,
                    data: [],
                    backgroundColor: getColor(record.category) // Helper function to set colors based on category
                };
            }
            datasets[record.category].data.push(record.data);
        });

        const data = {
            labels: labels,
            datasets: Object.values(datasets)
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    ticks: {
                        callback: function(value) {
                            const times = ['00:00:00', '02:46:40', '05:33:20', '08:20:00', '11:06:40', '13:53:20'];
                            return times[value / 2]; // assuming 2 hours per tick
                        }
                    },
                    min: 0,
                    max: 12,
                    stepSize: 2
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        };

        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    } catch (error) {
        console.error('Error fetching availability data:', error);
    }
});

// Helper function to get color based on category
function getColor(category) {
    switch (category) {
        case 'Cloud Motor Assembly':
            return 'red';
        case 'Cloud Rotor Assembly':
            return 'red';
        case 'Inspection':
            return 'orange';
        case 'Assembly':
            return 'green';
        default:
            return 'gray';
    }
}