import { Component, createRef } from 'react'
import { Captcha } from '@/http/api'
import { Form, Input, Checkbox, Button, Image } from 'antd'
import './login.less'
import { connect } from 'react-redux'
import { LoginIn } from '@/store/createActions'

const initialList = {
    username: 'admin',
    password: 'admin',
    code: '',
    remember: true
}

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { sm: { span: 18, offset: 2 } }
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            base64: null,
            logining: false
        }
        this.formRef = createRef()
    }
    componentDidMount() {
        this.changeCaptcha()
    }

    changeCaptcha = async () => {
        try {
            const result = await Captcha()
            this.setState(
                {
                    base64: result.data
                },
                () => {
                    this.formRef.current.setFieldsValue({ code: result.text })
                }
            )
        } catch (err) {
            console.log(err)
        }
    }

    onFinish = values => {
        this.setState({ logining: true })
        const form = new FormData()
        form.append('username', values.username)
        form.append('password', values.password)
        form.append('code', values.code)
        form.append('remember', values.remember)
        // console.log('Success:', form.values(), values)
        const callback = () => this.setState({ logining: false })
        this.props.LoginIn(form, this.props.history, callback)
    }

    onFinishFailed = errorInfo => {
        console.log(this.props.form)
        console.log('Failed:', errorInfo)
    }
    render() {
        const { logining } = this.state
        return (
            <div className="login-container">
                <div className="form-list">
                    <Form
                        name="list"
                        ref={this.formRef}
                        {...formItemLayout}
                        initialValues={initialList}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password autoComplete="off" placeholder="Enter your username" />
                        </Form.Item>
                        <Form.Item label="验证码" className="flex-form">
                            <Form.Item name="code" rules={[{ required: true, message: 'Please input your code!' }]}>
                                <Input />
                            </Form.Item>
                            <Image
                                className="codeImage"
                                onClick={this.changeCaptcha}
                                preview={false}
                                src={this.state.base64}
                            />
                        </Form.Item>

                        <Form.Item className="flex-form" wrapperCol={{ sm: { offset: 6 } }}>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>
                            <span>忘记密码</span>
                        </Form.Item>

                        <Form.Item wrapperCol={{ sm: { span: 18, offset: 6 } }}>
                            <Button type="primary" block loading={logining} htmlType="submit">
                                登 录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect(state => ({ ...state.auth }), { LoginIn })(Login)
