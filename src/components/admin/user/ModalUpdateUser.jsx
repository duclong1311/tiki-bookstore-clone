import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, notification } from 'antd';
import { createUser, updateUser } from '../../../services/api';

const ModalUpdateUser = (props) => {
    const { setIsModalOpen, isModalOpen, dataUpdate, setDataUpdate } = props;

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(dataUpdate);
    }, [dataUpdate]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setDataUpdate(null)
    };
    const onFinish = async (values) => {
        const { _id, fullName, phone } = values;
        const res = await updateUser(_id, fullName, phone);
        if (res && res.data) {
            message.success('Sửa thông tin người dùng thành công!');
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
            <Modal title="Cập nhật người dùng"
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
            >
                <Form
                    name="basic"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        hidden
                        labelCol={{ span: 24 }}
                        label="Id"
                        name="_id"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tên hiển thị"
                        name="fullName"
                        rules={[{ required: true, message: 'Tên hiển thị không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                    >
                        <Input disabled={true} />
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
export default ModalUpdateUser;