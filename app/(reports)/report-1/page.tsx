import React from "react";
import { supabase } from "@/utils/supabase/client";
import { Charts } from "./overview_components";

export default async function Report1() {
  try {
    // Run all RPCs in parallel
    const [
      { data: freeGames, error: freeError },
      { data: paidGames, error: paidError },
      { data: windowsGames, error: windowsError },
      { data: macGames, error: macError },
      { data: linuxGames, error: linuxError },
      { data: topdevs, error: topdevsError },
      { data: toppubs, error: toppubsError },
      { data: gamesReleased, error: gamesReleasedError },
      { data: highestGameUpvotes, error: highestGameUpvotesError },
      { data: highestGameDownvotes, error: highestGameDownvotesError },
      { data: trendingGenres, error: trendingGenresError },
    ] = await Promise.all([
      supabase.rpc("get_free_games"),
      supabase.rpc("get_paid_games"),
      supabase.rpc("get_windows_games"),
      supabase.rpc("get_mac_games"),
      supabase.rpc("get_linux_games"),
      supabase.rpc("get_top5_devs"),
      supabase.rpc("get_top5_pubs"),
      supabase.rpc("get_games_released_5"),
      supabase.rpc("get_highest_game_upvote"),
      supabase.rpc("get_highest_game_downvote"),
      supabase.rpc("get_trending_genres_final"),
    ]);

    // Handle errors
    if (freeError) throw new Error(freeError.message);
    if (paidError) throw new Error(paidError.message);
    if (windowsError) throw new Error(windowsError.message);
    if (macError) throw new Error(macError.message);
    if (linuxError) throw new Error(linuxError.message);
    if (topdevsError) throw new Error(topdevsError.message);
    if (toppubsError) throw new Error(toppubsError.message);
    if (gamesReleasedError) throw new Error(gamesReleasedError.message);
    if (highestGameUpvotesError) throw new Error(highestGameUpvotesError.message);
    if (highestGameDownvotesError) throw new Error(highestGameDownvotesError.message);
    if (trendingGenresError) throw new Error(trendingGenresError.message);

    // Prepare report data
    const reportData = {
      freeGames: freeGames || 0,
      paidGames: paidGames || 0,
      windowsGames: windowsGames || 0,
      macGames: macGames || 0,
      linuxGames: linuxGames || 0,
      topdevs: topdevs || [],
      toppubs: toppubs || [],
      gamesReleased: gamesReleased || [],
      highestGameUpvotes: highestGameUpvotes || { name: '', positive: 0, negative: 0 },
      highestGameDownvotes: highestGameDownvotes || { name: '', positive: 0, negative: 0 },
      trendingGenres: trendingGenres || [],
    };

    // Return component with report data
    return (
      <div className="w-3/4 flex flex-col self-center p-3">
        <div className="font-bold text-3xl">Overview</div>
        <div className="container mx-auto">
          <Charts data={reportData} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading report data:", error);
    return <div>Error loading data</div>;
  }
}
