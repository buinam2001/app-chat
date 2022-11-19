import { useState ,useEffect } from 'react';
import { db } from '../firebaseconfig';
import { collection, query, onSnapshot , orderBy } from "firebase/firestore";


const useFirestoremess = (collecname ) => {


  const [documents, setDocuments] = useState(null);

  useEffect(() => {
   

    const q = query(collection(db, collecname),orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({...doc.data(),id:doc.id});
        });

        setDocuments(data);
    } )

    return unsubscribe
 
    
  }, [collecname]);

  return documents;
};

export default useFirestoremess;