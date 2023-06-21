import { collection, getDocs} from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"


const requestLeaderboard = async () => {
    const querySnapshot = await getDocs(collection(firestore, "leaderboard"));
    let data = [];
    querySnapshot.forEach((doc) => {
      if(doc.id !== "default") {
        data.push({
            name: doc.data().name,
            time: doc.data().time,
            date: doc.data().date
        })
      }
    })
    return data;
}



export default requestLeaderboard