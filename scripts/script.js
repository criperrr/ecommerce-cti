document.addEventListener('DOMContentLoaded', function () {
    const aboutButton = document.querySelector('#about-a a');
    const aboutDialog = document.querySelector('dialog.about');
    const settingsButton = document.getElementById('settings-a');
    const settingsDialog = document.getElementById('settings-dialog');
    const settingsForm = document.getElementById('settings-form');
    const closeButton = document.querySelector('#settings-dialog .close-button');
    const themeSelect = document.getElementById('theme');

    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        themeSelect.value = theme;
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    aboutButton.addEventListener('click', function (event) {
        event.preventDefault();
        aboutDialog.showModal();
    });

    settingsButton.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation(); // O javascript passa o evento (click) para os elementos pais, coloquei um listener no document, ent qnd ele chegar no document ele aciona e fecha o dialog. pra evitar isso, tem essa função que para a propagação do evento.
        const isOpen = settingsDialog.classList.toggle('open'); // metodo q retorna true se a classe foi adicionada e false se foi removida
        settingsButton.setAttribute('aria-expanded', isOpen); // faz o aria-expanded refletir o estado atual do dialog, ai ele fica expandido ou n
    });

    closeButton.addEventListener('click', () => {
        settingsDialog.classList.remove('open');
        settingsButton.setAttribute('aria-expanded', 'false');
    });

    settingsForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const selectedTheme = themeSelect.value;
        applyTheme(selectedTheme);
        localStorage.setItem('theme', selectedTheme);
        settingsDialog.classList.remove('open');
        settingsButton.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', () => {
        if (settingsDialog.classList.contains('open')) {
            settingsDialog.classList.remove('open');
            settingsButton.setAttribute('aria-expanded', 'false');
        }
    });

    settingsDialog.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});