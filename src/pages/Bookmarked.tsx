import Search from "../components/Search";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";

const Bookmarked = () => {
  const [datas, setDatas] = useState([]);
  const bookmarkedCollectionRef = collection(db, "usersfavorites");

  const getTodoList = async () => {
    try {
      const data = await getDocs(bookmarkedCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        movies: doc.data().movies,
        user_id: doc.data().user_id,
      }));
      setDatas(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <main>
      <Search placeholder="Search for bookmarked shows" />
      <h1>bookmarked page</h1>
      {datas.map((data) => (
        <div>
          <p>moveis: {data.movies}</p>
          <p>user id: {data.user_id}</p>
        </div>
      ))}
    </main>
  );
};

export default Bookmarked;
