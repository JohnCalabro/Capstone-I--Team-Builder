let pkmOne = $('#poke_one')

$("#preview").hide()
$("#create").hide()

$("#preview").on("click", function (evt) {
  evt.preventDefault();

  $("#create").show()

  let inputs = $('#invisible').children()
  
  for(let i=0; i < 6; i++){
    
    if (inputs[i].classList.contains('empty')){
      $(inputs[i]).attr('value', 201)
    }
  }
});


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
        

        if(!poke.attr("value")){
            
            
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
             
        $("#mon-container").append(mon);
      }
      else{
        alert("You cannot add any more mons!")
      } 
  }


  $("#look-up-form").on("submit", async function (evt) {
    evt.preventDefault();

    $("#preview").show()
  
    let monName = $("#pokename").val().toLowerCase();
    
    put_mon_on_page(monName)
  });

 