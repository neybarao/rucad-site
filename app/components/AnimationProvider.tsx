"use client";
import { useEffect } from "react";

export default function AnimationProvider() {
  useEffect(() => {
    document.documentElement.classList.add("js-anim");
  }, []);
  return null;
}
