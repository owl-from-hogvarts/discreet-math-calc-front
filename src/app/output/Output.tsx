import { Paper } from "@mui/material";
import React from "react";
import { IResult } from "../../../../homework-4/src/register/operations/base";
import { css} from "@emotion/react";
import { Register } from "../../../../homework-4";

export function Output(props: { output?: IResult }) {
  return (
    <Paper
      elevation={2}
      style={{
        overflow: "scroll",
        padding: "0.5rem",
      }}
    >
      <div css={css`
      display: flex;
      flex-direction: column;
      gap: 1rem;`}>
      {props.output?.steps.map((step) => {
        return (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              width: max-content;
            `}
          >
            <h3
              css={css`
                align-self: center;
              `}
            >
              {step.title}
            </h3>
            <div>{step.comments}</div>

            {step.operandDescription.map((operand) => {
              return (
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    & > div {

                      padding: 0.3rem;
                    }
                  `}
                >
                  <div>{operand.operandName}</div>
                  <div>{operand.data.formattedBin}</div>
                  <div
                    css={css`
                      max-width: 15rem;
                    `}
                  >
                    {operand.comment}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      {
        props.output ? <div css={css`width: max-content`}>{Register.printBeauty(props.output.result, "Результат")}</div> : ""
      }
      </div>
    </Paper>
  );
}
