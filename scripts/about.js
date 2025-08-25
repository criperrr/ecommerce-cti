document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('about-page-dialog');
    const button = document.getElementById('close-dialog-button');
    const dialogImage = document.getElementById('dialog-image');
    const gallery = document.getElementById('slider-container');
    const dialogDescription = document.getElementById('dialog-description');
    const arrowLeft = document.getElementById('arrowLeft');
    const arrowRight = document.getElementById('arrowRight');
    if (!dialog || !button) {
        console.log('<ERRO> ELEMENTOS NÃO ENCONTRADOS!');
        return;
    }

    const galleryImages = Array.from(gallery.querySelectorAll('div[class^="slider"] img'));
    const galleryData = galleryImages.map(img => ({
        src: img.src,
        description: img.dataset.description,
    }));

    let currentIndex = 2; // Começa no slider3

    function updateImage() {
        dialogImage.src = galleryData[currentIndex].src;
        dialogDescription.textContent = galleryData[currentIndex].description;
    }

    function openDialog() {
        updateImage();
        dialog.showModal();
        void dialog.offsetWidth;
        dialog.classList.add('open');
    }

    // Função para remover todos os event listeners de click dos sliders
    function removeAllSliderListeners() {
        galleryImages.forEach((img) => {
            const newImg = img.parentElement;
            newImg.replaceWith(newImg.cloneNode(true));
        });
    }

    // Função para adicionar o event listener apenas ao slider3
    function setSlider3Listener() {
        // Remove a classe e event listener de todos os sliders
        const allSliders = Array.from(gallery.querySelectorAll('div[class^="slider"]'));
        allSliders.forEach((slider) => {
            slider.classList.remove('slider-clickable');
            if (slider._aboutClickHandler) {
                slider.removeEventListener('click', slider._aboutClickHandler);
                slider._aboutClickHandler = null;
            }
        });
        // Adiciona apenas ao slider3
        const slider3 = document.querySelector('.slider3');
        if (slider3) {
            slider3.classList.add('slider-clickable');
            // Cria handler e salva na propriedade do elemento
            const handler = () => {
                const idx = Array.from(gallery.querySelectorAll('div[class^="slider"]')).indexOf(slider3);
                if (idx !== -1) {
                    currentIndex = idx;
                    openDialog();
                }
            };
            slider3._aboutClickHandler = handler;
            slider3.addEventListener('click', handler);
        }
    }

    setSlider3Listener();

    arrowLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        updateImage();
        setSlider3Listener();
    });

    arrowRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryData.length;
        updateImage();
        setSlider3Listener();
    });

    button.addEventListener('click', () => {
        dialog.classList.remove('open');
        dialog.addEventListener('transitionend', () => { dialog.close(); }, { once: true });
    });
});