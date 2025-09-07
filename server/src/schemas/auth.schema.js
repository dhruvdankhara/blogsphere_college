import Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  username: Yup.string().lowercase().required(),
  password: Yup.string().min(8).required(),
});

export const loginSchema = Yup.object()
  .shape({
    username: Yup.string(),
    email: Yup.string().email("Invalid email format"),
    password: Yup.string().required("Password is required"),
  })
  .test(
    "at-least-one",
    "Either username or email is required",
    function (value) {
      return value.username || value.email;
    }
  );
