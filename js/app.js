const main = document.getElementById('cards');

const phoneSearch = () => {
    const search = document.getElementById("input-field")
    const searchText = search.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAll(data.data))
    search.value = '';
}

const displayAll = phones => {

    main.innerHTML = '';
    for (const phone of phones) {
        const div = document.createElement('div')
        div.className = 'col-lg-4 col-sm-12 mb-4';
        div.innerHTML = `
        <div class="card border border-2 rounded" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top h-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button onclick="detailsDisplay('${phone.slug}')" class="btn btn-primary">Go somewhere</button>
                </div>
            </div>
        `
        main.appendChild(div);
    }


}

const detailsDisplay = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const details = data.data.mainFeatures;
            const div = document.createElement("div");
            main.innerHTML = "";
            div.innerHTML = `
            <div class="card border border-2 rounded" style="width: 18rem;">
            <img src="${data.data.image}" class="card-img-top h-50" alt="...">
            <div class="card-body">
            
                <h5 class="card-title">${data.data.name}</h5>
                <p class="card-text">${data.data.brand}</p>
                <p class="card-text">${data.data.releaseDate}</p>
                <p class="card-text">Storage: ${details.storage}</p>
                <p class="card-text">Chipset: ${details.chipSet}</p>
                <p class="card-text">Memory: ${details.memory}</p>
                <p class="card-text">Memory: ${details.memory}</p>
                
            </div>
        </div>
    `
            main.appendChild(div);
        })
}