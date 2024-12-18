import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, message, Modal, notification, Row, Select, Upload, Image } from 'antd';
import { createBook, createUser, getBookCategory, uploadBookImage } from '../../../services/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getImageBase64 } from '../../../services/getBase64';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const ModalCreateBook = (props) => {
    const { setIsModalOpen, isModalOpen } = props;

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectCategory, setSelectCategory] = useState(null);
    const [thumbnailData, setThumbnailData] = useState([]);
    const [sliderData, setSliderData] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const fetchSelectCategory = useCallback(async () => {
        const res = await getBookCategory();
        if (res && res.data && res.data.length > 0) {
            const selectList = res.data.map(item => { return { label: item, value: item } });
            if (selectList.length > 0)
                setSelectCategory(selectList);
        }
    }, []);

    useEffect(() => {
        fetchSelectCategory();
    }, [fetchSelectCategory])

    const handleOk = () => {
        form.submit(onFinish);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info, type) => {
        if (info.file.status === 'uploading') {
            type ? setLoadingSlider(true) : setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                type ? setLoadingSlider(false) : setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const onFinish = async (values) => {
        const { mainText, author, price, sold, quantity, category } = values;
        if (thumbnailData && thumbnailData.length === 0) {
            notification.error({
                message: 'Error',
                description: 'Không có thumbnail sách'
            })
            return;
        }
        if (sliderData && sliderData.length === 0) {
            notification.error({
                message: 'Error',
                description: 'Không có slider sách'
            })
            return;
        }

        const thumbnail = thumbnailData[0].name;
        const slider = sliderData.map(item => item.name);

        try {
            const res = await createBook(thumbnail, slider, mainText, author, price, sold, quantity, category)
            if (res && res.data) {
                message.success('Thêm mới sách thành công!');
            }
        } catch (error) {
            message.error(error);
        } finally {
            form.resetFields();
            setThumbnailData([]);
            setSliderData([]);
            setIsModalOpen(false);
        }
    };

    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
        try {
            const res = await uploadBookImage(file);
            if (res && res.data) {
                setThumbnailData([{
                    name: res?.data?.fileUploaded,
                    uid: file?.uid
                }]);
            }
        } catch (error) {
            onError('Đã xảy ra lỗi khi up file: ', error)
        } finally {
            onSuccess("ok");
        }
    }

    const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
        try {
            const res = await uploadBookImage(file);
            if (res && res.data) {
                setSliderData((slider) => [...slider, {
                    name: res?.data?.fileUploaded,
                    uid: file?.uid
                }]);
            }
        } catch (error) {
            onError('Đã xảy ra lỗi khi up file: ', error)
        } finally {
            onSuccess("ok");
        }
    }

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getImageBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    return (
        <>
            <Modal title="Thêm mới người dùng"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={'50vw'}
            >
                <Form
                    name="basic"
                    onFinish={onFinish}
                    form={form}
                >
                    <Row gutter={[8, 0]}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tên sách"
                                name="mainText"
                                rules={[{ required: true, message: 'Tên sách không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tác giả"
                                name="author"
                                rules={[{ required: true, message: 'Tác giả không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 0]}>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Giá tiền"
                                name="price"
                                rules={[{ required: true, message: 'Giá tiền không được để trống!' }]}
                            >
                                <InputNumber
                                    prefix="VND"
                                    style={{ width: '100%' }}
                                    formatter={(num) => num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Thể loại"
                                name="category"
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={selectCategory}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Số lượng"
                                name="quantity"
                                rules={[{ required: true, message: 'Số lượng không được để trống!' }]}
                            >
                                <InputNumber min={1} defaultValue={10} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Đã bán"
                                name="sold"
                            >
                                <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 0]}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Ảnh Thumbnail Sách"
                                name="thumbnail"
                            >
                                <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    customRequest={handleUploadFileThumbnail}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                >
                                    <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Ảnh Slider Sách"
                                name="slider"
                            >
                                <Upload
                                    multiple
                                    name="slider"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    customRequest={handleUploadFileSlider}
                                    beforeUpload={beforeUpload}
                                    onChange={(info) => handleChange(info, 'slider')}
                                    onPreview={handlePreview}
                                >
                                    <div>
                                        {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};
export default ModalCreateBook;