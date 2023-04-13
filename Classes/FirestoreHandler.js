import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default class FirestoreHandler {
    constructor(app) {
        this.firestore = getFirestore(app);
    }

    async fetchCollection(collectionName) {
        const collectionRef = collection(this.firestore, collectionName);
        return (await getDocs(collectionRef)).docs;
    }
}
