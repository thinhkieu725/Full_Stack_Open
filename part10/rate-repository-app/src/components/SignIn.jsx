import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  inputText: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 15,
  },
  submitButtonText: {
    color: 'white',
  },
  errorText: {
    color: theme.colors.error,
    marginLeft: 12,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  
  return (
    <View>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[
          styles.inputText,
          { borderColor: formik.touched.username && formik.errors.username && theme.colors.error }
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder='Password'
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={[
          styles.inputText,
          { borderColor: formik.touched.password && formik.errors.password && theme.colors.error }
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text fontWeight={'bold'} style={styles.submitButtonText}>Sign in</Text>
      </Pressable>
    </View>
  );
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log('Form values', values);
    console.log(formik.touched.username, formik.errors.username, formik.touched.password, formik.errors.password);
  };
  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;