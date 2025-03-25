import { FC } from "react";

const TnC: FC = () => {
  return (
    <div className=" sm:ring-1 backdrop-blur-md sm:ring-[#1118271A] border border-[#E5E7EB] p-6 mt-4">
      <h5 className="text-xl font-bold text-white">Terms & Conditions</h5>
      <ul className="pl-6 text-sm text-[#fff] list-decimal flex flex-col gap-2 mt-2 font-Urbansit font-semibold">
        <li>Here&#39;s a guide to buy into raffles.</li>
        <li>
          All prizes are held by rafffle in escrow and can be claimed by the
          winner or creator once the draw is done.
        </li>
        <li>Raffle tickets cannot be refunded once bought.</li>
        <li>
          Raffle tickets will not be refunded if you did not win the raffle.
        </li>
        <li>You can only buy 20% of total tickets.</li>
      </ul>
    </div>
  );
};

export default TnC;
