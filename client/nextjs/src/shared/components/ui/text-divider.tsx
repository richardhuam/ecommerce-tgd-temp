interface TextDividerProps {
  text: string;
}

const TextDivider: React.FC<TextDividerProps> = ({ text }) => (
  <div className="relative flex items-center">
    <div className="flex-grow border-t border-gray-400" />
    <span className="mx-2 flex-shrink text-sm text-12 text-gray-500 xs:mx-4 xs:text-13">{text}</span>
    <div className="flex-grow border-t border-gray-400" />
  </div>
);

export default TextDivider;
