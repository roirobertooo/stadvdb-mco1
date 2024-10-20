"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartDataProps {
    data: Array<{ platform_support: string; avg_total_playtime: number; avg_playtime_last_2weeks: number }>;
}

export function Charts({ data }: ChartDataProps) {
    if (!data || data.length === 0) {
        return <p>No data available for the selected year.</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform_support" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avg_total_playtime" fill="#8884d8" name="Average Total Playtime" />
                <Bar dataKey="avg_playtime_last_2weeks" fill="#82ca9d" name="Average Playtime (Last 2 Weeks)" />
            </BarChart>
        </ResponsiveContainer>
    );
}

