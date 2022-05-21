const crypto = require('crypto');

const salt ="mm";
const hashValue;

password = {};

password.encryption = (password) =>{
    return crypto.createHash('md5').update(password+salt).digest('hex');
};

password.gethash = () =>{
    return hashValue;
}

password.getSalt = () =>{
    return salt;
}
