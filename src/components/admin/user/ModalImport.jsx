import React, { useState } from 'react';
import { Modal, notification, Table } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import * as XLSX from "xlsx";
import { importUser } from '../../../services/api';
const { Dragger } = Upload;

const ModalImport = ({ isModalOpen, setIsModalOpen }) => {
    const [importData, setImportData] = useState([]);

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const draggerProps = {
        name: 'file',
        customRequest: dummyRequest,
        accept: '.xlsx, .xls, .csv',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);

                const file = info.fileList[0].originFileObj;
                let reader = new FileReader();
                reader.onload = function (e) {
                    let data = new Uint8Array(e.target.result);
                    let workbook = XLSX.read(data, { type: 'array' });
                    // find the name of your sheet in the workbook first
                    let userSheet = workbook.Sheets['Sheet1'];
                    // convert to json format
                    const jsonData = XLSX.utils.sheet_to_json(userSheet, {
                        header: ['fullName', 'email', 'phone'],
                        range: 1,
                    });
                    if (jsonData && jsonData.length > 0) setImportData(jsonData);
                };
                reader.readAsArrayBuffer(file);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e);
        },
    };

    const columns = [
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        }
    ];

    const handleOk = async () => {
        const dataSendToApi = importData.map((item) => {
            item.password = '123456';
            return item;
        });
        const res = await importUser(importData);
        if (res && res.data && res.data.length > 0) {
            message.success('Thêm người dùng thành công!');
            setIsModalOpen(false);
        } else {
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Email đã tồn tại!',
                duration: 5,
                showProgress: true,
            });
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setImportData([]);
    };

    return (
        <>
            <Modal
                title="Import file"
                open={isModalOpen}
                onOk={handleOk}
                okText="Import Data"
                onCancel={handleCancel}
                okButtonProps={{
                    disabled: importData.length < 1
                }}
                width={'50vw'}
            >
                <Dragger {...draggerProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Kéo thả file vào phần này để Upload</p>
                    <p className="ant-upload-hint">
                        Hỗ trợ tải lên một hoặc nhiều tệp. Chỉ cho phép tải lên những tệp có định dạng .xlsx .xls .csv
                    </p>
                </Dragger>
                <Table columns={columns} dataSource={importData} style={{ marginTop: '50px' }} />
            </Modal>
        </>
    );
};
export default ModalImport;