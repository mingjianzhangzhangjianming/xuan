import { Result, Button } from 'antd'

const Exep500 = () => (
    <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
    />
)

export default Exep500
