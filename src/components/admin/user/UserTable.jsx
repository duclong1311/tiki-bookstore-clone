import React, { useEffect, useState } from 'react';
import { Table, Space, Tag } from 'antd';
import { getUsersWithPaginate } from '../../../services/api';
const data = [
    {
        _id: '',
        fullName: '',
        email: '',
        phone: '',
        role: ''
    }
];

const UserTable = () => {
    const [totalData, setTotalData] = useState(1);
    const [listUser, setListUser] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const fetchListUser = async () => {
            const query = `current=${currentPage}&pageSize=${pageSize}`;
            const res = await getUsersWithPaginate(query);

            if (res && res.data && res.data.result.length > 0) {
                const listUserData = res.data.result;
                const metaData = res.data.meta;
                setListUser(listUserData);
                setTotalData(metaData.total);
            }
        }

        fetchListUser();
    }, [currentPage, pageSize]);

    const onTableChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== currentPage) {
            setCurrentPage(pagination.current);
        }
    };

    const onSizeChange = (current, pageSize) => {
        setPageSize(pageSize);
        setCurrentPage(current);
    };

    const handleClickEdit = (userId) => {
        console.log('Edit', userId);
    }

    const handleClickDelete = (userId) => {
        console.log('Delete', userId);
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            width: '10%',
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            filterSearch: true,
            width: '20%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            width: '20%',
        },
        {
            title: 'Roll',
            key: 'role',
            dataIndex: 'role',
            render: (_, { role }) => {
                const color = role === 'ADMIN' ? 'geekblue' : 'green';
                {
                    return (
                        <Tag color={color} key={role}>
                            {role?.toUpperCase()}
                        </Tag>
                    );
                };
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleClickEdit(record._id)}>Edit</a>
                    <a onClick={() => handleClickDelete(record._id)} style={{ color: 'red' }}>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={listUser}
                onChange={onTableChange}
                rowKey={'_id'}
                pagination={
                    {
                        current: currentPage,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: totalData,
                        onShowSizeChange: onSizeChange,
                        position: ['bottomCenter'],
                    }
                }
            />
        </>
    )
}

export default UserTable;
