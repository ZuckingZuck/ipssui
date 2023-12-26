import React, { useState } from 'react';
import BlogPage from './BlogPage';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';

const Blog = () => {
  const posts = useSelector((state) => state.post.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="blog mt-24 mb-24">
      <div className="blog-header text-center md:text-start flex flex-col items-center justify-center">
        <h2 className='text-4xl tracking-wider font-semibold'>Blog <span>Yazıları</span></h2>
        <p className='text-xl tracking-wide'>Merak edilen güncel konulara dair bloglar.</p>
      </div>
      <div className="blog-container p-3 lg:p-0 grid grid-cols-1 lg:grid-cols-2 gap-5 mt-3">
        {currentPosts?.map(post => (
          <BlogPage
            key={post._id}
            title={post.BlogTitle}
            content={post.content}
            coverImageUrl={post.ImageUrl}
            author={post.UserName}
            SlugUrl={post.SlugUrl}
            createdAt={post.createdAt}
          />
        ))}
      </div>
      <div className="pagination-container text-center mt-5">
        <Pagination
          current={currentPage}
          total={posts?.length}
          pageSize={postsPerPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Blog;
