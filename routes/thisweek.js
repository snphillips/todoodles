const { Router } = require('express');
const router = Router();


router.get("/", (request, response, next) => {
  response.send("get all today")
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
