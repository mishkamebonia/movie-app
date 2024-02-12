import Search from "../components/Search";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { posterApi } from "../config/movieApi";
import { Link } from "react-router-dom";
import { useAuthContext } from "../providers/auth";
import imdb from "../functions/imdb";
import noImage from "../assets/no-image.jpeg";
import { routes } from "../App";
import "../scss/cards.scss";
import "../scss/buttons.scss";

const Bookmarked = () => {
  const { user } = useAuthContext();
  const [datas, setDatas] = useState([]);
  const bookmarkedCollectionRef = collection(db, "usersBookmarked");
  console.log(datas);

  useEffect(() => {
    const getTodoList = async () => {
      try {
        const data = await getDocs(bookmarkedCollectionRef);
        const filteredData = data.docs
          .filter((doc) => doc.data().uid === user.uid)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
            type: doc.data().type,
            movieId: doc.data().movieId,
            poster: doc.data().poster,
            imdb: doc.data().imdb,
            date: doc.data().date,
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

  const handleBookmarked = (e) => {
    e.preventDefault();
  };

  console.log(datas);

  return (
    <main>
      <Search placeholder="Search for bookmarked shows" />
      <div className="card">
        <h1>bookmarked page</h1>
        <div className="movies-row">
          {datas.map((data) => (
            <Link
              to={`${data.type === "Movies" ? routes.movies : routes.series}${
                data.movieId
              }`}
              key={data.movieId}
              className="movies"
              style={{ zIndex: 1 }}
            >
              <img
                src={`${posterApi}${data.poster}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImage;
                }}
              />
              <button
                type="button"
                style={{ zIndex: 100 }}
                onClick={handleBookmarked}
                className="bookmark"
              >
                <i className="fa-regular fa-bookmark"></i>
              </button>
              <div className="description-row">
                <p className="imdb">{imdb(data.imdb)}</p>
                <p className="light-text date">
                  {new Date(data.date).getFullYear() ||
                    new Date(data.first_air_date).getFullYear()}
                </p>
              </div>
              <h4 className="title">{data.title}</h4>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Bookmarked;
