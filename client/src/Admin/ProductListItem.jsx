import axios from "axios"
import { FaEdit, FaTrashAlt } from "react-icons/fa"

const ProductListItem = ({ product, index, fetchData }) => {

    const remove = async (_id) => {
        let model = { _id: _id }
        let response = await axios.post("http://localhost:5000/api/products/remove", model)
        fetchData()
        alert(response.data.message)
    }

    return (
        <tr key={product.id}>
            <td>{index + 1}</td>
            <td className="text-center">
                <img src={"http://localhost:5000/" + product.imageUrl} width="100px" />
            </td>
            <td>{product.name} </td>
            <td>{product.description} </td>
            <td>
                <ul>
                    <li>
                        {product.category}
                    </li>
                    <li>
                        {product.category2}
                    </li>
                    <li>
                        {product.category3}
                    </li>
                </ul>
            </td>
            <td>{product.stock} </td>
            <td>{product.rate} </td>
            <td>{product.price} </td>
            <td>
                <button className="btn btn-sm btn-outline-warning me-3">
                    <FaEdit />
                </button>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => remove(product._id)}
                >
                    <FaTrashAlt />
                </button>
            </td>
        </tr>
    )
}

export default ProductListItem