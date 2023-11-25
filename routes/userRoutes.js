import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import { auth } from '../middleware/auth.js';
import {
  addToken,
  changePasswordInDB,
  checkString,
  createUser,
  deleteOneString,
  generateHashedPassword,
  getDataFromSessionCollection,
  getUsers,
  updateVerification,
} from "../services/userService.js";
import sendEmail from "../utils/sendEmail.js";
const router = express.Router();

// const API = "http://localhost:5173";
// const API = "https://capstone-project-bulk-email-tool-guvi.netlify.app"
const API = process.env.API;

// API route to handle user signup
router.post('/signup',express.json(),async function(request, response){
    const { email, emailVerified, password, userName } = request.body;
    const hashedPassword =await generateHashedPassword(password);
    const userPresentOrNot = await getUsers(email); 
    if(userPresentOrNot == null ){
      const result = await createUser({
        email        : email,
        password     : hashedPassword,
        userName    : userName,
        emailVerified:emailVerified,
      });

      let  token = randomstring.generate();
      
      const verificationInitiate = await addToken({
        email:email,
        token:token,
        DateTime: new Date()
      });
      const mail =await sendEmail(email,"verification token" , `${API}/emailverify/${token}`)   
      response.send({
        message: "successfully Created ",
        verificationInitiate: verificationInitiate,
        ...result,
      }); 
    }else if(password.length<=8){                                                                                    
        response.status(400).send({message : 'password must be at least 8 characters'})
    }else{
        response.status(400).send({message: "already exist"})
    }
  })

// API route to verify email
router.get('/verifyemail/:id',express.json(),async function(request, response){
    const { id } = request.params ;
    const getData = await getDataFromSessionCollection(id);
    if(getData.value){
      const update =await updateVerification(getData.value.email)
      response.status(200).send({
        message:"verified successful"
      })
    }else{
      response.status(404).send({
        message:"invalid credential"
      })
    }
})

// API route to initiate a password reset
router.post('/resetpassword',express.json(),async function(request, response){
    const data = request.body;
    const getData = await getUsers(data.email);
    if(getData){
      const randString = randomstring.generate()
      const verificationInitiate = await addToken({
        email:data.email,
        randString:randString,
        DateTime: new Date()
      });
      
      const mail =await sendEmail(data.email,"Reset Password" , `${API}/pas-reset-completion/${randString}`)  
      response.status(200).send({message:'successfull',mail:mail})
    }else{
      response.status(401).send({message:'invalid credentials'})
    } 
})

// API route to check a password reset string
router.get('/resetpassword/:string',express.json(),async function(request, response){
  const {string} =request.params;
  const getResult =await checkString(string);
  if(getResult){
    response.status(200).send({message:"present",email:getResult.email})
  }else{
    response.status(404).send({message:"abscent"})
  }
})

// API route to change the password after reset
router.post('/changepassword/:string',express.json(),async function(request,response){
  const {string} =request.params;
  const data =request.body;
   const hashedPassword = await generateHashedPassword(data.password)
   const removingfromDb= await deleteOneString(string)
   if(removingfromDb.deletedCount === 1){
     //!changeing password
     const changeInDB = await changePasswordInDB({
       email:data.email,password:hashedPassword
      });
      response.status(200 ).send({message:"successfull"})
    }else{
      response.send({message:"invalid "})
    }
})

// API route to verify user token (authentication)
router.get('/verifyToken',auth,express.json(),async function(request,response){
  response.send({message:'success'})
})

// API route to handle user login
router.post('/login',express.json(),async function(request, response){
  const {email , password} = request.body;
  const userFromDB = await  getUsers(email);
 
  if(userFromDB == null){
    response.status(401).send({message:"Invalid credentials"})
  }else{
     const myobjectId = userFromDB._id
    if(userFromDB.emailVerified == 'yes'){    
        const storedDBPassword = userFromDB.password ;
        const isPasswordCheck = await bcrypt.compare( password , storedDBPassword );
            if(isPasswordCheck){
              const token = jwt.sign({ foo: userFromDB._id }, process.env.SECRET_KEY);
              response.send({
                message: "succeful login",
                token: token,
                roleId: userFromDB.roleId,
                _id:myobjectId.toString()
              });
            }else{
              response.status(401).send({message:"Invalid credentials"})
            }
    }else{
      const token = randomstring.generate();
      const verificationInitiate = await addToken({
        email:email,
        token:token,
        DateTime: new Date()
      });
      const mail =await sendEmail(email,"verification token" , `${API}/emailverify/${token}`)  
      response.status(406).send({message:"verification pending"})
    }
  }
})

export default router;
