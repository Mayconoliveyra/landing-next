import * as React from 'react';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';

import { IFSelectField, IFTextField, IFTextFieldMask, IFTextFieldNumber, ITextMaskCustom } from './models';

import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';

function FTextField({
  label,
  name,
  formik,
  inputRef = undefined,
  autoComplete = 'off',
  inputMode = 'text',
  maxLength = undefined,
  ...rest
}: IFTextField) {
  return (
    <TextField
      margin="normal"
      variant="outlined"
      fullWidth
      {...rest}
      label={label}
      name={name}
      id={name}
      inputRef={inputRef}
      autoComplete={autoComplete}
      onChange={formik.handleChange}
      value={formik.values[name]}
      error={!!formik.errors[name] && (formik.touched[name] as boolean)}
      helperText={(formik.touched[name] && (formik.errors[name] as string)) || rest.helperText}
      onBlur={() => formik.setFieldTouched(name)}
      InputProps={{
        inputProps: {
          inputMode: inputMode,
          ref: inputRef,
          maxLength: maxLength,
        },
      }}
    />
  );
}

const TextMaskCustom = React.forwardRef<HTMLElement, ITextMaskCustom>(function TextMaskCustom(props, ref) {
  const { onChange, mask, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={mask}
      inputRef={ref as any}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      unmask={true} /* Remove máscara na saída */
    />
  );
});

function FTextFieldMask({
  label,
  name,
  formik,
  inputRef = undefined,
  autoComplete = 'off',
  inputMode = 'text',
  maxLength = undefined,
  mask,
  ...rest
}: IFTextFieldMask) {
  return (
    <TextField
      margin="normal"
      variant="outlined"
      fullWidth
      {...rest}
      label={label}
      name={name}
      id={name}
      inputRef={inputRef}
      autoComplete={autoComplete}
      onChange={formik.handleChange}
      value={formik.values[name]}
      error={!!formik.errors[name] && (formik.touched[name] as boolean)}
      helperText={(formik.touched[name] && (formik.errors[name] as string)) || rest.helperText}
      onBlur={() => formik.setFieldTouched(name)}
      InputProps={{
        ...rest.InputProps,
        inputComponent: TextMaskCustom as any,
        inputProps: {
          mask: mask,
          inputMode: inputMode,
          ref: inputRef,
          maxLength: maxLength,
        },
      }}
    />
  );
}

function FTextFieldNumber({
  label,
  name,
  formik,
  inputRef = undefined,
  autoComplete = 'off',
  maxAmount = 9_999_999.99, // máximo default (nove milhões...)
  decimalScale = 0,
  allowNegative = false,
  allowLeadingZeros = false,
  prefix = undefined,
  suffix = undefined,
  decimalSeparator = undefined,
  thousandSeparator = undefined,
  fixedDecimalScale = undefined,
  ...rest
}: Omit<IFTextFieldNumber, 'defaultValue' | 'type'>) {
  return (
    <NumericFormat
      decimalScale={decimalScale} // Número de casas decimais depois do ".". ex: 0= '1', 2= '1.00', 5= '1.00000'...
      allowNegative={allowNegative} // Não permite números negativos
      allowLeadingZeros={allowLeadingZeros} // Não permite zeros à esquerda. ex: 01, 00010...
      prefix={prefix} // Adiciona uma string no inicio do text. ex: "R$ 1,00", "string 1234"...
      suffix={suffix} // Adiciona uma string no final do text. ex: "1 kg", "2 km"...
      decimalSeparator={decimalSeparator}
      thousandSeparator={thousandSeparator}
      fixedDecimalScale={fixedDecimalScale} // Mantém sempre duas casas decimais
      isAllowed={(values) => values.floatValue == undefined || values.floatValue <= maxAmount} // Aqui eu valido qual o valor máximo que vai ser aceito no input.
      customInput={TextField}
      margin="normal"
      variant="outlined"
      fullWidth
      {...rest}
      label={label}
      name={name}
      id={name}
      inputRef={inputRef}
      autoComplete={autoComplete}
      onValueChange={(values) => {
        // values.floatValue, retorna um "number" ou undefined, em caso de não for um número valido.
        // se o retorno for 'undefined', vou seta '', isso é necessário para que o formik faça validação de forma correta...
        // Pois, quando o field do formik ta com 'undefined' o formik não faz validação.
        formik.setFieldValue(name, values.floatValue === undefined ? '' : values.floatValue);
      }}
      value={formik.values[name]}
      error={!!formik.errors[name] && (formik.touched[name] as boolean)}
      helperText={(formik.touched[name] && (formik.errors[name] as string)) || rest.helperText}
      onBlur={() => formik.setFieldTouched(name)}
      InputProps={{
        ...rest.InputProps,
        inputProps: {
          inputMode: 'numeric',
          ref: inputRef,
        },
      }}
    />
  );
}

function FTextFieldCurrency({
  label,
  name,
  formik,
  inputRef = undefined,
  autoComplete = 'off',
  maxAmount = 9_999_999.99, // máximo default (nove milhões...)
  decimalScale = 2,
  allowNegative = false,
  allowLeadingZeros = true,
  prefix = 'R$ ',
  suffix = undefined,
  decimalSeparator = ',',
  thousandSeparator = '.',
  fixedDecimalScale = true,
  ...rest
}: Omit<IFTextFieldNumber, 'defaultValue' | 'type'>) {
  return (
    <NumericFormat
      decimalScale={decimalScale} // Número de casas decimais depois do ".". ex: 0= '1', 2= '1.00', 5= '1.00000'...
      allowNegative={allowNegative} // Não permite números negativos
      allowLeadingZeros={allowLeadingZeros} // Não permite zeros à esquerda. ex: 01, 00010...
      prefix={prefix} // Adiciona uma string no inicio do text. ex: "R$ 1,00", "string 1234"...
      suffix={suffix} // Adiciona uma string no final do text. ex: "1 kg", "2 km"...
      decimalSeparator={decimalSeparator}
      thousandSeparator={thousandSeparator}
      fixedDecimalScale={fixedDecimalScale} // Mantém sempre duas casas decimais
      isAllowed={(values) => values.floatValue == undefined || values.floatValue <= maxAmount} // Aqui eu valido qual o valor máximo que vai ser aceito no input.
      customInput={TextField}
      margin="normal"
      variant="outlined"
      fullWidth
      {...rest}
      label={label}
      name={name}
      id={name}
      inputRef={inputRef}
      autoComplete={autoComplete}
      onValueChange={(values) => {
        // values.floatValue, retorna um "number" ou undefined, em caso de não for um número valido.
        // se o retorno for 'undefined', vou seta '', isso é necessário para que o formik faça validação de forma correta...
        // Pois, quando o field do formik ta com 'undefined' o formik não faz validação.
        formik.setFieldValue(name, values.floatValue === undefined ? '' : values.floatValue);
      }}
      value={formik.values[name]}
      error={!!formik.errors[name] && (formik.touched[name] as boolean)}
      helperText={(formik.touched[name] && (formik.errors[name] as string)) || rest.helperText}
      onBlur={() => formik.setFieldTouched(name)}
      InputProps={{
        ...rest.InputProps,
        inputProps: {
          inputMode: 'numeric',
          ref: inputRef,
        },
      }}
    />
  );
}

function FSelectField({
  label,
  name,
  formik,
  inputRef = undefined,
  autoComplete = 'off',
  options,
  sx,
  margin = 'normal',
  variant = 'outlined',
  required = false,
  size = 'medium',
  disabled = false,
}: IFSelectField) {
  return (
    <FormControl disabled={disabled} size={size} fullWidth sx={sx} variant={variant} margin={margin}>
      <InputLabel disabled={disabled} required={required}>
        {label}
      </InputLabel>
      <Select
        sx={{
          '.MuiSelect-select:focus': {
            backgroundColor: 'transparent',
          },
        }}
        disabled={disabled}
        size={size}
        label={label}
        name={name}
        id={name}
        fullWidth
        inputRef={inputRef}
        autoComplete={autoComplete}
        onChange={formik.handleChange}
        value={formik.values[name]}
        error={!!formik.errors[name] && (formik.touched[name] as boolean)}
        onBlur={() => formik.setFieldTouched(name)}
      >
        {options.map((option, key) => (
          <MenuItem key={key} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      {formik.touched[name] && (formik.errors[name] as string) && (
        <FormHelperText error={!!formik.errors[name] && (formik.touched[name] as boolean)}>
          {formik.errors[name] as string}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export { FTextField, FTextFieldMask, FTextFieldNumber, FTextFieldCurrency, FSelectField };
