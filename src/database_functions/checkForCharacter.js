import { doc, updateDoc } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"


const checkForCharacter = (id, pos, charactersFound, setCharactersFound, setMsgCharNotFound) => {

    let docRef = doc(firestore, "click_coordinates", "default")

    let data = {
        id: id,
        x: pos[0],
        y: pos[1]
    }

    updateDoc(docRef, data).then(() => {
        let obj = { ...charactersFound };
        obj[id] = true;
        setCharactersFound(obj)
    })
        .catch(error => {
            if (error.code === "permission-denied") {
                setMsgCharNotFound(true);
            }
        })

}

export default checkForCharacter