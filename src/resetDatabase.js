import { collection, getDocs, updateDoc } from "@firebase/firestore"
import { firestore } from "./firebase_setup/firebase"


function generateRandomIndices() {
    let indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let randomIndices = [];

    // Fisher-Yates shuffle algorithm
    for (let i = indices.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let temp = indices[i];
        indices[i] = indices[randomIndex];
        indices[randomIndex] = temp;
    }

    // Get the first three indices as random indices
    randomIndices = indices.slice(0, 3);
    return randomIndices;
}


function randomizeCharacters() {
    let collectionRef = collection(firestore, "active_characters");

    // Generate random indices
    // For having 3 random active characters out of 10
    let randomIndices = generateRandomIndices();
    // Get all documents in the collection
    // and update isActive according to random indices
    getDocs(collectionRef).then(function (querySnapshot) {
        let index = 0;
        querySnapshot.forEach(function (doc) {
            let isActive = randomIndices.includes(index);
            updateDoc(doc.ref, { isActive: isActive });
            index++;
        });
    }).catch(function (error) {
        console.error("Error writing to database: ", error);
    });
    return randomIndices;
}

function getActiveCharacters() {
    const IDs = randomizeCharacters();
    return IDs;
}

export default getActiveCharacters;