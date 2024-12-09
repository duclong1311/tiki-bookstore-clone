import { Divider, Badge, Dropdown } from 'antd';
import { TiTick } from "react-icons/ti";
import { FaCarSide } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { IoLogoReact } from "react-icons/io5";
import { SlMagnifier } from "react-icons/sl";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import './header.scss';

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>
        ),
        disabled: true,
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item (disabled)
            </a>
        ),
        disabled: true,
    },
    {
        key: '4',
        danger: true,
        label: 'a danger item',
    },
];

const Header = () => {
    return (
        <>
            <div className="header-container">
                <div className="header-top">
                    <div className="header-top__logo">
                        <IoLogoReact />
                    </div>
                    <div className="header-top__search">
                        <SlMagnifier style={{ color: '#ccc', paddingRight: '5px' }} />
                        <input type="text" class="header-top__search-input" placeholder="Giá siêu rẻ" />
                        <Divider type="vertical" />
                        <button class="header-top__search-button">Tìm kiếm</button>
                    </div>
                    <div className='header-top__right'>
                        <div className="header-top__account">
                            {/* <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                Hover me
                            </a>
                        </Dropdown> */}
                            <span>Tài khoản</span>
                            <RiAccountCircleLine style={{ fontSize: "32px", marginLeft: '5px' }} />
                        </div>
                        <Divider type="vertical" style={{ borderLeft: '2px solid #ccc', height: '28px' }} />
                        <div className="header-top__cart">
                            <Badge count={99} overflowCount={10}>
                                <IoCartOutline style={{ fontSize: "32px" }} />
                            </Badge>
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