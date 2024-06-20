
import { Button } from "@mui/material";
import { GradientBox } from "../../gradients/GradientColor";

const Footer = () => {
    return <GradientBox sx={{ height: '200px' }}>
        <Button variant={"contained"} color={"primary"}>Footer</Button>
    </GradientBox>
}
export default Footer;