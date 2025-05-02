import User from "./models/User.js";
import bcrypt from 'bcrypt'; 
import connectionToDb from "./db/db.js";

const UserRegister = async () => {
    await connectionToDb();  

    try {
        const hashPasswordAdmin = await bcrypt.hash("admin", 10);
        const hashPasswordEmployee = await bcrypt.hash("shiv123", 10);

        const newUser = new User({
            name: "admin",
            email: "admin@gmail.com",
            password: hashPasswordAdmin,  
            role: "admin"
        });

        const employeeUser = new User({
            name: "Shiv",
            email: "shivanshupatel2004@gmail.com",
            password: hashPasswordEmployee,  
            role: "employee"
        });

        await newUser.save();
        await employeeUser.save();
        console.log("users added successfully.");
    } catch (error) {
        console.error("Error in UserRegister:", error);
    }
};

UserRegister();