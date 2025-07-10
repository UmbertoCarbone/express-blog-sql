const posts = require("../data/posts");

function index(req, res) {
  let filteredMenu = posts;
  //prova per error (500) Umberto()
  if (req.query.tags) {
    filteredMenu = posts.filter((post) => post.tags.includes(req.query.tags));
  }
  /*  res.sendStatus(204); */
  res.json(filteredMenu);
  console.log(filteredMenu);
}

function show(req, res) {
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
}

function post(req, res) {
  const newPostId = posts[posts.length - 1].id + 1;
  //creiamo un nuovo oggetto post
  const newPostObj = {
    id: newPostId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };
  //aggiungiamo il nuovo post
  posts.push(newPostObj);
  //restituiamo lo status corretto e il post creato
  res.status(201).json(newPostObj);
  console.log(newPostObj);
}
function update(req, res) {
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
}

function destroy(req, res) {
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
}

module.exports = {
  index,
  show,
  post,
  update,
  destroy,
};
