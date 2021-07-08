import { Component } from 'react'
import { Typography, Divider, Steps, Form, Input, Select, Button, Result } from 'antd'
import { InfoCircleOutlined, CloseOutlined } from '@ant-design/icons'
import '@/assect/style/form/step.less'

const { Title, Paragraph } = Typography
const { Step } = Steps
const { Option } = Select

const steps = [
    {
        title: '第一步',
        description: '填写转账信息'
    },
    {
        title: '第二步',
        description: '确认转账信息'
    },
    {
        title: '第三步',
        description: '转账成功'
    }
]

const formLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 15
    }
}
const initForm = {
    playUser: 'qqemail',
    collectUser: 'play',
    collectType: 'play',
    collectName: 'kaka',
    amount: 500
}

export default class StepForm extends Component {
    state = {
        current: 0,
        isHiddleAlert: false,
        btnLoading: false
    }

    confirmPlay = () => {
        this.setState({ isHiddleAlert: !this.state.isHiddleAlert })
    }

    nextStep = () => {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.setState({ btnLoading: true }, () => {
            this.timer = setTimeout(() => {
                this.setState({
                    current: this.state.current + 1,
                    btnLoading: false
                })
            }, 1500)
        })
    }

    prevStep = () => {
        this.setState({ current: this.state.current - 1 })
    }

    render() {
        const { current, isHiddleAlert, btnLoading } = this.state
        return (
            <div className="form-content">
                <div className="header">
                    <Title level={3}>分步表单</Title>
                    <Paragraph className="header-text">
                        将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
                    </Paragraph>
                </div>
                <div className="step-form">
                    <Steps className="step-menu" current={current} responsive>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} description={item.description} />
                        ))}
                    </Steps>
                    {current === 0 && (
                        <>
                            <div className="steps-content">
                                <Form {...formLayout} initialValues={initForm}>
                                    <Form.Item
                                        label="付款账户"
                                        name="playUser"
                                        rules={[{ required: true, message: 'Please input!' }]}
                                    >
                                        <Select allowClear>
                                            <Option value="qqemail">73445769@qq.com</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="收款账户">
                                        <Input.Group compact style={{ display: 'flex', flexFlow: 'row noWrap' }}>
                                            <Form.Item name="collectType" style={{ margin: 0 }}>
                                                <Select style={{ width: 90 }}>
                                                    <Option value="play">支付宝</Option>
                                                    <Option value="wechat">微信</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                name="collectName"
                                                style={{ flex: 1, margin: 0 }}
                                                rules={[{ required: true, message: 'Please input!' }]}
                                            >
                                                <Input allowClear />
                                            </Form.Item>
                                        </Input.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="收款人姓名"
                                        name="collectName"
                                        rules={[{ required: true, message: 'Please input!' }]}
                                    >
                                        <Input allowClear />
                                    </Form.Item>
                                    <Form.Item
                                        label="转账金额"
                                        name="amount"
                                        rules={[{ required: true, message: 'Please input!' }]}
                                    >
                                        <Input prefix="￥" allowClear />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ sm: { offset: 5, span: 3 }, xs: { span: 24 } }}>
                                        <Button
                                            onClick={this.nextStep}
                                            block
                                            loading={btnLoading}
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            下一步
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            <Divider />
                            <div className="footer-text">
                                <Title level={4}>说明</Title>
                                <Title level={5}>转账到支付宝</Title>
                                <Paragraph className="header-text">
                                    如果需要，这里可以放一些关于产品的常见问题说明。如果需要，
                                    这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
                                </Paragraph>
                                <Title level={5}>转账到微信</Title>
                                <Paragraph className="header-text">
                                    如果需要，这里可以放一些关于产品的常见问题说明。如果需要，
                                    这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
                                </Paragraph>
                            </div>
                        </>
                    )}
                    {current === 1 && (
                        <div className="confirm-play">
                            <div className={`alert-text ${isHiddleAlert ? 'hiddle-alert' : ''} flex-row`}>
                                <InfoCircleOutlined />
                                <p>确认转账后，资金将直接打入对方账户，无法退回。</p>
                                <Button
                                    style={{ border: 'none', color: '#00000073' }}
                                    onClick={this.confirmPlay}
                                    shape="circle"
                                    size="small"
                                    type="link"
                                    icon={<CloseOutlined />}
                                />
                            </div>
                            <div className="table-text">
                                <dl>
                                    <dd>
                                        <span>付款账户：</span>
                                        <span>eleadmin@eclouds.com</span>
                                    </dd>
                                    <dd>
                                        <span>收款账户：</span>
                                        <span level={4}>test@example.com</span>
                                    </dd>
                                    <dd>
                                        <span>收款人姓名：</span>
                                        <span level={4}>kaka</span>
                                    </dd>
                                    <dd>
                                        <span>转账金额：</span>
                                        <Title level={3}>500 元</Title>
                                    </dd>
                                </dl>
                                <Divider />
                                <Form
                                    initialValues={{ playWord: 123456 }}
                                    labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 15 }}
                                >
                                    <Form.Item
                                        label="支付密码"
                                        name="playWord"
                                        rules={[{ required: true, message: 'Please input!' }]}
                                    >
                                        <Input.Password autoComplete="off" />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ sm: { span: 15, offset: 5 }, xs: { span: 24 } }}>
                                        <Button
                                            onClick={this.nextStep}
                                            style={{ marginRight: 24 }}
                                            loading={btnLoading}
                                            type="primary"
                                        >
                                            下一步
                                        </Button>
                                        <Button onClick={this.prevStep}>上一步</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    )}
                    {current === 2 && (
                        <div className="accounts-success">
                            <Result
                                status="success"
                                title="操作成功"
                                subTitle="预计两小时内到账"
                                extra={[
                                    <Button onClick={() => this.setState({ current: 0 })} type="primary" key="console">
                                        再转一笔
                                    </Button>,
                                    <Button key="buy">查看账单</Button>
                                ]}
                            />
                            <div className="success-text">
                                <dl>
                                    <dd>
                                        <span>付款账户：</span>
                                        <span>eleadmin@eclouds.com</span>
                                    </dd>
                                    <dd>
                                        <span>收款账户：</span>
                                        <span level={4}>test@example.com</span>
                                    </dd>
                                    <dd>
                                        <span>收款人姓名：</span>
                                        <span level={4}>kaka</span>
                                    </dd>
                                    <dd>
                                        <span>转账金额：</span>
                                        <Title level={3}>500 元</Title>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
