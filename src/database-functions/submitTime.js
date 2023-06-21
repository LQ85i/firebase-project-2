import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"


const submitTime = (name, time) => {

    let collectionRef = collection(firestore, "leaderboard")

    let data = {
        name: name,
        time: time,
        date: Date.now()
    }
    addDoc(collectionRef, data)
        .then(() => {
            // add success
        })
        .catch(error => {
            if (error.code === "permission-denied") {
            }
        })

}

export default submitTime