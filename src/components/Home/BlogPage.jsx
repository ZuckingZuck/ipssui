import React from "react";
import moment from "moment";
import { Parser } from "html-to-react";
import { NavLink } from "react-router-dom";

const SinglePost = (props) => {
  console.log(props.createdAt);
  const formattedDate = moment(props.createdAt).format("DD.MM.YYYY HH:mm");
  const icerik = props.content.trim();

  const postStyle = {
    color: "white", // Text color
    background: "linear-gradient(180deg, rgba(16, 29, 51, 0.9) 0%, rgba(12, 22, 38, 0.9) 68.75%)", // Background color
  };

  return (
    <div className="flex rounded flex-col md:flex-row bg-gray-800" style={postStyle}>
      <div className="md:w-1/2">
        <img className="w-full h-64 md:h-full rounded object-cover" src={props.coverImageUrl} alt="" />
      </div>
      <div className="flex flex-col md:w-1/2 p-3 rounded mt-3 md:mt-0">
        <div className="card-header mb-3 flex flex-col justify-between border-white">
          <NavLink to={`/p/${props.SlugUrl}`}>
            <h3 className="text-bold text-2xl hover:cursor-pointer">
              {props.title}
            </h3>
          </NavLink>
          <NavLink>
            <h5 className="text-slate-400">@{props.author}</h5>
          </NavLink>
        </div>
        <div className="postcontent flex-grow">
          {icerik.length >= 250
            ? Parser().parse(icerik.substring(0, 250) + "...")
            : Parser().parse(icerik)}
        </div>
        <div className="card-footer mt-3 flex justify-between">
          <div className="flex items-center">
            <div>
              <i className="text-blue-500 text-2xl fa-solid fa-share hover:cursor-pointer"></i>
            </div>
          </div>
          <div className="text-slate-400">
            <i className="fa-solid fa-calendar-days"></i> {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
