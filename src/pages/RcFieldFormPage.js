import { createRef, useRef } from "react";
import Input from "../components/input/Input";
import Form, { Field, useForm } from "../components/rc-field-form";
const RcFieldFormPage = () => {
  const [form] = useForm();


  return (
    <div>
      <h1>实现rc-field-form表单</h1>
      <Form form={form}>
        <Field name="username">
          <Input placeholder="请输入姓名" />
        </Field>
        <Field name="password">
          <Input placeholder="请输入密码" />
        </Field>
        <button>提交</button>
      </Form>
    </div>
  );
};

export default RcFieldFormPage;
