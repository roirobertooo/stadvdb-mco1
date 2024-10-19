"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis
} from "recharts"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"

import * as React from "react"
import {TrendingDown} from "lucide-react"

export async function Charts({data}) {
  const chartData = [
    {cat: "free", games: data.freeGames, fill: "var(--color-free)"},
    {cat: "paid", games: data.paidGames, fill: "var(--color-paid)"},
  ]
  const chartConfig = {
    visitors: {
      label: "Games",
    },
    free: {
      label: "Free",
      color: "hsl(var(--chart-1))",
    },
    paid: {
      label: "Paid",
      color: "hsl(var(--chart-5))",
    }
  } satisfies ChartConfig

  const totalGames = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.games, 0)
  }, [])

  const platformData = [
    {platform: "Windows", games: data.windowsGames},
    {platform: "Mac", games: data.macGames},
    {platform: "Linux", games: data.linuxGames}
  ]

  const platformConfig = {
    games: {
      label: "Games",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const releaseData = data.gamesReleased.map((item) => ({
    "Year": item.release_year,
    "Games": item.game_count,
  }));

  const releaseConfig = {
    games: {
      label: "Games",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const thisYearGames = releaseData.find(item => item.Year === 2024)?.Games || 0;
  const lastYearGames = releaseData.find(item => item.Year === 2023)?.Games || 0;

  const trendPercent = ((thisYearGames - lastYearGames) / lastYearGames) * 100;

  const lovedData = [{
    game_name: data.highestGameUpvotes.name,
    upvote: data.highestGameUpvotes.positive,
    downvote: data.highestGameUpvotes.negative
  }]
  const lovedConfig = {
    upvote: {
      label: "Upvote",
      color: "hsl(var(--chart-1))",
    },
    downvote: {
      label: "Downvote",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  const downvotedData = [{
    game_name: data.highestGameDownvotes.name,
    upvote: data.highestGameDownvotes.positive,
    downvote: data.highestGameDownvotes.negative
  }];
  const downvotedConfig = {
    upvote: {
      label: "Upvote",
      color: "hsl(var(--chart-1))",
    },
    downvote: {
      label: "Downvote",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const trendingGenreData = data.trendingGenres.map((item) => ({
    "Genre": item.genre_name,
    "Playtime": item.avg_playtime_2weeks,
    "fill": `var(--color-${item.genreID})`,
  }));

  const baseConfig = {
    "Playtime": {
      label: "Playtime",
    },
  };

  const trendingGenreConfig = data.trendingGenres.reduce((config, item, index) => {
    const colorIndex = (index % 5) + 1;
    config[item.genreID] = {
      label: item.genre_name,
      color: `hsl(var(--chart-${colorIndex}))`,
    };
    return config;
  }, baseConfig) satisfies ChartConfig;

  return (
    <div
      className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Total Number of Games</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel/>}
                />
                <Pie
                  data={chartData}
                  dataKey="games"
                  nameKey="cat"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({viewBox}) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalGames.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Games
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Games Released</CardTitle>
            <CardDescription>
              Showing games released for the last 4 years
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={releaseConfig}>
              <AreaChart
                accessibilityLayer
                data={releaseData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false}/>
                <XAxis
                  dataKey="Year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={value => value.toString()}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line"/>}
                />
                <Area
                  dataKey="Games"
                  type="natural"
                  fill="var(--color-games)"
                  fillOpacity={0.4}
                  stroke="var(--color-games)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending down by {Math.abs(trendPercent).toFixed(2)}% this year <TrendingDown className="h-4 w-4"/>
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - October 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Platform Support Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pb-0">
            <ChartContainer
              config={platformConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RadarChart data={platformData}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                <PolarAngleAxis dataKey="platform"/>
                <PolarGrid/>
                <Radar
                  dataKey="games"
                  fill="var(--color-games)"
                  fillOpacity={0.6}
                  dot={{
                    r: 4,
                    fillOpacity: 1,
                  }}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <Card className="flex flex-col p-2">
          <CardHeader className="items-center pb-4">
            <CardTitle>Top Developers</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Developer</TableHead>
                <TableHead className="text-right">Games Sold</TableHead>
                <TableHead className="text-right">Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.topdevs.map((dev) => (
                <TableRow key={dev.developer_name}>
                  <TableCell className="font-medium">{dev.developer_name}</TableCell>
                  <TableCell
                    className="text-right">{dev.total_estimated_owners}</TableCell> {/* This is games sold also */}
                  <TableCell className="text-right">{dev.total_revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card className="flex flex-col p-2">
          <CardHeader className="items-center pb-4">
            <CardTitle>Top Publishers</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Publisher</TableHead>
                <TableHead className="text-right">Games Sold</TableHead>
                <TableHead className="text-right">Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.toppubs.map((pub) => (
                <TableRow key={pub.publisher_name}>
                  <TableCell className="font-medium">{pub.publisher_name}</TableCell>
                  <TableCell
                    className="text-right">{pub.total_estimated_owners}</TableCell> {/* This is games sold also */}
                  <TableCell className="text-right">{pub.total_revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      <div className="grid w-full flex-1 gap-6">
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Trending Genres</CardTitle>
            <CardDescription>Showing for the past 2 weeks</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={trendingGenreConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent/>}
                />
                <Pie data={trendingGenreData} dataKey="Playtime" nameKey="Genre"/>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Most Loved Game</CardTitle>
            <CardDescription>{lovedData[0].game_name}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 items-center pb-0">
            <ChartContainer
              config={lovedConfig}
              className="mx-auto aspect-square w-full max-w-[250px]"
            >
              <RadialBarChart
                data={lovedData}
                endAngle={180}
                innerRadius={100}
                outerRadius={130}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel/>}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({viewBox}) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {lovedData[0].upvote.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground"
                            >
                              Upvotes
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="upvote"
                  stackId="a"
                  cornerRadius={5}
                  fill="var(--color-upvote)"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="downvote"
                  fill="var(--color-downvote)"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Most Hated Game</CardTitle>
            <CardDescription>{downvotedData[0].game_name}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 items-center pb-0">
            <ChartContainer
              config={downvotedConfig}
              className="mx-auto aspect-square w-full max-w-[250px]"
            >
              <RadialBarChart
                data={downvotedData}
                endAngle={180}
                innerRadius={100}
                outerRadius={130}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel/>}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({viewBox}) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {downvotedData[0].downvote.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground"
                            >
                              Downvotes
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="upvote"
                  stackId="a"
                  cornerRadius={5}
                  fill="var(--color-upvote)"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="downvote"
                  fill="var(--color-downvote)"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
