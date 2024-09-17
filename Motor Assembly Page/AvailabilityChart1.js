document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.createElement('canvas');
    document.body.appendChild(ctx);

    const data = {
        labels: ['Inspection 1-B', 'Assembly 1-A', 'Cloud Motor Assembly', 'Cloud Rotor Assembly'],
        datasets: [{
            label: 'Cloud Motor Assembly',
            data: [0, 0, 0.1, 0],
            backgroundColor: 'red'
        }, {
            label: 'Cloud Rotor Assembly',
            data: [0, 0, 0, 0.2],
            backgroundColor: 'red'
        }, {
            label: 'Inspection',
            data: [10, 6, 0, 0],
            backgroundColor: 'orange'
        }, {
            label: 'Assembly',
            data: [0, 4, 9.9, 9.8],
            backgroundColor: 'green'
        }]
    };

    const options = {
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
});