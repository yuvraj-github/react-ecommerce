export const searchProduct = async (key) => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/search/${key}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    return result;
}

export const delProduct = async (id) => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/deleteProduct/${id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    return result;
}

export const fetchProducts = async () => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    return result;
}

export const fetchProductDetails = async (productId) => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/getProduct/${productId}`, {
        headers: {
            'Conternt-Type': 'application/json'
        }
    });
    result = await result.json();
    return result;
}

export const updateProductInfo = async (productId, data) => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/updateProduct/${productId}`, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return result;
}

export const addProductInfo = async (data) => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/addProduct`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return result;
}