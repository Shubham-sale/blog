import {Account,Client,ID} from 'appwrite'

import conf from '../conf/conf'

export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.projectId)

        this.account = new Account(this.client)
    }

async createAccount({email, password, name}){

    try {
        const userAccount= await this.account.create(ID.unique(), email, password, name)
        if(userAccount){
            // call another method for logining user 
            return this.login({email, password})
        } else {
            return userAccount
        }
    } catch (error) {
       console.log("error in createAccount", error);

        throw error
    }
} 
 
async login ({ email, password}){

    try{
        return await this.account.createEmailPasswordSession(email, password)
    } catch  (error) {
       console.log("error in  login", error);

        throw error
    }
}

async getCurrentUser(){
    try {
        return await this.account.get()
    } catch (error) {
       console.log("error in getcurrentUser", error);

        throw error
    }
    return null
}
    
async logout(){
    try {
        return await this.account.deleteSessions()
    } catch (error) {
       console.log("error in logout", error);

        throw error
    }
    
}
}
const authService = new AuthService()
export default authService