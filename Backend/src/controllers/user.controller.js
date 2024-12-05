/*import httpStatus from "http-status";
import { User } from "../models/users.model.js";
import bcrypt, {hash} from "bcrypt";


const login = async (req, res) => {

    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({message: "Please Provide"})
    }

    try {
        const user = await User.find({username});
        if(!user){
            return res.status(404).json({message: "User Not Found"})
        }

        if(bcrypt.compare(pasword, user.password)){
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token })
        }

    } catch (error) {
        return res.status(500).json({ message: `Something went wrong ${error}`})
    }
}

const register = async (req, res) => {
    const {name, username, password} = req.body;

    try {
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message: "User already exists"})
        }

        const hashedPassword = bcrypt.hash(password,10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({message: "User created"})

    } catch (error) {
        res.json({message: `Something went wrong: ${error.message}`})
    }
}

export {login, register} */

import httpStatus from "http-status";
import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please provide both username and password" });
    }

    try {
        const user = await User.findOne({ username }); // Use `findOne` instead of `find` to get a single user
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a token
        const token = crypto.randomBytes(20).toString("hex");
        user.token = token;
        await user.save();

        return res.status(httpStatus.OK).json({ token });
    } catch (error) {
        return res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};

const register = async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Add `await` here

        // Create a new user
        const newUser = new User({
            name,
            username,
            password: hashedPassword, // Save the hashed password
        });

        await newUser.save();

        return res.status(httpStatus.CREATED).json({ message: "User created" });
    } catch (error) {
        return res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};

export { login, register };
