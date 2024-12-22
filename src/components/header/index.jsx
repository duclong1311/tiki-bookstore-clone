import { Divider, Badge, Dropdown, message, notification, Avatar, Popover } from 'antd';
import { TiTick } from "react-icons/ti";
import { FaCarSide } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { IoLogoReact } from "react-icons/io5";
import { SlMagnifier } from "react-icons/sl";
import { IoCartOutline } from "react-icons/io5";
import './header.scss';
import { callLogout } from '../../services/api';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
    const navigate = useNavigate();

    const isLogin = useSelector(state => state.account.isAuthenticated);
    const userInfor = useSelector(state => state.account.user);
    const dispatch = useDispatch();
    const carts = useSelector(state => state.order.carts);

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res?.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/');
        } else {
            notification.error({
                description: 'Lỗi không xác định, bạn chưa thể đăng xuất!',
                message: 'Có lỗi xảy ra',
                showProgress: true,
            });
        }
    }

    let items = [
        {
            key: 'adminPage',
            label: <Link to="/admin" >Trang quản trị</Link>,
            disabled: userInfor?.role === 'USER' ? true : false,
        },
        {
            key: 'account',
            label: <label>Quản lý tài khoản</label>,
        },
        {
            key: 'logout',
            danger: true,
            label: <label>Đăng xuất</label>,
            onClick: handleLogout,
        },

    ];

    return (
        <>
            <div className="header-container">
                <div className="header-top">
                    <div className="header-top__logo">
                        <IoLogoReact />
                    </div>
                    <div className="header-top__search">
                        <SlMagnifier style={{ color: '#ccc', paddingRight: '5px', fontSize: '24px' }} />
                        <input type="text" class="header-top__search-input" placeholder="Giá siêu rẻ" />
                        <Divider type="vertical" />
                        <button class="header-top__search-button">Tìm kiếm</button>
                    </div>
                    <div className='header-top__right'>
                        <div className="header-top__account">
                            {isLogin ?
                                <>
                                    <Avatar
                                        size="large"
                                        icon={<UserOutlined />}
                                        src={`${baseUrl}/images/avatar/${userInfor?.avatar}`}
                                        style={{ fontSize: "32px", marginLeft: '5px' }}
                                    />
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            {`${userInfor?.fullName}`}
                                        </a>
                                    </Dropdown>
                                </>
                                :
                                <span><UserOutlined style={{ fontSize: "32px", marginRight: '5px' }} />Tài khoản</span>
                            }
                        </div>
                        <Divider type="vertical" style={{ borderLeft: '2px solid #ccc', height: '28px' }} />
                        <div className="header-top__cart" onClick={() => navigate('/order')}>
                            <Popover
                                className='popover-carts'
                                rootClassName='popover-carts'
                                placement="bottom"
                                title={'Sản phẩm đã thêm'}
                                content={
                                    () => (
                                        <>
                                            <div className='pop-cart-body'>
                                                <div className='pop-cart-content'>
                                                    {carts?.map((book, index) => {
                                                        return (
                                                            <div className='book' key={`book-${index}`}>
                                                                <img src={`${baseUrl}/images/book/${book?.detail?.thumbnail}`} />
                                                                <div>{book?.detail?.mainText}</div>
                                                                <div className='price'>
                                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price ?? 0)}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className='pop-cart-footer'>
                                                    <button onClick={() => navigate('/order')}>Xem giỏ hàng</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            >
                                <Badge count={carts?.length ?? 0} overflowCount={10} showZero>
                                    <IoCartOutline style={{ fontSize: "32px" }} />
                                </Badge>
                            </Popover>
                        </div>
                    </div>
                </div>

                <div className="header-bottom">
                    Cam kết
                    <Divider type="vertical" style={{ borderLeft: '2px solid #ccc', height: '28px' }} />
                    <div className='header-bottom__commit'>
                        <TiTick style={{ fontSize: "24px" }} />
                        <span>100% hàng thật</span>
                    </div>
                    <Divider type="vertical" style={{ borderLeft: '2px solid #ccc', height: '28px' }} />
                    <div className='header-bottom__commit'>
                        <FaCarSide style={{ fontSize: "24px" }} />
                        <span>Freeship mọi đơn</span>
                    </div>
                    <Divider type="vertical" style={{ borderLeft: '2px solid #ccc', height: '28px' }} />
                    <div className='header-bottom__commit'>
                        <MdCurrencyExchange style={{ fontSize: "24px" }} />
                        <span>Hoàn 200% nếu hàng giả</span>
                    </div>
                    <Divider type="vertical" style={{ borderLeft: '2px solid #ccc', height: '28px' }} />
                    <div className='header-bottom__commit'>
                        <FaBox style={{ fontSize: "24px" }} />
                        <span>30 ngày đổi trả</span>
                    </div>
                    <Divider type="vertical" style={{ borderLeft: '2px solid #ccc', height: '28px' }} />
                    <div className='header-bottom__commit'>
                        <FaShippingFast style={{ fontSize: "24px" }} />
                        <span>Giao nhanh 2h</span>
                    </div>
                    <Divider type="vertical" style={{ borderLeft: '2px solid #ccc', height: '28px' }} />
                    <div className='header-bottom__commit'>
                        <FaTags style={{ fontSize: "24px" }} />
                        <span>Giá siêu rẻ</span>
                    </div>
                </div>
                <Divider />
            </div>
        </>
    )
}

export default Header;