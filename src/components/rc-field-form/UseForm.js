import { useRef } from "react";
class FormStore {
  constructor() {
    this.store = {};
    // 存储下Field 实例
    this.fieldEntities = [];
  }

  registerField = (entity) => {
    this.fieldEntities.push(entity);
  };

  getFieldValue = (name) => {
    const backupStore = { ...this.store };
    return backupStore[name];
  };

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

  submit = () => {
    return this.store;
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      submit: this.submit,
      registerField: this.registerField,
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
