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
            let pathSearch = 'searchMovie';

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
}