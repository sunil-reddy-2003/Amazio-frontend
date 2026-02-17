import axios from 'axios';
const productsApi = "http://localhost:9090/api/admin/getAllProducts";

const getProducts = async () => {
  const reponseObj = await axios.get(productsApi);
  return reponseObj.data;
}
export default getProducts;
