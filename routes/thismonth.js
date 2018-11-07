const { Router } = require('express');
const router = Router();


router.get("/", (request, response, next) => {
  response.send("get all thismonth")
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
