import React from "react";
import { supabase } from "@/utils/supabase/client";
import { Charts } from "./overview_components";

const fetchWithTimeout = (promise, timeout) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout))
  ]);
};

export default async function Report1() {
  const timeout = 5000; // 5 seconds timeout for each request

  const rpcCalls = [
    fetchWithTimeout(supabase.rpc('get_free_games'), timeout),
    fetchWithTimeout(supabase.rpc('get_paid_games'), timeout),
    fetchWithTimeout(supabase.rpc('get_windows_games'), timeout),
    fetchWithTimeout(supabase.rpc('get_mac_games'), timeout),
    fetchWithTimeout(supabase.rpc('get_linux_games'), timeout),
    fetchWithTimeout(supabase.rpc('get_top5_devs'), timeout),
    fetchWithTimeout(supabase.rpc('get_top5_pubs'), timeout),
    fetchWithTimeout(supabase.rpc('get_games_released_5'), timeout),
    fetchWithTimeout(supabase.rpc('get_highest_game_upvote'), timeout),
    fetchWithTimeout(supabase.rpc('get_highest_game_downvote'), timeout),
    fetchWithTimeout(supabase.rpc('get_trending_genres_final'), timeout)
  ];

  const results = await Promise.all(rpcCalls.map(p => p.catch(e => ({ error: e }))));

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
    { data: trendingGenres, error: trendingGenresError }
  ] = results;

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
        <Charts data={reportData} />
      </div>
    </div>
  );
}