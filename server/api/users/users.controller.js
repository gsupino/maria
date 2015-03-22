'use strict';
import {userService} from '../../services/users';
import co from 'co';

const UserSchema ={
  email: {type: String, unique: true, lowercase: true},
  password: String,
  provider:String,
  facebook: String,
  tokens: Array,
  profile: {
    name: {type: String, default: ''},
    gender: {type: String, default: ''},
    location: {type: String, default: ''},
    website: {type: String, default: ''},
    picture: {type: String, default: ''}
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  salt: {type: String},
  roles: {
    type: [{type: String, enum: ['user', 'admin']}],
    default: ['user']
  },
  updated: {type: Date},
  created: {
    type: Date,
    default: Date.now
  },

  image: {
    type: String,
    ref: 'Image'
  }
};

var schema =require('simple-mongo-schema')(UserSchema);

export function find(req, res) {
	co(function*(){
		let users=yield userService.find();
		res.send(users);
	})
};

export function read(req,res){
	co(function*(){
		let id=req.params.id;
		let users=yield userService.read(id);
		res.send(users);
	})
};

export function create(req,res){





}