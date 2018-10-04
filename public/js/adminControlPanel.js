$( document ).ready(function() {

    // inputs
    let inputUploadBlock = $('#showUploadBlock')[0];
    let inputFildForDb = $('#showFildForDb')[0];

    // hide blocks
    let uploadFile = $('#uploadFile');
    let fieldForFormDb = $('#fieldForFormDb');


    inputUploadBlock.addEventListener('click', function() {
        showOrHideBlock(this, uploadFile);
    });

    inputFildForDb.addEventListener('click', function() {
        showOrHideBlock(this, fieldForFormDb);
    });


    function showOrHideBlock(e, item) {

        if(e.checked == false) {
            item.hide();
        } else {
            item.show();
        }
    }



    // upload files
    let uploadForm = document.forms.sendFile;

    uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let formData = new FormData(uploadForm);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/upload");
        xhr.send(formData);

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                alert(xhr.responseText);
            }
        }

        uploadForm.reset();
    });


    // getting all the movies
    function GetFilms() {
        $.ajax({
            url: "/api/films",
            type: "GET",
            contentType: "application/json",
            success: function (films) {
                let rows = "";

                $.each(films, function (index, film) {
                    rows += row(film);
                });

                $("table tbody").append(rows);
            }
        });
    }

    // getting movies id
    function GetFilm(id) {
        $.ajax({
            url: "/api/films/" + id,
            type: "GET",
            contentType: "application/json",
            success: function (film) {
                let form = document.forms["filmForm"];

                form.elements["id"].value = film._id;
                form.elements["nameUa"].value = film.nameUa;
                form.elements["nameEn"].value = film.nameEn;
                form.elements["sourseImg"].value = film.sourseImg;
                form.elements["sourseVideo"].value = film.sourseVideo;
                form.elements["qualityVideo"].value = film.qualityVideo;
                form.elements["translation"].value = film.translation;
                form.elements["motto"].value = film.motto;
                form.elements["year"].value = film.year;
                form.elements["country"].value = film.country;
                form.elements["genre"].value = film.genre;
                form.elements["category"].value = film.category;
                form.elements["producer"].value = film.producer;
                form.elements["duration"].value = film.duration;
                form.elements["age"].value = film.age;
                form.elements["firstRun"].value = film.firstRun;
                // form.elements[""].value = film.;
            }
        });
    }

    // add movies in database
    function CreateFilm(data) {
        $.ajax({
            url: "api/film",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                nameUa: data.nameUa,
                nameEn: data.nameEn,
                sourseImg: data.sourseImg,
                sourseVideo: data.sourseVideo,
                qualityVideo: data.qualityVideo,
                translation: data.translation,
                motto: data.motto,
                year: data.year,
                country: data.country,
                genre: data.genre,
                category: data.category,
                producer: data.producer,
                duration: data.duration,
                age: data.age,
                firstRun: data.firstRun
            }),
            success: function (film) {
                reset();
                $("table tbody").append(row(film));
            }
        })
    }

    // edit property movies
    function EditFilm(data) {
        $.ajax({
            url: "api/film",
            contentType: "application/json",
            method: "PUT",
            data: JSON.stringify({
                id: data.id,
                nameUa: data.nameUa,
                nameEn: data.nameEn,
                sourseImg: data.sourseImg,
                sourseVideo: data.sourseVideo,
                qualityVideo: data.qualityVideo,
                translation: data.translation,
                motto: data.motto,
                year: data.year,
                country: data.country,
                genre: data.genre,
                category: data.category,
                producer: data.producer,
                duration: data.duration,
                age: data.age,
                firstRun: data.firstRun
            }),
            success: function (film) {
                reset();
                $("tr[data-rowid='" + film._id + "']").replaceWith(row(film));
            }
        })
    }

    // clean input at form
    function reset() {
        let form = document.forms["filmForm"];
        form.reset();
        form.elements["id"].value = 0;
    }

    // Видалення користувача
    function DeleteFilm(id) {
        $.ajax({
            url: "api/film/" + id,
            contentType: "application/json",
            method: "DELETE",
            success: function (film) {
                $("tr[data-rowid='" + film._id + "']").remove();
            }
        })
    }

    // create table
    function row(film) {
        return "<tr data-rowid='" + film._id + "'>" +
            // "<td id='id'>" + film._id + "</td>" +
            "<td>" + film.nameUa + "</td> " +
            "<td>" + film.nameEn + "</td> " +
            "<td>" + film.sourseImg + "</td> " +
            "<td>" + film.sourseVideo + "</td> " +
            "<td>" + film.qualityVideo + "</td> " +
            "<td>" + film.translation + "</td> " +
            "<td>" + film.motto + "</td> " +
            "<td>" + film.year + "</td> " +
            "<td>" + film.country + "</td> " +
            "<td>" + film.genre + "</td> " +
            "<td>" + film.category + "</td> " +
            "<td>" + film.producer + "</td> " +
            "<td>" + film.duration + "</td> " +
            "<td>" + film.age + "</td> " +
            "<td>" + film.firstRun + "</td> " +

            "<td><a class='editLink' data-id='" + film._id + "'>Змінити</a> | " +
            "<a class='removeLink' data-id='" + film._id + "'>Видалити</a></td></tr>";
    }

    // reset value form
    $("#reset").click(function (e) {
        e.preventDefault();
        reset();
    });

    // send form to server
    $("#filmForm").submit(function (e) {
        e.preventDefault();
        let id = this.elements["id"].value;
        let data = {};

        $("#filmForm").find('input, select, textarea').each(function () {
            if ($(this).attr('type').toLowerCase() !== 'checkbox') {
                data[$(this).attr('name')] = this.value;
            }
            else {
                data[$(this).attr('name')] = this.checked;
            }

        });

        if (id == 0) {
            CreateFilm(data);
        } else {
            EditFilm(data);
        }

    });

    // event handler on "clear" button
    $("body").on("click", ".editLink", function () {
        let id = $(this).data("id");
        GetFilm(id);
    });

    // event handler on "delete" button
    $("body").on("click", ".removeLink", function () {
        let id = $(this).data("id");
        DeleteFilm(id);
    });

    // download movies
    GetFilms();
});