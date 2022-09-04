export const URL = "http://localhost:4000"


// Login API function
export const ApiLogin = (info:any,callback:any)=>{
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(`${URL}/super/login`,{
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(info),
        redirect:"follow"
    })
    .then(response => response.json())
    .then((result:any)=>{
        if (result.status) return callback(result,null);
        return callback(null,"error"); 
    })
    .catch((error:any)=>{
        return callback("Error",error);
    })
};

// Sign Up function
export const ApiSignUp = (info:any,callback:any)=>{
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(`${URL}/super/register`,{
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(info),
        redirect:"follow"
    })
    .then(response => response.json())
    .then((result:any)=>{
        console.log(result);
        if (result.status) return callback(result,null);
        return callback(null,"error"); 
    })
    .catch((error:any)=>{
        return callback("Error",error);
    })
};