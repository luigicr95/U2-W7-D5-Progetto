let kantoPokemonArray = [];

async function displayPokemons() {
  let firstPokemons = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  let kantoPokemons = await firstPokemons.json();
  console.log(kantoPokemons);

  for (i = 0; i < kantoPokemons.results.length; i++) {
    let pokemonURL = await fetch(kantoPokemons.results[i].url);
    //console.log(pokemon);
    let kantoPokemonURL = await pokemonURL.json();

    kantoPokemonArray.push(kantoPokemonURL);
    //console.log(kantoPokemonURL);
  }

  document.querySelector("#pokedex").innerHTML = "";

  for (i = 0; i < kantoPokemonArray.length; i++) {
    let searchQuery = document.getElementById("search-bar").value;
    let eachPokemon = kantoPokemonArray[i];

    if (eachPokemon.name.includes(searchQuery)) {
      if (eachPokemon.types[1] !== undefined) {
        document.querySelector(
          "#pokedex"
        ).innerHTML += `<div class="card col-4">
          <img src="${eachPokemon.sprites.front_default}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${eachPokemon.name}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${eachPokemon.moves[0].move.name}</li>
            <li class="list-group-item">${eachPokemon.types[0].type.name}</li>
            <li class="list-group-item">${eachPokemon.types[1].type.name}</li>
          </ul>
        </div>`;
      } else {
        document.querySelector(
          "#pokedex"
        ).innerHTML += `<div class="card col-4">
          <img src="${eachPokemon.sprites.front_default}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${eachPokemon.name}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${eachPokemon.moves[0].move.name}</li>
            <li class="list-group-item">${eachPokemon.types[0].type.name}</li>
            
          </ul>
        </div>`;
      }
    }
  }
}

console.log(kantoPokemonArray);

window.onload = () => {
  displayPokemons();
};
