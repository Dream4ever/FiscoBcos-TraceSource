import React, { useEffect, useState } from 'react'

import PageTitle from 'components/Typography/PageTitle'
import Layout from 'containers/Layout'

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@roketid/windmill-react-ui'

import {
  getAllNode,
  approveNode,
  disapproveNode,
} from 'api/user'
import {
  OkIcon,
  NoIcon,
} from 'icons'

function Dashboard() {
  const [allNodes, setAllNodes] = useState<any[]>([])

  const roleList = ['生产商', '流通商']

  useEffect(() => {
    getAllNodeReq()
  }, [])

  const getAllNodeReq = async () => {
    const result = await getAllNode()
    const users = JSON.parse(result as any).filter((node: any) => node[1] !== 2)
    setAllNodes(users)
  }

  async function approve(addr: string) {
    const result: any = await approveNode(addr)
    if (result.message === 'Success') {
      await getAllNodeReq()
    }
  }

  async function disapprove(addr: string) {
    const result: any = await disapproveNode(addr)
    if (result.message === 'Success') {
      await getAllNodeReq()
    }
  }

  return (
    <Layout>
      <PageTitle>用户审核</PageTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>节点地址</TableCell>
              <TableCell>用户角色</TableCell>
              <TableCell>审核状态</TableCell>
              <TableCell>操作</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {allNodes.map((node, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <p className="font-semibold">{node[0]}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{roleList[node[1]]}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{node[2] ? '审核通过' : '未审核'}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-4">
                    {node[2] ? (
                      <span className='text-sm'>已处理</span>
                    ) : (
                      <>
                        <Button onClick={() => approve(node[0])} disabled={node[2]} layout="outline" size="small" aria-label="Ok">
                          <OkIcon className="w-5 h-5" aria-hidden="true" />
                          <span>批准</span>
                        </Button>
                        <Button onClick={() => disapprove(node[0])} disabled={node[2]} layout="outline" size="small" aria-label="No">
                          <NoIcon className="w-5 h-5" aria-hidden="true" />
                          <span>驳回</span>
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  )
}

export default Dashboard
