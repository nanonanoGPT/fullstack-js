import User from "../models/UserModel.js";
import argon from "argon2";


export const Login = async(req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if(!user) return res.status(404).json({msg: " User Tidak Di temukan"});
    const match = await argon.verify(user.password, req.body.password);

    if(!match) return res.status(400).json({msg: "Wrong Password"});

    req.session.userId = user.uuid;
    const id = user.id;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    
    res.status(200).json({id,uuid, name, email, role});
}


export const Me = async(req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon Login Ke akun anda"});
    }

    const user = await User.findOne({
        attributes: ['uuid', 'name','email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });

    if(!user) return res.status(404).json({msg: " User Tidak Di temukan"});
    res.status(200).json(user);
}

export const Logout = (req, res) => {
    const a = req.session.destroy();
    if(a){
        res.status(200).json({msg: "Anda Telah Logout"});
    }

    // res.session.destroy((err) => {
    //     if(err) return req.status(400).json({msg: "Tidak dapat Logout"});
    //     res.status(200).json({msg: "Anda Telah Logout"});
    // })
}