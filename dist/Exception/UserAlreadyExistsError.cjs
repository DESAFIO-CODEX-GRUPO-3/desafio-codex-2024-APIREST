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

// src/Exception/UserAlreadyExistsError.ts
var UserAlreadyExistsError_exports = {};
__export(UserAlreadyExistsError_exports, {
  default: () => UserAlreadyExistsError
});
module.exports = __toCommonJS(UserAlreadyExistsError_exports);

// src/Exception/UserValidationError.ts
var UserValidationError = class extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
};

// src/Exception/UserAlreadyExistsError.ts
var UserAlreadyExistsError = class extends UserValidationError {
  constructor() {
    super("There is already an user registered with this email!.");
  }
};