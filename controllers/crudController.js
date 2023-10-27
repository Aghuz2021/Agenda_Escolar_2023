const connection = require("../database/db");

const CreateRegistro = (connection, data, res, renderOptions) => {
   connection.query('INSERT INTO usuarios SET ?', data, (error, results) => {
      if (error) {
         console.log(error);
         res.status(500).send('Error en el servidor');
      } else {
         res.render(renderOptions.view, {
            alert: true,
            alertTitle: renderOptions.title,
            alertMessage: renderOptions.message,
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 3000,
            ruta: ''
         });
      }
   });
};






module.exports = CreateRegistro;