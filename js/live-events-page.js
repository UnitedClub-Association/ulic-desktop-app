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

    // FIX: This is the robust way to check for live events
    const liveEvents = allEvents.filter(event => {
        const startTime = new Date(event.start_time);
        const endTime = new Date(event.end_time);
        // Ensure dates are valid before comparing
        return !isNaN(startTime) && !isNaN(endTime) && startTime <= now && now <= endTime;
    });

    const typeFilter = document.getElementById('type-filter');

    function applyFilters() {
        const selectedType = typeFilter.value;
        let filtered = liveEvents; // Start with the pre-filtered live list
        if (selectedType !== 'all') {
            filtered = filtered.filter(e => e.type === selectedType);
        }
        renderCards('events-grid', filtered);
    }

    typeFilter.addEventListener('change', applyFilters);
    applyFilters();
});