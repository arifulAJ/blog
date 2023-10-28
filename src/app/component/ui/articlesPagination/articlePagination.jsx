// // Pagination.js

// import Link from "next/link";

// const baseurl = "http://localhost:3000";
// const Pagination = ({ article }) => {
//   //   const { totalPages, page } = article.pagination;
//   const links = article.links;
//   const pagination = article.pagination;
//   console.log(pagination);
//   return (
//     <div className="flex items-center justify-center space-x-4 mt-8">
//       {links.prev ? (
//         <Link href={`${baseurl}/${links.prev}`}>
//           <p className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
//             Previous
//           </p>
//         </Link>
//       ) : (
//         <p
//           className="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
//           disabled
//         >
//           Previous
//         </p>
//       )}

//       {/* {Array.from({ length: totalPages }).map((_, index) => (
//         <Link
//           key={index}
//           href={`/articles?page=${index + 1}&limit=5&sort_by=updatedAt`}
//         >
//           <a
//             className={`${
//               index + 1 === currentPage
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-600"
//             } px-4 py-2 rounded hover:bg-blue-700`}
//           >
//             {index + 1}
//           </a>
//         </Link>
//       ))} */}

//       {links.next ? (
//         <Link href={`${baseurl}/${links.next}`}>
//           <p className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
//             nextpage
//           </p>
//         </Link>
//       ) : (
//         <p
//           className="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
//           disabled
//         >
//           nextpage
//         </p>
//       )}
//     </div>
//   );
// };

// export default Pagination;
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const baseurl = "https://ar-blog-api.onrender.com";

const Pagination = ({ article }) => {
  const links = article.links;
  const [fetchedArticles, setFetchedArticles] = useState([]);
  const [pageinc, setPageinc] = useState(1);

  // const fetchArticles = async (url) => {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     // Set the fetched data to the state
  //     setFetchedArticles(data.articles);
  //   } catch (error) {
  //     console.error("Error fetching articles:", error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch the initial set of articles when the component mounts
  //   fetchArticles(`${baseurl}${links.self}`);
  // }, []);

  // Render the fetched articles
  // {fetchedArticles.map((article, index) => (
  //   <div key={index}>{/* Render the article content here */}</div>
  // )) }
  return (
    <div>
      <div className="flex items-center justify-center space-x-4 mt-8">
        {pageinc <= 1 ? (
          <Link as={`${baseurl}${links.prev}`} href="/articles">
            <p
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
              // onClick={() => fetchArticles(`${baseurl}${links.prev}`)}
              onClick={() => setPageinc - 1}
            >
              Previous
            </p>
          </Link>
        ) : (
          <p
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
            disabled
          >
            Previous
          </p>
        )}

        {pageinc > 1 ? (
          <h1>
            <p
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
              // onClick={() => fetchArticles(`${baseurl}${links.next}`)}
              onClick={() => setPageinc + 1}
            >
              Next
            </p>
          </h1>
        ) : (
          <p
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
            disabled
          >
            Next
          </p>
        )}
      </div>
      {/* {
        fetchArticles.map(art=><li>{art.tags}</li>)
      } */}
    </div>
  );
};

export default Pagination;
