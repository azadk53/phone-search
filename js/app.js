/* get all id */
const main = document.getElementById('cards');
const error = document.getElementById("error");
const result = document.getElementById("not-found");


/* search function */
const phoneSearch = () => {
    const search = document.getElementById("input-field")
    const searchText = search.value;

    /* error message */
    if (!isNaN(searchText)) {
        error.innerText = 'Please give a correct name';
        search.value = '';
    }

    else if (isNaN(searchText)) {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayAll(data.data))
        search.value = '';
        error.innerText = "";
        result.innerText = "";
    }
}

/* show all products */
const displayAll = totalPhones => {
    main.innerHTML = '';
    const phones = totalPhones.slice(0, 20); // upto 20 products
    console.log(phones.length);
    for (const phone of phones) {
        const div = document.createElement('div')  // create div
        div.className = 'col-lg-4 col-sm-12 mb-4';
        div.innerHTML = `
        <div class="card border border-2 rounded" style="width: 18rem;">
                <img src="${phone.image}" class=" card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${phone.phone_name}</h5>
                    <p class="card-text fw-bold">${phone.brand}</p>
                    <button onclick="detailsDisplay('${phone.slug}')" class="btn btn-primary">Details</button>
                </div>
            </div>
        `
        main.appendChild(div);   // add div
    }


}

/* shoe details */
const detailsDisplay = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const details = data.data.mainFeatures;
            const div = document.createElement("div");

            /* sensors loop */
            let temp = "";
            for (let i = 0; i < details.sensors.length; i++) {
                temp += details.sensors[i] + ' ';
            }

            /* others loop */
            const othersString = data.data.others;
            for (var property in othersString) {
                console.log(`${property}: ${othersString[property]}`);
            }
            main.innerHTML = "";
            div.innerHTML = `
            <div class="card border border-2 rounded mx-auto" style="width: 18rem;">
            <img src="${data.data.image}" class="img-responsive card-img-top" alt="...">
            <div class="card-body">   
                <h5 class="card-title">${data.data.name}</h5>
                <p class="card-text fw-bold">${data.data.brand}</p>
                <p class="card-text fw-bold">${data.data.releaseDate}</p>
                <p class="card-text"><span class="fw-bold">Storage:</span> ${details.storage}</p>
                <p class="card-text"><span class="fw-bold">Chipset: </span>${details.chipSet}</p>
                <p class="card-text"><span class="fw-bold">Memory:</span> ${details.memory}</p>
                <p class="card-text"><span class="fw-bold">Sensors:</span> ${temp}</p>
                <p class="card-text"><span class="fw-bold">Sensors:</span> ${property}: ${othersString[property]}</p>
                     
            </div>
        </div>
    `
            main.appendChild(div);
        })
}