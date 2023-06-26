let pkmOne = $('#poke_one')

$("#preview").hide()
$("#create").hide()

$("#preview").on("click", function (evt) {
  evt.preventDefault();

  $("#create").show()

  let inputs = $('#invisible').children()
  console.log(inputs)
  for(let i=0; i < 6; i++){
    console.log(inputs[i])
    if (inputs[i].classList.contains('empty')){
      $(inputs[i]).attr('value', 201)
    }
  }
});



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
        
        if(!poke.attr("value")){
            console.log('no')
            
            poke.attr("value", pokemon.id)
            poke.attr("class", "full")

            
            
          
            
        } else if(!pokeTwo.attr("value")){
            console.log('hi')
            pokeTwo.attr("value", pokemon.id)
            pokeTwo.attr("class", "full")

          

        } else if (!pokeThree.attr("value")){
            pokeThree.attr("value", pokemon.id)
            pokeThree.attr("class", "full")
        } else if (!pokeFour.attr("value")){
            pokeFour.attr("value", pokemon.id)
            pokeFour.attr("class", "full")
        } else if (!pokeFive.attr("value")){
            pokeFive.attr("value", pokemon.id)
            pokeFive.attr("class", "full")
        } else if (!pokeSix.attr("value")) {
            pokeSix.attr("value", pokemon.id)
            pokeSix.attr("class", "full")
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

    $("#preview").show()
  
    let monName = $("#pokename").val().toLowerCase();
    console.log(monName)
    
  
    put_mon_on_page(monName)
  });

  let testGrab = $('#mon_one')
  console.log(testGrab.name)