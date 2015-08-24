var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var merge = require('mongoose-merge-plugin');
mongoose.plugin(merge);

var userSchema = new mongoose.Schema(
	{ 
		active: {
			type: Boolean, 
			default: true
		},
		email: { 
			type: String, 
			trim: true, 
			lowercase: true 
		}, 
		firstName: { 
			type: String, 
			trim: true 
		}, 
		lastName: { 
			type: String, 
			trim: true 
		},
		created: { 
			type: Date, 
			default: Date.now 
		}, 
		lastLogin: { 
			type: Date, 
			default: Date.now 
		}, 
	},
	{
		minimize: false
	}
); 
userSchema.index({email : 1}, {unique:true});

// Instantiate user model
var UserModel = mongoose.model('user', userSchema);

// Routes
var route = router.route('/');
route.get(function(req, res) {
	UserModel.find({}, function(err, result){
		if(!err) {
			res.send(result);
		}
	});
});

route.post(function(req, res) {
	var user = new UserModel(req.body);
	user.save(function(err, result){
		if(!err) {
			res.send(result);
		}
	});
});

router.param('id', function (req, res, next, id) {
  	UserModel.findById(id, function(err, result) { 
  		if(!err) {
  			req.orig_user = result;
  			next();
  		}
  		else {
  			err.status = 404;
			next(err);
  		}
  	});
});
route = router.route('/:id');

route.put(function(req, res, next) {
	var user = new UserModel(req.body);
	req.orig_user.merge(user);
	req.orig_user.save(function(err, u){
		if(!err) {
			res.send(u);
		}
	});
});

route.delete(function(req, res, next) {
	var user = new UserModel(req.body);
	UserModel.remove({_id: user._id}, function(err, result){
		if(!err) {
			res.send({
				message: "User removed successfully"
			});
		}
	});
});

module.exports = router;
