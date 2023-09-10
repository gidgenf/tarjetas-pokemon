document.addEventListener('DOMContentLoaded', () => {

    const btnSearch = document.getElementById('btnSearch');

    btnSearch.addEventListener('click', () => {

        const contenedor = document.getElementById('contenedor');
        const searchValue = document.getElementById('search').value;
        const url = `https://pokeapi.co/api/v2/pokemon/`;
        const urlId = url + searchValue;

        console.log(urlId);

        contenedor.className = '';
        fetch(urlId)
            .then(response => response.json())
            .then(data => {
                contenedor.innerHTML = '';
                contenedor.innerHTML = `<h1 id="pokeName">${data.name}</h1>
                <img src="${data.sprites.front_default}">
                <div id="stats">
                    <h1>HP: ${data.stats[0].base_stat}</h1>
                    <h1>Atk: ${data.stats[1].base_stat}</h1>
                    <h1>Def: ${data.stats[2].base_stat}</h1>
                    <h1>AtkSp: ${data.stats[3].base_stat}</h1>
                    <h1>DefSp: ${data.stats[4].base_stat}</h1>
                    <h1>Spd: ${data.stats[5].base_stat}</h1>
                </div>`;
                showTypes(data);
                changeBackgroundColor(data);
                contenedor.style.display = 'block';
            })
            .catch(error => {
                console.error('Error', error);
            });
    });

    function showTypes(data) {
        const typesList = document.createElement('div');
        typesList.classList.add('types');

        data.types.forEach(typeInfo => {
            const typeName = typeInfo.type.name;
            const typeItem = document.createElement('p');
            typeItem.classList.add(typeName);
            typeItem.textContent = typeName;
            typesList.appendChild(typeItem);

            contenedor.classList.add(typeName);
        });
        contenedor.appendChild(typesList);
    }
});
