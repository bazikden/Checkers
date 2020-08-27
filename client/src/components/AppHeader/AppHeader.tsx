import React from 'react'
import { Layout } from 'antd'

export const AppHeader = () => {
    const { Header } = Layout
    return (
        <Header style={{ width: '100%' ,height:'50px',color:"white",background:"#141414" }}>
            Online Checkers
        </Header>
    )
}
