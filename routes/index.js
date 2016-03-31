var express = require('express');
var router = express.Router();
var userModel= require('/home/ram/newNode/model/userModel');
var auth= require('/home/ram/newNode/routes/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',function(req,res,next){
	res.render('login',{title:'Login Page'});
})
router.get('/sign',function(req,res,next){
	res.render('sign',{title:'Registration Page'});
})
router.get('/logout',function(req,res){
	req.session.destroy(function(){
		res.render('logout');
	})
})

router.get('/view',auth.authUser,function(req,res,next){
	//res.render('view',{data:req.session.user});
	userModel.find({},function(err,user){
		if(err){
			res.send(err);
		}else{
			res.render('user', {data:user});
	}
	})
	
})
router.get('/delete/:id',function(req,res,next){
	console.log(req.params.id);
	userModel.findById(req.params.id,function(err,person){
		person.remove(function(err,data){
			res.redirect('/view');
			
		});
	});
});
router.get('/edit/:id',function(req,res,next){
	console.log(req.params.id);
	userModel.findById(req.params.id,function(err,person){
			res.render('edit',{data:person, title:'Edit User'});
			
		});
	});


// router.get('/entry',function(req,res,next){
// 	res.render('entry',{title:'Entry'});
// })
router.post('/edit/:id',function(req,res){
	
	userModel.findById(req.params.id,function(err,person){
		person.username = req.body.username;
		person.phone = req.body.phone;
		person.gender = req.body.gender;
		person.hobbies = req.body.hobbies;
		console.log(person.gender);
		//person.gender = req.body.female;
		
		person.save(function(err,data){
			if(err){
				console.log(err);			}
			else{
				res.redirect('/view');
			}
		})
	})


})
router.post('/login',function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	userModel.findOne({email:req.body.email},function(err,person){
		if(err){
			console.log('err',err);
		}
		else{
			if(person){
				if(person.password == password){
					req.session.user = person;
					res.redirect('/view');
					//res.send({status:true, data: person});
				}
				else{
					res.render('login');
					//res.send('invalid password');
				}
			}
			else{
				res.send('user doesnot exists');
			}
		}
	});

})
router.post('/sign',function(req,res){
var error =[];
var user = new userModel();
if(req.body.username){
	user.username= req.body.username;
}
else{
	error.push('username is required');
}
if(req.body.phone){
	user.phone = req.body.phone;
}
else{
	error.push('phone is required');
}
if(req.body.email){
user.email = req.body.email;
}
else{
	error.push('email is required');
}
if(req.body.password){
	user.password = req.body.password;
}
else{
	error.push('password is required');
}
if(req.body.gender){
	user.gender = req.body.gender;
}
else{
	error.push('gender is required');
}
if(req.body.hobbies){
	user.hobbies = req.body.hobbies;
}
else{
	error.push('hobbies is required');
}
userModel.findOne({email:req.body.email},function(err,person){
	if(err){
		console.log('err'+err);
	}
	else{
		if(!person){
			if(error.length ==0){
				user.save(function(err,data){
					if(err){
						console.log(err);
						res.send(err);
					}
					else{

						res.redirect('/login');
						//res.send(data);
						//console.log(data);
					}
				})
			}
			else{
				res.render('login');
			}
		}
		else{
			res.send(error+'email already registred');
			res.render('sign');
		}
	}
})





// if(error.length  == 0){
// 	res.send(req.body);
// }
// else{
// 	res.send(error);
// }


})

module.exports = router;
