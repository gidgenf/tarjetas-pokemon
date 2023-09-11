document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('contenedor');
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const btnNext = document.getElementById('nextPage');
    const btnBack = document.getElementById('prevPage');
    const btnSort = document.getElementById('btnSort');
    const cantPokePage = 60;
    let currentPage = 1;

    //ordenado de tarjetas con evento click de forma ascendente en caso de que se desordenen solas
    btnSort.addEventListener('click', () => {
        const cards = Array.from(container.querySelectorAll('.tarjeta'));  //array de los div de clase tarjeta dentro de container

        cards.sort((a, b) => {
            const idA = parseInt(a.querySelector('#pokeid').textContent);
            const idB = parseInt(b.querySelector('#pokeid').textContent);
            return idA - idB;
        });
        container.innerHTML = '';

        cards.forEach(card => {
            container.appendChild(card);
        });
    });

    btnNext.addEventListener('click', () => {  //evento click en next que cambia de pagina a la siguiente
        currentPage++;
        fetchPokemonData();
    });

    btnBack.addEventListener('click', () => {//evento click en back que cambia a la pagina anterior, solo si
        if (currentPage > 1) {               // currentpage vale mas de 1
            currentPage--;
            fetchPokemonData();
        }
    });

    function fetchPokemonData() {
        const pokeLimitMin = (currentPage - 1) * cantPokePage;  //limite minimo de los pokemons que deben aparecer en la pagina
        const pokeLimit = currentPage * cantPokePage;   //rango limite de pokemones que deben estar en la pagina

        container.innerHTML = '';

        for (let i = pokeLimitMin + 1; i <= pokeLimit; i++) {  //iteracion for que hace un fetch por medio de un enlace al id del pokemon
            const urlPoke = url + i + '/';

            fetch(urlPoke)
                .then(response => response.json())
                .then(data => {
                    showCard(data);
                })
                .catch(error => {
                    console.error(`Error`, error);
                })
                .finally(() => {
                    isLoading = false;
                });
        }
    }

    const searchButton = document.querySelector('.submit'); // Selección del botón de envío

    searchButton.addEventListener('click', () => {
        container.innerHTML = '';
        const searchValue = document.getElementById('search').value.toLowerCase(); // Convertir el valor a minúsculas
        const urlId = url + searchValue + '/';

        fetch(urlId)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                showCard(data);
            })
            .catch(error => {
                console.error(`Error`, error);
            });
    });

    function showCard(data) {  //funcion que genera la estructura de la tarjeta en base a datos
        const tarjeta =                     //interpolacion de clases de la tarjeta segun los tipos del pokemon
            `<div class="tarjeta ${data.types[0].type.name} ${data.types[1] ? data.types[1].type.name : ''}">  
                <h1 id="pokeid">${data.id}</h1>
                <h1 id="pokeName">${data.name}</h1>
                <img src="${data.sprites.front_default}">
                <div id="stats">
                    <h1>HP: ${data.stats[0].base_stat}</h1>
                    <h1>Atk: ${data.stats[1].base_stat}</h1>
                    <h1>Def: ${data.stats[2].base_stat}</h1>
                    <h1>AtkSp: ${data.stats[3].base_stat}</h1>    
                    <h1>DefSp: ${data.stats[4].base_stat}</h1>
                    <h1>Spd: ${data.stats[5].base_stat}</h1>
                </div>
                <div class="types">
                    <h2 class="${data.types[0].type.name}">${data.types[0].type.name}</h2>
                    <h2 class="${data.types[1] ? data.types[1].type.name : ''}">${data.types[1] ? data.types[1].type.name : ''}</h2>
                </div>
            </div>`;

        container.insertAdjacentHTML('beforeend', tarjeta);  //intenta de antemano ordenar las tarjetas(funciona un poco solamente)
    }

    fetchPokemonData();
});
