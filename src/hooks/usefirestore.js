import { useState ,useEffect } from 'react';
import { db } from '../firebaseconfig';
import { collection, query, onSnapshot , where } from "firebase/firestore";


const useFirestore = (collecname, condition ) => {


  const [documents, setDocuments] = useState(null);

  useEffect(() => {


   
    if (condition) {
      if (!condition.name || !condition.value) {
        setDocuments([]);
        return;

      }
    }


  
    const q = query(collection(db, collecname), where( condition.name, condition.operator, condition.value));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({...doc.data(),id:doc.id});
        });

        

        setDocuments(data);
    } )



    return unsubscribe

   
    
  }, [collecname,condition]);

  return documents;
};

export default useFirestore;