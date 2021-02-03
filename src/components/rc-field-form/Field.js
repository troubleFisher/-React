import FieldContext from "./FieldContext";
import { useEffect, useContext, cloneElement, useRef, useImperativeHandle, forceUpdate } from "react";
// todo 如何获取function实例
const Field = ({ children, name }) => {
  const form = useContext(FieldContext);
  const ref = useRef();


  useEffect(() => {
    const { registerField } = form;
    registerField(ref.current);
  }, []);

  useImperativeHandle(ref, () =>
    onStoreChange
  )

  const onStoreChange = () => {
    forceUpdate();
  };

  const getControlled = () => {
    const { getFieldValue, setFieldsValue } = form;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        setFieldsValue({ [name]: newValue });
      },
    };
  };
  const newChild = cloneElement(children, getControlled());

  return newChild;
};

export default Field;
