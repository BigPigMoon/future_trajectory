import { useEffect } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: any;
  elementId: string;
};

export const Portal = ({ children, elementId }: PortalProps) => {
  const mount = document.getElementById(elementId);
  const el = document.createElement("div");

  useEffect(() => {
    if (mount) mount.appendChild(el);
    return () => {
      if (mount) mount.removeChild(el);
    };
  }, [el, mount]);

  if (!mount) return null;
  return createPortal(children, el);
};
