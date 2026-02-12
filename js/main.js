document.addEventListener('DOMContentLoaded', async () => {
    // 0. Load and Render Repositories
    await initRepos();

    // 1. Initialize Icons
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (e) { console.error(e); }

    // 2. Initialize Animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Simple Hero Animation (No Opacity)
        gsap.from(".hero h1", { y: 50, duration: 1, ease: "power3.out" });
        gsap.from(".hero p", { y: 30, duration: 1, delay: 0.2, ease: "power3.out" });

        // Simple Scroll Reveals (No Opacity)
        gsap.utils.toArray('.category-block').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom-=100px",
                    toggleActions: "play none none none"
                },
                y: 50,
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    // 3. Logo Interaction
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            const icon = logo.querySelector('i');
            if (icon) gsap.to(icon, { rotate: 180, duration: 0.4 });
        });
        logo.addEventListener('mouseleave', () => {
            const icon = logo.querySelector('i');
            if (icon) gsap.to(icon, { rotate: 0, duration: 0.4 });
        });
    }
});

async function initRepos() {
    const container = document.getElementById('ecosystem-content');
    if (!container) return;

    try {
        const response = await fetch('data/repos.json');
        const categories = await response.json();

        container.innerHTML = categories.map(cat => `
            <div class="category-block">
                <div class="category-header">
                    <h2 data-i18n="${cat.categoryKey}"></h2>
                </div>
                <div class="product-grid">
                    ${cat.repos.map(repo => `
                        <a href="${repo.url}" class="product-card">
                            <h4 data-i18n="${repo.titleKey}"></h4>
                            <p data-i18n="${repo.descKey}"></p>
                        </a>
                    `).join('')}
                </div>
            </div>
        `).join('');

        // Trigger i18n update for the new content
        if (typeof updateContent === 'function') {
            updateContent();
        }
    } catch (error) {
        console.error('Failed to load repositories:', error);
    }
}
