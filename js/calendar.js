document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const calendarGrid = document.getElementById('calendar-grid');
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const upcomingEventsList = document.getElementById('upcoming-events-list');

    // State
    let currentDate = new Date();
    let allEvents = [];

    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const START_YEAR = 2024;
    const END_YEAR = 2100;

    /**
     * Main initialization function.
     */
    async function initialize() {
        if (!calendarGrid || !monthSelect || !yearSelect) {
            console.error("Calendar elements not found!");
            return;
        }

        populateSelects();
        addEventListeners();

        try {
            if (typeof eventManager === 'undefined') throw new Error("eventManager is not available.");
            allEvents = await eventManager.fetchAllEvents();
            renderAll();
        } catch (error) {
            console.error("Failed to fetch events:", error);
            calendarGrid.innerHTML = '<p style="color:red; grid-column: span 7;">Could not load events.</p>';
        }
    }

    /**
     * Populates the month and year select dropdowns.
     */
    function populateSelects() {
        monthSelect.innerHTML = MONTH_NAMES.map((month, index) => `<option value="${index}">${month}</option>`).join('');
        
        let yearHTML = '';
        for (let year = START_YEAR; year <= END_YEAR; year++) {
            yearHTML += `<option value="${year}">${year}</option>`;
        }
        yearSelect.innerHTML = yearHTML;
    }

    /**
     * Adds event listeners to the navigation controls.
     */
    function addEventListeners() {
        prevMonthBtn.addEventListener('click', () => changeMonth(-1));
        nextMonthBtn.addEventListener('click', () => changeMonth(1));
        monthSelect.addEventListener('change', updateDateFromSelects);
        yearSelect.addEventListener('change', updateDateFromSelects);
    }

    /**
     * Renders both the calendar grid and the upcoming events list.
     */
    function renderAll() {
        renderCalendar();
        renderUpcomingEvents();
    }

    /**
     * Renders the calendar grid for the current month and year.
     */
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Update selects to reflect current state
        yearSelect.value = year;
        monthSelect.value = month;

        calendarGrid.innerHTML = ''; // Clear previous grid

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        // Add empty cells for days before the 1st of the month
        for (let i = 0; i < firstDay; i++) {
            calendarGrid.innerHTML += '<div class="calendar-day empty"></div>';
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            
            const thisDate = new Date(year, month, day);

            // Check if this day is today
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('today');
            }

            // Check for events on this day
            const eventsOnDay = allEvents.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === day;
            });

            let eventIndicatorHTML = '';
            if (eventsOnDay.length > 0) {
                eventIndicatorHTML = '<div class="event-indicator"></div>';
            }
            
            dayCell.innerHTML = `<span class="day-number">${day}</span>${eventIndicatorHTML}`;
            
            // Add click listener to show events for this day
            dayCell.addEventListener('click', () => {
                renderUpcomingEvents(thisDate);
            });

            calendarGrid.appendChild(dayCell);
        }
    }
    
    /**
     * Renders the list of upcoming events.
     * If a specific date is passed, it shows events for that day instead.
     * @param {Date} [specificDate=null] - Optional date to filter events for.
     */
    function renderUpcomingEvents(specificDate = null) {
        const now = new Date();
        let eventsToShow;

        if (specificDate) {
            // Filter for a specific day
            eventsToShow = allEvents.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getFullYear() === specificDate.getFullYear() &&
                       eventDate.getMonth() === specificDate.getMonth() &&
                       eventDate.getDate() === specificDate.getDate();
            });
            document.querySelector('.upcoming-events-title').textContent = `Events on ${specificDate.toLocaleDateString()}`;
        } else {
            // Filter for upcoming events (today and future)
            eventsToShow = allEvents.filter(event => new Date(event.date) >= now);
            document.querySelector('.upcoming-events-title').textContent = 'Upcoming Events';
        }
        
        // Sort events by date
        eventsToShow.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (eventsToShow.length === 0) {
            const message = specificDate ? 'No events on this day.' : 'No upcoming events found.';
            upcomingEventsList.innerHTML = `<div class="event-list-placeholder"><p>${message}</p></div>`;
            return;
        }

        upcomingEventsList.innerHTML = eventsToShow.map(event => {
            const eventDate = new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
            return `
                <div class="event-item">
                    <p class="event-item-date">${eventDate}</p>
                    <h3 class="event-item-name">${event.name}</h3>
                </div>
            `;
        }).join('');
    }

    /**
     * Changes the current month and re-renders the calendar.
     * @param {number} direction - -1 for previous, 1 for next.
     */
    function changeMonth(direction) {
        currentDate.setMonth(currentDate.getMonth() + direction);
        renderAll();
    }

    /**
     * Updates the current date based on the select dropdowns and re-renders.
     */
    function updateDateFromSelects() {
        const newYear = parseInt(yearSelect.value);
        const newMonth = parseInt(monthSelect.value);
        currentDate = new Date(newYear, newMonth, 1);
        renderAll();
    }

    initialize();
});
