import {doc, getDoc} from 'firebase/firestore';
import { auth, db } from './firebase';
import { useEffect, useState } from 'react';
import Header from './Header';
function Account() {
    const [userDetails, setUserDetails] = useState(null);
    useEffect(()=>{
        const fetchUserDetails = async () => {
            auth.onAuthStateChanged(async (user) => {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()) {
                    setUserDetails(docSnap.data());
                    console.log(docSnap.data());
                } else {
                    console.log("User is not logged in");
                }
            })
        };
        fetchUserDetails();
    }, []);

    return(
        <div>
            <Header />
            {
                userDetails ? (
                    <ul>
                <li>{userDetails.name}</li> <br/>
                <li>{userDetails.email}</li>
            </ul>
                ) : (
                    <p>Loading...</p>
                )
            }
            
        </div>
    );
}

export default Account;