import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"

const handleSubmit = (testdata) => {

    let collectionRef = collection(firestore, "click_coordinates") // Firebase creates this automatically

    let data = {
        id: testdata[0],
        x: testdata[1],
        y: testdata[1]
    }
    try {
        addDoc(collectionRef, data).then(() => {
            console.log("write success");
        }).catch(error => {
            if (error.code === "permission-denied") {
                console.log("error: invalid input");
            }
        })
    } catch (err) {
        console.error(err);
    }
}

export default handleSubmit