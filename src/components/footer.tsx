const Footer: React.FC = () => {
  const footerText = "</> by ManasManohar";
  return (
    <div className="flex items-center justify-center bg-[#18181B] p-2">
      <a href="https://github.com/manasmanohar.com" target="__blank">
        {" "}
        <p>{footerText} </p>{" "}
      </a>
    </div>
  );
};

export default Footer;
