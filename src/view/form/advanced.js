import { Component } from 'react'
import { Typography, Form, Input, InputNumber, DatePicker, Select, Radio, Button } from 'antd'
import '@/assect/style/form/advanced.less'

const { Title, Paragraph } = Typography
const { RangePicker } = DatePicker
const { Option } = Select
const { TextArea } = Input
const formLayout = {
    labelCol: {
        sm: {
            span: 3,
            offset: 3
        },
        xs: {
            offset: 0,
            span: 24
        }
    },
    wrapperCol: {
        sm: {
            span: 12
        },
        xs: {
            span: 24
        }
    }
}

export default class AdvancForm extends Component {
    state = {}

    render() {
        return (
            <div className="form-content">
                <div className="header">
                    <Title level={3}>复杂表单</Title>
                    <Paragraph className="header-text">复杂表单常见于一次性输入和提交大批量数据的场景。</Paragraph>
                </div>
                <div className="advanced-form">
                    <div className="content">
                        <Form {...formLayout}>
                            <Form.Item label="标题">
                                <Input placeholder="请输入标题" />
                            </Form.Item>
                            <Form.Item label="起止日期">
                                <RangePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="目标描述">
                                <TextArea />
                            </Form.Item>
                            <Form.Item label="衡量标准">
                                <TextArea />
                            </Form.Item>
                            <Form.Item label="地点" name="address" initialValue={'2'}>
                                <Select>
                                    <Option value="1">地点1</Option>
                                    <Option value="2">地点2</Option>
                                    <Option value="3">地点3</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="邀评人" name="invitees" initialValue="2">
                                <Select>
                                    <Option value="1">jack</Option>
                                    <Option value="2">kaka</Option>
                                    <Option value="3">coco</Option>
                                    <Option value="4">kiki</Option>
                                    <Option value="5">sunmi</Option>
                                    <Option value="6">tonmi</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="权重">
                                <InputNumber
                                    defaultValue={100}
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                />
                            </Form.Item>
                            <Form.Item
                                label="目标公开"
                                name="targetOpen"
                                initialValue={2}
                                extra="客户、邀评人默认被分享"
                            >
                                <Radio.Group>
                                    <Radio value={1}>公开</Radio>
                                    <Radio value={2}>部分公开</Radio>
                                    <Radio value={3}>不公开</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item wrapperCol={{ sm: { offset: 6, span: 12 }, xs: { span: 24 } }}>
                                <Button style={{ marginRight: 24 }}>关闭</Button>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
