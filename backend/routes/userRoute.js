
import express from 'express';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import { generatetkn } from '../jwt.js';
const router = express.Router();

router.post('/adduser',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    const { name, password, email, location } = req.body;
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() })
    }
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password,salt);
    try {

   
      await User.create({
        name: name,
        password: hashpass,
        email: email,
        location: location
      }).then(res.json({ msg: true }))
    } catch (err) {
      console.log(err);
      res.json({ msg: false });
    }
  });

router.post('/loginuser',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    const { email, password } = req.body;
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() })
    }
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ err: 'signup please.' })
      }
      const pwdcmp = await bcrypt.compare(password,user.password)
      if (!pwdcmp) {
        return res.status(200).json({ err:'signup please.' });
      }
      
      
      const data = {
        u:{
          id:user.id
        }
      }
      const auth = generatetkn(data);
        return res.json({ msg: true , auth:auth})


    } catch (err) {
      console.log(err)
      return res.json({msg:false})
    }
  });

  router.get('/getAll' , )
  
export default router;
