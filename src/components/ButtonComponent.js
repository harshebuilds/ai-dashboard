import { Button } from "@mui/material";
import styles from "./ButtonComponentStyle";

const ButtonComponent = ({ text, type, onClick, variant }) => {
  return (
    <Button variant={variant} sx={styles.field} type={type} onClick={onClick}>
      {text}
    </Button>
  );
};

export default ButtonComponent;
