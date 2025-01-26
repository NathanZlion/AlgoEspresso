import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div className="flex flex-col items-center gap-2 align-middle sm:flex-row">
          <Image
            className="dark"
            src="/logo.svg"
            alt="AlgoEspresso logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="h-1 text-3xl font-mono"> AlgoEspresso </h1>
        </div>

      </main>
    </div>
  );
}
