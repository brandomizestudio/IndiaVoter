/**
 * India Voter - Ground Reality & Video Reels Controller
 * Handles interactive filtering, photo lightbox modal, and embedded video reels.
 */

document.addEventListener('DOMContentLoaded', () => {
    // === 1. SURVEY PHOTO FILTERING ===
    const filterButtons = document.querySelectorAll('.survey-filter-btn');
    const surveyCards = document.querySelectorAll('.survey-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            surveyCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // === 2. PHOTO LIGHTBOX MODAL (<dialog>) ===
    const photoDialog = document.getElementById('photo-dialog');
    const photoDialogImg = document.getElementById('modal-photo-img');
    const photoDialogTitle = document.getElementById('modal-photo-title');
    const photoDialogLocation = document.getElementById('modal-photo-location');
    const photoDialogDesc = document.getElementById('modal-photo-desc');
    const photoDialogFbLink = document.getElementById('modal-photo-fblink');
    const closePhotoDialog = document.getElementById('close-photo-dialog');

    // Attach click listeners to all photo cards
    surveyCards.forEach(card => {
        const viewTrigger = card.querySelector('.btn-view-photo');
        const imgTrigger = card.querySelector('.survey-card-img-wrap');

        const openModalForCard = () => {
            const imgSrc = card.getAttribute('data-img');
            const title = card.getAttribute('data-title');
            const location = card.getAttribute('data-location');
            const desc = card.getAttribute('data-desc');
            const fbLink = card.getAttribute('data-fblink');

            if (photoDialogImg) photoDialogImg.src = imgSrc;
            if (photoDialogTitle) photoDialogTitle.textContent = title;
            if (photoDialogLocation) photoDialogLocation.textContent = location;
            if (photoDialogDesc) photoDialogDesc.textContent = desc;
            if (photoDialogFbLink) photoDialogFbLink.href = fbLink;

            if (photoDialog) {
                photoDialog.showModal();
            }
        };

        if (viewTrigger) viewTrigger.addEventListener('click', openModalForCard);
        if (imgTrigger) imgTrigger.addEventListener('click', openModalForCard);
    });

    if (closePhotoDialog && photoDialog) {
        closePhotoDialog.addEventListener('click', () => photoDialog.close());
    }

    // Light-dismiss on backdrop click for photo dialog
    if (photoDialog) {
        photoDialog.addEventListener('click', (e) => {
            const rect = photoDialog.getBoundingClientRect();
            const isInDialog = (
                rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX && e.clientX <= rect.left + rect.width
            );
            if (!isInDialog) {
                photoDialog.close();
            }
        });
    }

    // === 3. VIDEO REELS SWITCHER & EMBED CONTROLLER ===
    const reelItems = document.querySelectorAll('.reel-playlist-item');
    const featuredIframe = document.getElementById('featured-reel-iframe');
    const featuredTitle = document.getElementById('featured-reel-title');
    const featuredDesc = document.getElementById('featured-reel-desc');
    const featuredViews = document.getElementById('featured-reel-views');
    const featuredLocation = document.getElementById('featured-reel-location');
    const featuredFbLink = document.getElementById('featured-reel-fblink');
    const featuredWatchModalBtn = document.getElementById('featured-reel-modal-btn');

    const updateFeaturedReel = (item) => {
        reelItems.forEach(r => r.classList.remove('active'));
        item.classList.add('active');

        const iframeSrc = item.getAttribute('data-iframe');
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');
        const views = item.getAttribute('data-views');
        const location = item.getAttribute('data-location');
        const fbUrl = item.getAttribute('data-fburl');

        if (featuredIframe) {
            featuredIframe.src = iframeSrc;
        }
        if (featuredTitle) featuredTitle.textContent = title;
        if (featuredDesc) featuredDesc.textContent = desc;
        if (featuredViews) featuredViews.textContent = views;
        if (featuredLocation) featuredLocation.textContent = location;
        if (featuredFbLink) featuredFbLink.href = fbUrl;
    };

    reelItems.forEach(item => {
        item.addEventListener('click', () => {
            updateFeaturedReel(item);
        });
    });

    // === 4. THEATER / FULLSCREEN VIDEO MODAL (<dialog>) ===
    const videoDialog = document.getElementById('video-dialog');
    const videoDialogIframe = document.getElementById('modal-video-iframe');
    const videoDialogTitle = document.getElementById('modal-video-title');
    const videoDialogFbLink = document.getElementById('modal-video-fblink');
    const closeVideoDialog = document.getElementById('close-video-dialog');

    if (featuredWatchModalBtn && videoDialog) {
        featuredWatchModalBtn.addEventListener('click', () => {
            const activeItem = document.querySelector('.reel-playlist-item.active') || reelItems[0];
            if (activeItem) {
                const iframeSrc = activeItem.getAttribute('data-iframe');
                const title = activeItem.getAttribute('data-title');
                const fbUrl = activeItem.getAttribute('data-fburl');

                if (videoDialogIframe) videoDialogIframe.src = iframeSrc;
                if (videoDialogTitle) videoDialogTitle.textContent = title;
                if (videoDialogFbLink) videoDialogFbLink.href = fbUrl;

                videoDialog.showModal();
            }
        });
    }

    if (closeVideoDialog && videoDialog) {
        closeVideoDialog.addEventListener('click', () => {
            if (videoDialogIframe) videoDialogIframe.src = '';
            videoDialog.close();
        });
    }

    if (videoDialog) {
        videoDialog.addEventListener('click', (e) => {
            const rect = videoDialog.getBoundingClientRect();
            const isInDialog = (
                rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX && e.clientX <= rect.left + rect.width
            );
            if (!isInDialog) {
                if (videoDialogIframe) videoDialogIframe.src = '';
                videoDialog.close();
            }
        });

        videoDialog.addEventListener('close', () => {
            if (videoDialogIframe) videoDialogIframe.src = '';
        });
    }
});
