module.exports = (req, res, next) => {
   if (!req.usuario)
       res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
   next();
};
