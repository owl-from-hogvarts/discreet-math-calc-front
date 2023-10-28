import { MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { Register } from "../../../../homework-4";
import "./input.scss";

export enum EAction {
  MULTIPLY_WITH_CORRECTION,
  MULTIPLY_BUTE_METHOD,
  DIVIDE_INTEGERS,
}

export function Input(props: {
  onActionChange?: (action: EAction) => void;
  onOperandChange?: (a: string, b: string) => void;
  operands: {
    a: string,
    b: string
  }
  action: EAction
}) {

  return (
    <>
      <Select
        onChange={(event) =>
          props.onActionChange?.(event.target.value as EAction)
        }
        value={props.action}
      >
        <MenuItem value={EAction.MULTIPLY_WITH_CORRECTION}>
          Умножение с коррекцией
        </MenuItem>
        <MenuItem value={EAction.MULTIPLY_BUTE_METHOD}>
          Умножение методом Бута (без коррекции)
        </MenuItem>
        <MenuItem disabled value={EAction.DIVIDE_INTEGERS}>
          Целочисленное деление
        </MenuItem>
      </Select>
      <h3>A:</h3>
      <TextField
        value={props.operands.a.toString()}
        onChange={(event) => {
          props.onOperandChange?.(event.target.value, props.operands.b);
        }}
      />
      <h3>B:</h3>
      <TextField
        value={props.operands.b.toString()}
        onChange={(event) => {
          props.onOperandChange?.(props.operands.a, event.target.value);
        }}
      />
    </>
  );
}
