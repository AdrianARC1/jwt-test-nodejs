const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({
    text: 'La api funciona'
  })
});

router.post('/api/login', (req, res) => {
  const user = {id: 3}
  const token = jwt.sign({user}, 'my_secret_key')
  res.json({
    token
  })
});

router.get('/api/protected', ensureToken, (req, res, next) => {

  jwt.verify(req.token, 'my_secret_key', (error, data)=>{
  if (error) {
    res.sendStatus(403)
  } else {
    res.json({
      text: 'Protegido!',
      data
    })
  }
  })
});

function ensureToken(req,res,next){
  const bearerHeader=req.headers['authorization']
  console.log(bearerHeader)

  if(typeof bearerHeader){
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token=bearerToken
    next()  
  }else{
    res.sendStatus(403)
  }

}

module.exports = router;
