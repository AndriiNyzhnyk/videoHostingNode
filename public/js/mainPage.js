window.onload = function () {
    // scripts for Header slider
    let monitor = document.getElementById('sliderMonitor');
    let visibleWindow = document.getElementById('visibleWindow');
    let items = document.getElementsByClassName('items');
    let sliderWidth = items[0].offsetWidth;
    let sliderLength = items.length;

    monitor.style.width = `${sliderWidth}px`;
    visibleWindow.style.width = `${(sliderWidth * sliderLength) + (sliderLength * 4)}px`;
    let trust = true;
    let i = 1;

    function slider() {
        if(i > 0 && i < sliderLength && trust === true) {
            shiftLeft();
            return;
        }

        if(i > 0 && i <= sliderLength && trust === false) {
            shiftRight();
        }


    }

    let interval = setInterval( slider, 7000);

    // setTimeout(slider, 7000);

    function shiftLeft() {
        items[i].style.marginLeft = `${-sliderWidth - 5}px`;
        i++;
        if(i >= sliderLength) {
            trust = false;
            i--;
        }
    }

    function shiftRight() {
        items[i].style.marginLeft = `${sliderWidth - 5}px`;
        i--;

        if(i === 0) {
            i++;
            trust = true;
        }
    }


    let shiftL = document.getElementById('shiftLeft');
    let shiftR = document.getElementById('shiftRight');

    shiftL.onclick = () => {
        if(i > 0 && i < sliderLength) {
            clearInterval(interval);
            shiftRight();
            interval = setInterval( slider, 7000);
        }
    };

    shiftR.onclick = () => {
        if (i > 0 && i < sliderLength) {
            clearInterval(interval);
            shiftLeft();
            interval = setInterval( slider, 7000);
        }
    };
    // end scripts for Header slider
};