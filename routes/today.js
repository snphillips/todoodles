const { Router } = require('express');
const router = Router();


router.get("/", (request, response, next) => {
  response.send("get all")
});

router.get("/:id", (request, response, next) => {
  response.send("get one")
});


router.post("/", (request, response, next) => {
  response.send("post one")

  response.redirect('/todo');
});


router.put("/:id", (request, response, next) => {
  response.send("put/edit one")
});


router.delete("/:id", (request, response, next) => {
  response.send("delete one")

  response.redirect('/today');
});












module.exports = router;
