document.addEventListener('DOMContentLoaded', function () {

    const accountButton = document.getElementById('account-a');
    const accountDialog = document.getElementById('account-dialog');
    const accountForm = document.getElementById('account-form');
    const closeButton = document.querySelector('#account-dialog .close-button');
    const themeSelect = document.getElementById('toggle');
    const textInputs = document.querySelectorAll('.custom-input');



    textInputs.forEach((input) => {
        const label = input.previousElementSibling;
        const occultText = label.dataset.occultText;
        const originalText = label.textContent || '';
        let currentIntervals = [];

        if (input.value.trim() !== '') {
            label.classList.add('filled')
        } else {
            label.classList.remove('filled')
        } // verifica assim que o DOM carrega e faz o forEach.

        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                label.classList.add('filled')
            } else {
                label.classList.remove('filled')
            }
        });

        function clearIntervals() {
            currentIntervals.forEach(clearInterval);
            currentIntervals = [];
        };

        const animateText = (label, newText) => {
            clearIntervals(); // para todos os intervalos dentro do array
            let currentText = label.textContent;
            if (!occultText || input.value.trim() !== '') return;
            
            const eraseInterval = setInterval(() => {
                if (currentText.length > 0) {
                    console.log("oi");
                    currentText = currentText.slice(0, -1);
                    label.textContent = currentText;
                } else {
                    clearInterval(eraseInterval); // se for 0 ent ele para o interval anterior e cria o typeinterval
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        if (i < newText.length) {
                            label.textContent += newText[i];
                            i++;
                        } else {
                            clearInterval(typeInterval);
                        }
                        
                    }, 10);  //velocidade pra escrever
                    currentIntervals.push(typeInterval); // colocar o typeinteval e o erase interval na array pra evitar q os dois rodem simultaneamente
                }
               
            }, 10); //velocidade pra apgar 
            currentIntervals.push(eraseInterval);
        };

        input.addEventListener('focus', () => {
            if (occultText) {
                animateText(label, occultText);
            }
        });

        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                animateText(label, originalText);
            }
        });
    })
    
    

    function applyTheme(theme){
        document.body.setAttribute('data-theme', theme);
        themeSelect.value = theme;
        themeSelect.checked = (theme === 'dark');
        localStorage.setItem('theme', theme);
    } 
    (() => applyTheme(localStorage.getItem('theme') || 'light'))();


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