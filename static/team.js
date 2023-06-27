
let user_id = $('.user').attr('data-user-id')
console.log(user_id)
userTs = simplyGrabTeams(user_id)

console.log(userTs.teams)

// for(u of userTs){
//   console.log(u)
// }

function make_mon_html(pokemon, userTs) {
  
  
  let userTeam = userTs

  console.log(userTeam
    )
  // for (let i = 0; i < tArray.length; i++){
  //   let tID = tArray[i].team_id
  //   // $(".col-2").attr('href', `/team/${tArray[i].team_id}`)
  // }

  

    return `
    
    
    
  
    
    <a class="col-2" data-poke-id=${pokemon.id}> ${pokemon.name}  <img class="Poke-img"
    src="${pokemon.sprites.front_default}"
    
    alt="(no image provided)">
    
    
    
    </a>
    
    
   
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


        // let user_id = $('.user').attr('data-user-id')
        // console.log(user_id)
        // userTs = simplyGrabTeams(user_id)


        poke = make_mon_html(res.data, userTs)
        console.log(poke)

        // let tm = user.userteams
        // console.log(tm)

        // let userID = $('.user').attr('data-user-id')

        // let tms = simplyGrabTeams(userID)
        // console.log(tms)
        // for(t of tms){
        //   console.log(t)
        // }
        

        // console.log(teamData)

        // $('#team_link').attr('href')
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
    




// let user_id = $('.user').attr('data-user-id')


t = grabUserTeamData(user_id)

console.log(t)


async function simplyGrabTeams(userID){
  // const result = await axios.get(`http://127.0.0.1:5000/api/userteams/${userID}`)
  const result = await axios.get(`http://127.0.0.1:5000/api/userteams/${userID}`)
  console.log(result.data)

  let uTeams = result.data
  tArray = Array.from(uTeams.teams)
  console.log(tArray)

  // for (let i = 0; i < tArray.length; i++){
  //   console.log(tArray[i].team_id)
  //   $(".col-2").attr('href', `/team/${tArray[i].team_id}`)
  // }

  return result.data.teams
}

userTs = simplyGrabTeams(user_id)

// tArray = Array.from(userTs)
// console.log(tArray)

console.log(userTs)

teams = $('.tm')
userTeams = Array.from(teams)
console.log(userTeams)

teams.hover(function(e){
  console.log(e.target)
  console.log('hovered success')
  let cols = $('.col-2')
  console.log(teams[0] === e.target)

  if($(e.target).is(userTeams[0])){

    userTeams[0].style.color = "lightpink"
    console.log(teams[0], 'team 1')
    let cols = $('.col-2')
    let colArray = Array.from(cols)
    for(let i = 0; i < colArray.length; i++){
      console.log(colArray[i])
      if(i >=0 && i <=5){
        colArray[i].style.backgroundColor = "lightpink";
      }
     
    }
  } if($(e.target).is(userTeams[1])){
    
    userTeams[1].style.color = "lightskyblue"
    let cols = $('.col-2')
    let colArray = Array.from(cols)

    for(let i = 0; i < colArray.length; i++){
      console.log(colArray[i])
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
      console.log(colArray[i])
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
      console.log(colArray[i])
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
      console.log(colArray[i])
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
      console.log(colArray[i])
      if(i >=30 && i <=35){
        colArray[i].style.backgroundColor = "lightcoral";
      }
     
    }
  }
})

