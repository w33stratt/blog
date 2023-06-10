import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
    const state = useLocation().state;
    const [nama_barang, setNama_barang] = useState(state?.nama_barang || "");
    const [harga_beli, setHarga_beli] = useState(state?.harga_beli || "");
    const [harga_jual, setHarga_jual] = useState(state?.harga_jual || "");
    const [stock, setStock] = useState(state?.stock || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");

    const navigate = useNavigate()

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };


    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();

        try {
            state
                ? await axios.put(`/posts/${state.id}`, {
                    nama_barang,
                    harga_beli,
                    harga_jual,
                    stock,
                    cat,
                    img: file ? imgUrl : "",
                })
                : await axios.post(`/posts/`, {
                    nama_barang,
                    harga_beli,
                    harga_jual,
                    stock,
                    cat,
                    img: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="add">
            <div className="content">
                <input
                    type="text"
                    placeholder="Nama Barang?"
                    onChange={(e) => setNama_barang(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Harga Beli??"
                    onChange={(e) => setHarga_beli(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Harga Jual?"
                    onChange={(e) => setHarga_jual(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Stock?"
                    onChange={(e) => setStock(e.target.value)}
                />
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <input
                        style={{ display: "flex" }}
                        type="file"
                        id="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label className="file" htmlFor="file">
                        Upload Image
                    </label>
                    <div className="buttons">
                        <button onClick={handleClick}>Go</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "toko1"}
                            name="cat"
                            value="toko1"
                            id="toko1"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="toko1">Toko1</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "toko2"}
                            name="cat"
                            value="toko2"
                            id="toko2"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="toko2">Toko2</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "toko3"}
                            name="cat"
                            value="toko3"
                            id="toko3"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="toko3">Toko3</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;
