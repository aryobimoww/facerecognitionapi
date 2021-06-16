const handleSignin =  (req, res,postgres,bcrypt) => {
    //     // Load hash from your password DB.
    // bcrypt.compare("ana", '$2a$10$Y6SvmxnzZWhbHYyZAM.Xju2xZ.ZqM8qkSF9BzGq/qvnVJrRZrnWe6', function(err, res) {
    //   console.log('first guess', res);
    // });
    // bcrypt.compare("veggies", '$2a$10$Y6SvmxnzZWhbHYyZAM.Xju2xZ.ZqM8qkSF9BzGq/qvnVJrRZrnWe6', function(err, res) {
    //     console.log('second guess', res);
    // });
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect submission');
    }
    postgres.select('email', 'hash').from('login')
        .where('email', '=', email)    
        .then(response => {
            const isValid =   bcrypt.compareSync(req.body.password, response[0].hash); // true
            console.log(isValid);
            if(isValid){
                postgres.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0]);
                    console.log(user[0])
                })
                .catch(err => res.status(400).json('enable get user'))
            }else{
                console.log(err);
                res.status(400).json('wrong credential')
            }
            })
            .catch(err => res.status(400).json('wrong credential'))
           
    }
    
    module.exports = {
        handleSignin:handleSignin
    }