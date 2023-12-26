import React from "react";

const StatsCard = (props) => {
  
  return (
    <div className="stats-card bg-gradient-to-r from-gray-900 to-gray-600 w-[350px] text-white rounded-lg p-8 h-[150px] shadow-md">
      <div className="flex items-center">
        <div className="bg-white rounded-full p-3 shadow-md">
          <img
            className="w-12 h-12 object-cover"
            src={props.img}
            alt=""
          />
        </div>
        <div className="ml-4">
          <p className="text-lg font-medium text-gray-300">
            {props.title}
          </p>
          <p className="text-3xl font-semibold text-gray-100">{props.number}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
