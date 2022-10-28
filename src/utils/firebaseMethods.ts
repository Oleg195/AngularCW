import { NgModule } from "@angular/core";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

@NgModule()
export class FirebaseMethods {

  async getDocuments(collectionId: string) {
    const querySnapshot = await getDocs(collection(db, collectionId));
    return querySnapshot;
  }

  async getDocumentById(collectionId: string, documentId: string) {
    const docRef = doc(db, collectionId, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async create(collectionId: string, data: object) {
    const docRef = await addDoc(collection(db, "products"), data);
    console.log("Document written with ID: ", docRef.id);
  }

  async removeDocument(collectionId: string, documentId: string) {
    await deleteDoc(doc(db, collectionId, documentId));
  }
}