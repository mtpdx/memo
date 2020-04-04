const mongoose  = require('mongoose');

mongoose.connect('mongodb://192.168.1.104/ec', {useNewUrlParser: true})
.then(()=>{
    console.log('mongodb connect success');
    
})
.catch(err=>{
    console.log(err, 'mongodn connect failed');
    
});
