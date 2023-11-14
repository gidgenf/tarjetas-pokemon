document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('contenedor');
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const btnNext = document.getElementById('nextPage');
    const btnBack = document.getElementById('prevPage');
    const btnSort = document.getElementById('btnSort');
    const cantPokePage = 60;
    let currentPage = 1;

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
        sortCards()
    }

    //ordenado de tarjetas con evento click de forma ascendente en caso de que se desordenen solas
    btnSort.addEventListener('click', sortCards)

    function sortCards() {
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
    };

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
        const tarjeta =
            `<div class="tarjeta col-lg-3 col-md-4 col-sm-6 col-8 text-center ${data.types[0].type.name} ${data.types[1] ? data.types[1].type.name : ''}">
            <div class="row justify-content-center">
                <p id="pokeid" class="float-start">${data.id}</p>
                <p id="pokeName" class="">${data.name}</p>
            </div>
            <div class="container row mx-auto">
                <img class="img-fluid mx-auto" src="${data.sprites.front_default}" style="max-width: 200px; max-height: 200px;>
            </div>
            <div class="row">
                <div id="stats" class="col-6 text-center mx-1 my-1">
                    <p class="my-0">HP: ${data.stats[0].base_stat}</p>
                    <p class="my-0">Atk: ${data.stats[1].base_stat}</p>
                    <p class="my-0">Def: ${data.stats[2].base_stat}</p>
                    <p class="my-0">AtkSp: ${data.stats[3].base_stat}</p>
                    <p class="my-0">DefSp: ${data.stats[4].base_stat}</p>
                    <p class="my-0">Spd: ${data.stats[5].base_stat}</p>
                </div>
                <div class="types col-4 justify-content-center mx-1 my-1">
                    <p class="my-2 ${data.types[0].type.name}">${data.types[0].type.name}</p>
                    <p class="my-2 ${data.types[1] ? data.types[1].type.name : ''}">${data.types[1] ?
                data.types[1].type.name : ''}</p>
                </div>
            </div>
        </div>`;

        container.innerHTML += tarjeta;


        cardElement.addEventListener('click', () => {  //al hacer click sobre la tarjeta se declara maxCard que es el elemento con clase tarjeta-grande

            const maxCard = document.querySelector('.tarjeta-grande');
            if (maxCard) {
                maxCard.classList.remove('tarjeta-grande');  //si la tarjeta grande existe, remueve la clase y pasa a ser normal
                maxCard.classList.add('tarjeta-normal');
            }

            classCard.classList.add('tarjeta-grande');   //se agrega la clase tarjeta grande y se remueve la normal
            classCard.classList.remove('tarjeta-normal');
        });

        container.appendChild(cardElement);

        classCard.addEventListener('mouseleave', () => {   //cuando el mouse deja de estar sobre la tarjeta agrandada, esta vuelve al estado normal de forma gradual
            classCard.classList.remove('tarjeta-grande');
            setTimeout(() => {
                classCard.classList.add('tarjeta-normal');
            }, 300);
        });

    }

    fetchPokemonData();

});

