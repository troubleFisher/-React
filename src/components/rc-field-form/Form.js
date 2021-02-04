import FieldContext from "./FieldContext";
import useForm from './UseForm'
import { useImperativeHandle } from 'react'
const Form = ({ children, form, onFinish, onFinishFailed }, ref) => {
  // 兼容class
  const [formInstance] = useForm(form)
  useImperativeHandle(ref, () => formInstance)
  formInstance.setCallBack({ onFinish, onFinishFailed })
  return (
    <FieldContext.Provider value={formInstance}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formInstance.submit();
        }}
      >
        {children}
      </form>
    </FieldContext.Provider>
  );
};

export default Form;
