"use client";
import * as React from "react";
import { createContext } from "react";
import { useState } from "react";

export const LayoutContext = createContext();

export function LayoutRegistry({ children }) {
  let [layout, setLayout] = useState("grid");
  return (
    <LayoutContext.Provider value={[layout, setLayout]}>
      {children}
    </LayoutContext.Provider>
  );
}

export const FilesContext = createContext();
export function FilesRegistry({ children }) {
  let [files, setFiles] = useState([]);
  return (
    <FilesContext.Provider value={[files, setFiles]}>
      {children}
    </FilesContext.Provider>
  );
}

export const FileIdContext = createContext();
export function FileIdRegistry({ children }) {
  let [fileId, setFileId] = useState(0);
  return (
    <FileIdContext.Provider value={[fileId, setFileId]}>
      {children}
    </FileIdContext.Provider>
  );
}
