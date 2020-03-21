export const validate = values => {
  const errors = {};
  const requiredFields = ["clienteNome", "clienteEmail", "clienteSexo"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Campo obrigatório";
    }
  });
  if (!values.produtos || !Object.keys(values.produtos).length)
    errors.produtos = { _error: "É necessário adicionar um produto ao pedido" };
  if (
    values.clienteEmail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.clienteEmail)
  ) {
    errors.clienteEmail = "Campo de Email inválido";
  }
  return errors;
};
