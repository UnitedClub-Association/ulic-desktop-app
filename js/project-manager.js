/**
 * @file Manages fetching and rendering project data from Supabase.
 */

/**
 * Fetches all projects from the Supabase 'projects' table.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of project objects.
 */
async function fetchAllProjects() {
    try {
        const { data, error } = await sb
            .from('projects')
            .select('id, name, description, creator, is_featured')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
        return data || [];
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return [];
    }
}

/**
 * Creates an HTML project card element from a database record.
 * @param {object} project - The project object from Supabase.
 * @returns {HTMLElement} The card element.
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'card';
    if (project.is_featured) {
        card.classList.add('featured');
    }
    if (project.creator === 'ulictclub2024@gmail.com') {
        card.classList.add('lesson');
    }

    card.innerHTML = `
        <div class="card-header">
            <h3>${project.name}</h3>
            <span class="card-project-type">${project.creator === 'ulictclub2024@gmail.com' ? 'Lesson' : 'Member Project'}</span>
        </div>
        <p>${project.description || 'No description available.'}</p>
    `;
    return card;
}

/**
 * Renders an array of projects into a specified container.
 * @param {string} containerId - The ID of the element to render cards into.
 * @param {Array<object>} projects - The array of project objects to render.
 */
function renderCards(containerId, projects) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear previous content

    if (projects && projects.length > 0) {
        projects.forEach(project => container.appendChild(createProjectCard(project)));
    } else {
        container.innerHTML = '<p class="no-projects-message" style="color:#ffbd59;">No projects match the current criteria.</p>';
    }
}