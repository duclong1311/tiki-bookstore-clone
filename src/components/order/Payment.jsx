import { DeleteTwoTone } from "@ant-design/icons";
import { Col, Divider, InputNumber, Radio, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { totalPrice } from "../../services/totalPrice";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const Payment = (props) => {
    const { setCurrentStep } = props;

    const carts = useSelector((state) => state.order.carts);

    const handlePlaceOrder = () => {
        console.log('....');
        setCurrentStep(2);
    }

    return (
        <Row gutter={[20, 20]}>
            <Col md={16} xs={24}>
                {carts && carts.length > 0 &&
                    carts.map((item, index) => (
                        <div className='order-book' key={`item-${index}`}>
                            <div className='book-content'>
                                <img src={`${baseUrl}/images/book/${item?.detail?.thumbnail}`} />
                                <div className='title'>
                                    {item?.detail?.mainText}
                                </div>
                                <div className='price'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.detail?.price)}
                                </div>
                            </div>
                            <div className='action'>
                                <div className='quantity'>
                                    <InputNumber value={item.quantity} disabled />
                                </div>
                                <div className='sum'>
                                    Tổng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.detail?.price * item.quantity)}
                                </div>
                                <DeleteTwoTone
                                    style={{ cursor: "pointer" }}
                                    twoToneColor="#eb2f96"
                                    disabled={true}
                                />
                            </div>
                        </div>
                    ))
                }
            </Col>
            <Col md={8} xs={24} >
                <div className='order-sum'>
                    <div className='info'>
                        <div className='method'>
                            <div>  Hình thức thanh toán</div>
                            <Radio checked>Thanh toán khi nhận hàng</Radio>
                        </div>
                        <Divider style={{ margin: "10px 0" }} />
                        <div className='address'>
                            <div> Địa chỉ nhận hàng</div>
                            <TextArea rows={4} />
                        </div>
                    </div>
                    <div className='calculate'>
                        <span>Tạm tính</span>
                        <span>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice(carts) || 0)}
                        </span>
                    </div>
                    <Divider style={{ margin: "10px 0" }} />
                    <div className='calculate'>
                        <span> Tổng tiền</span>
                        <span className='sum-final'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice(carts) || 0)}
                        </span>
                    </div>
                    <Divider style={{ margin: "10px 0" }} />
                    <button onClick={() => handlePlaceOrder()}>Đặt Hàng ({carts?.length ?? 0})</button>
                </div>
            </Col>
        </Row>
    )
}

export default Payment;