function toggleEndDate() {
    const endDate = document.getElementById('endDate');
    const dateRange = document.getElementById('dateRange');
    endDate.disabled = !dateRange.checked;
}