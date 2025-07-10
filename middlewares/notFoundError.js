function notFound(req,res,next) {
  res.status(404)
  res.json({
    error: "Not Found",
    Message: "Pagina non trovata"
  });
}

module.exports = notFound