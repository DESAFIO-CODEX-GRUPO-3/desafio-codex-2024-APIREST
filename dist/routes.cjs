"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/routes.ts
var routes_exports = {};
__export(routes_exports, {
  routes: () => routes
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");

// src/Entities/User.ts
var User = class {
  constructor(builder) {
    this.fullName = builder.fullName;
    this.gender = builder.gender;
    this.age = builder.age;
    this.email = builder.email;
    this.password = builder.password;
  }
  getFullName() {
    return this.fullName;
  }
  getGender() {
    return this.gender;
  }
  getAge() {
    return this.age;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
};
var UserBuilder = class {
  constructor() {
    this.fullName = "";
    this.gender = "";
    this.age = 0;
    this.email = "";
    this.password = "";
  }
  setFullName(fullName) {
    this.fullName = fullName;
    return this;
  }
  setGender(gender) {
    this.gender = gender;
    return this;
  }
  setAge(age) {
    this.age = age;
    return this;
  }
  setEmail(email) {
    this.email = email;
    return this;
  }
  setPassword(password) {
    this.password = password;
    return this;
  }
  build() {
    return new User(this);
  }
};

// src/Models/UserModel.ts
var import_mongoose = __toESM(require("mongoose"), 1);
var userSchema = new import_mongoose.default.Schema({
  fullName: {
    type: String,
    required: [true, "fullName required."]
  },
  gender: {
    type: String,
    enum: {
      values: ["M", "M"],
      message: "{VALUE} is not supported [M|F]."
    },
    required: [true, "gender required."]
  },
  age: {
    type: Number,
    min: 0,
    required: [true, "age required."]
  },
  email: {
    type: String,
    required: [true, "email required."],
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email.`
    }
  },
  password: {
    type: String,
    required: [true, "password required."],
    validate: {
      validator: (v) => {
        return v.length >= 6;
      },
      message: () => "password must have at least 6 characters."
    }
  },
  tasks: [
    {
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ]
});
var UserModel = import_mongoose.default.model("User", userSchema);

// src/Exception/UserValidationError.ts
var UserValidationError = class extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
};

// src/Exception/UserNotFoundError.ts
var UserNotFoundError = class extends UserValidationError {
  constructor() {
    super("User does not exists.");
  }
};

// src/Exception/UserAlreadyExistsError.ts
var UserAlreadyExistsError = class extends UserValidationError {
  constructor() {
    super("There is already an user registered with this email!.");
  }
};

// src/Services/UserService.ts
var UserService = class {
  createUser(user) {
    return __async(this, null, function* () {
      const userModel = new UserModel({
        fullName: user.getFullName(),
        gender: user.getGender(),
        age: user.getAge(),
        email: user.getEmail(),
        password: user.getPassword()
      });
      const error = userModel.validateSync();
      if (yield this.userAlreadyExists(user.getEmail()))
        throw new UserAlreadyExistsError();
      if (error)
        throw new UserValidationError(error.message);
      return (yield userModel.save()).toJSON();
    });
  }
  getUserById(id) {
    return __async(this, null, function* () {
      const userFromDB = yield UserModel.findById(id);
      if (!userFromDB)
        throw new UserNotFoundError();
      return new UserBuilder().setFullName(userFromDB.fullName).setGender(userFromDB.gender).setAge(userFromDB.age).setEmail(userFromDB.email).setPassword(userFromDB.password).build();
    });
  }
  userAlreadyExists(email) {
    return __async(this, null, function* () {
      const existingUser = yield UserModel.findOne({ email });
      return Boolean(existingUser);
    });
  }
};

// src/Controllers/UserController.ts
var UserController = class {
  constructor() {
    this.createUser = (request, response) => __async(this, null, function* () {
      try {
        const { fullName, gender, age, email, password } = request.body;
        const user = new UserBuilder().setFullName(fullName).setGender(gender).setAge(age).setEmail(email).setPassword(password).build();
        const userJSON = yield this.userService.createUser(user);
        return response.status(201).json(userJSON);
      } catch (error) {
        return error instanceof UserValidationError ? response.status(400).json({ error: error.message }) : response.status(500).json({ error });
      }
    });
    this.userService = new UserService();
  }
};

// src/routes.ts
var routes = (0, import_express.Router)();
var userController = new UserController();
routes.post("/user", userController.createUser);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routes
});
