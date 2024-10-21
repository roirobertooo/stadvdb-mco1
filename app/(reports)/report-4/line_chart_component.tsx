"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartDataProps {
    data: Array<{
        release_year: number;
        all_platforms_support: number;
        windows_mac_support: number;
        windows_linux_support: number;
        mac_linux_support: number;
        windows_only_support: number;
        mac_only_support: number;
        linux_only_support: number;
    }>;
    selectedPlatforms: {
        allPlatformsSupport: boolean;
        windowsMacSupport: boolean;
        windowsLinuxSupport: boolean;
        macLinuxSupport: boolean;
        windowsOnlySupport: boolean;
        macOnlySupport: boolean;
        linuxOnlySupport: boolean;
    };
}

export function LineChartComponent({ data, selectedPlatforms }: ChartDataProps) {
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
                {/* Render lines based on selectedPlatforms state */}
                {selectedPlatforms.allPlatformsSupport && (
                    <Line type="monotone" dataKey="all_platforms_support" stroke="#8884d8" name="All Platforms Support" />
                )}
                {selectedPlatforms.windowsMacSupport && (
                    <Line type="monotone" dataKey="windows_mac_support" stroke="#82ca9d" name="Windows & Mac Support" />
                )}
                {selectedPlatforms.windowsLinuxSupport && (
                    <Line type="monotone" dataKey="windows_linux_support" stroke="#FF5733" name="Windows & Linux Support" />
                )}
                {selectedPlatforms.macLinuxSupport && (
                    <Line type="monotone" dataKey="mac_linux_support" stroke="#C70039" name="Mac & Linux Support" />
                )}
                {selectedPlatforms.windowsOnlySupport && (
                    <Line type="monotone" dataKey="windows_only_support" stroke="#FFC300" name="Windows Only Support" />
                )}
                {selectedPlatforms.macOnlySupport && (
                    <Line type="monotone" dataKey="mac_only_support" stroke="#FF33A1" name="Mac Only Support" />
                )}
                {selectedPlatforms.linuxOnlySupport && (
                    <Line type="monotone" dataKey="linux_only_support" stroke="#33FFCE" name="Linux Only Support" />
                )}
            </LineChart>
        </ResponsiveContainer>
    );
}


