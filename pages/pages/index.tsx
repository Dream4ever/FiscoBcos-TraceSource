import React, { useState } from 'react'

import PageTitle from 'components/Typography/PageTitle'
import Layout from 'containers/Layout'

import {
  Button,
  Dropdown,
  DropdownItem,
} from '@roketid/windmill-react-ui'

import { setRole } from 'api/user'

function Dashboard() {
  const [roleId, setRoleId] = useState<number>(2)
  const [isOpen, setIsOpen] = useState(false)

  const roleList = ['生产商', '流通商', '待选择']

  function toggleDropdown() {
    setIsOpen(!isOpen)
  }

  function onRoleIdChange(id: number) {
    setRoleId(id)
    setIsOpen(false)
  }

  async function reqRole() {
    const result = await setRole(localStorage.getItem('signUserId')!, roleId)
    console.log(result.data)
  }

  return (
    <Layout>
      <PageTitle>设置用户角色</PageTitle>
      <div className="relative flex flex-col flex-wrap">
        <div className='flex items-center gap-x-4'>
          <Button onClick={toggleDropdown} aria-label="Notifications" aria-haspopup="true">
            选择用户角色
          </Button>
          <span>当前用户角色：{roleList[roleId]}</span>
        </div>

        <Dropdown className='bg-white' isOpen={isOpen} onClose={() => { }}>
          <DropdownItem onClick={() => onRoleIdChange(0)}>
            <span>{roleList[0]}</span>
          </DropdownItem>
          <DropdownItem onClick={() => onRoleIdChange(1)}>
            <span>{roleList[1]}</span>
          </DropdownItem>
        </Dropdown>
      </div>

      <div className='mt-12'>
        <Button disabled={roleId === roleList.length - 1} onClick={reqRole}>
          申请
        </Button>
      </div>
    </Layout>
  )
}

export default Dashboard
