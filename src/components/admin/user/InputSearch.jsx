import { Col, Form, Input, Row, theme, Button } from 'antd';

const InputSearch = (props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onFinish = (values) => {
        let query = "";

        if (values && values.fullName) {
            query += `&fullName=/${values.fullName}/i`;
        }
        if (values && values.email) {
            query += `&email=/${values.email}/i`;
        }
        if (values && values.phone) {
            query += `&phone=/${values.phone}/i`;
        }
        if (query) {
            props.searchFilter(query);
        }
    }

    return (
        <>
            <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            name={`fullName`}
                            label={`Name`}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            name={`email`}
                            label={`Email`}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            name={`phone`}
                            label={`Số điện thoại`}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Clear
                        </Button>
                    </Col>
                </Row>
            </Form>

        </>
    );
}

export default InputSearch;