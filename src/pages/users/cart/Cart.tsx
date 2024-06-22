import { Box, Button, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { convertPrice } from "../../../utils/convert-price";
import { RootState } from "../../../redux-toolkit/stores/store";
import { CartItemModel } from "../../../models/card-item.model";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";

const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart.items);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    useEffect(() => {
        let total = 0;
        cart.forEach((cartItem: CartItemModel) => {
            total += (cartItem.productDetail.product?.price ?? 0) * (cartItem.quantity ?? 0);
        });
        setTotalMoney(total);
    }, [cart]);
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {cart.length > 0 ?
                <>
                    <Box sx={{
                        maxHeight: "50vh",
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        {cart.map((cartItem: CartItemModel, index: number) => (
                            <CartItem key={index} item={cartItem} />
                        ))}
                    </Box>
                    <Box>
                        <Typography>Tổng tiền: {convertPrice(totalMoney)}</Typography>
                    </Box>
                    <Box>
                        <Button>Chọn mã giảm giá</Button>
                    </Box>
                    <Button>Thanh toán</Button>
                </> :
                <CartEmpty />}
        </Container>
    )
}

export default Cart;