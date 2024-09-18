const ctx = document.getElementById('attendanceChart').getContext('2d');
const attendanceChart = new Chart(ctx, {
    type: 'line', // Initialize with line type
    data: {
        labels: ['Sub Assy', 'Pre Assy TOWER', 'Main Assy', 'Sub Assy', 'Pre Assy DISPENSER', 'Main Assy'],
        datasets: [
            {
                label: 'Rate',
                data: [50, 70, 60, 80, 40, 90],
                borderColor: 'rgba(25, 107, 36, 1)',
                backgroundColor: 'rgba(25, 107, 36, 1)',
                type: 'line',
                yAxisID: 'y1',
                fill: false,
                borderWidth: 3,
                pointRadius: 3
            },
            {
                label: 'HC',
                data: [5, 6, 5, 7, 5, 6],
                backgroundColor: 'rgba(21, 96, 130, 1)',
                borderColor: 'rgba(21, 96, 130, 1)',
                borderWidth: 1,
                type: 'bar',
                yAxisID: 'y'
            },
            {
                label: 'Present',
                data: [4, 6, 3, 6, 3, 6],
                backgroundColor: 'rgba(233, 113, 50, 1)',
                borderColor: 'rgba(233, 113, 50, 1)',
                borderWidth: 1,
                type: 'bar',
                yAxisID: 'y'
            }
        ]
    },
    options: {
        scales: {
            x: {
                beginAtZero: true,
                stacked: false,
                display: false,
                ticks: {
                    font: {
                        size: 10 // Adjusted font size for clarity
                    },
                    maxRotation: 0,
                    minRotation: 0
                }
            },
            y: {
                beginAtZero: true,
                max: 8,
                ticks: {
                    stepSize: 1,
                    font: {
                        size: 12
                    }
                },
                title: {
                    display: false,
                    text: 'Count'
                }
            },
            y1: {
                beginAtZero: true,
                max: 120,
                position: 'right',
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    },
                    font: {
                        size: 12
                    }
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Today\'s Attendance Rate', // Chart title
                font: {
                    size: 12,
                    fontColor: '#333'
                }
            }
        }
    }
});

// Populate the table with data
const tableBody = document.getElementById('tableBody');

let totalHCIValue = 0;
let totalPresentValue = 0;
let totalRateValue = 0;

// Create rows for HCI, Present, and Rate values
const rowHCI = document.createElement('tr');
const rowPresent = document.createElement('tr');
const rowRate = document.createElement('tr');

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
rowRate.innerHTML = `
    <th class="legend-left">
        <div class="legend-box legend-rate"></div>
        Rate
    </th>
`;

// Add cells for HCI, Present, and Rate values
attendanceChart.data.labels.forEach((label, index) => {
    // Add a cell to the HCI row
    const cellHCI = document.createElement('td');
    cellHCI.textContent = `${attendanceChart.data.datasets[1].data[index]}`;
    rowHCI.appendChild(cellHCI);

    // Add a cell to the Present row
    const cellPresent = document.createElement('td');
    cellPresent.textContent = `${attendanceChart.data.datasets[2].data[index]}`;
    rowPresent.appendChild(cellPresent);

    // Add a cell to the Rate row
    const cellRate = document.createElement('td');
    cellRate.textContent = `${attendanceChart.data.datasets[0].data[index]}%`;
    rowRate.appendChild(cellRate);

    // Calculate totals
    totalHCIValue += attendanceChart.data.datasets[1].data[index];
    totalPresentValue += attendanceChart.data.datasets[2].data[index];
    totalRateValue += attendanceChart.data.datasets[0].data[index];
});

// Append the rows to the table body
tableBody.appendChild(rowHCI);
tableBody.appendChild(rowPresent);
tableBody.appendChild(rowRate);
