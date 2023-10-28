import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import {
  multiplyWithCorrection,
  Register,
  byte,
  multiplyBute,
  divide,
} from "../../../homework-4";
import { css } from "@emotion/react";

import CssBaseline from "@mui/material/CssBaseline";
import styles from "./app.module.scss";
import { EAction, Input } from "./input/Input";
import { Output } from "./output/Output";
import { IResult } from "../../../homework-4/src/register/operations/base";
import { Alert } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    // htmlFontSize: 50
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          whiteSpace: "normal",
        },
      },
    },
  },
});

const responsiveDarkTheme = responsiveFontSizes(darkTheme);

export function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [action, setAction] = useState<EAction>(
    EAction.MULTIPLY_WITH_CORRECTION
  );
  const [result, setResult] = useState<IResult>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(onInputChange, [a, b, action]);

  function onInputChange() {
    const Byte = byte.Byte;
    const aBytes = [new Byte()];
    const bBytes = [new Byte()];
    try {

    const aReg = new Register(aBytes).set(parseInt(a));
    const bReg = new Register(bBytes).set(parseInt(b));

      switch (action) {
        case EAction.MULTIPLY_WITH_CORRECTION: {
          setResult(multiplyWithCorrection(aReg, bReg));
          break;
        }

        case EAction.MULTIPLY_BUTE_METHOD: {
          setResult(multiplyBute(aReg, bReg));
          break;
        }

        case EAction.DIVIDE_INTEGERS: {
          setResult(divide(aReg, bReg))
        }
      }
    } catch (e) {
      setError(e as Error);
      setTimeout(() => {setError(null)}, 5000)
    }
  }

  return (
    <ThemeProvider theme={responsiveDarkTheme}>
      <CssBaseline />
      <main className={styles.main}>
        <Input
          operands={{ a, b }}
          action={action}
          onActionChange={setAction}
          onOperandChange={(a, b) => {
            setA(a);
            setB(b);
          }}
        ></Input>
        <Output output={result}></Output>
        {error ? (
          <Alert
            severity="error"
            css={css`
              position: fixed;
              bottom: 1rem;
              width: 100%;
            `}
          >
            {error.message}
          </Alert>
        ) : (
          ""
        )}
      </main>
    </ThemeProvider>
  );
}
