import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
 

  function currencyFormat(num) {
        return 'Rp' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
     }

     function currencyFormat2(num) {
      return '' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
   }


  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <h2>ID :  {currencyFormat2(post.id)}</h2>
              <h2>Nama Barang :  {post.nama_barang}</h2>
              <h3>Harga Beli :  {currencyFormat(post.harga_beli)}</h3>
              <h3>Harga Jual :  {currencyFormat(post.harga_jual)}</h3>
              <h3>Stock :  {currencyFormat2(post.stock)}</h3>
              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
