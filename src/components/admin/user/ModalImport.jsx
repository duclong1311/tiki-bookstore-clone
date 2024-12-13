import React from 'react';
import { Modal, Table } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
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
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
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
const data = [
    {
        key: '1',
        fullName: 'John Brown',
        email: 32,
        phone: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        fullName: 'John Brown',
        email: 32,
        phone: 'New York No. 1 Lake Park',
    },
    {
        key: '3',
        fullName: 'John Brown',
        email: 32,
        phone: 'New York No. 1 Lake Park',
    },
];

const ModalImport = (props) => {
    const { isModalOpen, setIsModalOpen } = props;
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <Dragger {...draggerProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
                <Table columns={columns} dataSource={data} style={{ marginTop: '50px' }} />
            </Modal>
        </>
    );
};
export default ModalImport;