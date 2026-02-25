import styled from "styled-components";
import Button, { type ButtonProps } from "@mui/material/Button";
import { primary, secondary, danger } from "../../utils/colors";

export const PrimaryButton = styled(Button)<ButtonProps>`
  && {
    background-color: ${primary.background};
    color: ${primary.color};
    text-transform: none;
    font-weight: 600;
    border-radius: 6px;
    padding: 8px 16px;

    &:hover {
      background-color: ${primary.hover};
    }

    &:active {
      background-color: ${primary.active};
    }
  }
`;


export const SecondaryButton = styled(Button)<ButtonProps>`
  && {
    position: static;
    // z-index: 1;
    background-color: ${secondary.background};
    color: ${secondary.color};
    text-transform: none;
    font-weight: 500;
    border-radius: 6px;
    padding: 8px 16px;
    border: 1px solid ${secondary.border};

    &:hover {
      background-color: ${secondary.hover};
    }

    &:active {
      background-color: ${secondary.active};
    }
  }
`;

export const DangerButton = styled(Button)<ButtonProps>`
  && {
    position: static;
    // z-index: 1;
    background-color: ${danger.background};
    color: ${danger.color};
    text-transform: none;
    font-weight: 500;
    border-radius: 6px;
    padding: 8px 16px;
    border: 1px solid ${danger.border};

    &:hover {
      background-color: ${danger.hover};
    }

    &:active {
      background-color: ${danger.active};
    }
  }
`;