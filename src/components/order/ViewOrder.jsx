import { DeleteTwoTone } from "@ant-design/icons";
import { Col, Divider, Empty, InputNumber, Row } from "antd";
import './ViewOrder.scss'
import { useDispatch, useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const ViewOrder = () => {

    const dispatch = useDispatch();
    const carts = useSelector((state) => state.order.carts);

    console.log(carts);

    const totalPrice = () => {
        if (carts && carts.length > 0) {
            const itemTotal = carts.map((item) => item.quantity * item.detail.price);
            return itemTotal.reduce((total, num) => total + num, 0);
        }
    }

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]}>
                    <Col md={18} xs={24}>
                        {carts.length > 0 ?
                            carts.map((item, index) => (
                                <div className='order-book' key={`item-${index}`}>
                                    <div className='book-content'>
                                        <img src={`${baseUrl}/images/book/${item.detail.thumbnail}`} />
                                        <div className='title'>
                                            {item?.detail?.mainText}
                                        </div>
                                        <div className='price'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.detail.price)}
                                        </div>
                                    </div>
                                    <div className='action'>
                                        <div className='quantity'>
                                            <InputNumber value={item.quantity} />
                                        </div>
                                        <div className='sum'>
                                            Tổng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.detail.price * item.quantity)}
                                        </div>
                                        <DeleteTwoTone
                                            // onClick={() => dispatch()}
                                            style={{ cursor: "pointer" }}
                                            twoToneColor="#eb2f96"
                                        />
                                    </div>
                                </div>
                            ))
                            :
                            <div className='order-book-empty'>
                                <Empty
                                    description={"Không có sản phẩm trong giỏ hàng"}
                                />
                            </div>
                        }
                    </Col>
                    <Col md={6} xs={24} >
                        <div className='order-sum'>
                            <div className='calculate'>
                                <span>Tạm tính</span>
                                <span>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice())}
                                </span>
                            </div>
                            <Divider style={{ margin: "10px 0" }} />
                            <div className='calculate'>
                                <span> Tổng tiền</span>
                                <span className='sum-final'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice())}
                                </span>
                            </div>
                            <Divider style={{ margin: "10px 0" }} />
                            <button
                            >
                                Mua Hàng
                            </button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ViewOrder;
