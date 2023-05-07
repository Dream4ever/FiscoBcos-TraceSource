import React, { useEffect, useState } from 'react'

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
  getAllProducts,
} from 'api/user'

function Forms() {
  const [products, setProducts] = useState<string[]>([])
  const [product, setProduct] = useState<IProduct>({
    productName: '',
    producerName: '',
    productionDate: '',
    location: '',
    batchNumber: '',
    ingredients: [],
  })

  useEffect(() => {
    getAllProds()
  }, [])

  async function getAllProds () {
    const prods = await getAllProducts() as any
    console.log(JSON.parse(prods[0]))
    setProducts(parseStringAsArray(prods[0]))
  }

  const parseStringAsArray = (str: string) => {
    return str
      .replace(/\[(.*)\]/, '$1')
      .split(',')
      .map(i => i.trim())
  }

  async function handleAddProduct() {
    await addProduct(product)
    await getAllProds()
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
              <TableCell>产品地址</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {products.map((prod, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {prod}
                  </div>
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
