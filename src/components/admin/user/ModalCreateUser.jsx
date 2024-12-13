import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, notification } from 'antd';
import { createUser } from '../../../services/api';

const ModalCreateUser = (props) => {
    const { setIsModalOpen, isModalOpen } = props;

    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit(onFinish);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = async (values) => {
        const { fullName, password, email, phone } = values;
        const res = await createUser(fullName, password, email, phone);
        if (res && res.data) {
            message.success('Thêm mới người dùng thành công!');
            form.resetFields();
            setIsModalOpen(false);
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5,
                showProgress: true,
            });
        }
    };
    return (
        <>
            <Modal title="Thêm mới người dùng"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    onFinish={onFinish}
                    form={form}
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
                </Form>
            </Modal>
        </>
    );
};
export default ModalCreateUser;