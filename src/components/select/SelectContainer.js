import React, { Component } from 'react';
import {
    Layout, Menu, 
  } from 'antd';
import { Link, Route } from 'react-router-dom';
//导入路由组件页面
import SeatList from './SeatList';

  const { Content, Sider } = Layout;


class SelectContainer extends Component {
    render() {
        return (
            <Layout style={{height: "100%"}}>
                <Sider width={100} style={{ background: '#fff' }}>
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={[window.location.hash.split('/')[2]]}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="left">
                            <Link to="/select/left/1">leftFloor</Link>
                        </Menu.Item>
                        <Menu.Item key="right">
                            <Link to="/select/right/1">rightFloor</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ paddingLeft: '1px' }}>
                    <Content style={{
                    background: '#fff', padding: 10, margin: 0, minHeight: 280,
                    }}
                    >
                        {/* 提供的两个参数,this.props.match.params中提取 */}
                        <Route path="/select/:type/:page" component={SeatList}></Route>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default SelectContainer;