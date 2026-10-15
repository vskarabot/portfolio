/*
project galleries: scroll-snap carousels with arrows, thumbnails and a fullscreen lightbox
*/

const createLightbox = () => {
    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.innerHTML = `
        <div class="lightbox-top">
            <span class="lightbox-counter"></span>
            <button class="gallery-btn" data-close aria-label="Close">&#x2715;</button>
        </div>
        <div class="lightbox-body">
            <button class="gallery-btn" data-dir="-1" aria-label="Previous image">&#x2190;</button>
            <img alt="">
            <button class="gallery-btn" data-dir="1" aria-label="Next image">&#x2192;</button>
        </div>
        <p class="lightbox-caption"></p>
    `;
    document.body.append(dialog);

    const img = dialog.querySelector('img');
    const counter = dialog.querySelector('.lightbox-counter');
    const caption = dialog.querySelector('.lightbox-caption');

    let slides = [];
    let index = 0;
    let onChange = null;

    const show = i => {
        index = (i + slides.length) % slides.length;
        const slide = slides[index];

        img.src = slide.src;
        img.alt = slide.alt;
        caption.textContent = slide.caption;
        counter.textContent = `${index + 1} / ${slides.length}`;

        onChange?.(index);
    };

    const step = dir => {
        if (slides.length > 1) show(index + dir);
    };

    dialog.querySelectorAll('[data-dir]').forEach(button => {
        button.addEventListener('click', () => step(Number(button.dataset.dir)));
    });

    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());

    // clicking the dark area around the image closes it
    dialog.addEventListener('click', event => {
        if (event.target === dialog || event.target.classList.contains('lightbox-body')) dialog.close();
    });

    dialog.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') step(-1);
        if (event.key === 'ArrowRight') step(1);
    });

    let touchStartX = null;
    dialog.addEventListener('touchstart', event => {
        touchStartX = event.touches[0].clientX;
    }, { passive: true });

    dialog.addEventListener('touchend', event => {
        if (touchStartX === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
        touchStartX = null;
    });

    dialog.addEventListener('close', () => {
        document.documentElement.style.overflow = '';
        onChange = null;
    });

    return {
        open(newSlides, startIndex, changeCallback) {
            slides = newSlides;
            onChange = changeCallback ?? null;
            dialog.classList.toggle('single', slides.length < 2);
            show(startIndex);

            document.documentElement.style.overflow = 'hidden';
            dialog.showModal();
        }
    };
};

const slideFromImage = image => ({
    src: image.currentSrc || image.src,
    alt: image.alt,
    caption: image.closest('figure')?.querySelector('figcaption')?.textContent.trim() || image.alt
});

const initGallery = (gallery, lightbox) => {
    const track = gallery.querySelector('.gallery-track');
    const items = [...track.children];
    const images = items.map(item => item.querySelector('img'));
    const slides = images.map(slideFromImage);

    const prevButtons = gallery.querySelectorAll('.gallery-btn[data-dir="-1"]');
    const nextButtons = gallery.querySelectorAll('.gallery-btn[data-dir="1"]');
    const counter = gallery.querySelector('.gallery-counter');
    const url = gallery.querySelector('.browser-url');
    const thumbs = gallery.querySelector('.gallery-thumbs');

    let current = -1;

    const indexFromScroll = () => {
        let closest = 0;
        items.forEach((item, i) => {
            if (Math.abs(item.offsetLeft - track.scrollLeft) < Math.abs(items[closest].offsetLeft - track.scrollLeft)) {
                closest = i;
            }
        });
        return closest;
    };

    const scrollToIndex = i => {
        const target = items[Math.max(0, Math.min(items.length - 1, i))];
        track.scrollTo({ left: target.offsetLeft });
    };

    const update = () => {
        const atStart = track.scrollLeft <= 1;
        const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;

        prevButtons.forEach(button => button.disabled = atStart);
        nextButtons.forEach(button => button.disabled = atEnd);

        const index = indexFromScroll();
        if (index === current) return;
        current = index;

        if (counter) counter.textContent = `${index + 1} / ${items.length}`;
        if (url) url.textContent = slides[index].caption;

        if (thumbs) {
            [...thumbs.children].forEach((thumb, i) => {
                const active = i === index;
                thumb.classList.toggle('active', active);
                thumb.setAttribute('aria-current', active);

                if (active) {
                    thumbs.scrollTo({
                        left: thumb.offsetLeft - thumbs.clientWidth / 2 + thumb.offsetWidth / 2,
                        behavior: 'smooth'
                    });
                }
            });
        }
    };

    // one "step" = one slide on the stage, one phone in the carousel
    const step = dir => scrollToIndex(indexFromScroll() + dir);

    prevButtons.forEach(button => button.addEventListener('click', () => step(-1)));
    nextButtons.forEach(button => button.addEventListener('click', () => step(1)));

    track.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
    });

    if (thumbs) {
        images.forEach((image, i) => {
            const thumb = document.createElement('button');
            thumb.type = 'button';
            thumb.setAttribute('aria-label', `Show ${slides[i].caption}`);
            thumb.innerHTML = `<img src="${image.getAttribute('src')}" alt="" loading="lazy" decoding="async">`;
            thumb.addEventListener('click', () => scrollToIndex(i));
            thumbs.append(thumb);
        });
    }

    images.forEach((image, i) => {
        image.addEventListener('click', () => {
            // keep the gallery in sync with whatever was last viewed in the lightbox
            lightbox.open(slides, i, index => scrollToIndex(index));
        });
    });

    let ticking = false;
    track.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            update();
            ticking = false;
        });
    }, { passive: true });

    window.addEventListener('resize', update);
    update();
};

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = createLightbox();

    document.querySelectorAll('[data-gallery]').forEach(gallery => initGallery(gallery, lightbox));

    document.querySelectorAll('[data-zoomable] img').forEach(image => {
        image.addEventListener('click', () => lightbox.open([slideFromImage(image)], 0));
    });
});
