const router = require("express").Router();
let Student=require("../models/student");


router.route("/add").post((req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender

    })
      newStudent.save().then(()=>{
        res.json("Student added")
      }).catch((err)=>{
        console.log(err);

      })
     

})

router.route("/").get((req, res) => {
    Student.find()
        .then((students) => {
            res.json(students);
        })
        .catch((err) => {
            console.log(err);
        })
    })

router.route("/update/:id").put(async (req,res)=>{
    let userId=req.params.id
    const{name,age,gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }



    const update = await Student.findByIdAndUpdate(userId,updateStudent)
    .then(() =>{
        res.status(200).send({status :"user updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status :"error with updating data",error:err.message});     
    })
})
      
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Student.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "user deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with deleting student", error: err.message });
        });
});

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    try {
        const user = await Student.findById(userId);
        if (!user) {
            return res.status(404).send({ status: "User not found" });
        }
        res.status(200).send({ status: "User fetched", user:user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error getting user", error: err.message });
    }
});

    


   
    
        
    

module.exports= router;
