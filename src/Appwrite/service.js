import { Client, Databases, ID, Storage } from "appwrite";
import conf from "../util/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.APPWRITE_URL)
      .setProject(conf.APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createBlog({ title, content, blogImage }) {
    try {
      return await this.databases.createDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        ID.unique(),
        {
            title,
            content,
            blogImage
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updateBlog(blogId,{title,content,blogImage}){

        try {
                return await this.databases.updateDocument(
                    conf.APPWRITE_DATABASE_ID,
                    conf.APPWRITE_COLLECTION_ID,
                    blogId,
                    {
                        title,
                        content,
                        blogImage
                    }
                )

        } catch (error) {
            throw error
        }

  }

  async deleteBlog(blogId){
    try {
        await this.databases.deleteDocument(
            conf.APPWRITE_DATABASE_ID,
            conf.APPWRITE_COLLECTION_ID,
            blogId
        );
        return true;
    } catch (error) {
        throw error
    }
  }

  async getBlog(blogId){
    try {
        return await this.databases.getDocument(
            conf.APPWRITE_DATABASE_ID,
            conf.APPWRITE_COLLECTION_ID,
            blogId
        )
    } catch (error) {
        throw error
    }
  }
  
  async getBlogs(){
    try {
        return await this.databases.listDocuments(
            conf.APPWRITE_DATABASE_ID,
            conf.APPWRITE_COLLECTION_ID,
        );

    } catch (error) {
        throw error
    }
  }


  //file operations

  async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.APPWRITE_BUCKET_ID,
            ID.unique(),
            file
        );

    } catch (error) {
        throw error
    }
  }

  async deleteFile(fileId){
    try {
        
        await this.bucket.deleteFile(conf.APPWRITE_BUCKET_ID,fileId);

    } catch (error) {
        throw error
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(conf.APPWRITE_BUCKET_ID,fileId)
  }

}
const service = new Service();
export default service;
