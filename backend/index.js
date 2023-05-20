import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
dotenv.config();


const app = express();

const sessionStore = new SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// start async db
// di gunakan untuk syncron dengan db 
// jika tidak di gunakan mending di coment aja 
// hanya di jalankan saat ada perubahan model db 
// (async()=> {
//     await db.sync();
// })();

// end sync db 


app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    // di gunakan untuk mengijinkan aplikasi yg boleh mengakses rest api ini
    origin: 'http://localhost:3000'
}));

app.use(express.json());

// di gunakan untuk menjalankan  fungsi di controller 
app.use(UserRoute);
app.use(AuthRoute);
app.use(ProductRoute);

// untuk create table pakcage session 
// store.sync();


app.listen(process.env.APP_PORT, ()=> {
    console.log('server up and running ....');
});