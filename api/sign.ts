import { reqUser, reqContract } from 'utils/demo/request'
import { Buffer } from 'buffer'

export const newUser = (signUserId: string, appId = 'test') =>
  reqUser.get('/user/newUser', {
    params: {
      signUserId,
      appId,
    },
  })

export const userInfo = (signUserId: string) =>
  reqUser.get(`/user/${signUserId}/userInfo`)

export const sign = (signUserId: string, encodedDataStr: string) => {
  encodedDataStr = Buffer.from(encodedDataStr).toString('hex')

  return reqUser.post(`/sign`, {
    signUserId,
    encodedDataStr,
  })
}
