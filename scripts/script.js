document.addEventListener('DOMContentLoaded', function () {

    const aboutButton = document.querySelector('#about-a a');
    const aboutDialog = document.querySelector('dialog.about');
    const accountButton = document.getElementById('account-a');
    const accountDialog = document.getElementById('account-dialog');
    const accountForm = document.getElementById('account-form');
    const closeButton = document.querySelector('#account-dialog .close-button');
    const themeSelect = document.getElementById('toggle');
    
    
    function applyTheme(theme){
        document.body.setAttribute('data-theme', theme);
        themeSelect.value = theme;
        themeSelect.checked = (theme === 'dark');
        localStorage.setItem('theme', theme);
    } 
    (() => applyTheme(localStorage.getItem('theme') || 'light'))();

    aboutButton.addEventListener('click', function (event) {
        event.preventDefault();
        aboutDialog.showModal();
    });

    accountButton.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation(); // O javascript passa o evento (click) para os elementos pais, coloquei um listener no document, ent qnd ele chegar no document ele aciona e fecha o dialog. pra evitar isso, tem essa função que para a propagação do evento.
        const isOpen = accountDialog.classList.toggle('open'); // metodo q retorna true se a classe foi adicionada e false se foi removida
        accountButton.setAttribute('aria-expanded', isOpen); // faz o aria-expanded refletir o estado atual do dialog, ai ele fica expandido ou n
    });

    closeButton.addEventListener('click', () => {
        accountDialog.classList.remove('open');
        accountButton.setAttribute('aria-expanded', 'false');
    });

    themeSelect.addEventListener('change', function (event) {
        event.preventDefault();
        const selectedTheme = themeSelect.checked ? 'dark' : 'light';
        applyTheme(selectedTheme);
        
    })

    accountForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // submit logic here if needed

        accountDialog.classList.remove('open');
        accountButton.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', () => {
        if (accountDialog.classList.contains('open')) {
            accountDialog.classList.remove('open');
            accountButton.setAttribute('aria-expanded', 'false');
        }
    });

    accountDialog.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});