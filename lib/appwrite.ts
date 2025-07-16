import { Category } from './../type.d';
import { CreateUserParams, SignInParams } from '@/type';
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwritecConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID! ,
    platform: "com.amine.trevon",
    databaseId: '687455270026f3ff40a4',
    bucketId:'6877f8b600121358c881',
    userCollectioId: '68745586001a62b3c856',
    categoriesCollectionId: '6877e87a0007df219ad3',
    menuCollectionId: '6877e9690038a8e4a374',
    customizationCollectionId:'6877eea1003d9cfe145f',
    menuCustomizationCollectionId: '6877f0e700059b14b7e9',
}

export const client = new Client();

client 
    .setEndpoint(appwritecConfig.endpoint) 
    .setProject(appwritecConfig.projectId) 
    .setPlatform(appwritecConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({ email , password , name } : CreateUserParams ) => {

    try{
        const newAccount = await account.create( ID.unique() , email , password , name)
        if(!newAccount) throw Error;

        await SignIn({email ,password});

        const avatarUrl = avatars.getInitialsURL(name);

        const newUser =  await databases.createDocument(
            appwritecConfig.databaseId,
            appwritecConfig.userCollectioId,
            ID.unique(),
            { accountId : newAccount.$id , email , name , avatar: avatarUrl }
        );  
        
        return newUser;

    } catch (e){
        throw new Error(e as string) 
    }

}

export const SignIn = async ({email , password }: SignInParams ) => {
    try{
      const session = await account.createEmailPasswordSession(email , password);
      
    }catch(e){
        throw new Error(e as string);
    }
}

export const getCurrentUser = async () => {
    try{
    const currentAccount = await account.get();
    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
        appwritecConfig.databaseId,
        appwritecConfig.userCollectioId,
        [Query.equal('accountId' , currentAccount.$id)]
    )
    if(! currentUser) throw Error;

    return currentUser.documents[0];
    
    }catch(e){
        console.log(e)
        throw new Error(e as string);
    }

}