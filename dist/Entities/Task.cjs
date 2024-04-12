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

// src/Entities/Task.ts
var Task_exports = {};
__export(Task_exports, {
  Task: () => Task,
  TaskBuilder: () => TaskBuilder
});
module.exports = __toCommonJS(Task_exports);
var Task = class {
  constructor(builder) {
    this.title = builder.title;
    this.day = builder.day;
    this.finished = builder.finished;
  }
  getTitle() {
    return this.title;
  }
  getDay() {
    return this.day;
  }
  isFinished() {
    return this.finished;
  }
};
var TaskBuilder = class {
  constructor() {
    this.title = "";
    this.day = /* @__PURE__ */ new Date();
    this.finished = false;
  }
  setTitle(title) {
    this.title = title;
    return this;
  }
  setDay(day) {
    this.day = day;
    return this;
  }
  setFinished(finished) {
    this.finished = finished;
    return this;
  }
  build() {
    return new Task(this);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Task,
  TaskBuilder
});
