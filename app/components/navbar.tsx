import Link from "next/link";

export const Navbar = () => (
  <div className="flex flex-col items-center justify-between overflow-hidden p-10 bg-black text-pink font-mono">
    <div className="z-10 flex justify-evenly">
      <Link href={"/#work"} className="work m-2">
        <p>work</p>
      </Link>

      <Link href={"#experince"} className="work m-2">
        <p>experience</p>
      </Link>

      <Link href={"#contact"} className="contact m-2">
        <p>contact</p>
      </Link>
    </div>
  </div>
);
