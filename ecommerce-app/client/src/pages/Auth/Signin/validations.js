import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Gecerli bir email girin")
    .required("Zorunlu Alan."),
  password: yup.string().required("Zorunlu Alan."),
});

export default validations;
