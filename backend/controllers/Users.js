// import { argon2 } from "argon2";
import Users from "../models/UserModel.js"
import argon2 from "argon2";



// fungsi get all data
export const getUser = async(req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name','email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// fungsi get data by id
export const getUserById = async(req, res) => {
    try {
        const response = await Users.findOne({
            // attributes: ['uuid', 'name','email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


// fungsi input data register
export const createUser = async(req, res) => {
    //extract body
    const {name, email, password, confirmPassword, role} = req.body;
    
// mengeluarkan nilai
    // res.status(201).json({msg: name});
    // validasy email
    if(password !== confirmPassword) return res.status(400).json({msg : "Password dan Confirm Tidak Cocok"});

    const hashPassword = await argon2.hash(password);

    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            // password: password,
            role: role
        });

        res.status(201).json({msg: "Register Berhasil"});

    } catch (error){
        res.status(500).json({msg: error.message});
    }
}

export const updateUser = async(req, res) => { 
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!user) return res.status(404).json({msg: " User Tidak Di temukan"});

     //extract body
     const {name, email, password, confirmPassword, role} = req.body;

     let hashPassword;

     if(password === "" || password === null){
        hashPassword = user.password
     } else {
        hashPassword = await argon2.hash(password);
     }

     if(password !== confirmPassword) return res.status(400).json({msg : "Password dan Confirm Tidak Cocok"});

     try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            // password: password,
            role: role
        },{
            where:{ 
                id : user.id
            }
        });

        res.status(200).json({msg: "User Updated"});

    } catch (error){
        res.status(500).json({msg: error.message});
    }


    
}

export const deleteUser = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!user) return res.status(404).json({msg: " User Tidak Di temukan"});
     try {
        await Users.destroy({
            where:{ 
                id : user.id
            }
        });

        res.status(200).json({msg: "User Deleted"});

    } catch (error){
        res.status(500).json({msg: error.message});
    }


}