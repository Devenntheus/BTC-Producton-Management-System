document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3001/api/alerts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('alert-body');
            if (data.length === 0) {
                console.log('No alerts found');
                return;
            }
            data.forEach(alert => {
                const row = document.createElement('tr');
                
                const severityCell = document.createElement('td');
                severityCell.className = `severity ${alert.Severity.toLowerCase()}`;
                severityCell.textContent = alert.Severity;
                row.appendChild(severityCell);
                
                const timeCell = document.createElement('td');
                timeCell.textContent = alert.Time;
                row.appendChild(timeCell);
                
                const alertNameCell = document.createElement('td');
                alertNameCell.textContent = alert.AlertName;
                row.appendChild(alertNameCell);
                
                const issueCell = document.createElement('td');
                issueCell.textContent = alert.Issue;
                row.appendChild(issueCell);
                
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching alert data:', error);
        });
});