import { Button } from "antd"

import { Layout, Flex } from 'antd'

const { Header, Footer, Sider, Content } = Layout


export default function Home() {
  return (
    <div className='text-[24px] text-center'>
      <div className='text-[24px] text-center'>
        Welcome to mygithub
      </div>
      <div className='text-[24px] text-center'>
        <Button type="primary">Button</Button>
      </div>

    </div>
  )
}
