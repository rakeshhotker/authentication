const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query("select * from users where user_id=$1", [
      req.user,
    ]);
    res.status(200).json(user.rows[0].user_name);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
module.exports = router;
