const jwt =require("jsonwebtoken");
const secret = "WHO#AM#I";

function createTokenForUser(user){
    const payload={
        _id:user.id,
        email:user.email,
        fullName: user.fullName,
        profileImageURL: user.profileImageURL,
        role: user.role,
    }
    const token = jwt.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload =jwt.verify(token,secret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken
}