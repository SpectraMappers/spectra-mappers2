const Row = ({ type = "vertical", children }) => {
  return (
    <div
      className={`flex ${
        type === "horizontal"
          ? "justify-between items-center gap-4"
          : "flex-col gap-6"
      }`}
    >
      {children}
    </div>
  );
};

export default Row;
