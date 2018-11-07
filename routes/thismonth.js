const { Router } = require('express');
const pool = require("../config/connection");
const router = Router();


router.get("/", (request, response, next) => {
  console.log("get all thismonth")

  pool.query(
    "SELECT * FROM todo WHERE type = 'thismonth';",
    (err, res) => {
     console.log(err)
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

router.get("/:id", (request, response, next) => {
  response.send("get one thismonth")
});


router.post("/", (request, response, next) => {
  response.send("post one thismonth")

  response.redirect('/todo');
});


router.put("/:id", (request, response, next) => {
  response.send("put/edit one thismonth")
});


router.delete("/:id", (request, response, next) => {
  response.send("delete one thismonth")

  response.redirect('/thismonth');
});




module.exports = router;
