//problem one, test if animal is on the list
let animalbtn = document.querySelector("#animalBtn")
let randForm = document.querySelector("#randForm")
let responseSet1 = document.querySelector("#responseSet1")
let name = document.querySelector("#name")
name.style.display ="none"
let peopleBtn = document.querySelector("#peopleBtn")
//problem 1
animalbtn.addEventListener("click", async (e) =>{
    responseSet1.innerHTML =""
    
    e.preventDefault()
    let animal = document.querySelector("#animal")

    let results = await axios.get(`http://localhost:3000/animals/${animal.value}`)

    console.log(results)    
    let animalStatus = document.createElement("p")
    animalStatus.innerText= results.data.status
    responseSet1.appendChild(animalStatus)
    
    



})

randForm.addEventListener("submit", async (e) =>{
    e.preventDefault()
    
    let num1 = document.querySelector("#num1")
    let num2 = document.querySelector("#num2")

    let results = await axios.get(`http://localhost:3000/random/?floor=${num1.value}&ceil=${num2.value}`)
    let randNum = document.createElement("p")
    randNum.innerText= results.data.randPick
    responseSet2.appendChild(randNum)
    debugger

})

let peopleSelect = document.querySelector("#peopleSelect")

peopleSelect.addEventListener("change",(e)=>{
    if(e.target.value === "enqueued"){
        name.style.display ="block"
    }else{
        name.style.display ="none"

    }
})

peopleBtn.addEventListener("click",async (e) =>{

    if(e.target.value === "enqueued"){
    let results = await axios.get(`http://localhost:3000//queue/${name.innerText}`)

    }

    debugger
    // let results = await axios.get(`http://localhost:3000/random/?floor=${num1.value}&ceil=${num2.value}`)


})