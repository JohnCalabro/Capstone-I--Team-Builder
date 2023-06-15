
function make_mon_html(pokemon) {
    return `
    
     
    <div class="col-2" data-poke-id=${pokemon.id}> ${pokemon.name}  <img class="Poke-img"
    src="${pokemon.sprites.front_default}"
    alt="(no image provided)"></div>
    
        
   
  `;
}




async function grabUserTeamData(id) {
    const res = await axios.get(`http://127.0.0.1:5000/api/userteams/${id}`)
    // console.log(res.data)
    let fullTeam = []
   teams = res.data.teams

   console.log(teams)

   for(let i = 0; i < teams.length; i++){
    let ts = teams[i]

   
   
    
    delete ts['user_id']
    delete ts['team_id']

    console.log(ts)
    
   
    let mons = Object.values(ts)
    console.log(mons)

    for (mon of mons) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${mon}`);
        console.log(res.data.name)
        poke = make_mon_html(res.data)
        console.log(poke)
        $('.row').append(poke)
    }
     
    
   }
  

   

   
   

//    for(let i =0; i < teams.length; i++){
//     // console.log(teams[i])
//     let uTeams = teams[i]
//     console.log(teams[0])
    
//     let teamKeys = Object.keys(uTeams)
//     let monVals = Object.values(uTeams)
//     console.log(teamKeys)
//     for(let k of teamKeys){
//         if(k.startsWith("mon")){
//             for(let val of monVals){
//                 console.log(val)
//             }
//             // fullTeam.push()
//         }
//     }
//    }
    
   


   
   
}
    




let user_id = $('.user').attr('data-user-id')


t = grabUserTeamData(user_id)

console.log(t)


