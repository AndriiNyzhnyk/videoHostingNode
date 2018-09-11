window.onload = function () {

    // code for search input
    let searchInput = document.querySelector('input');

    searchInput.addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
            searchMovie(this.value);
        }
    });

    document.getElementById('searchIcon').addEventListener('click', function (e) {
        let value = searchInput.value;
        searchMovie(value);
    });

    function searchMovie(value) {
        if(value !== '') {
            let pathSearch = '/searchMovie';

            setCookie('searchMovie', value, {
                expires: 0,
                path: pathSearch
            })

            window.location.href = pathSearch;
        }
    }

    function setCookie(name, value, options) {
        options = options || {};

        let expires = options.expires;

        if (typeof expires == 'number' && expires) {
            let d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        let updatedCookie = name + "=" + value;

        for (let propName in options) {
            updatedCookie += "; " + propName;
            let propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    function deleteCookie(name) {
        setCookie(name, "", {
            expires: -1
        })
    }


    // set style for slider
    function setWidth() {
        let navWidth = document.querySelector('nav').offsetWidth;

        // set style for bestFilm
        let bestFilm = document.getElementById('bestFilm');
        bestFilm.style.width = navWidth + 'px';

        const someWidth1 = navWidth * 0.9 + 'px';
        // set style for frame width = (90% of width bestFilm)
        let frame = document.getElementsByClassName('frame');
        // console.log(frame);
        frame[0].style.width = someWidth1;

        // set style for images in slider
        const someWidth2 = frame[0].offsetWidth * 0.19 + 'px';
        // console.log(someWidth2);
        let slide = document.querySelectorAll('.js_slide');
        // console.log(slide);
        for(let i = 0; i < slide.length; i++) {
            slide[i].style.width = someWidth2;
        }
    }
    setWidth();

    // animate slider
    var slidesToScroll = 5;
    var slider = document.querySelector('.js_slider');
    var slideCount = slider.querySelectorAll('.js_slide').length / slidesToScroll;
    var dotContainer = slider.querySelector('.slider_navigation_dots');
    var templateListItem = document.createElement('li');

    // http://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
    var stop = false;
    var frameCount = 0;
    var fps, fpsInterval, startTime, now, then, elapsed;

    // handle the slider events
    function handleEvents(e) {
        if (e.type === 'before.lory.init') {
            for (var i = 0, len = slideCount; i < len; i++) {
                var clone = templateListItem.cloneNode();
                dotContainer.appendChild(clone);
            }
            dotContainer.childNodes[0].classList.add('active');
        }
        if (e.type === 'after.lory.init') {
            for (var i = 0, len = slideCount; i < len; i++) {
                dotContainer.childNodes[i].addEventListener('click', function(e) {
                    resetTimer();
                    lorySlider.slideTo(Array.prototype.indexOf.call(dotContainer.childNodes, e.target) * slidesToScroll);
                });
            }
        }
        if (e.type === 'after.lory.slide') {
            for (var i = 0, len = dotContainer.childNodes.length; i < len; i++) {
                dotContainer.childNodes[i].classList.remove('active');
            }
            dotContainer.childNodes[(e.detail.currentSlide / slidesToScroll) - 1].classList.add('active');
        }
    }

    // init events to handle
    slider.addEventListener('before.lory.init', handleEvents);
    slider.addEventListener('after.lory.init', handleEvents);
    slider.addEventListener('after.lory.slide', handleEvents);

    // init the slider
    var lorySlider = lory(slider, {
        infinite: slidesToScroll,
        slidesToScroll: slidesToScroll,
        enableMouseEvents: true
    });

    // begin animation (autoplay)
    function startAnimating(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        animate();
    }

    // animate (autoplay)
    function animate() {
        requestAnimationFrame(animate);

        now = Date.now();
        elapsed = now - then;

        if (elapsed > fpsInterval && !stop) {
            then = now - (elapsed % fpsInterval);
            lorySlider.next();
        }
    }

    // reset timer
    function resetTimer() {
        now = Date.now();
        elapsed = now - then;
        then = now - (elapsed % fpsInterval);
    }

    // start the animation process with seed time
    startAnimating(.2); // every five seconds

    // mouseover
    slider.addEventListener('mouseover', function(e) {
        stop = true;
    });

    // mouseout
    slider.addEventListener('mouseout', function(e) {
        resetTimer();
        stop = false;
    });



    // add EventListener on slider for redirect to some movies
    let sliders = document.getElementsByClassName('js_slide');

    for (let i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener('click', function (e) {
            let src = e.target.attributes.src.value;
            let movie = src.slice(12, -4);
            window.location.href = `movie/${movie}`;
        });
    }

    window.addEventListener('resize', function () {
        // console.log('resize');
        setWidth();
    });


    // send form
    let form = document.getElementById('feedback');

    function serialize(form) {
        let field,
            l,
            s = [];

        if (typeof form == 'object' && form.nodeName == 'FORM') {
            var len = form.elements.length;

            for (let i = 0; i < len; i++) {
                field = form.elements[i];
                if (field.name && !field.disabled && field.type != 'button' && field.type != 'file' && field.type != 'hidden' && field.type != 'reset' && field.type != 'submit') {
                    if (field.type == 'select-multiple') {
                        l = form.elements[i].options.length;

                        for (let j = 0; j < l; j++) {
                            if (field.options[j].selected) {
                                s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                            }
                        }
                    }
                    else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                    }
                }
            }
        }
        return s.join('&').replace(/%20/g, '+');
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let data = serialize(form);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/feedback', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                alert(xhr.responseText);
            }
        }

    });

};