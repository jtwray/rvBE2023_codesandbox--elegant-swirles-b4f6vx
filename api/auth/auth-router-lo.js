const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets.js')

const unique = require('../middleware/uniqueuserMiddleware.js')
const checkfor = require('../middleware/checkfor.js')

const { add, findBy } = require('../landOwner/landOwner-model.js')

//  CREATE

router.post('/register/', checkfor('username'), checkfor('password'), unique('landowner'), (req, res) => {
  const landowner = req.body
  // console.log(req)
  const hash = bcrypt.hashSync(landowner.password, 7)
  landowner.password = hash

  add(landowner)
    .then(saved => {
      const token = genToken(saved)
      res.status(201).json({ saved, token })
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error while trying to add the user to the database.', error: `|| ---${error}--- ||  ##${console.error(error)}##` })
    })
})

router.post('/login/', checkfor('username'), checkfor('password'), (req, res) => {
  const { username, password } = req.body

  findBy('landowner', { username })
    .first()
    .then(landowner => {
      if (landowner && bcrypt.compareSync(password, landowner.password)) {
        const token = genToken(landowner)
        res.status(200).json({
          message: `Welcome landowner ${landowner.username}!`,
          token: token,
          username: username,
          id: landowner.id
        })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    }).catch(error => { res.status(500).json(error); console.error(error) })
})

function genToken (landowner) {
  const payload = {
    landownerid: landowner.id,
    username: landowner.username,
    roles: 'landowner'
  }
  const options = {
    expiresIn: '1d'
  }

  const token = jwt.sign(payload, jwtSecret, options)
  return token
}

module.exports = router
