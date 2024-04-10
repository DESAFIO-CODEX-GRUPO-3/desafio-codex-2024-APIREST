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

// src/Models/UserModel.ts
var UserModel_exports = {};
__export(UserModel_exports, {
  UserModel: () => UserModel
});
module.exports = __toCommonJS(UserModel_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserModel
});
