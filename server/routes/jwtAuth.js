const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
//registering

router.post("/register", validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await pool.query("select * from users where user_email=$1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }
    //3. Bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //4. enter the new user inside our database
    const newUser = await pool.query(
      "Insert into users (user_name,user_email,user_password) values($1,$2,$3) returning *",
      [name, email, bcryptPassword]
    );
    //generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//login
router.post("/login", validInfo, async (req, res) => {
  try {
    //1 destructure the req.body
    const { email, password } = req.body;
    //check if user doesn't exist
    const user = await pool.query("select * from users where user_email=$1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect");
    }
    //check if incoming passoword is same as db password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      res.status(401).json("Password or email is incorrect");
    }
    //give them the jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
  }
});
module.exports = router;
