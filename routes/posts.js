const express = require("express");
const router = express.Router();
/* const posts = require("../data/posts"); */ // remove when unused

// Controller
const postController = require("../controllers/postcontrollers");


//Index
router.get("/", postController.index);

//Show
router.get("/:id", postController.show);

//store
router.post("/", postController.post);

//update
router.put("/:id", postController.update);

/* router.patch("/:id", (req, res) => {
  res.send("Modifica parziale del blog" + req.params.id);
});  */

//Delete

router.delete("/:id", postController.destroy)
/* router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404);

    return res.json({
      status: 404,
      error: "Not found",
      message: "Post non trovato",
    });
  }
  posts.splice(posts.indexOf(post), 1);
  res.sendStatus(204);
  console.log(posts);
}); */


module.exports = router;
