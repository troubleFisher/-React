import Input from "../components/input/Input";
import Form, { Field, useForm } from "../components/rc-field-form";

const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };
const RcFieldFormPage = () => {
  const [form] = useForm();

  const onFinish = (value) => {
    console.log('成功', value)
  }

  const onFinishFailed = (error) => {
    console.log('失败', error)
  }

  return (
    <div>
      <h1>实现rc-field-form表单</h1>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="请输入姓名" />
        </Field>
        <Field name="password" rules={[passwordRules]}>
          <Input placeholder="请输入密码" />
        </Field>
        <button>提交</button>
      </Form>
    </div>
  );
};

export default RcFieldFormPage;
