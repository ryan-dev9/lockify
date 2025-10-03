import Image from "next/image";
import Manager from "./components/Manager";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-black">
      <Manager/>
    </div>
  );
}
