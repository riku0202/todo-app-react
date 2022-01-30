import React, { useEffect } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

export const Forms = ({
  register,
  errors,
}: {
  register: UseFormRegister<{
    title: string;
    description: string;
  }>;
  errors: {
    title?: FieldError | undefined;
    description?: FieldError | undefined;
  };
}): JSX.Element => {
  return (
    <Style>
      <input
        type="text"
        placeholder="Title"
        {...register("title", {
          required: true,
        })}
      />
      {errors.title && <p className="error">必須項目です。</p>}
      <textarea placeholder="Description" {...register("description")} />
    </Style>
  );
};

const Style = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .error {
    color: ${({ theme }) => theme.colors.warning};
    font-size: 15px;
  }

  input {
    color: ${({ theme }) => theme.colors.font};
    padding: 10px 15px;
    font-size: 15px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 7px;
  }

  textarea {
    color: ${({ theme }) => theme.colors.font};
    height: 56px;
    padding: 10px 15px;
    font-size: 15px;
    line-height: 18px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 7px;
  }
`;
