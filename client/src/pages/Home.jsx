import React from "react";

const Home = () => {
  return (
    <>
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to Mern Bot
        </h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Mern Bot is a Web App which utilizes Mern Stack and Open AI for
          seamless handling of user queries and data.
        </p>
       
      </div>
    </>
  );
};

export default Home;
