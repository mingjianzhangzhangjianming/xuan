import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Typography, Timeline, Progress, Table, Tag, Image } from 'antd'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import {
    // UsergroupDeleteOutlined,
    CloudOutlined,
    AppstoreOutlined,
    CheckOutlined,
    BellOutlined,
    UserDeleteOutlined,
    ShoppingCartOutlined,
    FundProjectionScreenOutlined,
    FileDoneOutlined,
    FilePptOutlined,
    MessageOutlined,
    TagsOutlined,
    ControlOutlined,
    ExperimentOutlined,
    MenuOutlined
} from '@ant-design/icons'
import autor from '@/assect/images/autor.png'
import '@/assect/style/dashboard/workplace.less'

const { Title } = Typography
const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab' }} />)
const iconList = [
    {
        icon: <UserDeleteOutlined />,
        color: '#69c0ff',
        text: '用户'
    },
    {
        icon: <ShoppingCartOutlined />,
        color: '#95de64',
        text: '分析'
    },
    {
        icon: <FundProjectionScreenOutlined />,
        color: '#ff9c6e',
        text: '商品'
    },
    {
        icon: <FileDoneOutlined />,
        color: '#b37feb',
        text: '订单'
    },
    {
        icon: <FilePptOutlined />,
        color: '#ffd666',
        text: '票据'
    },
    {
        icon: <MessageOutlined />,
        color: '#5cdbd3',
        text: '消息'
    },
    {
        icon: <TagsOutlined />,
        color: '#ff85c0',
        text: '标签'
    },
    {
        icon: <ControlOutlined />,
        color: '#ffc069',
        text: '配置'
    }
]
const priorityColor = text => {
    switch (text) {
        case 1:
            return 'magenta'
        case 2:
            return 'gold'
        case 3:
            return 'cyan'
        default:
            return 'cyan'
    }
}
const stateColor = text => {
    switch (text) {
        case '未开始':
            return 'gold'
        case '进行中':
            return '#91d5ff'
        case '已完成':
            return '#e7e7e7'
        default:
            return 'gold'
    }
}
const colTask = [
    {
        width: 50,
        align: 'center',
        key: 'icon',
        render: () => <DragHandle />
    },
    {
        width: 100,
        align: 'center',
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
        render: text => <Tag color={priorityColor(text)}>{text}</Tag>
    },
    {
        width: 200,
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName'
    },
    {
        width: 100,
        align: 'center',
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: text => <span style={{ color: stateColor(text) }}>{text}</span>
    }
]
const dataTask = [
    {
        key: 1,
        priority: 1,
        taskName: '解决项目一的bug',
        state: '未开始',
        index: 1
    },
    {
        key: 2,
        priority: 2,
        taskName: '解决项目一的bug',
        state: '已完成',
        index: 2
    },
    {
        key: 3,
        priority: 1,
        taskName: '解决项目一的bug',
        state: '进行中',
        index: 3
    },
    {
        key: 4,
        priority: 2,
        taskName: '解决项目一的bug',
        state: '已完成',
        index: 4
    },
    {
        key: 5,
        priority: 3,
        taskName: '解决项目一的bug',
        state: '进行中',
        index: 5
    },
    {
        key: 6,
        priority: 3,
        taskName: '解决项目一的bug',
        state: '已完成',
        index: 6
    },
    {
        key: 7,
        priority: 2,
        taskName: '解决项目一的bug',
        state: '进行中',
        index: 7
    },
    {
        key: 8,
        priority: 1,
        taskName: '解决项目一的bug',
        state: '未开始',
        index: 8
    }
]

const colProject = [
    {
        width: 36,
        align: 'center',
        key: 'index',
        render: (text, record, index) => index
    },
    {
        width: 150,
        align: 'center',
        title: '项目名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        width: 150,
        align: 'center',
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime'
    },
    {
        width: 200,
        align: 'center',
        title: '结束时间',
        dataIndex: 'endTime',
        key: ''
    },
    {
        width: 100,
        align: 'center',
        title: '状态',
        dataIndex: 'state',
        key: ''
    },
    {
        width: 300,
        align: 'center',
        title: '进度',
        dataIndex: 'speed',
        key: 'speed',
        render: value => <Progress percent={value} status={value === 100 ? 'success' : 'active'} />
    }
]
const dataProject = [
    {
        key: '1',
        name: '项目0000001',
        startTime: '2020-03-01',
        endTime: '2020-06-01',
        state: '未开始',
        speed: 30
    },
    {
        key: '2',
        name: '项目0000001',
        startTime: '2020-03-01',
        endTime: '2020-06-01',
        state: '进行中',
        speed: 60
    },
    {
        key: '3',
        name: '项目0000001',
        startTime: '2020-03-01',
        endTime: '2020-06-01',
        state: '未开始',
        speed: 80
    },
    {
        key: '4',
        name: '项目0000001',
        startTime: '2020-03-01',
        endTime: '2020-06-01',
        state: '进行中',
        speed: 100
    },
    {
        key: '5',
        name: '项目0000001',
        startTime: '2020-03-01',
        endTime: '2020-06-01',
        state: '已延期',
        speed: 56
    },
    {
        key: '6',
        name: '项目0000001',
        startTime: '2020-03-01',
        endTime: '2020-06-01',
        state: '已结束',
        speed: 12
    }
]
const SortableItem = sortableElement(props => <tr {...props} />)
const SortableCon = sortableContainer(props => <tbody {...props} />)

export default class Workplace extends Component {
    state = {
        dataSource: dataTask
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        const { dataSource } = this.state
        if (oldIndex !== newIndex) {
            const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el)
            console.log('Sorted items: ', newData)
            this.setState({ dataSource: newData })
        }
    }
    DraggableContainer = props => (
        <SortableCon useDragHandle disableAutoscroll helperClass="row-dragging" onSortEnd={this.onSortEnd} {...props} />
    )

    DraggableBodyRow = ({ className, style, ...restProps }) => {
        const { dataSource } = this.state
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = dataSource.findIndex(x => x.index === restProps['data-row-key'])
        return <SortableItem index={index} {...restProps} />
    }

    render() {
        const { dataSource } = this.state
        return (
            <div className="workplace">
                <header className="flex-row">
                    <div className="user-autor flex-row">
                        <Image className="autor" src={autor} alt="" />
                        <div className="cell-content flex-col">
                            <h1>早安，管理员，开始您一天的工作吧！</h1>
                            <em>
                                <CloudOutlined className="cell-icon" />
                                今日多云转阴，18℃ - 22℃，出门记得穿外套哦~
                            </em>
                        </div>
                    </div>
                    <div className="work-count-group">
                        <dl className="flex-row">
                            <dd>
                                <span className="title">
                                    <AppstoreOutlined />
                                    <span>项目数</span>
                                </span>
                                <span className="count">3</span>
                            </dd>
                            <dd>
                                <span className="title">
                                    <CheckOutlined />
                                    <span>待办项</span>
                                </span>
                                <span className="count">6 / 24</span>
                            </dd>
                            <dd>
                                <span className="title">
                                    <BellOutlined />
                                    <span>消息</span>
                                </span>
                                <span className="count">1,689</span>
                            </dd>
                        </dl>
                    </div>
                </header>
                <div className="card-wrap">
                    <div className="icon-wrap">
                        <Row gutter={[16, 16]}>
                            {iconList.map((item, index) => (
                                <Col lg={3} md={6} sm={12} xs={12} key={index} className="icon-item-body">
                                    <Link to="/system/user" style={{ color: item.color }} className="flex-col">
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
                <div className="list-box">
                    <Row gutter={[16, 16]}>
                        <Col lg={8} md={24} sm={24} xs={24} className="icon-item-body">
                            <div className="list-box-item dynamic">
                                <Title level={4}>最新动态</Title>
                                <div className="list-body">
                                    <Timeline mode="right">
                                        <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
                                        <Timeline.Item label="2015-09-01 09:12:11">
                                            Solve initial network problems
                                        </Timeline.Item>
                                        <Timeline.Item>Technical testing</Timeline.Item>
                                        <Timeline.Item label="2015-09-01 09:12:11">
                                            Network problems being solved
                                        </Timeline.Item>
                                        <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
                                        <Timeline.Item label="2015-09-01 09:12:11">
                                            Solve initial network problems
                                        </Timeline.Item>
                                        <Timeline.Item>Technical testing</Timeline.Item>
                                        <Timeline.Item label="2015-09-01 09:12:11">
                                            Network problems being solved
                                        </Timeline.Item>
                                    </Timeline>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8} md={24} sm={24} xs={24} className="icon-item-body">
                            <div className="list-box-item task">
                                <Title level={4}>我的任务</Title>
                                <div className="list-body">
                                    <Table
                                        rowKey="index"
                                        style={{ width: '100%', flex: 1 }}
                                        columns={colTask}
                                        dataSource={dataSource}
                                        pagination={false}
                                        scroll={{ y: 240 }}
                                        components={{
                                            body: {
                                                wrapper: this.DraggableContainer,
                                                row: this.DraggableBodyRow
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col lg={8} md={24} sm={24} xs={24} className="icon-item-body">
                            <div className="list-box-item">
                                <Title level={4}>本月目标</Title>
                                <div className="list-body">
                                    <div className="progress-view">
                                        <ExperimentOutlined className="progress-icon" />
                                        <Progress
                                            type="dashboard"
                                            width={200}
                                            percent={75}
                                            format={percent => (percent / 100) * 360}
                                        />
                                    </div>
                                    <span className="text">恭喜，本月目标已达标！</span>
                                </div>
                            </div>
                        </Col>
                        <Col lg={16} md={24} sm={24} xs={24} className="icon-item-body">
                            <div className="list-box-item poject">
                                <Title level={4}>项目进度</Title>
                                <div className="list-body">
                                    <Table
                                        style={{ width: '100%', flex: 1 }}
                                        columns={colProject}
                                        dataSource={dataProject}
                                        pagination={false}
                                        scroll={{ y: 240 }}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col lg={8} md={24} sm={24} xs={24} className="icon-item-body">
                            <div className="list-box-item">
                                <Title level={4}>小组成员</Title>
                                <div className="list-body"></div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
