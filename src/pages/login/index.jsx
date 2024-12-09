import { Button, Form, Input, Divider, message, notification } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';
import { callLogin } from '../../services/api';
import { useState } from 'react';

const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await callLogin(username, password);
        setIsSubmit(false);
        if (res?.data?.access_token) {
            message.success('Đăng nhập thành công');
        } else {
            notification.error({
                description: res?.message,
                message: 'Có lỗi xảy ra',
                showProgress: true,
            });
        }
    };

    return (
        <>
            <div className="login-page">
                <main className="main">
                    <div className="container">
                        <section className="wrapper">
                            <div className="heading">
                                <h2 className="text text-large">Đăng Nhập</h2>
                                <Divider />
                            </div>
                            <Form
                                name="basic"
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Email"
                                    name="username"
                                    rules={[{ required: true, message: 'Email không được để trống!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    labelCol={{ span: 24 }} //whole column
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                // wrapperCol={{ offset: 6, span: 16 }}
                                >
                                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                                        Đăng nhập
                                    </Button>
                                </Form.Item>
                                <Divider>Or</Divider>
                                <p className="text text-normal">Chưa có tài khoản ?
                                    <span>
                                        <Link to='/register' > Đăng Ký </Link>
                                    </span>
                                </p>
                                <br />
                                <p className="text" style={{ color: "#9d9d9d" }}>
                                    p/s: Để test, sử dụng tài khoản guest@gmail.com/123456
                                </p>
                            </Form>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}

export default LoginPage;