const { Router } = require('express');
const pool = require("../config/connection");
const router = Router();


router.get("/", (request, response, next) => {
  console.log("get all this week")

  pool.query(
    "SELECT * FROM todo WHERE type = 'thisweek';",
    (err, res) => {
     console.log(err)
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

router.get("/:id", (request, response, next) => {
  response.send("get one thisweek")
});


router.post("/", (request, response, next) => {
  response.send("post one thisweek")

  response.redirect('/todo');
});


router.put("/:id", (request, response, next) => {
  response.send("put/edit one thisweek")
});


router.delete("/:id", (request, response, next) => {
  response.send("delete one thisweek")

  response.redirect('/thisweek');
});




module.exports = router;
