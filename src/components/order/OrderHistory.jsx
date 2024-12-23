import { Badge, Descriptions, Divider, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getOrderHistory } from "../../services/api";
import ReactJson from 'react-json-view'
import { formatDate } from "../../services/formatDate";
import './OrderHistory.scss';

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await getOrderHistory();
            if (res && res.data) {
                setOrderHistory(res.data);
            }
        }
        fetchHistory();
    }, []);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (item, record, index) => (<>{index + 1}</>)
        },
        {
            title: 'Thời gian ',
            dataIndex: 'createdAt',
            render: (item, record, index) => {
                return formatDate(item)
            }
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            render: (item, record, index) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item)
            }
        },
        {
            title: 'Trạng thái',
            render: (_, { tags }) => (

                <Tag color={"green"}>
                    Thành công
                </Tag>
            )
        },
        {
            title: 'Chi tiết',
            key: 'action',
            render: (_, record) => (
                <ReactJson
                    src={record.detail}
                    name={"Chi tiết đơn mua"}
                    collapsed={true}
                    enableClipboard={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                />
            ),
        },
    ];

    return (
        <div className="history-container">
            <div className="history-table">
                <Table columns={columns} dataSource={orderHistory} pagination={false} />
            </div>
        </div>
    )
}

export default OrderHistory;