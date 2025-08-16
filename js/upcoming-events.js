document.addEventListener('DOMContentLoaded', async () => {
    // Navbar injection...
    fetch('../../components/navbar.html').then(r => r.text()).then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
        const script = document.createElement('script');
        script.src = '../../js/navbar.js';
        document.body.appendChild(script);
    });

    const allEvents = await fetchAllEvents();
    const now = new Date();
    // FIX: Correctly define the 30-day window for upcoming events
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const upcomingEvents = allEvents.filter(event => {
        const startTime = new Date(event.start_time);
        return startTime > now && startTime <= thirtyDaysFromNow;
    });

    const typeFilter = document.getElementById('type-filter');
    const monthFilter = document.getElementById('month-filter');
    const yearFilter = document.getElementById('year-filter');

    function populateFilters(events) {
        const monthMap = new Map();
        const years = new Set();
        events.forEach(event => {
            const date = new Date(event.start_time);
             if (!isNaN(date)) {
                monthMap.set(date.getMonth(), date.toLocaleString('default', { month: 'long' }));
                years.add(date.getFullYear());
            }
        });
        const sortedMonths = [...monthMap.entries()].sort((a, b) => a[0] - b[0]);
        monthFilter.innerHTML = '<option value="all">All Months</option>';
        sortedMonths.forEach(([_, name]) => monthFilter.innerHTML += `<option value="${name}">${name}</option>`);
        yearFilter.innerHTML = '<option value="all">All Years</option>';
        [...years].sort((a, b) => b - a).forEach(y => yearFilter.innerHTML += `<option value="${y}">${y}</option>`);
    }

    function applyFilters() {
        const selectedType = typeFilter.value;
        const selectedMonth = monthFilter.value;
        const selectedYear = yearFilter.value;
        let filtered = upcomingEvents; // Start with the pre-filtered upcoming list
        if (selectedType !== 'all') filtered = filtered.filter(e => e.type === selectedType);
        if (selectedMonth !== 'all') filtered = filtered.filter(e => new Date(e.start_time).toLocaleString('default', { month: 'long' }) === selectedMonth);
        if (selectedYear !== 'all') filtered = filtered.filter(e => new Date(e.start_time).getFullYear() == selectedYear);
        renderCards('events-grid', filtered);
    }

    [typeFilter, monthFilter, yearFilter].forEach(filter => filter.addEventListener('change', applyFilters));
    populateFilters(upcomingEvents);
    applyFilters();
});