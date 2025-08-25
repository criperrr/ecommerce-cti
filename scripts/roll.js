export let slider3self;

document.addEventListener('DOMContentLoaded', () => {
    const arrowLeft = document.getElementById('arrowLeft');
    const arrowRight = document.getElementById('arrowRight');
    //const themeButton = document.getElementById('li-button');
    //const html = document.querySelector('html');
    let counter = [1, 2, 3, 4, 5, 6];

    if (!arrowLeft || !arrowRight)
        console.log('Algum dos HTMLelment não estão definidos.');

    arrowLeft.addEventListener('click', () => {
        const arraySliders = document.querySelectorAll('div[class^="slider"]');

        // counter[i] = sumMod(counter[i], 0);
        for (let i = 0; i < 6; i++) {
            if (counter[i] == 6) {
                counter[i] = 1;
                continue;
            }
            counter[i]++;
        }

        arraySliders.forEach((el, idx) => {
            el.className = `slider${counter[idx]}`;
        });

        slider3Id = counter.indexOf(3) + 1;
        console.log(slider3Id);
        slider3self = document.getElementsByClassName(`slider${slider3Id}`)[0];
        console.log(slider3self);
    })

    arrowRight.addEventListener('click', () => {
        const arraySliders = document.querySelectorAll('div[class^="slider"]');

        for (let i = 0; i < 6; i++) {
            if (counter[i] == 1) {
                counter[i] = 6;
                continue;
            }
            counter[i]--;
        }

        arraySliders.forEach((el, idx) => {
            el.className = `slider${counter[idx]}`;
        })

        slider3Id = counter.indexOf(3) + 1;
        console.log(slider3Id);
        slider3self = document.getElementsByClassName(`slider${slider3Id}`)[0];
        console.log(slider3self);
    })
});






