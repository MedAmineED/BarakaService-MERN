import { ReactElement } from "react";

export interface FetchType {
    totalCount : number,
    pageCount : number
  }


export interface InputFieldConfig {
    controlId: string;
    label: string;
    type: string;
    placeholder: string;
    col?: string;
    step?: string;
    unit?: string;
    options?:  { value: string | number; label: string; }[];
    addHr?: boolean;
    render? : ()=>ReactElement;
  }
