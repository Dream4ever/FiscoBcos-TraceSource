import React, { useState } from 'react'

import {
  Input,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@roketid/windmill-react-ui'
import PageTitle from 'components/Typography/PageTitle'

import Layout from 'containers/Layout'

import {
  IProduct,
  addProduct,
} from 'api/user'

function Forms() {
  const [products, setProducts] = useState<any[]>([])
  const [product, setProduct] = useState<IProduct>({
    productName: '',
    producerName: '',
    productionDate: '',
    location: '',
    batchNumber: '',
    ingredients: [],
  })

  async function handleAddProduct() {
    const result = await addProduct(product)
  }

  return (
    <Layout>
      <PageTitle>产品管理</PageTitle>
      <div className="px-4 py-8 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

        <div>
          <h1 className='text-xl font-bold'>添加产品</h1>
          <div className='mt-6 flex flex-col gap-y-4'>
            <div className='flex items-center gap-x-4'>
              <span className="w-20 text-sm">产品名称</span>
              <Input
                value={product.productName}
                onChange={(e) => setProduct({
                  ...product,
                  productName: e.target.value,
                })}
              />
            </div>
            <div className='flex items-center gap-x-4'>
              <span className="w-20 text-sm">生产商名称</span>
              <Input
                value={product.producerName}
                onChange={(e) => setProduct({
                  ...product,
                  producerName: e.target.value,
                })}
              />
            </div>
            <div className='flex items-center gap-x-4'>
              <span className="w-20 text-sm">生产日期</span>
              <Input
                value={product.productionDate}
                onChange={(e) => setProduct({
                  ...product,
                  productionDate: e.target.value,
                })}
              />
            </div>
            <div className='flex items-center gap-x-4'>
              <span className="w-20 text-sm">产地</span>
              <Input
                value={product.location}
                onChange={(e) => setProduct({
                  ...product,
                  location: e.target.value,
                })}
              />
            </div>
            <div className='flex items-center gap-x-4'>
              <span className="w-20 text-sm">批次编号</span>
              <Input
                value={product.batchNumber}
                onChange={(e) => setProduct({
                  ...product,
                  batchNumber: e.target.value,
                })}
              />
            </div>
            <div className='flex items-center gap-x-4'>
              <span className="w-20 text-sm">原料清单</span>
              <Input
                value={product.ingredients}
                onChange={(e) => setProduct({
                  ...product,
                  ingredients: [
                    ...product.ingredients,
                    e.target.value
                  ],
                })}
              />
            </div>
            <div className="mt-4 flex items-start">
              <Button onClick={handleAddProduct}>添加</Button>
            </div>
          </div>
        </div>
      </div>

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
            {products.map((prod, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <p className="font-semibold"></p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm"></span>
                </TableCell>
                <TableCell>
                  <span className="text-sm"></span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>已处理</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
    </Layout >
  )
}

export default Forms
