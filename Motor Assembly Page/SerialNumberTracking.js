document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("serial-body");

    const data = [
        { serialNo: 1, station: "Station 10", startTime: "18:20:59", endTime: "18:33:59", totalTime: "13.0" },
        { serialNo: 2, station: "Station 2", startTime: "17:54:59", endTime: "18:37:59", totalTime: "43.0" },
        { serialNo: 3, station: "Station 9", startTime: "20:20:59", endTime: "21:03:59", totalTime: "43.0" },
        { serialNo: 4, station: "Station 4", startTime: "14:59:59", endTime: "15:15:59", totalTime: "16.0" }
    ];

    data.forEach(entry => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.serialNo}</td>
            <td>${entry.station}</td>
            <td>${entry.startTime}</td>
            <td>${entry.endTime}</td>
            <td>${entry.totalTime} minutes</td>
        `;

        tableBody.appendChild(row);
    });
});
