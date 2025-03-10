import Image from "next/image";
export const Footer = () => (
  <div className="flex flex-col items-center m-2">
    <div className="w-10/12 border  border-gray-700 my-4"></div>
    <div className="flex gap-4 justify-center">
      {[
        {
          src: "/pictures/email_icon.png",
          alt: "Email",
          link: "mailto:mehdipopal@outlook.de",
        },
        {
          src: "/pictures/github_icon.png",
          alt: "Github",
          link: "https://github.com/mehdi-000",
        },
        {
          src: "/pictures/linkedin_icon.png",
          alt: "Linkedin",
          link: "https://www.linkedin.com/in/mehdi-popal-65a2a525a",
        },
        { src: "/pictures/steam_icon.png", alt: "Steam", link: "#" },
      ].map((icon, index) => (
        <a
          key={index}
          href={icon.link}
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <Image src={icon.src} alt={icon.alt} width={30} height={30} />
        </a>
      ))}
    </div>
  </div>
);
