"use strict";
// ============================= data ============================
movies.splice(60);
const movieAll = movies.map(item => {
    return {
        name: item.title,
        year: item.year,
        category: item.categories,
        id: item.imdbId,
        rating: item.imdbRating,
        rtime: `${Math.trunc(item.runtime / 60)}h ${item.runtime % 60}m`,
        lang: item.language,
        link: `https://youtube.com/embed/${item.youtubeId}`,
        summary: item.summary,
        maxImg: item.bigThumbnail,
        minImg: item.smallThumbnail
    }
})
// ============================= data and ============================

// ============================= returnUI start ============================

function returnUi(movies) {
    if (movies && movies.length) {
        movies.forEach(item => {
            const card = createElement('div', 'card', `
        <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img src="${item.minImg}" class="img-fluid w-100" />
        <a href="#!"> <div class="mask"></div> </a>
        </div>
        <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <div class="">
        <p class="card-text "> ${item.summary} </p>
        <ul class="list-group list-group-flush p-0">
        <li class="list-group-item"> <strong>Year: </strong> ${item.year}  </li>
        <li class="list-group-item"> <strong>Language: </strong> ${item.lang}  </li>
        <li class="list-group-item"> <strong>Time: </strong> ${item.rtime}  </li>
        <li class="list-group-item"> <strong>Rating: </strong> ${item.rating}  </li>
        <li class="list-group-item"> <strong>YouTube: </strong> <a href="${item.link}" target="_blank" >View </a>  </li>
        <li class="list-group-item"><strong>Categories: </strong> ${item.category}</li>
        </ul>
        <div class="card-body p-0 d-flex justify-content-between align-items-center mt-3 gap-2">
        <a href="#!" class="btn btn-primary">Read more</a>
        <a href="#!" class="btn btn-warning bookmark__btn" data-info="${item.id}">Book mark</a>
        </div>
        </div>
        `);
            $('.wrapper').append(card);
        })
    } else {
        $(".wrapper").innerHTML = '<h1 class="text-center text-danger">NOT FOUND 404</h1>'
    }

};
returnUi(movieAll)

// ============================= returnUI and ============================

// ============================= globalSearch start ============================

$(".head__input").addEventListener("keyup", (e) => {
    $(".wrapper").innerHTML = "";

    const fillArr = movieAll.filter(item => {
        return item.name.includes(e.target.value)
    })

    if (fillArr.length) {
        returnUi(fillArr)
    } else {
        $(".wrapper").innerHTML = '<h1 class="text-center text-danger">NOT FOUND 404</h1>'
    }
})


// ============================= globalSearch and ============================

// ============================= category  start ============================

function fnCategory(arr) {
    let arry = []
    if (arr) {
        arr.forEach(item => {
            item.category.forEach(el => {
                if (!arry.includes(el))
                    arry.push(el)
            })
        });
    }

    if (arr.length) {
        arry.forEach(item => {
            let option = createElement('option')
            option.textContent = item
            $("#category").append(option)
        });
    }
}

fnCategory(movieAll)

// ============================= category and ============================

// ============================= all search start ============================

function searchFilm(byName, byRating, byCategory) {
    return movieAll.filter(item => {
        return item.name.includes(byName) && item.rating >= byRating && (byCategory == 'all') ? movieAll : item.category.includes(byCategory)
    })
}
// ============================= all search and ============================


function search() {
    $(".wrapper").innerHTML = "";

    let byName = $("#name").value;
    let byRating = $("#rating").value;
    let byCategory = $("#category").value;
    console.log(byName, byRating, byCategory);

    let result = searchFilm(byName, byRating, byCategory);

    if (result && result.length) {
        returnUi(result)
    } else {
        $(".wrapper").innerHTML = '<h1 class="text-center text-danger">NOT FOUND 404</h1>'
    }
}


$('.search__form').addEventListener('submit', (e) => {
    search()
})

// ============================= multi search and ============================

// ============================= bookMark render UI start ============================

function bookMarkUi(movies) {
    if (movies && movies.length) {
        movies.forEach(item => {
            const card = createElement('div', 'card', `
        <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img src="${item.minImg}" class="img-fluid w-100" />
        <a href="#!"> <div class="mask"></div> </a>
        </div>
        <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <div class="">
        <ul class="list-group list-group-flush p-0">
        <li class="list-group-item"> <strong>Year: </strong> ${item.year}  </li>
        <li class="list-group-item"> <strong>Time: </strong> ${item.rtime}  </li>
        <li class="list-group-item"> <strong>YouTube: </strong> <a href="${item.link}" target="_blank" >View </a>  </li>
        <li class="list-group-item"><strong>Categories: </strong> ${item.category}</li>
        </ul>
        <div class="card-body p-0 d-flex justify-content-between align-items-center mt-3 gap-2">
        <a href="#!" class="btn btn-primary">Read more</a>
        </div>
        </div>
        `);
            $('.book-mark').append(card);
        })
    } else {
        $(".book-mark").innerHTML = '<h1 class="text-center text-danger">hech nima yuq</h1>'
    }

};

// ============================= bookMark render UI and ============================

// ============================= book mark btn start ============================

$('.container-fluid').addEventListener("click", (e) => {
    let bookMark = $(".book-mark")
    if (e.target.matches('.btn-secondary')) {
        bookMark.classList.toggle('none')
    }
})

// ============================= book mark btn and ============================

// ============================= get a card start ============================
let bkArray = []
let bkArray2 = []

$('.wrapper').addEventListener('click', (e) => {
    $(".book-mark").innerHTML = ''
    if (e.target.matches('.bookmark__btn')) {
        let id = e.target.dataset.info
        
        let bookFind = movieAll.find(item => item.id === id)
        bkArray.push(bookFind)
        
        bkArray.forEach(item => {            
            let ok = true;
            
            for (let i = 0; i < bkArray2.length; i++) {
                if (item.id === bkArray2[i].id) {
                    ok = false
                    break
                }
            }
            
            if(ok === true) {
                bkArray2.push(item)
            }
        })
        
        if (bkArray2.length) {
            console.log(bkArray2);
            bookMarkUi(bkArray2)
        } else {
            $(".book-mark").innerHTML = '<h1 class="text-center text-danger">hech nima yuq</h1>'
        }
    }
})
// ============================= get a card start ============================
