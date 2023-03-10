import React, { SyntheticEvent } from "react";
import classnames from "classnames";
import Image from "next/image";

const Card = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
}: {
  onClick: any;
  card: any;
  index: number;
  isInactive: any;
  isFlipped: boolean;
  isDisabled: boolean;
}) => {
  const handleClick = () => {
    if (!isDisabled && !isFlipped) {
      onClick(index);
    }
  };

  return (
    <div
      className={classnames(
        "w-full h-full border rounded-[4px] shadow-md transition relative cursor-pointer",
        isInactive ? "opacity-20 scale-50" : "opacity-100"
      )}
      onClick={handleClick}
    >
      <div className="w-full h-full">
        <Image
          width={120}
          height={120}
          src={card.image}
          alt="pokeball"
          className={classnames(!isFlipped ? "scale-90" : "scale-50")}
        />
      </div>
    </div>
  );
};

export default Card;
