const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 12;
let offset = 0;

function loadPokemonItens(offset, limit) {
  
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
      <li onClick="selectPokemon(${pokemon.number})" class="flex flex-col rounded-2xl m-2 p-4 ${pokemon.type}">
                  
        <span class="text-xs text-right text-gray-100">#${pokemon.number.toString().padStart(3,'0')}</span>
        <span class="capitalize mb-0 font-bold text-slate-900">${pokemon.name}</span>
        
        <div class="flex flex-row items-center justify-between">

          <ol class="text-center">
            ${pokemon.types.map((type) => `<li class="cardDetail ${type}">${type}</li>`).join('')}
          </ol>

          <img class="h-28 w-36" src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        
      </li>
      
    `).join('')

    pokemonList.innerHTML += newHtml
        
  })
}

const selectPokemon = async (number) => {

   const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
   const res = await fetch (url);
   const pokeman = await res.json();
   modalPokemon(pokeman);
} 

const modalPokemon = (pokeman) => {
  
  function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) =>`<li class="uppercase font-semibold text-sm text-center px-3 border border-slate-50 rounded-xl ${pokeman.types}">${typeSlot.type.name}</li>`)
  } 

  function convertPokemonStats(pokemonStats) {
    return pokemonStats.map((statsBase) => `
      <div class="uppercase flex justify-between">
        <span>${statsBase.stat.name}</span>
        <span>${statsBase.base_stat}</span>
      </div>
    `)
  }
  const image = pokeman.sprites.other.dream_world.front_default
  const star = pokeman.stats['base_stat']
  
  const htmlString = `
    <div id="modal" class="left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 fixed z-10 p-5 items-center justify-center rounded-3xl bg-slate-900 max-w-xs h-fit border border-slate-50">
      <div class="bg-grenn-1 rounded-3xl">
        <div class="capitalize px-4 pt-10  items-center text-slate-900 flex flex-row justify-between">
        
          <span class="font-bold text-base">${pokeman.name}</span>
          <span class="font-semibold text-base text-right">#${pokeman.id.toString().padStart(3,'0')}</span>
      
        </div> 

        <div class="px-4">
          <ol class="mt-2 flex flex-row gap-2 ">
            ${convertPokemonTypesToLi(pokeman.types).join('')} 
          </ol>
        </div>


        <div class="p-2 mt-5 flex justify-center">
          <img  class="w-1/2 h-1/2"  src="${image}" alt="">
        </div>
        
        <div class="px-2 h-80 rounded-3xl w-auto bg-white flex flex-col">
          <h2 class="font-bold text-md text-slate-900 text-center">Base Stats</h2>
                 
          ${convertPokemonStats(pokeman.stats).join('')} 
                          
          <div class="flex justify-center">
            <button id="closeBtn" onclick="closeModal()"  class="cursor-pointer text-xs my-1 py-1 px-2 border-none rounded-2xl bg-violet-900 hover:bg-violet-700 transition duration-75 text-gray-100" id="loadMoreButton" type="button">Close</button>
          </div>
        
        </div>  
      </div>
    </div>

  `;
  pokemonList.innerHTML = htmlString + pokemonList.innerHTML;  

}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecordNextPage = offset + limit

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  
  } else {

    loadPokemonItens(offset, limit)

  }
})

function closeModal(){
  const modal = document.getElementById('modal');
  modal.parentElement.removeChild(modal);    
}