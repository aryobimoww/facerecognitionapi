const handleRegister = (req, res, postgres,bcrypt) =>{
    const { email, name, password } = req.body;
    if (!email ||!ame||password){
        return res.status(400).json('incorrect from submission');
    }
    const hash = bcrypt.hashSync(password);
    postgres.transaction(trx => {
        trx.insert({
            hash: hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
         trx('users')
        .returning('*')
        .insert({
            email:loginEmail[0],
            name:name,
            joined: new Date() 
        })
         .then(user => {
            res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
     })
 .catch(err => //res.status(400).json('unable to register')
 console.log(err)
)
}

module.exports = {
    handleRegister: handleRegister
};