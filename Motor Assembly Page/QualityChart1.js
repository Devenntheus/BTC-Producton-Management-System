document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.createElement('canvas');
    document.body.appendChild(ctx);

    const data = {
        labels: ['Inspection 1-B', 'Assembly 1-A', 'Cloud Motor Assembly', 'Cloud Rotor Assembly'],
        datasets: [{
            label: 'Inspection',
            data: [0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }, {
            label: 'Assembly',
            data: [0, 11, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }, {
            label: 'Assembly',
            data: [0, 0, 20, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }, {
            label: 'Assembly',
            data: [0, 0, 0, 18],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
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
                    // Specify the exact values you want to display
                    stepSize: 5, // set the step size to 5
                    callback: function(value) {
                        if (value === 0) return ''; // Hide the '0' label if desired
                        return value;
                    }
                },
                min: 0,
                max: 20 // set the maximum value to 20
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