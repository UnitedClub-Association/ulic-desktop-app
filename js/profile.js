// js/profile.js

document.addEventListener('DOMContentLoaded', () => {
    // Mock data for demonstration purposes
    const mockUserProfile = {
        userName: 'A. R. Fahim',
        position: 'President',
        bio: 'Aspiring full-stack developer and president of ULIC. Passionate about creating intuitive and dynamic web experiences.',
        avatar_url: 'https://placehold.co/150x150/7aa2f7/1a1b26?text=ARF',
        badges: ['Code Jam 2024 Winner', 'Active Contributor', 'Founder'],
    };

    displayProfileData(mockUserProfile);
});

/**
 * Populates the profile card with user data.
 * @param {object} profile - The user's profile data object.
 */
function displayProfileData(profile) {
    if (!profile) return;

    document.getElementById('profilePicture').src = profile.avatar_url || 'https://placehold.co/150x150/1a1b26/7aa2f7?text=User';
    document.getElementById('profileNameDisplay').textContent = profile.userName || 'User Name';
    document.getElementById('profilePositionDisplay').textContent = profile.position || 'General Member';
    document.getElementById('profileBioDisplay').textContent = profile.bio || 'No bio provided.';

    const badgesContainer = document.getElementById('profileBadges');
    badgesContainer.innerHTML = ''; // Clear existing badges
    if (profile.badges && profile.badges.length > 0) {
        profile.badges.forEach(badgeText => {
            const badgeEl = document.createElement('span');
            badgeEl.className = 'badge';
            badgeEl.textContent = badgeText;
            badgesContainer.appendChild(badgeEl);
        });
    } else {
        badgesContainer.innerHTML = '<span class="badge">No badges yet</span>';
    }
}
