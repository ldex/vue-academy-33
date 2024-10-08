const baseURL = import.meta.env.VITE_API_SERVER_URL
const resourceName = 'products';

export default {

  deleteProduct(product) {
    const url = `${baseURL}/${resourceName}/${product.id}`;
    const options = {
      method: "DELETE",
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("API Error while deleting product, " + error);
        return Promise.reject(error);
      });
  },

  insertProduct(product) {
    const url = `${baseURL}/${resourceName}`;
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    };

    return fetch(url,options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => {
              console.error('API Error while creating new product, ' + error);
              return Promise.reject(error);
            })
  },

  getProduct(id) {
    const url = `${baseURL}/${resourceName}/${id}`;
    const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    return fetch(url, options)
            .then(response => response.json())
            .catch(error => {
                console.error('API Error while loading product, ' + error);
                return Promise.reject(error);
            })
  },

  getProducts() {
    const sortParams = `?_sort=modifiedDate&_order=desc`;
    const url = `${baseURL}/${resourceName}${sortParams}`;
    const options = {
        method: 'GET', // GET is the default request type anyway
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    return fetch(url, options) // fetch() returns a promise containing a response object
            .then(response => response.json()) // json() will parse the content and return a promise with the data as an object, here an array
            .then(data => new Promise(resolve => setTimeout(() => resolve(data), 1200)))  // slowing down the response for testing purpose...
            .catch(error => {
                console.error('API Error while loading products, ' + error); // log technical details in the service
                return Promise.reject(error); // return the error to the component for a user facing message
            })
  },
}