export default ({
  children,
  primaryColor,
  width,
  content,
  fontSize,
  textColor,
  fontWeight,
  onClick,
}: {
  children?: any;
  primaryColor?: boolean;
  width?: string;
  content?: string;
  fontSize?: string;
  textColor?: string;
  fontWeight?: string;
  onClick?: any;
}) => {
  return (
    <button
      className={`
      text-cyan-600 font-bold text-xl hover:text-white hover:bg-cyan-700 rounded-xl size-12 flex justify-center items-center
      ${primaryColor ? " bg-cyan-800 " : ""} ${width ?? ""}
      ${fontSize ?? ""}
      ${textColor ?? "text-white"}
      ${fontWeight ?? "text-base"}
      `}
      onClick={onClick}
    >
      {children ?? content}
    </button>
  );
};
