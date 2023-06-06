import { useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai'
import './ProductAdd.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ProductAdd = ({ fetchData }) => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [category2, setCategory2] = useState('')
    const [category3, setCategory3] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState(0)
    const [rate, setRate] = useState(0)
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)

    const add = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", name)
        formData.append("category", category)
        formData.append("category2", category2)
        formData.append("category3", category3)
        formData.append("description", description)
        formData.append("stock", stock)
        formData.append("rate", rate)
        formData.append("price", price)
        formData.append("image", image)
        var response = await axios.post("http://localhost:5000/api/products/add", formData)

        alert(response.data.message)
        fetchData()
        navigate('/products')
    }

    return (
        <div className="container head">
            <div className="col-md-8 offset-md-2 text-white">
                <form onSubmit={add}>
                    <h4 className="border-bottom py-2 text-white">Ürün Ekleme Formu</h4>
                    <div className="form-group mt-3">
                        <label className="h6" htmlFor="name">Ürün Adı</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="name"
                            id="name"
                            required
                            minLength="3"
                            placeholder='ürün adı'
                            className="form-control bg-dark text-white input border-secondary"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label className="h6">Kategoriler</label>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            type="text"
                            name="category"
                            id="category"
                            required
                            minLength="3"
                            placeholder='Kategori 1'
                            className="form-control bg-dark text-white input border-secondary"
                        />
                        <input
                            value={category2}
                            onChange={(e) => setCategory2(e.target.value)}
                            type="text"
                            name="category2"
                            id="category2"
                            minLength="3"
                            placeholder='Kategori 2'
                            className="form-control bg-dark text-white input border-secondary my-2"
                        />
                        <input
                            value={category3}
                            onChange={(e) => setCategory3(e.target.value)}
                            type="text"
                            name="category3"
                            id="category3"
                            minLength="3"
                            placeholder='Kategori 3'
                            className="form-control bg-dark text-white input border-secondary"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label className="h6" htmlFor="description">Ürün Açıklaması</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            name="description"
                            id="description"
                            required
                            minLength="5"
                            className="form-control bg-dark text-white input border-secondary">
                        </textarea>
                    </div >
                    <div className="form-group mt-3">
                        <label className="h6" htmlFor="stock">Stok</label>
                        <input
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            type="text"
                            name="stock"
                            id="stock"
                            required
                            min="1"
                            className="form-control bg-dark text-white input border-secondary"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label className="h6" htmlFor="price">Price</label>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="text"
                            name="price"
                            id="price"
                            required
                            min="1"
                            className="form-control bg-dark text-white input border-secondary"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label className="h6" htmlFor="rate">Ürün Puanı</label>
                        <input
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            type="text"
                            name="rate"
                            id="rate"
                            required
                            min="0"
                            max="5"
                            className="form-control bg-dark text-white input border-secondary"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label className="h6" htmlFor="images">Fotoğraf</label>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            multiple
                            name="images"
                            id="images"
                            className="form-control bg-dark text-white input border-secondary"
                        />
                    </div>
                    <div>
                        <button className="btn btn-outline-info mt-3">
                            <AiOutlineSave size={25} className='me-2' />
                            Kaydet
                        </button>
                    </div >
                </form >
            </div >
        </div >
    )
}

export default ProductAdd