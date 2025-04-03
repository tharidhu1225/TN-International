import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading"); //loaded, loading, error
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (loadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }, []);

  function search(e) {
    const query = e.target.value;
    setQuery(query);
    setLoadingStatus("loading");
    if (query == "") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }else{
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/"+query)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }

  return (
    <div className="w-full h-full pt-4 relative">
      <div
            className="abs
      olute w-full flex justify-center"
          >
            <input
              type="text"
              className="w-1/2 p-2 absolute z-50"
              placeholder="Search Products"
              onChange={search}
              value={query}
            />
          </div>
      {loadingStatus == "loaded" && (
        <div className="w-full h-full  overflow-y-scroll flex flex-wrap justify-center pt-4 relative">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      )}
      {loadingStatus === "loading" && (
  <div className="w-full h-full flex items-center justify-center">
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
    </div>
  </div>
)}


    </div>
  );
}
