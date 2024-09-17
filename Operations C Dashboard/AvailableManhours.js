// Initialize chart data
const chartData = {
    labels: [
        'Sub Assy TOWER',
        'Pre Assy TOWER',
        'Main Assy TOWER',
        'Sub Assy DISPENSER',
        'Pre Assy DISPENSER',
        'Main Assy DISPENSER',
        'TOTAL'
    ],
    datasets: [
        {
            label: 'Available Manhours',
            data: [53.75, 64.5, 53.75, 75.25, 53.75, 64.5, 365.5], // Adjust data values accordingly
            backgroundColor: 'rgba(21, 96, 130, 1)', // Use a color for bars
            borderColor: 'rgba(75, 192, 192, 0.8)',
            borderWidth: 1
        },
        {
            label: 'Present Manhours',
            data: [43, 64.5, 32.25, 64.5, 32.25, 64.5, 301], // Adjust data values accordingly
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
        maintainAspectRatio: false, // Allows the chart to adjust to the container's dimensions
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Percentage (%)', // Y-axis label
                    font: {
                        size: 16
                    }
                },
                ticks: {
                    callback: function(value) {
                        // Format the y-axis values to 2 decimal points
                        return value.toFixed(2);
                    }
                }
                
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Today\'s Manhours', // Chart title
                font: {
                    size: 24,
                    fontColor: '#333'
                }
            }
        }
    }
});

// Populate the table with data
const tableBody = document.getElementById('tableBody');
const totalHCI = document.getElementById('totalHCI');
const totalPresent = document.getElementById('totalPresent');

let totalHCIValue = 0;
let totalPresentValue = 0;

// Create a row for HCI values and Present values
const rowHCI = document.createElement('tr');
const rowPresent = document.createElement('tr');

// Add header cells with color boxes
rowHCI.innerHTML = `
    <th class="legend-left">
        <div class="legend-box legend-hci"></div>
        HCI
    </th>
`;
rowPresent.innerHTML = `
    <th class="legend-left">
        <div class="legend-box legend-present"></div>
        Present
    </th>
`;

// Add cells for HCI and Present values
chartData.labels.forEach((label, index) => {
    // Add a cell to the HCI row
    const cellHCI = document.createElement('td');
    cellHCI.textContent = `${chartData.datasets[0].data[index]}`;
    rowHCI.appendChild(cellHCI);

    // Add a cell to the Present row
    const cellPresent = document.createElement('td');
    cellPresent.textContent = `${chartData.datasets[1].data[index]}`;
    rowPresent.appendChild(cellPresent);

    // Calculate totals
    totalHCIValue += chartData.datasets[0].data[index];
    totalPresentValue += chartData.datasets[1].data[index];
});

// Append the rows to the table body
tableBody.appendChild(rowHCI);
tableBody.appendChild(rowPresent);

// Set totals in the table footer
totalHCI.textContent = `${totalHCIValue}`;
totalPresent.textContent = `${totalPresentValue}`;