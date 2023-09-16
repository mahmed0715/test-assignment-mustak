import { Card } from "antd";
import { Product } from "../types";

export const ProductCard = ({ name, description, price, stock }: Product) => {
    return (
        <Card title={name} style={{ width: 300 }}>
            <p>{description}</p>
            <p>Price: {price}</p>
            <p>Stock: {stock}</p>
        </Card>
    );
};
