const express = require("express")
const cors= require("cors")
const port =3000;
const app=express()
app.use(cors())


let animals =[
            "lion",
            "zebra",
            "bird",
            "tiger"
            ];
let status = ""
const isAnimal =(req,res,next)=>{
    if(animals.includes(req.params.name)){
        status = "we have this animal"
        console.log("we have this animal")
        next()
    }else{
        status = "animal is not on the list"
        // console.log("adding the animals")
        next()
    }
}

app.get("/animals/:name",isAnimal,(req,res)=>{
    res.json({status:status,
            message:animals.includes(req.params.name),
            animals: animals})
})


const generateSpread =(req,res, next)=>{
    let spread = [];
    for (let i = req.query.floor; i <= req.query.ceil; i++ ) spread.push(i)
    // res.range = range
//    let randPick = Math.floor(Math.random()*req.query.ceil+req.query.floor)
    res.mySpread = spread
   res.randNum = spread[Math.floor(Math.random()*spread.length)]
   next()
}

app.get('/random',generateSpread,(req,res)=>{
    res.json({status:"success",
                range:[req.query.floor, req.query.ceil],
                mySpread: res.mySpread,
                randPick:res.randNum
            })
})

let people =["Doug","Kong", "Corey", "John", "Jyn"]

const handleQueue =(req,res,next)=>{
    if(req.params.parameter === "peek"){
        res.json({status:"success",
                data: people[people.length-1]})
    }else if (req.params.parameter==="dequeued"){
        res.json({status:"success",
                dequeued:people.pop()
        })
    }else if(req.params.parameter==="enqueued"){
        people.unshift(req.query.name)
       res.json(
           {status:"success",
           enqueued:people[0]}
        )}
    next()
}

app.get("/queue/:parameter",handleQueue,(req,res)=>{
    res.json(people)
})


app.get("/", (req,res)=>{
    res.send("making request on / url")
}
)







app.listen(port,()=>{
    console.log("listening on port ", port)
})
