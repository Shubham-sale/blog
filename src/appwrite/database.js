import {Client, Databases,Query} from 'appwrite'
import conf from '../conf/conf';

export class DatabaseService{
    client = new Client()
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.projectId)

            this.databases = new Databases(this.client)
    }

async createPost({ title, slug, content, featuredImage,status, userId}){
    try {
        return await this.databases.createDocument(
            conf.databaseId,
            conf.collectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        )
    } catch (error) {
       console.log("error in createPost", error);

        throw error
    }
}
    
async updatePost(slug,{ title, content, featuredImage,status}){
    try {
         return await this.databases.updateDocument(
            conf.databaseId,
            conf.collectionId,
            slug,
            {
                title,content,featuredImage,status
            }
         )
    } catch (error) {
       console.log("error in updatePost", error);

        throw error       
    }
}

async deletePost(slug){
    try {
        return await this.databases.deleteDocument(
            conf.databaseId,
            conf.collectionId,
            slug
        )
    } catch (error) {
        console.log("error deletePost", error);
       
        throw error;        
    }
}

async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.databaseId,
            conf.collectionId,
            slug
        )
    } catch (error) {
       console.log("error in getPost", error);
        throw error
    }
}
async getAllPost(queries = [Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(
            conf.databaseId,
            conf.collectionId,
            queries
        )
    } catch (error) {
       console.log("error in getAllpost", error);

        throw error
    }
}
}

const databaseService = new DatabaseService()

export default databaseService