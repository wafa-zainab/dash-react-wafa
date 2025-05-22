import React, { useEffect, useRef } from "react";

export function Checkbox({ checked, indeterminate = false, onCheckedChange, ...props }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      checked={checked}
      onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
      {...props}
      className="cursor-pointer"
    />
  );
}
