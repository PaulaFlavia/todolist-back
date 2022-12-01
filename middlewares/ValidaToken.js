
require('dotenv').config;
const jwt = require('jsonwebtoken');

const ValidaToken = (req, res, next) => {
//Verificar se o token é valido
try {
    req.usuario = jwt.verify(req.token, process.env.JWT_KEY);
} catch(error) {
    return res.status(403).json({erro: "token inválido"});
  }

  next();

//guardar as info do user  req.usuario
}

module.exports = ValidaToken;