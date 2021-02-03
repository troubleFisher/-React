import { useRef } from "react";
class FormStore {
  constructor() {
    this.store = {};
    // 存储下Field 实例
    this.fieldEntities = [];
    this.callbacks = {};
  }

  //有注册，一定要取消注册
  registerField = (entity) => {
    this.fieldEntities.push(entity);
    return () => {
      this.fieldEntities = this.fieldEntities.filter(i => i.props.name !== entity.props.name)
      delete this.store[entity.props.name]
    }
  };

  getFieldValue = (name) => {
    const backupStore = { ...this.store };
    return backupStore[name];
  };

  setCallBack = (callback) => {
    this.callbacks = { ...this.callbacks, ...callback }
  }

  setFieldsValue = (newStore) => {
    this.store = { ...this.store, ...newStore };
    this.fieldEntities.forEach((entity) => {
      const { name } = entity.props;
      Object.keys(this.store).forEach((key) => {
        if (key === name) {
          entity.onStoreChange();
        }
      });
    });
  };

  validate = () => {
    let err = []
    this.fieldEntities.forEach(i => {
      const { name, rules } = i.props
      const value = this.getFieldValue(name)
      const rule = rules && rules[0]
      if (rule && rule.required && (value === undefined || value === '')) {
        err.push({ [name]: rule.message, value })
      }
    })
    return err
  }

  submit = () => {
    const err = this.validate()
    const { onFinish, onFinishFailed } = this.callbacks
    if (err.length) {
      onFinishFailed(err)
    } else {
      onFinish(this.store)
    }
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      submit: this.submit,
      registerField: this.registerField,
      setCallBack: this.setCallBack
    };
  };
}

const useForm = () => {
  const formRef = useRef();
  if (!formRef.current) {
    const formStore = new FormStore();
    formRef.current = formStore.getForm();
  }
  return [formRef.current];
};

export default useForm;
