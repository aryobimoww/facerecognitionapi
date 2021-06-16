const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey:'9cba2396dc8e4e89b393d20cb9252506'
 });
 const handleApi = (req,res) => {
   const {input} = req.body;
   app.models.predict(
    Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {res.json(data)})
    .catch(err => res.status(400).json('unable work api'))
 }
const handleImage = (req,res,postgres)=>{
    const {id} = req.body;
    postgres('users').where('id', '=',id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(console.log)//err  => res.status(400).json('unable to get count'))
  }
  module.exports = {
    handleImage,
    handleApi
  }