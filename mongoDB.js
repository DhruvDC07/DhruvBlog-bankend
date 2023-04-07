let mongoose = require('mongoose')

async function initDB(){
    try{
        await mongoose.connect(process.env.DB_url,{dbName:'Dhruvblog'})
        console.log("DB is connect");

    }catch(error){
        console.log(error);
    }
}

module.exports= {initDB}