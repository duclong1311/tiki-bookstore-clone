import { Button, Checkbox, Form, Input, Divider } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';
import { callRegister } from '../../services/api';

const RegisterPage = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Success:', values);
        const res = await callRegister(values.fullName, values.email, values.password, values.phone);
        console.log("Check res", res);
    };

    return (
        <>
            <div className="register-page">
                <main className="main">
                    <div className="container">
                        <section className="wrapper">
                            <div className="heading">
                                <h2 className="text text-large">Đăng Ký Tài Khoản</h2>
                                <Divider />
                            </div>
                            <Form
                                name="basic"
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Họ tên"
                                    name="fullName"
                                    rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
                                >
                                    <Input />
                                </Form.Item>


                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Email không được để trống!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                >
                                    <Button type="primary" htmlType="submit" loading={false}>
                                        Đăng ký
                                    </Button>
                                </Form.Item>
                                <Divider>Or</Divider>
                                <p className="text text-normal">Đã có tài khoản?
                                    <span>
                                        <Link to='/login' > Đăng Nhập </Link>
                                    </span>
                                </p>
                            </Form>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}

export default RegisterPage;