import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';

export default class FirestoreHandler {
    constructor(app) {
        this.firestore = getFirestore(app);
    }

    async fetchCollection(collectionName) {
        const collectionRef = collection(this.firestore, collectionName);
        return (await getDocs(collectionRef)).docs;
    }

    async addToCollection(collectionName, document) {
        const collectionRef = collection(this.firestore, collectionName);
        try {
            await addDoc(collectionRef, document);
        } catch (err) {
            throw err;
        }
    }

    async checkIfInvalidRequestExists(collectionName, locationName) {
        const collectionRef = collection(this.firestore, collectionName);
        const querySnapshot = await getDocs(query(collectionRef, where('name', '==', locationName), where('valid', '==', false)));
        return !querySnapshot.empty;
    }
}
