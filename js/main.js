"use strict";

movies.splice(100);

let cate = []
let cate2 = []


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

returnUi(movieAll)

function returnUi(arr) {
    $(".wrapper").innerHTML = ''

    arr.forEach(item => {
        const card = createElement('div', 'card', `
<div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
<img src="${item.minImg}" class="img-fluid w-100" />
<a href="#!"> <div class="mask"></div> </a>
</div>
<div class="card-body">
<h5 class="card-title">${item.name}</h5>
<div class="">
<p class="card-text " > ${item.summary} </p>
<ul class="list-group list-group-flush p-0">
<li class="list-group-item ">${item.year}  </li>
<li class="list-group-item d-flex justify-content-between"> <p class="m-0" > ${item.lang}</p> <p class="m-0" > ${item.rtime}</p>  </li>
<li class="list-group-item">${item.category}</li>
</ul>
<div class="card-body p-0 d-flex justify-content-between align-items-center mt-3">
<a href="#!" class="btn btn-primary">View on Youtube</a>
<span class="card-link fw-bold fs-2" >${item.rating}</span>
</div>
</div>
    `);
        $('.wrapper').append(card);
    })
};

function fnHeadName(arr) {
    $(".head__input").addEventListener("keyup", (e) => {
        const search = e.target.value;
        const fillArr = arr.filter(item => {
            return item.name.includes(search)
        })

        returnUi(fillArr)
    })
}
fnHeadName(movieAll)

function fnSearchName(arr) {
    $(".search__name").addEventListener("keyup", (e) => {
        const search = e.target.value
        const fillArr = arr.filter(item => {
            return item.name.includes(search)
        })

        returnUi(fillArr)
    })
}

fnSearchName(movieAll)

function fnSearchRating(arr) {
    $(".search__rating").addEventListener("keyup", (e) => {
        const search = e.target.value
        console.log(search);
        const fillArr = arr.filter(item => item.rating == search)

        returnUi(fillArr)
    })
}

fnSearchRating(movieAll)

function fnSelect(arr) {
    arr.forEach(item => {
        cate.push(item.category)
    })
    let arrd = cate.flat()

    arrd.forEach(item => {
        if (!cate2.includes(item)) {
            cate2.push(item)
        }
    })

    cate2.forEach(item => {
        let select = createElement("option")
        select.textContent = item;
        $('.form-select').append(select)
    })
}
fnSelect(movieAll)



$('.search__form').addEventListener('submit', (e) => {
    e.preventDefault()
    let select = $(".form-select").value
    console.log(select);

    if (select === 'all') {
        returnUi(movieAll)
    } else {
        let fillArr = movieAll.filter(item => {
            return fnFind(item.category, select)
        });

        returnUi(fillArr)
        console.log(fillArr);
    }
})



function fnFind(items, select) {
    let fnArr = items.filter(item => {
        return item === select
    })
    return fnArr.length > 0
}