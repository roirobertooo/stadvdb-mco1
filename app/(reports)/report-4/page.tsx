"use client";  // Client-side code directive

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { LineChartComponent } from "./line_chart_component";
import { Charts } from "./chart_component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";  //

// Report 4_1: Platform Support (Line Chart)
function Report4_1() {
    const [platformData, setPlatformData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPlatformData = async () => {
            setLoading(true);
            const { data, error } = await supabase.rpc('get_platform_support', {
                start_date: '2013-01-01',  // Start date for 2013
                end_date: '2023-12-31',    // End date for 2023 to include data for this range
                text_param: 3              // Platform number 3 for showing all data
            });

            if (error) {
                console.error('Error fetching platform support data:', error);
                setPlatformData([]);
            } else {
                console.log('Fetched Data for Report 4_1:', data);  // Log data for debugging purposes
                setPlatformData(data || []);
            }
            setLoading(false);
        };

        fetchPlatformData();
    }, []);

    if (loading) {
        return <p>Loading data...</p>;
    }

    return (
        <div className="w-3/4 flex flex-col self-center p-3">
            <div className="font-bold text-3xl">Platform Support by Year (2013-2023)</div>

            {/* Shadcn-styled Card with Line Chart */}
            <Card>
                <CardHeader>
                    <CardTitle></CardTitle>
                </CardHeader>
                <CardContent>
                    {platformData.length > 0 ? (
                        <LineChartComponent data={platformData} />
                    ) : (
                        <p>No data available for this report.</p>  // Shows a message if no data is available
                    )}
                </CardContent>
            </Card>
        </div>
    );
}


// Report 4_2: Playtime Data (Bar Chart)
function Report4_2() {
    const [selectedYear, setSelectedYear] = useState<number>(2023);
    const [playtimeData, setPlaytimeData] = useState<any[]>([]);


    const years = Array.from({ length: 2023 - 2010 + 1 }, (_, index) => 2010 + index);


    useEffect(() => {
        const fetchPlaytimeData = async () => {
            const { data, error } = await supabase.rpc('get_platform_playtime_by_year', {
                start_date: `${selectedYear}-01-01`,
                end_date: `${selectedYear}-12-31`,
            });

            if (error) {
                console.error('Error fetching playtime data:', error);
            } else if (data) {
                setPlaytimeData(data);
            }
        };

        fetchPlaytimeData();
    }, [selectedYear]);

    return (
        <div className="w-3/4 flex flex-col self-center p-3">
            <div className="font-bold text-3xl">Average Playtime by Platform</div>

            {/* Year selection dropdown */}
            <div className="my-4">
                <label htmlFor="yearSelect" className="block mb-2">Select Year</label>
                <select
                    id="yearSelect"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="px-4 py-2 border rounded"
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle></CardTitle>
                </CardHeader>
                <CardContent>
                    <Charts data={playtimeData} />
                </CardContent>
            </Card>
        </div>
    );
}

//Combines both reports
export default function Report4() {
    return (
        <div className="w-3/4 flex flex-col self-center p-3">
            <div className="font-bold text-3xl">Report 4: Platforms</div>
            <div className="container mx-auto">
                <Report4_1 />  {/* Line Chart for Platform Support */}
                <Report4_2 />  {/* Bar Chart for Playtime */}
            </div>
        </div>
    );
}

