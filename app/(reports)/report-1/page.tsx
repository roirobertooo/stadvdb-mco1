import React from "react";
import {supabase} from "@/utils/supabase/client";
import {Charts} from "./overview_components";

export default async function Report1() {
  const {data: freeGames, error: freeError} = await supabase.rpc('get_free_games');
  if (freeError) throw new Error(freeError.message);

  const {data: paidGames, error: paidError} = await supabase.rpc('get_paid_games');
  if (paidError) throw new Error(paidError.message);

  const {data: windowsGames, error: windowsError} = await supabase.rpc('get_windows_games');
  if (windowsError) throw new Error(windowsError.message);

  const {data: macGames, error: macError} = await supabase.rpc('get_mac_games');
  if (macError) throw new Error(macError.message);

  const {data: linuxGames, error: linuxError} = await supabase.rpc('get_linux_games');
  if (linuxError) throw new Error(linuxError.message);

  const {data: topdevs, error: topdevsError} = await supabase.rpc('get_top5_devs', {timeout: 1000});
  if (topdevsError) throw new Error(topdevsError.message);

  const {data: toppubs, error: toppubsError} = await supabase.rpc('get_top5_pubs', {timeout: 1000});
  if (toppubsError) throw new Error(toppubsError.message);

  const {data: gamesReleased, error: gamesReleasedError} = await supabase.rpc('get_games_released_5');
  if (gamesReleasedError) throw new Error(gamesReleasedError.message);

  const {data: highestGameUpvotes, error: highestGameUpvotesError} = await supabase.rpc('get_highest_game_upvote');
  if (highestGameUpvotesError) throw new Error(highestGameUpvotesError.message);

  const {
    data: highestGameDownvotes,
    error: highestGameDownvotesError
  } = await supabase.rpc('get_highest_game_downvote');
  if (highestGameDownvotesError) throw new Error(highestGameDownvotesError.message);

  const {data: trendingGenres, error: trendingGenresError} = await supabase.rpc('get_trending_genres_final');
  if (trendingGenresError) throw new Error(trendingGenresError.message);

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
    trendingGenres: trendingGenres || []
  };

  return (
    <div className="w-3/4 flex flex-col self-center p-3">
      <div className="font-bold text-3xl">Overview</div>
      <div className="container mx-auto">
        <Charts data={reportData}/>
      </div>
    </div>
  );
}