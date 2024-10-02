// Show loading animation
const loading = document.getElementById('loading');
const table = document.getElementById('manhoursTable');
loading.style.display = 'block'; // Show the loading spinner

// Fetch manhours data from the server
fetch('http://localhost:3001/api/manhours')
    .then(response => response.json())
    .then(data => {
        // Extract labels and manhours from the server response
        const labels = data.map(row => row.Label);
        const availableManhours = data.map(row => row.AvailableManhours);
        const presentManhours = data.map(row => row.PresentManhours);

        // Initialize chart data using data from the database
        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Available Manhours',
                    data: availableManhours,
                    backgroundColor: 'rgba(21, 96, 130, 1)', // Use a color for bars
                    borderColor: 'rgba(75, 192, 192, 0.8)',
                    borderWidth: 1
                },
                {
                    label: 'Present Manhours',
                    data: presentManhours,
                    backgroundColor: 'rgba(233, 113, 50, 1)', // Use a different color for bars
                    borderColor: 'rgba(255, 99, 132, 0.8)',
                    borderWidth: 1
                }
            ]
        };

        // Create a bar chart
        const ctx = document.getElementById('manhoursChart').getContext('2d');
        const manhoursChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: false,
                        display: false,
                        ticks: {
                            font: { size: 3 },
                            maxRotation: 0,
                            minRotation: 0
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: false,
                            text: 'Percentage (%)',
                            font: { size: 16 }
                        },
                        ticks: {
                            callback: function (value) {
                                return value.toFixed(2); // Format y-axis values to 2 decimal points
                            },
                            font: { size: 12 }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Today\'s Manhours',
                        font: { size: 12, color: '#333' }
                    }
                }
            }
        });

        // Populate the table with data
        const tableBody = document.getElementById('tableBody');
        let totalHCIValue = 0;
        let totalPresentValue = 0;

        // Create a row for HCI values and Present values
        const rowHCI = document.createElement('tr');
        const rowPresent = document.createElement('tr');

        // Add header cells with color boxes
        rowHCI.innerHTML = `<th class="legend-left"><div class="legend-box legend-hci"></div>HCI</th>`;
        rowPresent.innerHTML = `<th class="legend-left"><div class="legend-box legend-present"></div>Present</th>`;

        // Add cells for HCI and Present values
        labels.forEach((label, index) => {
            // Add a cell to the HCI row
            const cellHCI = document.createElement('td');
            cellHCI.textContent = availableManhours[index];
            rowHCI.appendChild(cellHCI);

            // Add a cell to the Present row
            const cellPresent = document.createElement('td');
            cellPresent.textContent = presentManhours[index];
            rowPresent.appendChild(cellPresent);

            // Calculate totals
            totalHCIValue += availableManhours[index];
            totalPresentValue += presentManhours[index];
        });

        // Append the rows to the table body
        tableBody.appendChild(rowHCI);
        tableBody.appendChild(rowPresent);

        // Hide loading animation and show the table
        loading.style.display = 'none'; // Hide loading spinner
        table.style.display = 'table'; // Show the table
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        loading.style.display = 'none'; // Hide loading spinner in case of error
    });
