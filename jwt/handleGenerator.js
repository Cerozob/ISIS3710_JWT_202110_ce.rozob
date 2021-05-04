let jwt = require( 'jsonwebtoken' );
let config = require('./config');
const users = require("./controller/users");
const crypto = require('crypto');
const hash = crypto.createHash('sha512');

// Clase encargada de la creación del token
class HandlerGenerator {

  login( req, res ) {
    
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;

    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if( username && password ) {

      // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
      // de lo contrario, un mensaje de error es retornado
      let user = users.getUser(username);

      if( username === user.username && getHash(password) === user.password ) {
        
        // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
        let token = jwt.sign( { username: username },
          config.secret, { expiresIn: '24h' } );
        
        // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
        res.json( {
          success: true,
          message: 'Authentication successful!',
          token: token
        } );

      } else {
        
        // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
        res.send( 403 ).json( {
          success: false,
          message: 'Incorrect username or password'
        } );

      }

    } else {

      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      res.send( 400 ).json( {
        success: false,
        message: 'Authentication failed! Please check the request'
      } );

    }

  }

  register(req, res) {
    let usrnam = req.body.username;
    let passwd = req.body.password;
    users.addUser({ username: usrnam, password: getHash(passwd) });
    res.send(200).json{
      message: `User saved with username ${users.getUser(usrnam).username}`,
    }
  }

  index( req, res ) {
    
    // Retorna una respuesta exitosa con previa validación del token
    res.json( {
      success: true,
      message: 'Index page'
    } );

  }
}

function getHash(string)
{
    data = hash.update(string, "utf-8");
  gen_hash = data.digest("hex");
  return gen_hash;
}

module.exports = HandlerGenerator;
