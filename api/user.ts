import { AxiosResponse } from 'axios'
import { reqUser, reqContract } from 'utils/request'
import { Buffer } from 'buffer'

export interface IMyResponse extends AxiosResponse {
  message: string
}

export interface IUserInfo extends AxiosResponse {
  message: string
  data: {
    signUserId: string
    address: string
  }
}

const payload = {
  groupId: 1,
  contractName: "SupplyChain",
  contractPath: "/SupplyChain",
  version: "",
  funcName: "isRegister",
  contractAddress: "0xdd48185f01ad4aa0a13db90354274faf6afadaf0",
  contractAbi: [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "nodeAddress", "type": "address" }, { "indexed": true, "internalType": "enum SupplyChain.NodeType", "name": "nodeType", "type": "uint8" }], "name": "NodeRegistered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "nodeAddress", "type": "address" }, { "indexed": true, "internalType": "enum SupplyChain.NodeType", "name": "nodeType", "type": "uint8" }], "name": "NodeVerified", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "string", "name": "productCode", "type": "string" }, { "indexed": true, "internalType": "address", "name": "nodeAddress", "type": "address" }], "name": "ProductInfoAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "string", "name": "productCode", "type": "string" }], "name": "ProductInfoVerified", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "_productName", "type": "string" }, { "internalType": "string", "name": "_producerName", "type": "string" }, { "internalType": "string", "name": "_productionDate", "type": "string" }, { "internalType": "string", "name": "_location", "type": "string" }, { "internalType": "string", "name": "_batchNumber", "type": "string" }, { "internalType": "string[]", "name": "_ingredients", "type": "string[]" }], "name": "addProduct", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllNode", "outputs": [{ "components": [{ "internalType": "address", "name": "nodeAddress", "type": "address" }, { "internalType": "enum SupplyChain.NodeType", "name": "nodeType", "type": "uint8" }, { "internalType": "bool", "name": "isRegistered", "type": "bool" }], "internalType": "struct SupplyChain.Node[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllProductHash", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_node", "type": "address" }], "name": "isRegister", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nodes", "outputs": [{ "internalType": "address", "name": "nodeAddress", "type": "address" }, { "internalType": "enum SupplyChain.NodeType", "name": "nodeType", "type": "uint8" }, { "internalType": "bool", "name": "isRegistered", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "enum SupplyChain.NodeType", "name": "_nodeType", "type": "uint8" }], "name": "registerNode", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "node", "type": "address" }, { "internalType": "uint256", "name": "_productHash", "type": "uint256" }], "name": "transferProduct", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_productHash", "type": "uint256" }], "name": "verifiedProduct", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_node", "type": "address" }], "name": "verifyNode", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
  "useAes": false,
  "useCns": false,
  "cnsName": ""
}

const interact = (signUserId: string, funcName: string, funcParam?: string | number) => {
  return reqContract.post('/trans/handleWithSign', {
    ...payload,
    signUserId,
    funcName,
    ...(funcParam) && {
    funcParam: [funcParam],
    },
  })
}

export const newUser = (signUserId: string, appId = 'test') =>
  reqUser.get('/user/newUser', {
    params: {
      signUserId,
      appId,
    },
  })

export const fetchUserInfo = (signUserId: string) => {
  return reqUser.get(`/user/${signUserId}/userInfo`)
}

export const sign = (signUserId: string, encodedDataStr: string) => {
  encodedDataStr = Buffer.from(encodedDataStr).toString('hex')

  return reqUser.post(`/sign`, {
    signUserId,
    encodedDataStr,
  })
}

export const isRegistered = (signUserId: string, addr: string) => {
  return interact(signUserId, 'isRegister', addr)
}

export const setRole = (signUserId: string, roleId: number) => {
  return interact(signUserId, 'registerNode', roleId)
}
