import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { getServices } from "./redux/serviceSlice";
import { getFaqs } from "./redux/faqSlice";
import { getSocials } from "./redux/socialSlice";
import { getPosts } from "./redux/postSlice";

function App() {
  const posts = useSelector((state) => state.post.posts);
  console.log(posts);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch("http://localhost:8080/api/client/service");
      const json = await response.json();
      if (response.ok) {
        dispatch(getServices(json));
      }
    };

    const fetchPosts = async () => {
      const response = await fetch("http://localhost:8080/api/client/blog");
      const json = await response.json();
      if (response.ok) {
        dispatch(getPosts(json));
      }
    };

    const fetchSocials = async () => {
      const response = await fetch("http://localhost:8080/api/client/social");
      const json = await response.json();
      if (response.ok) {
        dispatch(getSocials(json));
      }
    };

    const fetchFaqs = async () => {
      const response = await fetch("http://localhost:8080/api/client/faq");
      const json = await response.json();
      if (response.ok) {
        dispatch(getFaqs(json));
      }
    };

    fetchPosts();
    fetchSocials();
    fetchFaqs();
    fetchServices();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pb-16">
          <AppRouter />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
