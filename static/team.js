
let user_id = $('.user').attr('data-user-id')



function make_mon_html(pokemon) {
  
  
  

    return `
       
    <a class="col-2" data-poke-id=${pokemon.id}> ${pokemon.name}  <img class="Poke-img"
    src="${pokemon.sprites.front_default}"
    
    alt="(no image provided)">
    
    
    
    </a>
  `;
}

async function grabUserTeamData(id) {
    const res = await axios.get(`http://127.0.0.1:5000/api/userteams/${id}`)
    
   teams = res.data.teams

   for(let i = 0; i < teams.length; i++){
    let ts = teams[i]

    delete ts['user_id']
    delete ts['team_id']

    let mons = Object.values(ts)
    
    for (mon of mons) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${mon}`);
      
        poke = make_mon_html(res.data)
        
        $('.row').append(poke)
    }
   } 
}
    
t = grabUserTeamData(user_id)


teams = $('.tm')
userTeams = Array.from(teams)

teams.hover(function(e){
  
  let cols = $('.col-2')
  

  if($(e.target).is(userTeams[0])){

    userTeams[0].style.color = "lightpink"
    
    let cols = $('.col-2')
    let colArray = Array.from(cols)
    for(let i = 0; i < colArray.length; i++){
      
      if(i >=0 && i <=5){
        colArray[i].style.backgroundColor = "lightpink";
      }
    }
  } if($(e.target).is(userTeams[1])){
    
    userTeams[1].style.color = "lightskyblue"
    let cols = $('.col-2')
    let colArray = Array.from(cols)

    for(let i = 0; i < colArray.length; i++){
      
      if(i >=6 && i <=11){
        colArray[i].style.backgroundColor = "lightskyblue";
      }
     
    } 
  }
  if($(e.target).is(userTeams[2])){
    userTeams[2].style.color = "lightgreen"
    let cols = $('.col-2')
    let colArray = Array.from(cols)

    for(let i = 0; i < colArray.length; i++){
      
      if(i >=12 && i <=17){
        colArray[i].style.backgroundColor = "lightgreen";
      }
     
    }
  }
  if($(e.target).is(userTeams[3])){
    userTeams[3].style.color = "burlywood"
    let cols = $('.col-2')
    let colArray = Array.from(cols)

    for(let i = 0; i < colArray.length; i++){
      
      if(i >=18 && i <=23){
        colArray[i].style.backgroundColor = "burlywood";
      }
     
    }
  }
  if($(e.target).is(userTeams[4])){
    
    userTeams[4].style.color = "lightsteelblue"
    let cols = $('.col-2')
    let colArray = Array.from(cols)

    for(let i = 0; i < colArray.length; i++){
      
      if(i >=24 && i <=29){
        colArray[i].style.backgroundColor = "lightsteelblue";
      }
     
    }
  }
  if($(e.target).is(userTeams[5])){
    
    userTeams[5].style.color = "lightcoral"
    let cols = $('.col-2')
    let colArray = Array.from(cols)

    for(let i = 0; i < colArray.length; i++){
      
      if(i >=30 && i <=35){
        colArray[i].style.backgroundColor = "lightcoral";
      }
     
    }
  }
})

