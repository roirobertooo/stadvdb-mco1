"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartDataProps {
    data: Array<{
        release_year: number;
        both_support: number;
        windows_only_support: number;
        mac_only_support: number;
    }>;
}

export function LineChartComponent({ data }: ChartDataProps) {
    if (!data || data.length === 0) {
        return <p>No data available for this report.</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="release_year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="both_support" stroke="#8884d8" name="Both Platforms Support" />
                <Line type="monotone" dataKey="windows_only_support" stroke="#82ca9d" name="Windows Only Support" />
                <Line type="monotone" dataKey="mac_only_support" stroke="#ffc658" name="Mac Only Support" />
            </LineChart>
        </ResponsiveContainer>
    );
}

