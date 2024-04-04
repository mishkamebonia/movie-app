import { deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";


const bookmarked = async (uid, type, movieId, title, imdb, date, poster) => {
  try {
    const docRef = doc(db, "usersBookmarked", `${uid}_${movieId}`);
    const docSnapshot = await getDoc(docRef);


    if (docSnapshot.exists()) {
      await deleteDoc(docRef);
      console.log("Movie removed from bookmarks successfully!");
    } else {
      await setDoc(docRef, {
        uid: uid,
        type: type,
        movieId: movieId,
        title: title,
        imdb: imdb,
        date: date,
        poster: poster,
        bookmarked: true
      });
      console.log("Movie bookmarked successfully!");
    }
  } catch (error) {
    console.error("Error bookmarking movie: ", error);
  }
};

export default bookmarked;