

async function putMonsOnDetailsPage(){
    const monIds = document.querySelectorAll('.mon')
console.log(monIds)

for(mon of monIds){
    let m = mon.dataset.pokeId
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${m}`);
    console.log(res.data.name)
    let visibleTeam = makeTeamHtml(res.data)
    $('.teamContainer').append(visibleTeam)
}
}


function makeTeamHtml(pokemon) {
    return `
    
     
    <div class="col-2" data-poke-id=${pokemon.id}> ${pokemon.name}  <img class="Poke-img"
    src="${pokemon.sprites.front_default}"
    alt="(no image provided)"></div>
    
        
   
  `;
}

putMonsOnDetailsPage()