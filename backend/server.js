import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/config.js'
import authRoutes from './routes/auth.route.js'
import internshipRoutes from './routes/internship.route.js'
import applicationRoutes from './routes/application.route.js'
import adminRoutes from './routes/admin.routes.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT =process.env.PORT ;

app.get("/", (req, res) => res.send("Server running now!"));

app.use('/api/auth', authRoutes);
app.use('/api/internships',internshipRoutes)
app.use('/api/applications',applicationRoutes);
app.use('/api/admin',adminRoutes);



app.listen(PORT , ()=>{
    connectDB()
    console.log("server started at http://localhost:"+ PORT);

})