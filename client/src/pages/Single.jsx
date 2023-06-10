import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Swal from "sweetalert2";


const Single = () => {
    const [post, setPost] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2];

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/posts/${postId}`);
            navigate("/")
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
            
            
        } catch (err) {
            console.log(err);
        }
    }

    

//     function currencyFormat(num) {
//         return 'Rp' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
//      }

//      function currencyFormat2(num) {
//       return '' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
//    }


    return (
        <div className="single">
            <div className="content">
                <img src={`../upload/${post?.img}`} alt="" />
                <div className="user">
                    {post.userImg && <img
                        src={post.userImg}
                        alt=""
                    />}
                    <div className="info">
                        <span>Posted by : {post.username}</span>
                        <h2>ID :  {(post.id)}</h2>
                        <h2>Nama Barang :  {post.nama_barang}</h2>
                        <h3>Harga Beli :  {(post.harga_beli)}</h3>
                        <h3>Harga Jual :  {(post.harga_jual)}</h3>
                        <h3>Stock :  {(post.stock)}</h3>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser.username === post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={Edit} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="" />
                        </div>
                    )}
                </div>      
            </div>
            <Menu cat={post.cat} />
        </div>
    );
};

export default Single;
