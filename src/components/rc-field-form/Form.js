import FieldContext from "./FieldContext";
const Form = ({ children, form, onFinish, onFinishFailed }) => {
  form.setCallBack({ onFinish, onFinishFailed })
  return (
    <FieldContext.Provider value={form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.submit();
        }}
      >
        {children}
      </form>
    </FieldContext.Provider>
  );
};

export default Form;
