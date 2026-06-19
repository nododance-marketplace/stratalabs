import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-heading text-7xl font-medium tracking-tighter text-spark">
        404
      </p>
      <h1 className="mt-4 font-heading text-2xl tracking-tight text-white">
        This layer doesn&apos;t exist.
      </h1>
      <p className="mt-3 text-sm text-steel">
        The page you&apos;re looking for may have moved or never made it off the
        build plate.
      </p>
      <Link href="/" className="btn-spark group mt-8 px-7 py-3.5 text-sm">
        Back home
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
