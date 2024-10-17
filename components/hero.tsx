import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <span className="border-l rotate-45 h-6"/>
        <a
          className={"flex items-center gap-4"}
          href="https://store.steampowered.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={"https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png"}
            alt={"Steam logo"} width={50} height={50}/>
          <div className="font-medium text-3xl">Steam</div>
        </a>
        <span className="border-l rotate-45 h-6"/>
      </div>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Unlock the Insights Behind the <b>Games</b> You Love
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
