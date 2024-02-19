import { useEffect, useState } from "react";
import { Bookmark } from "../@types";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuthContext } from "../providers/auth";

const bookmarkedCollectionRef = collection(db, "usersBookmarked");

export function useFetchBookmarks() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Bookmark[]>([]);
  const { user } = useAuthContext();

  const fetchBookmarks = async () => {
    const data = await getDocs(bookmarkedCollectionRef);
    const filteredData: Bookmark[] = data.docs
      .filter((doc) => doc.data().uid === user?.uid)
      .map(
        (doc) =>
          ({
            ...doc.data(),
          } as Bookmark)
      );
    setBookmarkedMovies(filteredData);
  };

  useEffect(() => {
    if (user) {
      const getBookmarks = async () => {
        try {
          fetchBookmarks();
        } catch (err) {
          console.error(err);
        }
      };

      getBookmarks();
    }
  }, [user]);

  return [bookmarkedMovies, fetchBookmarks] as const;
}
