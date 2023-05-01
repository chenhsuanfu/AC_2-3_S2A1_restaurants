const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

// 連結註冊頁面
router.get('/register', (req, res) => {
    res.render('register')
})

// 註冊資料
router.post('/register', (req, res) => {

    const { name, email, password, confirmPassword } = req.body

    User.findOne({ email }).then(user => {

      if (user) {
        console.log('User already exists.')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {

        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
  })

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
  })


module.exports = router