import { Component } from 'react'
import PropTypes from 'prop-types'
import { Drawer, Tooltip, Switch, Divider, Select } from 'antd'
import { CheckOutlined, SoundOutlined } from '@ant-design/icons'
import './configDrawer.less'

const { Option } = Select
export default class ConfigDrawer extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        Close: PropTypes.func
    }
    state = {
        layoutStyle: [
            {
                title: '暗色侧边栏',
                type: 'sider',
                checked: true,
                color: '#001529'
            },
            {
                title: '亮色侧边栏',
                type: 'sider',
                checked: false,
                color: '#fff'
            },
            {
                title: '亮色顶栏',
                type: 'header',
                checked: false,
                color: '#fff'
            },
            {
                title: '暗色顶栏',
                type: 'header',
                checked: true,
                color: '#001529'
            },
            {
                title: '主色顶栏',
                type: 'header',
                checked: false,
                color: '#5f80c7'
            }
        ],
        settingColor: [
            {
                title: '拂晓蓝',
                color: '#1890ff',
                checked: true
            },
            {
                title: '薄暮',
                color: '#5f80c7',
                checked: false
            },
            {
                title: '日暮',
                color: '#faad14',
                checked: false
            },
            {
                title: '火山',
                color: '#f5686f',
                checked: false
            },
            {
                title: '酱紫',
                color: '#9266f9',
                checked: false
            },
            {
                title: '极光绿',
                color: '#33cc99',
                checked: false
            },
            {
                title: '极客蓝',
                color: '#32a2d4',
                checked: false
            },
            {
                title: '深红',
                color: '#b37feb',
                checked: false
            }
        ],
        layoutMode: [
            {
                title: '左侧菜单布局',
                checked: true
            },
            {
                title: '顶部菜单布局',
                checked: false
            },
            {
                title: '混合菜单布局',
                checked: false
            }
        ],
        otherConfig: [
            {
                title: '固定顶栏区域',
                checked: true
            },
            {
                title: '固定侧栏区域',
                checked: true
            },
            {
                title: '固定主体区域',
                checked: true
            },
            {
                title: 'Logo宽度自动',
                checked: true
            },
            {
                title: '侧栏彩色图标',
                checked: true
            },
            {
                title: '侧栏排他展开',
                checked: true
            },
            {
                title: '开启色弱模式',
                checked: true
            },
            {
                title: '开启全局页脚',
                checked: true
            },
            {
                title: '开启多页签栏',
                checked: true
            }
        ]
    }

    handleSetTheme = e => {
        const tit = e.target.dataset.color
        const type = e.target.dataset.type
        let { layoutStyle } = this.state
        layoutStyle.forEach(item => {
            if (item.type === type) item.checked = false
            if (item.title === tit) {
                item.checked = true
            }
        })
        this.setState({ layoutStyle })
    }

    handleSetColor = e => {
        const tit = e.target.dataset.color
        let { settingColor } = this.state
        settingColor.forEach(item => {
            item.checked = false
            if (item.title === tit) {
                item.checked = true
            }
        })
        this.setState({ settingColor })
    }

    setLayoutMode = e => {
        const tit = e.target.dataset.title
        let { layoutMode } = this.state
        layoutMode.forEach(item => {
            item.checked = false
            if (item.title === tit) {
                item.checked = true
            }
        })
        this.setState({ layoutMode })
    }

    handeOtherConfig = (title, value) => {
        const { otherConfig } = this.state
        otherConfig.forEach(item => {
            if (item.title === title) item.checked = value
        })
        this.setState({
            otherConfig
        })
    }
    render() {
        const { layoutStyle, settingColor, layoutMode, otherConfig } = this.state
        const { visible, Close } = this.props
        return (
            <Drawer id="right-drawer" title="整体风格设置" zIndex={10002} onClose={Close} visible={visible}>
                <div className="drawer-container">
                    <div className="layout-style">
                        {layoutStyle.map((item, index) => (
                            <Tooltip key={index} zIndex={10002} title={item.title}>
                                <div
                                    onClick={this.handleSetTheme}
                                    data-color={item.title}
                                    data-type={item.type}
                                    className="wrap flex-row"
                                >
                                    {item.checked && <CheckOutlined />}
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                    <div className="set-color-theme flex-row">
                        {settingColor.map((item, index) => (
                            <Tooltip key={index} zIndex={10002} title={item.title}>
                                <span
                                    onClick={this.handleSetColor}
                                    data-color={item.title}
                                    className="bg-color-item flex-row"
                                    style={{ background: item.color }}
                                >
                                    {item.checked && <CheckOutlined />}
                                </span>
                            </Tooltip>
                        ))}
                    </div>
                    <div className="setting-black flex-row">
                        <span>开启暗黑模式</span>
                        <Switch />
                    </div>
                    <Divider />
                    <div className="link-to">
                        <h4>导航模式</h4>
                        <div className="layout-mode flex-row">
                            {layoutMode.map((item, index) => (
                                <Tooltip key={index} zIndex={10002} title={item.title}>
                                    <div
                                        onClick={this.setLayoutMode}
                                        className="layout-mode-item flex-row"
                                        data-title={item.title}
                                    >
                                        {item.checked && <CheckOutlined />}
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                        <div className="setting-layout-item flex-row">
                            <span>侧栏双排菜单</span>
                            <Switch />
                        </div>
                        <div className="setting-layout-item flex-row">
                            <span>内容区域铺满</span>
                            <Switch />
                        </div>
                        <Divider />
                    </div>
                    <div className="other-config">
                        {otherConfig.map((item, index) => (
                            <div key={index} className="config-item flex-row">
                                <span>{item.title}</span>
                                <Switch
                                    checked={item.checked}
                                    onChange={value => this.handeOtherConfig(item.title, value)}
                                />
                            </div>
                        ))}
                        <div className="config-item flex-row">
                            <span>页签显示风格</span>
                            <Select
                                className="tag-fimlay"
                                defaultValue="default"
                                onChange={val => console.log(val)}
                                getPopupContainer={() => document.getElementById('right-drawer')}
                            >
                                <Option value="default">默认</Option>
                                <Option value="radius">圆点</Option>
                                <Option value="card">卡片</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="footer-Sound flex-row">
                        <SoundOutlined />
                        <p>该功能可实时预览各种布局效果, 修改后会缓存在本地, 下次打开会记忆主题配置.</p>
                    </div>
                </div>
            </Drawer>
        )
    }
}
