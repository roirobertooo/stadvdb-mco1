import React from "react";
import {supabase} from "@/utils/supabase/client";
import {Charts} from "./overview_components";

export default async function Report1() {
  const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms, {data: null, error: null}));

  const [
    {data: freeGames, error: freeError},
    {data: paidGames, error: paidError},
    {data: windowsGames, error: windowsError},
    {data: macGames, error: macError},
    {data: linuxGames, error: linuxError},
    {data: topdevs, error: topdevsError},
    {data: toppubs, error: toppubsError},
    {data: gamesReleased, error: gamesReleasedError},
    {data: highestGameUpvotes, error: highestGameUpvotesError},
    {data: highestGameDownvotes, error: highestGameDownvotesError},
    {data: trendingGenres, error: trendingGenresError}
  ] = await Promise.all([
    Promise.race([supabase.rpc('get_free_games'), timeout(5000)]),
    Promise.race([supabase.rpc('get_paid_games'), timeout(5000)]),
    Promise.race([supabase.rpc('get_windows_games'), timeout(5000)]),
    Promise.race([supabase.rpc('get_mac_games'), timeout(5000)]),
    Promise.race([supabase.rpc('get_linux_games'), timeout(5000)]),
    Promise.race([supabase.rpc('get_top5_devs'), timeout(5000)]),
    Promise.race([supabase.rpc('get_top5_pubs'), timeout(5000)]),
    Promise.race([supabase.rpc('get_games_released_5'), timeout(5000)]),
    Promise.race([supabase.rpc('get_highest_game_upvote'), timeout(5000)]),
    Promise.race([supabase.rpc('get_highest_game_downvote'), timeout(5000)]),
    Promise.race([supabase.rpc('get_trending_genres_final'), timeout(5000)])
  ]);

  if (freeError) console.error(freeError.message);
  if (paidError) console.error(paidError.message);
  if (windowsError) console.error(windowsError.message);
  if (macError) console.error(macError.message);
  if (linuxError) console.error(linuxError.message);
  if (topdevsError) console.error(topdevsError.message);
  if (toppubsError) console.error(toppubsError.message);
  if (gamesReleasedError) console.error(gamesReleasedError.message);
  if (highestGameUpvotesError) console.error(highestGameUpvotesError.message);
  if (highestGameDownvotesError) console.error(highestGameDownvotesError.message);
  if (trendingGenresError) console.error(trendingGenresError.message);

  const reportData = {
    freeGames: freeGames || 0,
    paidGames: paidGames || 0,
    windowsGames: windowsGames || 0,
    macGames: macGames || 0,
    linuxGames: linuxGames || 0,
    topdevs: topdevs || [],
    toppubs: toppubs || [],
    gamesReleased: gamesReleased || [],
    highestGameUpvotes: highestGameUpvotes || {name: '', positive: 0, negative: 0},
    highestGameDownvotes: highestGameDownvotes || {name: '', positive: 0, negative: 0},
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