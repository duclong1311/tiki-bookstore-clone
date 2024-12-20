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
        if (values && values.mainText) {
            query += `&mainText=/${values.mainText}/i`;
        }
        if (values && values.author) {
            query += `&author=/${values.author}/i`;
        }
        if (values && values.category) {
            query += `&category=/${values.category}/i`;
        }
        if (query) {
            props.searchFilter(query);
        }
    }

    const handleClear = () => {
        form.resetFields();
        props.searchFilter(null);
    }

    return (
        <>
            <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            name={`mainText`}
                            label={`Tên sách`}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            name={`author`}
                            label={`Tác giả`}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            name={`category`}
                            label={`Thể loại`}
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
                            onClick={handleClear}
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