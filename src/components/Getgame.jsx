import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import './styling/getgame.css'


const Getproducts = () => {

// create hooks that will help manage different states
const [loading, setLoading] = useState("")
const [error, setError] = useState("")
 

const navigate = useNavigate();

// Create a hook that will hold all the products fetched from the API
const [products, setProducts] = useState([]);

// console.log(products)

// Specify the image URL
const img_url = "https://serakian.pythonanywhere.com/static/images/"

// Create a function that will help you fetch the different products
const fetchProducts = async () =>{
// Update the loading hook with a message
setLoading("Please wait as we retrieve the products")

try{
// Access the Api using the axios library
const response = await axios.get("https://serakian.pythonanywhere.com/api/getproducts")

// Update the products hook with the different products fetchedfrom the api
setProducts(response.data)
// set the loading hook back to dsefault
setLoading("")

//

}
catch(error){
// set the loading hook back to dsefault
setLoading("")
setError(error.message);
}
}

// Below we shall use the use effect hook that will call the fetchproducts functions every time a person access the getproducts component
useEffect(() =>{fetchProducts()}, [])

// create a hook that hold those products that matches whatever the user will be typing...
const [search, setSearch] = useState("");

const filtered_products = products.filter((item) =>
    item.product_name.toLowerCase().includes(search.toLowerCase()) ||
    item.product_description.toLowerCase().includes(search.toLowerCase())

);



return (
    <div>
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                {/* below is the input for the search functionality */}
<input 
type="search"
placeholder="search for a product here"
className="form-control"
value={search}
onChange={(e) => setSearch(e.target.value)} />
{/* {search} */}
            </div>
            <div className="col-md-4"></div>
        </div>
        <div className="row p-3">
<h3 className="text-info mt-2">Available Products</h3>



<h2 className="text-success">{loading}</h2>
<h2 className="text-danger">{error}</h2>


{filtered_products.map((product)=>(

<div className="col-md-3 justify-content-center mt-4">
<div className="card shadow p-1">
<img src={img_url + product.product_photo} alt="" className="product_img" />

{/* {product.product_photo} */}

{/* Product details */}
<div className="card-body">
<h5 className="text-primary">{product.product_name.slice(0,10)}</h5>
<p className="text-muted">{product.product_description.slice(0,10)}....</p>
<b className="text-warning"> <span className="text-dark">Kes </span>{product.product_cost}</b> <br />
<button className="btn btn-outline-info" onClick={() => navigate("/makepayment",{state : {product}})} > Buy Now</button>
</div>
</div>
</div>  
))}

</div>
<Footer/>
    </div>

)
}

export default Getproducts