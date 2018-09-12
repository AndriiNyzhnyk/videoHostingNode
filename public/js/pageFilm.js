window.onload = function () {
    // scripts for control player
    // document.addEventListener('DOMContentLoaded', init, false);
    //
    // function init() {
    // const VP = document.getElementById('windowVideoPlayer');
    // const VPToggle = document.getElementById('toggleButton');
    //
    // VPToggle.addEventListener('click', function() {
    //   if (VP.paused) VP.play();
    //   else VP.pause()
    // })
    // }

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

    // script for vertical align text for newFilm
    let textNewFilm = document.getElementsByClassName('textNewFilm');
    // console.log(textNewFilm);

    for(let i = 0; i < textNewFilm.length; i++) {
        let heightItem = textNewFilm[i].offsetHeight;
        textNewFilm[i].style.marginTop = -heightItem - 19 + 'px';
    }

    // script for download film
    let downloadFilm = document.getElementById('downloadFilm');
    let windowVideoPlayer = document.getElementById('windowVideoPlayer');

    downloadFilm.addEventListener('click', () => {
        let source = windowVideoPlayer.baseURI;

        if(source !== '') {
            source = source.substring(28);
            console.log(source);
            window.location.href = '/download/' + source;
        } else {
            console.error('not source video');
        }

    });

    // send form on server
    let form = document.getElementById('feedback');
    let btnClose = document.getElementsByClassName('btn-close')[0];

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

        // close modal windw and reset fields form
        btnClose.click();
        form.reset();

    });
}