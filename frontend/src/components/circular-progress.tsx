export default ({
  children,
  size = "0.4rem",
}: {
  children?: any;
  size?: string;
}) => {
  const innerSize = () => {
    const [number, measure] = size.includes("px")
      ? [...size.split("px"), "px"]
      : [...size.split("rem"), "rem"];
    return `${Number(number) - Number(number) * 0.25}${measure}`;
  };
  return (
    <article
      className={`progress-container
      size-${size}
      `}
    >
      <svg
        xmlns="https://www.w3.org/2000/svg"
        version="1.1"
        width="2.5rem"
        height="2.5rem"
        className="absolute top-1 right-0 flex justify-center items-center"
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#e91e63" />
            <stop offset="100%" stopColor="#673ab7" />
          </linearGradient>
        </defs>
        <circle
          className="progress-circle"
          cx="20"
          cy="20"
          r="15"
          strokeLinecap="round"
        />
      </svg>
      {children}
    </article>
  );
};
