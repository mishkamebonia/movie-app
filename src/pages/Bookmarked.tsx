import Search from "../components/Search";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { posterApi } from "../config/movieApi";
import { Link } from "react-router-dom";
import { useAuthContext } from "../providers/auth";

const Bookmarked = () => {
  const { user } = useAuthContext();
  const [datas, setDatas] = useState([]);
  const bookmarkedCollectionRef = collection(db, "usersBookmarked");

  useEffect(() => {
    const getTodoList = async () => {
      try {
        const data = await getDocs(bookmarkedCollectionRef);
        const filteredData = data.docs
          .filter((doc) => doc.data().uid === user.uid)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
            movieId: doc.data().movieId,
            imageUrl: doc.data().imageURL,
            title: doc.data().title,
          }));
        setDatas(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      getTodoList();
    }
  }, [user]);

  return (
    <main>
      <Search placeholder="Search for bookmarked shows" />
      <h1>bookmarked page</h1>
      {datas.map((data) => (
        <Link to={`/movies/${data.movieId}`} key={data.id}>
          <p>{data.imageURL}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500/${data.imageURL}`}
            alt=""
          />
          <p>User ID: {data.uid}</p>
        </Link>
      ))}
    </main>
  );
};

export default Bookmarked;
