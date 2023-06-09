

async function viewMons() {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/112');

// console.log(res.data.name)
// console.log(res.data.sprites.front_default
    // )

//     console.log(res.data.id, res.data.name)
   
//     console.log(res.data.types[0].type.name)
console.log(res.data.stats[0].base_stat)
  }

  function make_mon_html(pokemon) {
    return `
    <div data-poke-id=${pokemon.id}>
     
        
        ${pokemon.name}
        <button class="delete-button">X</button>
      
      <img class="Poke-img"
            src="${pokemon.sprites.front_default}"
            alt="(no image provided)">
    </div>
  `;
}

async function put_mon_on_page(name) {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    // console.log(res)
      let pokemon  = res.data
      let mon = $(make_mon_html(pokemon));

      if($("#mon-container").children().length<6){
        let staged_team = []

        
        poke = $('#poke_one')
        pokeTwo = $('#poke_two')
        pokeThree = $('#poke_three')
        pokeFour = $('#poke_four')
        pokeFive = $('#poke_five')
        pokeSix = $('#poke_six')
        // team.push(pokemon.id)

        console.log(poke)
        
        if(!poke.attr("name")){
            console.log('no')
            poke.attr("name", pokemon.id)
        } else if(!pokeTwo.attr("name")){
            console.log('hi')
            pokeTwo.attr("name", pokemon.id)
        } else if (!pokeThree.attr("name")){
            pokeThree.attr("name", pokemon.id)
        } else if (!pokeFour.attr("name")){
            pokeFour.attr("name", pokemon.id)
        } else if (!pokeFive.attr("name")){
            pokeFive.attr("name", pokemon.id)
        } else if (!pokeSix.attr("name")) {
            pokeSix.attr("name", pokemon.id)
        }
        
        // t = $('data-pokemon-id')
        
        // poke.attr("name", pokemon.id)
        // pokeTwo.attr("name", pokemon.id)
        

        $("#mon-container").append(mon);
      }
      else{
        alert("You cannot add any more mons!")
      }
    //   $("#mon-container").append(mon);
    
  }


  $("#look-up-form").on("submit", async function (evt) {
    evt.preventDefault();

    
  
    let monName = $("#pokename").val().toLowerCase();
    console.log(monName)
    
  
    put_mon_on_page(monName)
  });

  let testGrab = $('#mon_one')
  console.log(testGrab.name)