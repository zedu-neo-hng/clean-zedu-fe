import Link from "next/link";
import { ArrowBtn, OutlineBtn } from "../ui/Button";

export const DynamicFooter = ({
  text,
  description,
}: {
  text: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-5 bg-blue-50/30 px-4 py-12 text-center sm:gap-6 sm:px-8 sm:py-16">
      <h1 className="text-2xl font-semibold leading-tight text-neutral-900 sm:text-3xl md:text-4xl">
        {text}
      </h1>
      <p className="max-w-2xl text-base text-neutral-600">{description}</p>
      <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-2">
        <div className="w-full sm:w-auto [&>a]:w-full">
          <ArrowBtn
            text="Get started for free"
            className="w-full justify-center sm:w-auto"
            linkToHome
          />
        </div>
        <OutlineBtn
          text="Contact Sales"
          className="hidden sm:inline-flex"
          href="/contact-sales"
        />
        <Link
          href="/contact-sales"
          className="text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline sm:hidden"
        >
          Contact Sales
        </Link>
      </div>
    </div>
  );
};
