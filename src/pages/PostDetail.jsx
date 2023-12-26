import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Parser } from "html-to-react";
import useDocumentTitle from "../hooks/useDocumentTitle";
const PostDetail = () => {
  const { slugUrl } = useParams();
  const [postDetail, setPostDetail] = useState({});
  useDocumentTitle(`IPSS - ${postDetail.BlogTitle}`)
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `http://localhost:8080/api/client/blog/${slugUrl}`
      );
      const json = await response.json();
      if (response.ok) {
        setPostDetail(json);
      }
    };

    fetchPosts();
  }, [slugUrl]);

  return (
    <div className="container mx-auto mb-36 mt-5">
      <div className="flex text-white ipss-font">
        <div className="container mx-auto my-8 p-8 bg-gray-800 text-white rounded shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{postDetail.BlogTitle}</h1>
          <div className="flex flex-wrap mb-4">
            <span className="bg-purple-900 text-gray-300 py-1 px-2 rounded mr-2">#ipss</span>
          </div>
          <div className="text-gray-300 mb-4 text-lg">{Parser().parse(postDetail.content)}</div>
          <div className="text-right text-gray-500">
            <NavLink>
              <span className="text-red-700">Paylaşan: {postDetail.UserName}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
