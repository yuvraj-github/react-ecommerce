export const checkLogin = async (data) => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    return result;
}

export const userRegister = async (data) => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    return result;
}