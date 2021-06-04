const users = []
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existing = bcrypt.compareSync(password, users[i].passHash)
        if (users[i].username === username && existing) {
          let userCopy = {...users[i]}
          delete userCopy.passHash
          res.status(200).send(userCopy)
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        // console.log(userObj)
        const {username, email, firstName, lastName, password} = req.body
        users.forEach(function(user){
          if (user.username === username || user.email === email) {
              res.status(400).send('user already exists')
              return
          }
        })

        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password, salt)

        let userObj = {
          username,
          email,
          firstName,
          lastName,
          passHash
        }
        // console.log(userObj)
        let userObjCopy = {...userObj}
        delete userObjCopy.passHash
        // users.push(req.body)
        users.push(userObj)
        res.status(200).send(userObjCopy)
    }
}