import { Storage, Client, ID } from "appwrite";

import conf from "../conf/conf";

export class FileService{

    client = new Client()
    bucket;

    constructor(){

        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.projectId)
        
            this.bucket = new Storage(this.client)
    }

async uploadFile(file){
    try {
        console.log('in upload file',file)
        return await this.bucket.createFile(
            conf.bucketId,
            ID.unique(),
            file
        )
    } catch (error) {
       console.log("error in uploadfile", error);

        throw error;
        return false
    }
}

async deleteFile(fileId){
    try {
        return await this.bucket.deleteFile(
            conf.bucketId,
            fileId
        )
    } catch (error) {
       console.log("error in deletefile", error);

        throw error
    }
} 

getImagePreview(fileId){
     try {
         return this.bucket.getFilePreview(
           conf.bucketId,
           fileId
       )
     } catch (error) {
       console.log("error in preview file", error);
        throw error
     }
}

downloadFile(fileId){
    try {
        return  this.bucket.getFileDownload(
            conf.bucketId,
            fileId
        )
    } catch (error) {
       console.log("error in download file", error);

        throw error
    }
}

}

const fileService = new FileService()

export default fileService;