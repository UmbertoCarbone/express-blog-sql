
function serverError(err,req,res,next) {
    res.status(500)
    res.json({
        error:err.message,
    })
}
 module.exports = serverError