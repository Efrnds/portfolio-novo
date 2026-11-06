"use client";
import Image from "next/image";
import React from "react";


export default function V(props) {
  return (
    <div className="fixed top-2 right-2 z-50">
      <Image
        src="/assets/SVG/logo.svg"
        alt="Logo"
        width={props.width || 152}
        height={props.height || 152}
      />
    </div>
  );
}
