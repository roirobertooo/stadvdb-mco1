import Hero from "@/components/hero";
import OlapReports from "../components/olap-reports";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import {hasEnvVars} from "@/utils/supabase/check-env-vars";

export default async function Index() {
  return (
    <>
      <Hero/>
      <main className="w-1/2 flex-1 flex flex-col self-center gap-6 px-4">
        {hasEnvVars ? (<>
            <h2 className="font-medium text-xl mb-4">Select a report</h2>
            <OlapReports/>
          </>
        ) : (<>
          <h2 className="font-medium text-xl mb-4">Connect to Supabase</h2>
          <ConnectSupabaseSteps/>
        </>)}
      </main>
    </>
  );
}
