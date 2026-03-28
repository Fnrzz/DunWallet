import Image from "next/image";

const LinePatern = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none flex justify-center overflow-hidden">
      <div className="w-full md:max-w-sm h-full relative flex flex-col justify-between">
        <div className="w-full opacity-10 flex justify-center [mask-image:linear-gradient(to_bottom,black_10%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_10%,transparent_100%)]">
          <Image
            src="/line-petern.avif"
            alt="Top pattern"
            width={200}
            height={200}
            loading="eager"
            className="w-full h-[150px] rotate-180 object-cover"
          />
        </div>
        <div className="w-full opacity-10 flex justify-center [mask-image:linear-gradient(to_top,black_10%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_10%,transparent_100%)]">
          <Image
            src="/line-petern.avif"
            alt="Bottom pattern"
            width={200}
            height={200}
            loading="eager"
            className="w-full h-[100px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LinePatern;
