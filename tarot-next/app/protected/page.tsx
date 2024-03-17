import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import {DrawButton} from "./draw-button";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();


  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  // console.log(user)

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <DeployButton />
            {/* <AuthButton /> */}
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <form className="max-w-md mx-auto">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="month" className="block">Month</label>
                <select
                  id="Month"
                  name="Month"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue="" // You might want to set a default day or leave it empty for the user to select
                >
                  <option value="" disabled>Month</option>
                  {
                    Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))
                  }
                </select>
              </div>
              <div>
                <label htmlFor="day" className="block">Day</label>
                <select
                  id="Day"
                  name="Day"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue="" // You might want to set a default day or leave it empty for the user to select
                >
                  <option value="" disabled>Day</option>
                  {
                    Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))
                  }
                </select>
              </div>
              <div>
                <label htmlFor="year" className="block">Year</label>
                <select
                  id="year"
                  name="year"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue="" // Optionally set a default year or leave it empty
                >
                  <option value="" disabled>Year</option>
                  {
                    Array.from({ length: 2023 - 1900 + 1 }, (_, i) => 1900 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <button type="submit" className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Find My Birth Chart</button>
          </form>
        </main>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          <DrawButton user={user.id} />
          <FetchDataSteps />
        </main>
      </div>



      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
