window.onload = function () {
    
    let adaptiveSlider = () => {
        let navWidth = document.querySelector('nav').offsetWidth;

        //set style for bestFilm
        let bestFilm = document.getElementById('bestFilm');
        bestFilm.style.width = navWidth + 'px';


        const someWidth1 = navWidth * 0.9 + 'px';
        //set style for visibleWindow width = (90% of width bestFilm)
        let visibleWindow = document.getElementById('visibleWindow');
        visibleWindow.style.width = someWidth1;


        //width block items must be equal width block visibleWindow
        let items = document.getElementsByClassName('items');
        for(let i = 0; i < items.length; i++) {
            items[i].style.width = someWidth1;
        }


        //set style for images in slider
        const someWidth2 = visibleWindow.offsetWidth * 0.18 + 'px';
        let imgs = document.querySelectorAll('.slider img');
        for(let i = 0; i < imgs.length; i++) {
            imgs[i].style.width = someWidth2;
        }

        let sliderMonitor = document.getElementById('sliderMonitor');
        sliderMonitor.style.width = navWidth * 3 + 500 + 'px';

        visibleWindow.style.height = sliderMonitor.offsetHeight + 'px';

        //code that provide work slider
        let wrapItemsSlider = document.getElementsByClassName('wrapItemsSlider');
        let wrapSliderWidth = wrapItemsSlider[0].offsetWidth;
        let countPageSlider = wrapItemsSlider.length;

        let trust = true;
        let i = 1;

        function slider() {
            if(i > 0 && i < countPageSlider && trust === true) {
                shiftLeft();
                return;
            }

            if(i > 0 && i <= countPageSlider && trust === false) {
                shiftRight();
            }


        }

        let interval = setInterval( slider, 7000);

        // setTimeout(slider, 7000);

        function shiftLeft() {
            wrapItemsSlider[i].style.marginLeft = `${-wrapSliderWidth - 4}px`;
            i++;
            if(i >= countPageSlider) {
                trust = false;
                i--;
            }
        }

        function shiftRight() {
            wrapItemsSlider[i].style.marginLeft = `${wrapSliderWidth - 4}px`;
            i--;

            if(i === 0) {
                i++;
                trust = true;
            }
        }


        let shiftL = document.getElementById('shiftLeft');
        let shiftR = document.getElementById('shiftRight');

        shiftL.onclick = () => {
            if(i > 0 && i < countPageSlider) {
                clearInterval(interval);
                shiftRight();
                interval = setInterval( slider, 7000);
            }
        };

        shiftR.onclick = () => {
            if (i > 0 && i < countPageSlider) {
                clearInterval(interval);
                shiftLeft();
                interval = setInterval( slider, 7000);
            }
        };
    };

    // add EventListener on slider for redirect to some movies
    let sliders = document.getElementsByClassName('slider');

    for (let i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener('click', function (e) {
            let src = e.target.attributes.src.value;
            let movie = src.slice(12, -4);
            window.location.href = `movie/${movie}`;
        });
    }

    window.addEventListener('resize', function () {
        // console.log('resize');
        adaptiveSlider();
    });

    adaptiveSlider();
};