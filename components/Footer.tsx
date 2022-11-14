import { footerList1, footerList3 } from "../utils/constants";

const List = ({ items, mt }: { items: string[]; mt: boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
    {items.map((item) => (
      <p
        key={item}
        className="text-lightGray text-sm hover:underline cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List items={footerList1} mt={false} />
      <List items={footerList3} mt />
       {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-1/2 pt-5" alt="logo" src="logo.png"/>
      <p className="text-colorOne text-sm mt-5">Daniel Clough - 2022</p>
    </div>
  );
};

export default Footer;
