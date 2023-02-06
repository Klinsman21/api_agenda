const db = require('../config/db');
const User = require('../models/user');

const deleteAccount = ()=>{
    try {
        User.destroy({ where: { verified: 0}})  
    } catch (error) {
        
    }
    
}
module.exports = deleteAccount