const ctx = document.getElementById('barChart').getContext('2d');
        const barChart = new Chart(ctx, {
            type: 'bar', // Use bar chart and make it horizontal
            data: {
                labels: ['Dispenser Main Assy', 'Dispenser Pre Assy', 'Dispenser Sub Assy', 'Tower Main Assy', 'Tower Pre Assy', 'Tower Sub Assy'],
                datasets: [{
                    label: 'Actual',
                    backgroundColor: 'rgba(233, 113, 50, 1)', // Use a different color for bars
                    borderColor: 'rgba(255, 99, 132, 0.8)',
                    barThickness: 30, // Adjust this value to change the width of the bars
                    data: [60, 55, 50, 45, 40, 65]
                }, {
                    label: 'Target',
                    backgroundColor: 'rgba(21, 96, 130, 1)', // Use a color for bars
                    borderColor: 'rgba(75, 192, 192, 0.8)',
                    barThickness: 30, // Adjust this value to change the width of the bars
                    data: [70, 60, 55, 50, 45, 70]
                }]
            },
            options: {
                indexAxis: 'y', // Make the bars horizontal
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 15, // Width of the legend color box
                            padding: 20, // Padding between the legend box and text
                            font: {
                                size: 12, // Font size of the legend text
                            },
                            color: '#333' // Color of the legend text
                        }
                    },
                    title: {
                        display: true,
                        text: 'Weekly Plan vs. Actual',
                        font: {
                            size: 12,
                            fontColor: '#333'
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 70, 
                        grid: {
                            drawBorder: false, // Optionally remove the vertical grid lines
                        }
                        
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 12,
                            }
                        },
                        grid: {
                            display: false // Remove horizontal grid lines
                        },
                        // Adjust spacing between bars
                        barPercentage: 0, // Adjust this value to change the width of the bars relative to the available space
                        categoryPercentage: 0 // Adjust this value to control the spacing between categories
                    }
                }
            }
        });