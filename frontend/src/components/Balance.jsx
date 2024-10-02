const Balance = ({ value,name }) => {
  const val = String(value);
  const len = val.length;
  const st = val.substring(0, len - 2);
  const en = val.substring(len - 2);
  return (
      <div className="flex ">
        <div className="font-bold text-lg">Your balance:</div>
        <div className="font-semibold ml-4 text-lg">
          Rs {st}.{en}
        </div>
      </div>
  );
};

export default Balance;
