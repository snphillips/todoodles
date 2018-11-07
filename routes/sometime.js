const { Router } = require('express');
const router = Router();


router.get("/", (request, response, next) => {
  response.send("get all sometime")
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
