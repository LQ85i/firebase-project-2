import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"

const handleSubmit = (id, pos) => {

    let collectionRef = collection(firestore, "click_coordinates") // Firebase creates this automatically

    let data = {
        id: id,
        x: pos[0],
        y: pos[1]
    }
    try {
        addDoc(collectionRef, data).then(() => {
            console.log("character found!");
        }).catch(error => {
            if (error.code === "permission-denied") {
                console.log("character not found!");
            }
        })
    } catch (err) {
        console.error(err);
    }
}

export default handleSubmit