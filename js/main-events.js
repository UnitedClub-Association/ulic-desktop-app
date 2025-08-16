document.addEventListener('DOMContentLoaded', async () => {
    // Inject Navbar
    fetch('../components/navbar.html').then(r => r.text()).then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
        const script = document.createElement('script');
        script.src = '../js/navbar.js';
        document.body.appendChild(script);
    });

    // MAIN LOGIC
    const allEvents = await fetchAllEvents();
    const now = new Date();

    const liveEvents = allEvents.filter(e => new Date(e.start_time) <= now && now <= new Date(e.end_time));
    const upcomingEvents = allEvents.filter(e => new Date(e.start_time) > now);
    const featuredEvents = allEvents.filter(e => e.is_featured === true);

    renderCards('live-events-grid', liveEvents.slice(0, 3));
    renderCards('upcoming-events-grid', upcomingEvents.slice(0, 3));
    renderCards('featured-events-grid', featuredEvents.slice(0, 3));

    if (liveEvents.length > 3) {
        document.querySelector('#live-events-section .view-all-btn').style.display = 'block';
    }
    if (upcomingEvents.length > 3) {
        document.querySelector('#upcoming-events-section .view-all-btn').style.display = 'block';
    }
    document.querySelector('#featured-events-section .view-all-btn').style.display = 'block';
});