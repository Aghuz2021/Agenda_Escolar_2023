// controllers/mainController.js

const index = (req, res) => {
   if (req.session.loggedin) {
       res.render('index', {
           login: true,
           
       });
   } else {
       res.render('index', {
           login: false,
           nombre: 'Debe iniciar sesión'
       });
   }
};

module.exports = {
   index
};
