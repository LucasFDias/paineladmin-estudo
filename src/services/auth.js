import bcrypt from "bcryptjs";


export const createPasswordHash = async (password) => {
    return bcrypt.hash(password, 8);
};


export const checkPassword = (user, password) =>{
    return bcrypt.compare(password, user.password_hash);
};