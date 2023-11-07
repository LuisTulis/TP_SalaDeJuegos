import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData, query, where, doc, updateDoc, getDocs, onSnapshot, orderBy} from '@angular/fire/firestore';
import { Mensaje } from '../clases/mensaje';
import { DocumentReference } from 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore : Firestore) { }

  public traerDatos(path : string, ordenar : boolean): Observable<any[]> 
  {
    const messageCollection = collection(this.firestore, path);
    let q = query(messageCollection);
    if(ordenar)
    {
      q = query(messageCollection, orderBy('timestamp', 'asc'));
    }
    
    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => doc.data());
        observer.next(messages);
      });

      return () => unsubscribe();
    });
  }

  async agregarDato(path : string, dato : Object)
  {
    const referencia = collection(this.firestore,path);

    let docRef = await addDoc(referencia,dato);
    this.setearID(docRef);
  }
  
  async setearID(docRef : DocumentReference)
  {
    updateDoc(docRef,{id : docRef.id});
  }

  updateDocument(id : string, data : object, path : string)
  {
    const docRef = doc(this.firestore, path + '/' + id);
    updateDoc(docRef,data);
  }
  
}
