const fs = require('fs');

fs.readFile('./helllo.txt',(err, data) =>{
    if(err){
        console.log('errrooooorrr');
    }
    console.log('1', data.toString());
})

const file = fs.readFileSync('./helllo.txt');
console.log('2', file.toString());

//append
// fs.appendFile('./helllo.txt', ' this is so cool',err =>{
//     if(err){
//         console.log(err);
//     }
// })

//write
// fs.writeFile('bye.txt', 'see you again', err => {
//     console.log(err);
// })

//delette
fs.unlink('./bye.txt', err =>{
    if(err) {
        console.log(err);
    }
})