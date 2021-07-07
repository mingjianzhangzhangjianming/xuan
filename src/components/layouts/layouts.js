import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ConfigDrawer from '@/components/configDrawer/configDrawer'
import { Layout, Menu, Breadcrumb, Badge, Avatar, Dropdown, BackTop } from 'antd'
import {
    HomeOutlined,
    MenuUnfoldOutlined,
    SyncOutlined,
    FullscreenOutlined,
    // FullscreenExitOutlined,
    ReadOutlined,
    BellOutlined,
    UserOutlined,
    DownOutlined,
    MoreOutlined,
    ToTopOutlined
} from '@ant-design/icons'
import * as Icon from '@ant-design/icons'
import logo from '@/assect/images/logo.svg'
import './layouts.less'
import { connect } from 'react-redux'
import { LoginOut } from '@/store/createActions'

const { Header, Sider, Content, Footer } = Layout
const { SubMenu } = Menu

const renderIcon = name => React.createElement(Icon[name])

class Layouts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            visible: false
        }
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    closePopup = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }
    onLoad = () => {
        window.location.reload()
    }

    handleMenu = e => {
        if (e.key === '2') {
            this.props.LoginOut(this.props.history)
        }
    }

    alertDrawer = () => {
        this.setState({
            visible: true
        })
    }

    handleClose = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const { collapsed, visible } = this.state
        const { menuList } = this.props
        const menu = (
            <Menu onClick={this.handleMenu}>
                <Menu.Item key="0">个人中心</Menu.Item>
                <Menu.Item key="1">修改密码</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2">退出登录</Menu.Item>
            </Menu>
        )
        return (
            <Layout className="layout">
                <Header>
                    <div className={`logo ${collapsed ? 'logo-sm' : 'logo-xs'}`}>
                        <img src={logo} alt="" />
                        <h2>admin pro</h2>
                    </div>
                    <div className="header-box">
                        <dl className="left">
                            <dd onClick={this.toggleCollapsed}>
                                <MenuUnfoldOutlined />
                            </dd>
                            <dd onClick={this.onLoad}>
                                <SyncOutlined />
                            </dd>
                            <dd>
                                <Breadcrumb>
                                    <Breadcrumb.Item>
                                        <HomeOutlined />
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Application</Breadcrumb.Item>
                                    <Breadcrumb.Item>工作台</Breadcrumb.Item>
                                </Breadcrumb>
                            </dd>
                        </dl>
                        <span className="full-text"></span>
                        <dl className="right">
                            <dd>
                                <FullscreenOutlined />
                            </dd>
                            <dd>
                                <ReadOutlined />
                            </dd>
                            <dd>
                                <Badge dot size="small">
                                    <BellOutlined style={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.65)' }} />
                                </Badge>
                            </dd>
                            <dd>
                                <Dropdown overlay={menu} trigger={['click']} arrow>
                                    <span className="ant-dropdown-link">
                                        <Avatar icon={<UserOutlined />} />
                                        <span className="user-name">管理员</span>
                                        <DownOutlined />
                                    </span>
                                </Dropdown>
                            </dd>
                            <dd>
                                <MoreOutlined onClick={this.alertDrawer} />
                            </dd>
                        </dl>
                    </div>
                </Header>
                <Sider
                    className={`sider ${collapsed ? 'min-sider' : ''}`}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <Menu theme="dark" mode="inline">
                        {menuList.map(i => (
                            <SubMenu key={i.menuId} icon={renderIcon(i.icon)} title={i.title}>
                                {i.children.map(j =>
                                    j.children.length ? (
                                        <SubMenu key={j.menuId} icon={renderIcon(j.icon)} title={j.title}>
                                            {j.children.map(k => (
                                                <Menu.Item key={k.menuId} icon={renderIcon(k.icon)}>
                                                    <Link to={k.path}>{k.title}</Link>
                                                </Menu.Item>
                                            ))}
                                        </SubMenu>
                                    ) : (
                                        <Menu.Item key={j.menuId} icon={renderIcon(j.icon)}>
                                            <Link to={j.path}>{j.title}</Link>
                                        </Menu.Item>
                                    )
                                )}
                            </SubMenu>
                        ))}
                    </Menu>
                </Sider>
                <Layout className="container">
                    <Content>
                        <div className="render-container">{this.props.children}</div>
                        <BackTop>
                            <div className="backTop">
                                <ToTopOutlined />
                            </div>
                        </BackTop>
                    </Content>
                    <Footer>Copyright © 2021 武汉易云智科技有限公司</Footer>
                </Layout>
                {collapsed || <div className="layout-popup" onClick={this.closePopup}></div>}
                {/* 侧边栏抽屉部分 */}
                <ConfigDrawer visible={visible} Close={this.handleClose} />
            </Layout>
        )
    }
}

export default connect(
    state => ({
        menuList: state.auth.menu
    }),
    { LoginOut }
)(withRouter(Layouts))
