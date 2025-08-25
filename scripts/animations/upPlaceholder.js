document.addEventListener('DOMContentLoaded', function () {
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
});