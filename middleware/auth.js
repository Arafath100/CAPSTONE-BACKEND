import jwt from "jsonwebtoken";

// Middleware function for authentication
export const auth = (request, response, next) => {
    try {
        const token = request.header("x-auth-token");
        jwt.verify(token,process.env.SECRET_KEY);
            next(); 
    }catch(err) {
        response.status(401).send({
            message: err.message
        })
    }
}; 