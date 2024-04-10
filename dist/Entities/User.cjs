"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Entities/User.ts
var User_exports = {};
__export(User_exports, {
  User: () => User,
  UserBuilder: () => UserBuilder
});
module.exports = __toCommonJS(User_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  User,
  UserBuilder
});
