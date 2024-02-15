import { client } from '../server.js';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const dataBaseName = 'Bulk-Email-Sender';

// Create a new user in the database
export async function createUser(data) {
    return await client.db(dataBaseName).collection("users").insertOne(data);
}

// Add a session token with an expiration time
export async function addToken(data) {
    const ret = await client.db(dataBaseName).collection("sessionTokens").insertOne(data);
           await client.db(dataBaseName).collection("sessionTokens").createIndex({ "DateTime": 1} , {expireAfterSeconds :7200})
           return ret
}

// Check a string in the session tokens collection
export async function checkString(data) {
    return client.db(dataBaseName).collection("sessionTokens").findOne({randString:data});          
}

// Delete a string from the session tokens collection
export async function deleteOneString(data) {
    return client.db(dataBaseName).collection("sessionTokens").deleteOne({randString:data});          
}

// Get user's profile picture and first name
export async function getProfilePic(data) {
    return client.db(dataBaseName).collection("users").findOne({_id:new ObjectId(data)},{projection:{imageUrl:1,firstName:1}});          
}

// Change the user's password in the database
export async function changePasswordInDB(data) {
    return await client.db(dataBaseName).collection("users").updateOne({email:data.email},{$set:{password:data.password}});
}

// Get user information from the database by email
export async function getUsers(data) {
    return await client.db(dataBaseName).collection("users").findOne({email:data});
}

// Update email verification status
export async function updateVerification(data) {
    return await client.db(dataBaseName).collection("users").updateOne({email:data},{$set:{emailVerified:"yes"}});
}

// Get data from the session tokens collection
export async function getDataFromSessionCollection(data) {
    return await client.db(dataBaseName).collection("sessionTokens").findOneAndDelete({token:data});
}

// Generate a hashed password using bcrypt
export async function generateHashedPassword(password){
    const NO_OF_ROUNDS = 10 ;
    const salt =await bcrypt.genSalt(NO_OF_ROUNDS)
    const hashedPassword =await bcrypt.hash(password , salt);
    return hashedPassword
  }