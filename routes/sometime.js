const { Router } = require('express');
const pool = require("../config/connection");
const router = Router();


router.get("/", (request, response, next) => {
  console.log("get all sometime")

  pool.query(
    "SELECT * FROM todo WHERE type = 'sometime';",
    (err, res) => {
     console.log(err)
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

router.get("/:id", (request, response, next) => {
  response.send("get one sometime")
});


router.post("/", (request, response, next) => {
  response.send("post one sometime")

  response.redirect('/todo');
});


router.put("/:id", (request, response, next) => {
  response.send("put/edit one sometime")
});


router.delete("/:id", (request, response, next) => {
  response.send("delete one sometime")

  response.redirect('/sometime');
});




module.exports = router;
