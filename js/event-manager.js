/**
 * @file Manages fetching and rendering event data from Supabase.
 */

/**
 * Fetches all events from the Supabase 'events' table with caching.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of event objects.
 */
async function fetchAllEvents() {
    try {
        const cacheKey = 'events_cache';
        const cache = JSON.parse(localStorage.getItem(cacheKey));
        if (cache && Date.now() - cache.timestamp < 5 * 60 * 1000) { // 5-min cache
            return cache.data;
        }

        const { data, error } = await sb
            .from('events')
            .select('id, name, description, start_time, end_time, type, banner_url, redirect_url, is_featured')
            .order('start_time', { ascending: false });

        if (error) {
            console.error('Error fetching events:', error);
            return [];
        }

        const events = data || [];
        localStorage.setItem(cacheKey, JSON.stringify({ data: events, timestamp: Date.now() }));
        return events;
    } catch (error) {
        console.error('Unexpected error fetching events:', error);
        return [];
    }
}

/**
 * Creates an HTML event card element from a database record.
 * @param {object} event - The event object from Supabase.
 * @returns {HTMLElement} The card element.
 */
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'card';
    const now = new Date();

    if (new Date(event.start_time) <= now && new Date(event.end_time) >= now) {
        card.classList.add('live');
    }
    if (event.is_featured) {
        card.classList.add('featured');
    }

    const banner = event.banner_url ? `<img src="${event.banner_url}" alt="${event.name}" class="card-image">` : '';
    const redirect = event.redirect_url ? `<a href="${event.redirect_url}" class="view-all-btn" style="margin-top: 0.5rem; display: inline-block;">Join Now</a>` : '';

    card.innerHTML = `
        ${banner}
        <div class="card-header">
            <h3>${event.name}</h3>
            <span class="card-event-type">${event.type}</span>
        </div>
        <div class="card-content">
            <p>${event.description || 'No description available.'}</p>
            ${redirect}
        </div>
    `;
    return card;
}

/**
 * Renders an array of events into a specified container.
 * @param {string} containerId - The ID of the element to render cards into.
 * @param {Array<object>} events - The array of event objects to render.
 */
function renderCards(containerId, events) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear previous content

    if (events && events.length > 0) {
        events.forEach(event => container.appendChild(createEventCard(event)));
    } else {
        container.innerHTML = '<p class="no-events-message" style="color:#ffbd59;">No events match the current criteria.</p>';
    }
}