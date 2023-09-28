import { RefObject } from 'react';

import { FormikProps } from 'formik';

import { SxProps, TextFieldProps, Theme } from '@mui/material';

export type IFTextField = TextFieldProps & {
  label: string;
  name: string;
  formik: FormikProps<any>;
  inputRef?: RefObject<HTMLInputElement>;
  autoComplete?: 'off' | 'on';
  inputMode?: 'search' | 'text' | 'email' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal';
  maxLength?: number;
};

export interface ITextMaskCustom {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: any;
}

export type IFTextFieldMask = TextFieldProps & {
  label: string;
  name: string;
  formik: FormikProps<any>;
  inputRef?: RefObject<HTMLInputElement>;
  autoComplete?: 'off' | 'on';
  inputMode?: 'search' | 'text' | 'email' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal';
  maxLength?: number;
  mask: (string | RegExp)[];
};

export type IFTextFieldNumber = TextFieldProps & {
  label: string;
  name: string;
  formik: FormikProps<any>;
  inputRef?: RefObject<HTMLInputElement>;
  autoComplete?: 'off' | 'on';
  maxAmount?: number;
  decimalScale?: number;
  allowNegative?: boolean;
  allowLeadingZeros?: boolean;
  prefix?: string;
  suffix?: string;
  decimalSeparator?: string;
  thousandSeparator?: string | boolean;
  fixedDecimalScale?: boolean;
};

export type IFSelectField = {
  label: string;
  name: string;
  formik: FormikProps<any>;
  inputRef?: RefObject<HTMLInputElement>;
  autoComplete?: 'off' | 'on';
  options: { value: string; name: string }[];
  sx?: SxProps<Theme>;
  margin?: 'none' | 'dense' | 'normal';
  variant?: 'standard' | 'outlined' | 'filled';
  required?: boolean;
  size?: 'small' | 'medium';
  disabled?: boolean;
};
