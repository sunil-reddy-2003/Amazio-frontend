
const productsApi = "http://localhost:9090/api/admin/getAllProducts";

const getProducts = async () => {
  const promiseObj = await fetch(productsApi);   //response obj returned by the server
  const data = await promiseObj.json();     //readable stream converted to json format
  return data;  //returns a promise
}
export default getProducts;


