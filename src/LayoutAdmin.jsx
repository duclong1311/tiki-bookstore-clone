import React, { useState } from 'react';
import {
    FileOutlined,
    PieChartOutlined,
    DownOutlined,
    UserOutlined,
    BookOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Dropdown, Space, message, notification } from 'antd';
import { RiAdminLine } from "react-icons/ri";
import './layoutAdmin.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from "./components/footer";
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from './services/api';
import { doLogoutAction } from './redux/account/accountSlice';
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Dash Board', 'dashboard', <PieChartOutlined />),
    getItem('Mange User', 'mange-user', <UserOutlined />, [
        getItem('CRUD User', 'crud-user'),
    ]),
    getItem('Mange Book', 'sub2', <BookOutlined />, [
        getItem('Team 1', '6'),
        getItem('Team 2', '8'),
    ]),
    getItem('Mange Order', '9', <FileOutlined />),
];



const LayoutAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfor = useSelector(state => state.account.user);

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res?.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/login');
        } else {
            notification.error({
                description: 'Lỗi không xác định, bạn chưa thể đăng xuất!',
                message: 'Có lỗi xảy ra',
                showProgress: true,
            });
        }
    }

    const itemsDropdown = [
        {
            label: <label>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label >Đăng xuất</label>,
            key: 'logout',
            onClick: handleLogout
        },
    ];

    return (
        <Layout
            className="layout-admin"
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" >
                    <RiAdminLine style={{ fontSize: '22px' }} />
                    <div>ADMIN</div>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout >
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div className='admin-header'>
                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']} className='admin-header__account'>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    Welcome {userInfor?.fullName}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                        overflow: "auto"
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: '86%',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};
export default LayoutAdmin;