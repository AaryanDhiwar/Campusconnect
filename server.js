const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./connect");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Campus Connect Server is Running!");
});

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// student registration api

app.post("/api/students/register", async (req, res) => {

    try {

        const {
            fullname,
            email,
            password,
            enrollment_no,
            branch,
            semester
        } = req.body;


        // Check required fields

        if (
            !fullname ||
            !email ||
            !password ||
            !enrollment_no ||
            !branch ||
            !semester
        ) {

            return res.status(400).json({
                message: "Please fill in all fields."
            });

        }


        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);


        // Insert student into MySQL

        const sql = `
            INSERT INTO students
            (fullname, email, password, enrollment_no, branch, semester)
            VALUES (?, ?, ?, ?, ?, ?)
        `;


        await db.promise().execute(sql, [

            fullname,
            email,
            hashedPassword,
            enrollment_no,
            branch,
            semester

        ]);


        res.status(201).json({

            message: "Student registered successfully!"

        });


    } catch (error) {

        console.error("Registration error:", error);


        // Duplicate email

        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({

                message: "This email is already registered."

            });

        }


        res.status(500).json({

            message: "Registration failed. Please try again."

        });

    }

});

// faculty registration api

app.post("/api/faculty/register", async (req, res) => {

    try {

        const {
            fullname,
            email,
            password,
            faculty_id,
            department
        } = req.body;


        // Check required fields

        if (
            !fullname ||
            !email ||
            !password ||
            !faculty_id ||
            !department
        ) {

            return res.status(400).json({
                message: "Please fill in all fields."
            });

        }


        // Hash password

        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Insert faculty into MySQL

        const sql = `
            INSERT INTO faculty
            (fullname, email, password, faculty_id, department)
            VALUES (?, ?, ?, ?, ?)
        `;


        await db.promise().execute(sql, [

            fullname,
            email,
            hashedPassword,
            faculty_id,
            department

        ]);


        res.status(201).json({

            message: "Faculty registered successfully!"

        });


    } catch (error) {

        console.error("Faculty registration error:", error);


        // Duplicate email

        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({

                message: "This email is already registered."

            });

        }


        res.status(500).json({

            message:
                "Faculty registration failed. Please try again."

        });

    }

});

// login api

app.post("/api/login", async (req, res) => {

    try {

        const {
            email,
            password,
            role
        } = req.body;


        // Check required fields

        if (!email || !password || !role) {

            return res.status(400).json({
                message: "Email, password and role are required."
            });

        }


        // Decide which table to search

        let table;

        if (role === "student") {

            table = "students";

        } else if (role === "faculty") {

            table = "faculty";

        } else {

            return res.status(400).json({
                message: "Invalid role."
            });

        }


        // Find user by email

        const [rows] = await db.promise().execute(
            `SELECT * FROM ${table} WHERE email = ? LIMIT 1`,
            [email]
        );


        if (rows.length === 0) {

            return res.status(401).json({
                message: "Account not found."
            });

        }


        const user = rows[0];


        // Check password

        const passwordMatch =
            await bcrypt.compare(password, user.password);


        if (!passwordMatch) {

            return res.status(401).json({
                message: "Incorrect password."
            });

        }


        // Create JWT

        const token = jwt.sign(

            {
                id: user.id,
                email: user.email,
                role: role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "2h"
            }

        );


        // Send user information to frontend

        res.json({

            message: "Login successful!",

            token: token,

            user: {

                id: user.id,

                fullname: user.fullname,

                email: user.email,

                role: role,

                ...(role === "student"
                    ? {
                        enrollment_no: user.enrollment_no,
                        branch: user.branch,
                        semester: user.semester
                    }
                    : {
                        faculty_id: user.faculty_id,
                        department: user.department
                    })

            }

        });


    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({

            message: "Login failed. Please try again."

        });

    }

});

app.put("/api/students/profile", async (req, res) => {

    try {

        const {
            id,
            fullname,
            email,
            enrollment_no,
            branch,
            semester,
            about_me
        } = req.body;


        // Check ID

        if (!id) {

            return res.status(400).json({
                message: "Student ID is required."
            });

        }


        // Update student

        const sql = `
            UPDATE students
            SET
                fullname = ?,
                email = ?,
                enrollment_no = ?,
                branch = ?,
                semester = ?,
                about_me = ?
            WHERE id = ?
        `;


        await db.promise().execute(sql, [

            fullname,
            email,
            enrollment_no,
            branch,
            semester,
            about_me,
            id

        ]);


        // Get updated student

        const [rows] = await db.promise().execute(

            `SELECT
                id,
                fullname,
                email,
                enrollment_no,
                branch,
                semester,
                about_me
             FROM students
             WHERE id = ?`,

            [id]

        );


        res.json({

            message: "Profile updated successfully!",

            user: {

                ...rows[0],

                role: "student"

            }

        });


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({

                message:
                    "This email is already registered."

            });

        }


        res.status(500).json({

            message:
                "Profile update failed."

        });

    }

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});