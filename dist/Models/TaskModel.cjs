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

// src/Models/TaskModel.ts
var TaskModel_exports = {};
__export(TaskModel_exports, {
  TaskModel: () => TaskModel
});
module.exports = __toCommonJS(TaskModel_exports);
var import_mongoose = __toESM(require("mongoose"), 1);
var taskSchema = new import_mongoose.default.Schema({
  title: {
    type: String,
    required: [true, "title required."]
  },
  day: {
    type: Date,
    required: [true, "gender required."]
  },
  finished: {
    type: Boolean,
    required: true
  },
  user: {
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
var TaskModel = import_mongoose.default.model("Task", taskSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaskModel
});
