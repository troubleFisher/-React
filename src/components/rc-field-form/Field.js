import FieldContext from "./FieldContext";
import { useEffect, useContext, cloneElement, useRef, useImperativeHandle, useState, useCallback } from "react";

const Field = (props) => {
  const { children, name } = props;
  const form = useContext(FieldContext);
  const ref = useRef();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useImperativeHandle(ref, () => ({
    props,
    onStoreChange
  }))

  useEffect(() => {
    const { registerField } = form;
    const unregisterField = registerField(ref.current);
    return () => {
      unregisterField()
    }
  }, []);

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

