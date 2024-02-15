import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Search from "../Search";
import { Pagination } from "@mui/material";
import Loader from "../Loader";
import { Skeleton } from "@mui/material";
import noImage from "../../assets/no-image.jpeg";
import "../../scss/pagitation.scss";
import "../../scss/cards.scss";
import { useAuthContext } from "../../providers/auth";
import HandleBookmarked from "../../functions/HandleBookmarked";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const Page = (props) => {
  const { title, apiUrl, apiSearch, placeholder, pageUrl } = props;
  const { user } = useAuthContext();

  const [datas, setDatas] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageNumber = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("query") || "";

  const bookmarkedCollectionRef = collection(db, "usersBookmarked");

  const getMovie = () => {
    const url = query ? apiSearch : apiUrl;
    setLoading(true);
    fetch(`${url}&page=${pageNumber}&query=${query}`)
      .then((res) => res.json())
      .then((json) => {
        setDatas(json.results);
        setLoading(false);
        if (json.total_pages > 500) {
          setTotalPages(500);
        } else {
          setTotalPages(json.total_pages);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getMovie();
  }, [pageNumber, query]);

  const handlePageChange = (event, value) => {
    navigate(`${location.pathname}?page=${value}&query=${query}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //   const getTodoList = async () => {
  //     const docSnapshot = await getDoc(bookmarkedCollectionRef);

  //     try {
  //       if (docSnapshot.exists()) {
  //         await setDatas(docRef);
  //         console.log("Movie removed from bookmarks successfully!");
  //       }

  //       const data = await getDocs(bookmarkedCollectionRef);
  //       const filteredData = data.docs
  //         .filter((doc) => doc.data().uid === user.uid)
  //         .map((doc) => ({
  //           ...doc.data(),
  //         }));
  //       setDatas(filteredData);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   if (user) {
  //     getTodoList();
  //   }
  // }, [user]);

  console.log(datas);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <main>
      <Search
        onSearch={(searchString) => {
          navigate(`${location.pathname}?query=${searchString}`);
        }}
        placeholder={placeholder}
      />
      <div className="content">
        <div className="card">
          <h1>{title}</h1>
          <div className="movies-row">
            {datas &&
              datas.map((data) =>
                loading ? (
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="rectangular"
                    width="100%"
                    height="233px"
                  />
                ) : (
                  <Link
                    to={`${pageUrl}${data.id}`}
                    key={data.id}
                    className="movies"
                    style={{ zIndex: 1 }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noImage;
                      }}
                    />
                    <button
                      type="button"
                      className={
                        data.active ? "active-bookmark bookmark" : "bookmark"
                      }
                      style={{ zIndex: 100 }}
                      onClick={async (e) => {
                        e.preventDefault();
                        await HandleBookmarked(
                          user.uid,
                          title,
                          data.id,
                          data.title || data.name,
                          data.vote_average,
                          data.release_date || data.first_air_date,
                          data.backdrop_path
                        );
                      }}
                    >
                      <i
                        className={
                          "fa-bookmark " +
                          (data.active ? "fa-solid" : "fa-regular")
                        }
                      ></i>
                    </button>
                    <div className="description-row">
                      <div className="rating-row">
                        <Rating
                          style={{ fontSize: "18px", marginRight: "8px" }}
                          name="half-rating-read"
                          value={data.vote_average / 2}
                          precision={0.1}
                          readOnly
                          emptyIcon={
                            <StarIcon
                              style={{ color: "fff" }}
                              fontSize="inherit"
                            />
                          }
                        />
                        <span className="light-text">
                          {Math.round(data.vote_average * 10) / 10}
                        </span>
                      </div>
                      <p className="light-text date">
                        {new Date(data.release_date).getFullYear() ||
                          new Date(data.first_air_date).getFullYear()}
                      </p>
                    </div>
                    <h4 className="title">{data.title || data.name}</h4>
                  </Link>
                )
              )}
          </div>
          <Pagination
            className="pagitation"
            count={totalPages}
            page={pageNumber}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
