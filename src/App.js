import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { Layout, Menu, } from 'antd';
import ManageContainer from './components/manage/ManageContainer';
import SelectContainer from './components/select/SelectContainer';
import VoucherContainer from './components/voucher/VoucherContainer';
import './css/App.css'


const { Header, Content, Footer } = Layout;


class App extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentWillMount(){
      // console.log(window.location.hash.split("/")[1])
    }
    render() {
        return (
            <HashRouter>
              <Layout className="layout" style={{height: "100%"}}>
            {/* Header 头部区域 */}
            <Header>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[window.location.hash.split("/")[1]]}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="select">
                    <Link to="/select/left/1">在线选座</Link>
                </Menu.Item>
                <Menu.Item key="voucher">
                    <Link to="/voucher">我的凭证</Link>
                </Menu.Item>
                <Menu.Item key="manage">
                    <Link to="/manage">管理座位</Link>
                </Menu.Item>
              </Menu>
            </Header>

            {/* 中间的内容区域 */}
            <Content style={{ backgroundColor:'#fff', flex: 1 }}>
                <Route path="/select" component={SelectContainer} />
                <Route path="/voucher" component={VoucherContainer} />
                <Route path="/manage" component={ManageContainer} />
            </Content>

            {/* Footer底部区域 */}
            <Footer style={{ textAlign: 'center',padding:"12px 50px"}}>
              ©2018 Created
            </Footer>
          </Layout>
            </HashRouter>
        );
    }
}

export default App;