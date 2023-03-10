import Image from "next/image";

const GetStartedSection = ({ onClick }: { onClick: any }) => {
  return (
    <div className="max-w-[346px] mt-20 w-full border-secondary">
      <Image
        className="mx-auto text-center"
        src="/assets/miniminds_1.png"
        height={130}
        width={130}
        priority={false}
        alt=""
      />
      <h3 className="mt-2 text-2xl font-semibold leading-[29px] text-center mx-auto text-secondary">
        MiniMinds
      </h3>
      <p className="mx-auto font-medium mt-3 text-xs leading-[15px] text-center text-secondary">
        Helping educators and students to improve their memory and cognitive
        skills through fun and engaging gameplay.
      </p>
      <button
        onClick={onClick}
        className="rounded-[4px] px-8 py-2 mt-10 flex justify-center text-sm bg-primary text-center mx-auto text-white font-semibold "
      >
        Get started
      </button>
      <p className="text-[10px] mt-28 font-medium  text-gray-600 mx-auto">
        By joining, you agree to share contact infornation with people in your
        organization. 
        <span className=" text-link underline decoration-1 underline-offset-2">
          Learn More
        </span>
      </p>
    </div>
  );
};
export default GetStartedSection;
