import { Component } from 'react'
import { Typography, Steps, Form, Input, Button, message } from 'antd'
import '@/assect/style/form/step.less'

const { Title, Paragraph } = Typography
const { Step } = Steps

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
export default class StepForm extends Component {
    state = {
        current: 0
    }
    render() {
        const { current } = this.state
        return (
            <div className="form-content">
                <div className="header">
                    <Title level={3}>分步表单</Title>
                    <Paragraph className="header-text">
                        将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
                    </Paragraph>
                </div>
                <div className="step-form">
                    <Steps className="step-menu" current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} description={item.description} />
                        ))}
                    </Steps>
                    <div className="steps-content">
                        <Form>
                            <Form.Item label="付款账户">
                                <Input />
                            </Form.Item>
                            <Form.Item label="付款账户">
                                <Input />
                            </Form.Item>
                            <Form.Item label="付款账户">
                                <Input />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
