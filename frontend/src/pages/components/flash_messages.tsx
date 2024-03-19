const FlashMessages = ({ text }: { text: string[] }) => {
  if (!text) return null;
  return (
    <div className="border-red-500 border py-2 bg-red-200 bg-opacity-80 text-slate-600">
      {text.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default FlashMessages;
