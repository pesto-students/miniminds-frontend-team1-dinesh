import Image from "next/image";

const GetStartedSection = ({ onClick }: { onClick: any }) => {
  return (
    <div className="max-w-[346px] w-full mx-auto pt-28 lg:pt-80 border-gray-700">
      <Image
        className="mx-auto text-center"
        src="/assets/miniminds_1.png"
        height={190}
        width={190}
        alt=""
      />
      <h3 className="text-[24px] font-[600] leading-[29px] text-center mx-auto text-[#555555]">
        MiniMinds
      </h3>
      <p className="mx-auto font-[500] mt-[10px] text-[12px] leading-[15px] text-center text-[#555555]">
        Helping educators and students to improve their memory and cognitive
        skills through fun and engaging gameplay.
      </p>
      <button
        onClick={onClick}
        className="rounded-[4px] px-8 py-2 mt-10 flex justify-center text-sm bg-[#19B03D] text-center mx-auto text-white font-semibold "
      >
        Get started
      </button>
      <p className="text-[10px] mt-32 font-inter font-medium  text-[#555555] mx-auto">
        By joining, you agree to share contact infornation with people in your
        organization.
        <span className="text-[#484FFF] underline decoration-1 	underline-offset-2">
          Learn More
        </span>
      </p>
    </div>
  );
};
export default GetStartedSection;
