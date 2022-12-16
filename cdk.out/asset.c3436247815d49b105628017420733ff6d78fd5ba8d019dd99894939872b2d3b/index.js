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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/handler/todo-list-handler.ts
var todo_list_handler_exports = {};
__export(todo_list_handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(todo_list_handler_exports);

// src/lib/env/index.ts
var Env = class {
  static get(name) {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Failure to fetch parameter ${name}: ${value}`);
    }
    return value;
  }
};

// src/service/TodoService.ts
var import_dynamodb = require("aws-sdk/clients/dynamodb");

// node_modules/uuid/dist/esm-node/rng.js
var import_crypto = __toESM(require("crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm-node/native.js
var import_crypto2 = __toESM(require("crypto"));
var native_default = {
  randomUUID: import_crypto2.default.randomUUID
};

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/service/TodoService.ts
var TodoService = class {
  constructor(props) {
    this.documentClient = new import_dynamodb.DocumentClient();
    this.props = props;
  }
  async list() {
    const response = await this.documentClient.scan({
      TableName: this.props.table
    }).promise();
    if (response.Items === void 0) {
      return [];
    }
    return response.Items;
  }
  async get(params) {
    const id = params.id;
    const response = await this.documentClient.get({
      TableName: this.props.table,
      Key: {
        id
      }
    }).promise();
    if (response.Item === void 0) {
      return {};
    }
    return response.Item;
  }
  async create(params) {
    const todo = {
      id: v4_default(),
      ...params
    };
    const response = await this.documentClient.put({
      TableName: this.props.table,
      Item: todo
    }).promise();
    return todo;
  }
  async edit(params) {
    const response = await this.documentClient.put({
      TableName: this.props.table,
      Item: params
    }).promise();
    return params;
  }
  async delete(params) {
    const response = await this.documentClient.delete({
      TableName: this.props.table,
      Key: {
        id: params.id
      }
    }).promise();
  }
};

// src/handler/todo-list-handler.ts
var table = Env.get("TODO_TABLE");
var todoService = new TodoService({
  table
});
async function handler(event, context) {
  const result = {
    statusCode: 200,
    body: ""
  };
  const todo = await todoService.list();
  result.body = JSON.stringify(todo);
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
