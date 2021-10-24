const mongoose = require('mongoose');
const slugify = require('slugify');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: String,
  },
  role: {
    type: String,
    enum: ['admin', 'normal'],
    default: 'normal',
  },
  slug: {
    type: String,
    unique: true,
  },
  education: [
    {
      type: String,
    },
  ],
  languages: [
    {
      type: String,
    },
  ],
  specialties: [
    {
      type: String,
    },
  ],
  image : {
    type : String
  },
  projects : [
    {
      name : {
        type: String,
        required: true
      },
      technologies : [
        {
          type: String
        }
      ],
      features : {
        type: String,
        required: true
      },
      gitlink: {
        type: String
      }
    }
  ],
  posts : [
    {
      name : {
        type: String,
        required: true
      },
      content : {
        type: String,
        required: true
      },
      postlink : {
        type: String
      },
      subject : {
        type: String
      }
    }
  ]
});

UserSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

