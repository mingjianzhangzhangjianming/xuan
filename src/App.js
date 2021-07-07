import React, { Component, Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Layouts from '@/components/layouts/layouts'
import Login from '@/components/login/login'
import Nofind from '@/components/nofind/nofind'
import { Workplace, Analysis, Monitor } from '@/view/dashboard'
import { BasicForm, AdvancForm, StepForm } from '@/view/form'
import { Image } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import loading from '@/assect/images/loading.gif'
import { connect } from 'react-redux'

class Loading extends Component {
    constructor(props) {
        super(props)
        NProgress.start()
    }

    componentWillUnmount() {
        NProgress.done()
    }
    render() {
        return <Image src={loading} preview={false} />
    }
}

class App extends Component {
    render() {
        const { isLogin } = this.props
        return (
            <Suspense fallback={<Loading />}>
                <Router>
                    {isLogin ? (
                        <Layouts>
                            <Switch>
                                <Route path="/dashboard/" exact component={Workplace} />
                                <Route path="/dashboard/workplace" component={Workplace} />
                                <Route path="/dashboard/analysis" component={Analysis} />
                                <Route path="/dashboard/monitor" component={Monitor} />
                                <Route path="/form/" exact component={BasicForm} />
                                <Route path="/form/basic" component={BasicForm} />
                                <Route path="/form/advanced" component={AdvancForm} />
                                <Route path="/form/step" component={StepForm} />
                                <Route path="*" component={Nofind} />
                            </Switch>
                        </Layouts>
                    ) : (
                        <Route path="/" exact component={Login} />
                    )}
                </Router>
            </Suspense>
        )
    }
}

export default connect(state => ({
    isLogin: state.auth.token
}))(App)
