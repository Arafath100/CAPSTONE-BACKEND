import { ObjectId } from 'mongodb';
import { client } from '../server.js';

const dataBaseName = 'Bulk-Email-Sender';

// Create a new user in the database
export async function createUser(data) {
    return await client.db(dataBaseName).collection("users").insertOne(data);
}

// Find data of email credentials for a user
export async function findDataOfEmailCredential(data) {
    return await client.db(dataBaseName).collection("mail-credentials").findOne({user:data.user});
}

// Create user credentials in the database
export async function createUserCredential(data) {
    return await client.db(dataBaseName).collection("mail-credentials").insertOne(data);
}

// Update user data in the database
export async function updateData(data) {
    return await client.db(dataBaseName).collection("mail-credentials").updateOne({user:data.user},{$set:{email:data.email,password:data.password}});
}

// Get user credentials from the database
export async function getCredentialFromDB(data) {
    return await client.db(dataBaseName).collection("mail-credentials").findOne({user:data});
}

// Get user credentials from the database
export async function getUserCredentialsFromDB(user){
    return await client.db(dataBaseName).collection("mail-credentials").findOne({user:user})
}

// Delete user credentials from the database
export async function delCredentialsFromDB(user){
    return await client.db(dataBaseName).collection("mail-credentials").deleteOne({user:user})
}

// Save log data in the database
export async function saveLogDataInDB(data){
    return await client.db(dataBaseName).collection("logCollect").insertOne(data)
}

// Get log details from the database
export async function getLogDetailsFromDB(data){
    return await client.db(dataBaseName).collection("logCollect").find({user:data}).toArray()
}

// Get data from the database within a specific date range
export async function getDataFromDBofRange(user,start,end){
    return await client.db(dataBaseName).collection("logCollect").find({user:user,time:{$gt:new Date(start),$lt:new Date(end)}},{projection:{time:1,accepted:1}}).toArray()
}

// Get mail sent information from the database within a specific date range
export async function getMailSentInfoFromDb(user,start,end){
    return await client.db(dataBaseName).collection("logCollect").find({user:user,time:{$gt:new Date(start),$lt:new Date(end)}},{projection:{time:1,accepted:1}}).toArray()
}

// Get user's name from the database
export async function getUserNamefromDb(user){
    return await client.db(dataBaseName).collection("users").findOne({_id:new ObjectId(user)},{projection:{userName:1}})
}