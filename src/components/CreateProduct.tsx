import { useMutation, gql } from '@apollo/client';

import { Form, Input, Button, message, Space } from 'antd';
import { Link } from 'react-router-dom';

interface ProductInput {
    name: string;
    description: string;
    price: number;
    stock: number;
}

const ADD_PRODUCT = gql`
    mutation(
        $name: String!
        $description: String!
        $price: numeric!
        $stock: Int!
        ) {
      insert_products_one(object: {
        name: $name
        description: $description
        price: $price
        stock: $stock
        }) {
            id
            name
            description
            price
            stock
      }
    }
  `;

export function CreateProduct() {
    const [form] = Form.useForm();

    const [addProduct, { loading }] = useMutation(ADD_PRODUCT, {
        onCompleted: () => {
            message.success('Product added successfully!');
            form.resetFields();
        },
        onError: (error) => {
            message.error('Error adding product: ' + error.message);
        },
    });

    const handleSubmit = (values: ProductInput) => {
        addProduct({
            variables: {
                ...values,
            },
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Add New Product </h2>
            <Form form={form} onFinish={handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter the product name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the product description' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: 'Please enter the product price' }]}
                >
                    <Input type="number" min={0} step={0.01} />
                </Form.Item>
                <Form.Item
                    name="stock"
                    label="Stock"
                    rules={[{ required: true, message: 'Please enter the product stock' }]}
                >
                    <Input type="number" min={0} step={1} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Space direction="horizontal">
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Add Product
                            </Button>
                        </Space>
                        <Space>
                            <Button type="primary"><Link to="/">Go Product List</Link></Button>
                        </Space>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}
