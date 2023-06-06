import { RiSearchLine } from "react-icons/ri"
import { AiOutlinePlus } from "react-icons/ai"
import { useState } from "react"
import ProductListItem from "./ProductListItem"
import { Link } from "react-router-dom"


const ProductList = ({ products, fetchData }) => {
    const [search, setSearch] = useState('')

    return (
        <div className="head container">
            <div className="form-group d-flex justify-content-between my-4">
                <Link to='/products/add' className="btn btn-info btn-sm fw-bold my-auto p-2">
                    <AiOutlinePlus size={20} /> Ürün Ekle
                </Link>
                <div className='col-md-6'>
                    <div className="input-group">
                        <span className="input-group-text bg-dark" id="basic-addon1">
                            <RiSearchLine size={20} className='text-info' />
                        </span>
                        <input
                            type="text"
                            className="form-control bg-dark search-input"
                            placeholder="Hangi ürünü arıyorsunuz?"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <table className="table table-hover table-dark table-striped border border-secondary">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ürün Fotoğrafı</th>
                        <th scope="col">Ürün Adı</th>
                        <th scope="col">Açıklama</th>
                        <th scope="col">Kategoriler</th>
                        <th scope="col">Stok</th>
                        <th scope="col">Puan</th>
                        <th scope="col">Fiyat</th>
                        <th scope="col">Seçenekler</th>
                    </tr>
                </thead>
                <tbody>
                    {products.filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : item.name.toLowerCase().
                                includes(search) ||
                            item.description.toLowerCase().includes(search) ||
                            item.category.toLowerCase().includes(search) ||
                            item.category2.toLowerCase().includes(search)
                    }).map((product, index) => (
                        <ProductListItem key={product._id} product={product} index={index} fetchData={fetchData} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList