import React from 'react';
import { Drawer } from 'antd';
import { Badge, Descriptions } from 'antd';


const UserViewDetail = (props) => {
    const { dataViewDetail, setDataViewDetail, openUserDetail, setOpenUserDetail } = props;

    const handleClose = () => {
        setOpenUserDetail(false)
        setDataViewDetail(null);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date)) {
            return "Invalid Date";
        }
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
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