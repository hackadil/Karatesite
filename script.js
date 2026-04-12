const galerie = {
    cours: {
        titre: " Cours de Karaté",
        images: [
            "images/galerie/cours/1.jpg",
            "images/galerie/cours/2.jpg",
            "images/galerie/cours/3.jpg",
            "images/galerie/cours/4.jpg",
            "images/galerie/cours/5.jpg",
            "images/galerie/cours/6.jpg"
        ]
    },
    competitions: {
        titre: " Stages & Compétitions",
        images: [
            "images/galerie/competition/1.jpg",
            "images/galerie/competition/2.jpg",
            "images/galerie/competition/3.jpg",
            "images/galerie/competition/4.jpg",
            "images/galerie/competition/5.jpg",
            "images/galerie/competition/6.jpg"
        ]
    }
}

let currentGalerie = []
let currentIndex = 0

const modal = document.getElementById('galleryModal');
const modalTitle = document.getElementById('galleryTitle');
const galleryImage = document.getElementById('galleryImage');
const thumbnailsContainer = document.getElementById('galleryThumbnails');
const closeBtn = document.querySelector('.gallery-close');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');

function openGalerie(data) {
    currentGalerie = data.images;
    currentIndex = 0;
    modalTitle.textContent = data.titre;
    updateGalerie();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function updateGalerie() {
    if (currentGalerie.length > 0) {
        galleryImage.src = currentGalerie[currentIndex];
        
        thumbnailsContainer.innerHTML = '';
        currentGalerie.forEach((img, idx) => {
            const thumb = document.createElement('img');
            thumb.src = img;
            thumb.alt = 'Miniature';
            if (idx === currentIndex) thumb.classList.add('active');
            thumb.addEventListener('click', () => {
                currentIndex = idx;
                updateGalerie();
            });
            thumbnailsContainer.appendChild(thumb);
        });
    }
}

function nextImage() {
    if (currentGalerie.length > 0) {
        currentIndex = (currentIndex + 1) % currentGalerie.length;
        updateGalerie();
    }
}

function prevImage() {
    if (currentGalerie.length > 0) {
        currentIndex = (currentIndex - 1 + currentGalerie.length) % currentGalerie.length;
        updateGalerie();
    }
}

function closeGalerie() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

const articles = document.querySelectorAll('#activites article');
articles.forEach((article) => {
    article.style.cursor = 'pointer';
    article.addEventListener('click', () => {
        const title = article.querySelector('h4').innerText;
        if (title.includes('Cours') || title.includes('Karaté') || title.includes('Entraînement')) {
            openGalerie(galerie.cours);
        } else if (title.includes('Compétition') || title.includes('Stages')) {
            openGalerie(galerie.competitions);
        }
    });
});

prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);
closeBtn.addEventListener('click', closeGalerie);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeGalerie();
    }
});

document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'Escape') {
            closeGalerie();
        }
    }
});