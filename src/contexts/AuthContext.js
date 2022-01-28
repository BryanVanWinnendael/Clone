import React, { useContext,useState,useEffect  } from "react";
import { auth ,dbn,storage} from "../util/firebaseapp"


const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState();
    

    // const [currentdisplayname,setCurrentdisplayname] = useState();
    
    const [loading , setLoading] = useState(true)

    async function signup(email,password,username){
        // setCurrentdisplayname(username)

        try{
            await auth.createUserWithEmailAndPassword(email,password).then(function(res){
                res.user.updateProfile({
                    displayName:username
                })
            })
            .then(function(){
                auth.onAuthStateChanged(user => {
                   const USERID =  user.uid;
                   setName(username,USERID)
                })
            })
         }
         catch(err){
             throw err;
         }
    }

    function setName(name,uid){  
        dbn.collection('displayname').doc(uid).set({
            name
        })
    }

    async function getNames(){
        var res = [];
        const snapshot = await dbn.collection('displayname').get();
        const arr =  snapshot.docs.map(doc => doc.data());
     
        for (var i of arr){
            res.push(i.name);
        }
        return res;

    }

    async function login(email,password){
        try{
           await auth.signInWithEmailAndPassword(email,password);
        }
        catch(err){
            throw err;
        }
    }

    function logout(){
        auth.signOut();
    }

    function resetPassword(email) {
        try{
            return auth.sendPasswordResetEmail(email);
        }
        catch(e){
            throw e;
        }
    }

    function getProfileImage(){
        return currentUser.photoURL
    }

    async function getAllProfileImageById(id){
        
      
        
        const ProfileImagesStorage =  await storage
        .ref(`ProfileImages/${id}`)
        .child("profileImage")
        .getDownloadURL()
      
       
        
        return ProfileImagesStorage
    }

    function setProfileImage(imgUrl){
        try{
            currentUser.updateProfile({
                photoURL : imgUrl
            });
        }catch(e){
            throw e;
        }
    }
    
    function updateEmail(email) {
        try{

            return currentUser.updateEmail(email);
        }
        catch(e){
            throw e;
        }
    }
    
    function updatePassword(password) {
        try{
            return currentUser.updatePassword(password);
        }
        catch(e){
            throw e;
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
  

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        getProfileImage,
        setProfileImage,
        setName,
        getNames,
        getAllProfileImageById
        
        
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

