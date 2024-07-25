import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

type Props = React.PropsWithChildren<{
  show: boolean;
  closeModalHandler: () => void;
}>;

export default function Modal(props: Props) {
  console.log("[Modal.js] rendering");

  return (
    <>
      <Backdrop show={props.show} closeHandler={props.closeModalHandler} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </>
  );
}
