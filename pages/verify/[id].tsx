import Seo from "@/components/Seo";
import { getStudentById, updateStudentById } from "@/utils/database";
import { StudentType } from "@/utils/types";
import classNames from "classnames";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import { BiLoader } from "react-icons/bi";

const VerifyPage = (props: StudentType | undefined) => {
  const student: StudentType | undefined = props;
  console.log(student);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (student) {
      await updateStudentById(student.id, {
        isVerified: true,
      });
    }
    setIsLoading(false);
    setSuccess(true);
  };
  return (
    <>
      <Seo />
      <div className="w-full h-screen flex justify-center items-center">
        <div
          className={classNames(
            "max-w-2xl flex justify-center py-8 mx-4 flex-col rounded-lg w-full shadow-lg",
            success ? "bg-white" : "bg-green-100"
          )}
        >
          <Image
            className="mx-auto text-center"
            src="/assets/miniminds_1.png"
            height={190}
            priority={false}
            width={190}
            alt=""
          />
          {success ? (
            <>
              <Image
                className="mx-auto text-center "
                src="/assets/success.gif"
                height={190}
                priority={false}
                width={190}
                alt=""
              />
              <p className="text-xs text-center">You can close this link, thanks</p>
            </>
          ) : (
            <>
              {" "}
              <p className="text-center text-lg">
                Consent for {student && student.name}
                {`'s`} registration
              </p>
              <button
                onClick={handleOnSubmit}
                className="py-2 px-4 w-full text-white bg-green-400 my-2 rounded-lg hover:bg-green-600 max-w-xs mx-auto flex justify-center items-center"
              >
                {isLoading && (
                  <BiLoader className="animate-spin w-5 h-5 mr-2" />
                )}
                Confirm
              </button>
              <p className="text-center text-xs mx-4">
                By clicking on confirm you give permission to miniminds to
                register your child
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default VerifyPage;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const res = await getStudentById(id);
  return {
    props: res || undefined,
  };
}
