import React from 'react';
import { Drawer } from 'antd';
import { Badge, Descriptions } from 'antd';
import { formatDate } from '../../../services/formatDate';

const UserViewDetail = (props) => {
    const { dataViewDetail, setDataViewDetail, openUserDetail, setOpenUserDetail } = props;

    const handleClose = () => {
        setOpenUserDetail(false)
        setDataViewDetail(null);
    }

    return (
        <>
            <Drawer
                closable
                destroyOnClose
                title={<p>Xem chi tiết thông tin tài khoản</p>}
                placement="right"
                open={openUserDetail}
                onClose={handleClose}
                width={'50vw'}
            >
                <Descriptions
                    title="Thông tin người dùng"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{dataViewDetail?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataViewDetail?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={3}>
                        <Badge status={dataViewDetail?.role === 'ADMIN' ? 'processing' : 'success'} text={dataViewDetail?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">{formatDate(dataViewDetail?.createdAt)}</Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">{formatDate(dataViewDetail?.updatedAt)}</Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
};
export default UserViewDetail;