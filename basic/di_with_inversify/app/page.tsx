import container from "@/lib/di/container";
import { TYPES } from "@/lib/di/types";
import { GreetingService } from "@/services/interfaces";

export default function Home() {
  const greetingService = container.get<GreetingService>(TYPES.GreetingService);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Hello, {greetingService.greet("DI")}
      </main>
    </div>
  );
}
