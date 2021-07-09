import { Component, useState, useEffect } from 'react'
import { Typography, Card, Col, Row, Form, Input, DatePicker, Select, Button, Table, Popconfirm } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import '@/assect/style/form/advanced.less'
const { Title, Paragraph } = Typography
const { RangePicker } = DatePicker
const { Option } = Select
const { TextArea } = Input
const formLayout = {
    labelCol: {
        sm: {
            span: 6
        },
        xs: {
            span: 24
        }
    },
    wrapperCol: {
        sm: {
            span: 16
        },
        xs: {
            span: 24
        }
    }
}

const originData = []

for (let i = 0; i < 6; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        jobNumber: `000${i}`,
        department: '研发部'
    })
}

const EditableCell = ({ editing, dataIndex, title, type, record, index, children, ...restProps }) => {
    const inputNode =
        type === 'text' ? (
            <Input />
        ) : (
            <Select>
                <Option value="研发部">研发部</Option>
                <Option value="技术部">技术部</Option>
                <Option value="前端">前端</Option>
                <Option value="运维">运维</Option>
                <Option value="后端">后端</Option>
            </Select>
        )
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`
                        }
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    )
}

const EditableTable = () => {
    const [form] = Form.useForm()
    const [data, setData] = useState(originData)
    const [editingKey, setEditingKey] = useState('') //当前编辑项的key

    const isEditing = record => record.key === editingKey

    const edit = record => {
        form.setFieldsValue({
            name: '',
            jobNumber: '',
            department: '',
            ...record
        })
        setEditingKey(record.key)
    }

    const cancel = () => {
        setEditingKey('')
    }

    const addData = () => {
        setData([
            ...data,
            {
                key: data.length,
                name: '',
                jobNumber: '',
                department: ''
            }
        ])
        setEditingKey(data.length)
    }

    const deleteData = key => {
        const _data = data.filter(item => item.key !== key)
        setData(_data)
        setEditingKey(key === editingKey ? '' : editingKey)
    }
    const save = async key => {
        try {
            const row = await form.validateFields()
            const newData = [...data]
            const index = newData.findIndex(item => key === item.key)

            if (index > -1) {
                const item = newData[index]
                newData.splice(index, 1, { ...item, ...row })
                setData(newData)
                setEditingKey('')
            } else {
                newData.push(row)
                setData(newData)
                setEditingKey('')
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo)
        }
    }

    const columns = [
        {
            title: '用户名',
            align: 'center',
            dataIndex: 'name',
            width: '25%',
            editable: true
        },
        {
            title: '工号',
            align: 'center',
            dataIndex: 'jobNumber',
            width: '15%',
            editable: true
        },
        {
            title: '所属部门',
            align: 'center',
            dataIndex: 'department',
            width: '35%',
            editable: true
        },
        {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            width: '35%',
            render: (_, record) => {
                const editable = isEditing(record)
                return (
                    <span>
                        {editable ? (
                            <Button type="text" danger onClick={() => save(record.key)}>
                                保存
                            </Button>
                        ) : (
                            <Button type="text" disabled={editingKey !== ''} onClick={() => edit(record)}>
                                编辑
                            </Button>
                        )}
                        <Popconfirm title="Sure to delete?" onConfirm={cancel} onConfirm={() => deleteData(record.key)}>
                            <a
                                style={{
                                    marginLeft: 8
                                }}
                            >
                                删除
                            </a>
                        </Popconfirm>
                    </span>
                )
            }
        }
    ]

    useEffect(() => {
        console.log('更新了！')
    }, [data])
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col
        }

        return {
            ...col,
            onCell: record => {
                return {
                    record,
                    type: col.dataIndex === 'department' ? 'select' : 'text', //编辑类型
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record)
                }
            }
        }
    })
    return (
        <Form form={form} name="member" component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell
                    }
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel
                }}
                scroll={{ x: 600 }}
                footer={() => (
                    <Button type="dashed" onClick={addData} icon={<PlusOutlined />} block>
                        新增成员
                    </Button>
                )}
            />
        </Form>
    )
}

export default class AdvancForm extends Component {
    state = {}

    onFinish = values => {
        console.log(values)
    }
    render() {
        return (
            <div className="form-content">
                <div className="header">
                    <Title level={3}>复杂表单</Title>
                    <Paragraph className="header-text">复杂表单常见于一次性输入和提交大批量数据的场景。</Paragraph>
                </div>
                <div className="advanced-form">
                    <div className="content">
                        <Card title="仓库信息" style={{ marginBottom: 16 }} bordered={false}>
                            <Form {...formLayout} name="warehouse">
                                <Row gutter={[16, 8]}>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="仓库名">
                                            <Input placeholder="请输入仓库名" />
                                        </Form.Item>
                                    </Col>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="仓库域名">
                                            <Input placeholder="请输入域名" addonBefore="http://" addonAfter="com" />
                                        </Form.Item>
                                    </Col>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="仓库管理员">
                                            <Select placeholder="请选择仓库管理员">
                                                <Option value={1}>Coco</Option>
                                                <Option value={2}>Kaka</Option>
                                                <Option value={3}>Kiki</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="审批人">
                                            <Select placeholder="请选择审批人">
                                                <Option value={1}>Coco</Option>
                                                <Option value={2}>Kaka</Option>
                                                <Option value={3}>Kiki</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="生效日期">
                                            <RangePicker />
                                        </Form.Item>
                                    </Col>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="仓库类型">
                                            <Select placeholder="请选择仓库类型">
                                                <Option value={1}>私密</Option>
                                                <Option value={2}>公开</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>

                        <Card title="任务信息" style={{ marginBottom: 16 }} bordered={false}>
                            <Form {...formLayout} name="task">
                                <Row gutter={[16, 8]}>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="任务名">
                                            <Input placeholder="请输入任务名" />
                                        </Form.Item>
                                    </Col>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="任务描述">
                                            <Input placeholder="请输入任务描述" />
                                        </Form.Item>
                                    </Col>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="执行人">
                                            <Select placeholder="请选择执行人">
                                                <Option value={1}>Coco</Option>
                                                <Option value={2}>Kaka</Option>
                                                <Option value={3}>Kiki</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="责任人">
                                            <Select placeholder="请选择责任人">
                                                <Option value={1}>Coco</Option>
                                                <Option value={2}>Kaka</Option>
                                                <Option value={3}>Kiki</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="提醒时间">
                                            <RangePicker />
                                        </Form.Item>
                                    </Col>
                                    <Col xl={8} md={12} xs={24}>
                                        <Form.Item label="任务类型">
                                            <Select placeholder="请选择任务类型">
                                                <Option value={1}>私密</Option>
                                                <Option value={2}>公开</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>

                        <Card title="选择成员" style={{ marginBottom: 16 }} bordered={false}>
                            <EditableTable />
                        </Card>
                        <div className="bottom-tool flex-row">
                            <Button type="primary">提交</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
