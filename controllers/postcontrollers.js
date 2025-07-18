/* const posts = require("../data/posts"); */

const { parse } = require("dotenv");
const connection = require("../data/db");

function index(req, res) {
  const sql = "SELECT * FROM posts;";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    res.json(results);
  });

  // let filteredMenu = posts;
  // //prova per error (500) Umberto()
  // if (req.query.tags) {
  //   filteredMenu = posts.filter((post) => post.tags.includes(req.query.tags));
  // }
  // /*  res.sendStatus(204); */
  // res.json(filteredMenu);
  // console.log(filteredMenu);
}

function show(req, res) {
  // recuperiamo l'id dall' URL
  const id = req.params.id;

  const sql = "SELECT * FROM posts WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Posts not found" });
    res.json(results[0]);
    console.log(results);
  });
}

function destroy(req, res) {
  // recuperiamo l'id dall' URL
  const id = req.params.id;
  console.log(id);

  //Eliminiamo la pizza dal menu
  connection.query("DELETE FROM posts WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Posts not deleted" });
    res.sendStatus(204);
  });
}

function post(req, res) {
  const { title, content, image } = req.body;

  const sql = "INSERT INTO posts (title, content, image) VALUES (? , ?, ?)";
  connection.query(sql, [title, content, image], (err, results) => {
    if (err) return res.status(500).json({ error: "failed create new post" });
    res.status(201).json(results);
  });
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const { title, content, image } = req.body;

  const sql = "UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?";
  connection.query(sql, [title, content, image, id], (err, results) => {
    if (err) return res.status(500).json({ error: "failed to update post" });
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Post not found" });
    // res.json({ message: "Post updated successfully",  result: results  });
  });

  const sqlSinglePost = "SELECT * FROM posts WHERE id = ?";
  connection.query(sqlSinglePost, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    if (results.length === 0)
      return res.status(404).json({ error: "Posts not found" });

    // res.json(results[0]);
    res.json({ message: "Post updated successfully", result: results[0] });
  });
}

module.exports = {
  index,
  show,
  post,
  update,
  destroy,
};

// const newPostId = posts[posts.length - 1].id + 1;
// //creiamo un nuovo oggetto post
// const newPostObj = {
//   id: newPostId,
//   title: req.body.title,
//   content: req.body.content,
//   image: req.body.image,
//   tags: req.body.tags,
// };
// //aggiungiamo il nuovo post
// posts.push(newPostObj);
//restituiamo lo status corretto e il post creato
// res.status(201).json(newPostObj);
/* console.log(newPostObj); */

/* function update(req, res) {
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
  post.title = req.body.title;
  post.content = req.body.content;
  (post.image = req.body.image), (post.tags = req.body.tags);
  console.log(post);
  res.json(post);
} */

/* function show(req, res) {
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
  res.json(post);
  console.log(post);
} */
