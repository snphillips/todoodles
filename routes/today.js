const { Router } = require('express');
// const pool = require("../config/connection");
const router = Router();


router.get("/", (request, response, next) => {
  console.log("get all today")
  pool.query(
    "SELECT * FROM todo WHERE type = 'today';",
    (err, res) => {
     console.log("error:", err)
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});




router.get("/:id", (request, response, next) => {
  response.send("get one today")
});


router.post("/", (request, response, next) => {
  response.send("post one today")
  response.redirect('/todo');
});


router.put("/:id", (request, response, next) => {
  response.send("put/edit one today")
});


router.delete("/:id", (request, response, next) => {
  response.send("delete one today")
  response.redirect('/today');
});




module.exports = router;
