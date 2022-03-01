/* get all id */
const main = document.getElementById('cards');
const error = document.getElementById("error");
const result = document.getElementById("not-found");
const phoneDetails = document.getElementById('details');

/* search function */
const phoneSearch = () => {
    const search = document.getElementById("input-field")
    const searchText = search.value;

    /* error message */
    if (!isNaN(searchText)) {
        error.innerText = 'Please give a name';
        search.value = '';
        main.innerHTML = '';
        phoneDetails.innerHTML = '';
        result.innerText = "";
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
    phoneDetails.innerHTML = '';
    main.innerHTML = '';
    const phones = totalPhones.slice(0, 20); // upto 20 products

    if (totalPhones.length == 0) {
        result.innerText = 'Result not found'
    }
    else {
        for (const phone of phones) {
            const div = document.createElement('div')  // create div
            div.className = 'col-lg-4 col-sm-12 my-4';
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
}

/* show details */
const detailsDisplay = (id) => {
    /*  window.scrollto(0, 0) */
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const details = data.data.mainFeatures;

            /* sensors loop */
            let temp = "";
            for (let i = 0; i < details.sensors.length; i++) {
                temp += details.sensors[i] + ' ';
            }
            const div = document.createElement('div');
            phoneDetails.innerHTML = '';
            div.className = 'my-4';
            div.innerHTML = `
            <div class="card border border-2 rounded mx-auto" style="width: 18rem;">
            <img src="${data.data.image}" class=" card-img-top" alt="...">
            <div id="card-body" class="card-body">   
                <h5 class="card-title">${data.data.name}</h5>
                <p class="card-text fw-bold">${data.data.brand}</p>
                <p class="card-text fw-bold">${data.data.releaseDate}</p>
                <p class="card-text"><span class="fw-bold">Storage: </span> ${details.storage}</p>
                <p class="card-text"><span class="fw-bold">Display: </span> ${details.displaySize}</p>
                <p class="card-text"><span class="fw-bold">Chipset: </span>${details.chipSet}</p>
                <p class="card-text"><span class="fw-bold">Memory: </span> ${details.memory}</p>
                <p class="card-text"><span class="fw-bold">Sensors: </span> ${temp}</p>                    
            </div>
        </div>
    `
            phoneDetails.appendChild(div);

            /* others loop */
            var othersString = data?.data?.others;
            console.log(typeof (othersString))
            if (typeof (othersString) !== undefined) {
                for (var property in othersString) {
                    console.log(`${property}: ${othersString[property]}`);
                }
                const cardBody = document.getElementById('card-body');
                const p = document.createElement('p');
                p.className = 'card-text';
                p.innerHTML = `<span class="fw-bold">Others:</span> ${property}: ${othersString[property]}`
                cardBody.appendChild(p);
            }
        })
}
