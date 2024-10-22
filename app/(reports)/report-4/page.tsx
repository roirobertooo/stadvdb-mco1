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
    const [selectedPlatforms, setSelectedPlatforms] = useState({
        allPlatformsSupport: true,
        windowsMacSupport: true,
        windowsLinuxSupport: true,
        macLinuxSupport: true,
        windowsOnlySupport: true,
        macOnlySupport: true,
        linuxOnlySupport: true,
    });
    const [selectAll, setSelectAll] = useState(true);

    const platformOptions = [
        { label: 'All Platforms Support', value: 'allPlatformsSupport' },
        { label: 'Windows & Mac Support', value: 'windowsMacSupport' },
        { label: 'Windows & Linux Support', value: 'windowsLinuxSupport' },
        { label: 'Mac & Linux Support', value: 'macLinuxSupport' },
        { label: 'Windows Support', value: 'windowsOnlySupport' },
        { label: 'Mac Support', value: 'macOnlySupport' },
        { label: 'Linux Support', value: 'linuxOnlySupport' },
    ];

    const fetchPlatformData = async () => {
        setLoading(true);
        const { data, error } = await supabase.rpc('get_platform_support', {
            start_date: '2013-01-01',  // Start date for 2013
            end_date: '2023-12-31',    // End date for 2023
            text_param: 7              // Fetch all data for now, we'll filter locally based on the checkbox state
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

    useEffect(() => {
        fetchPlatformData();
    }, []);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, platform: string) => {
        setSelectedPlatforms({
            ...selectedPlatforms,
            [platform]: e.target.checked,
        });

        if (!e.target.checked) {
            setSelectAll(false);  // Uncheck "Select All" if any platform is unchecked
        }
    };

    const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        setSelectedPlatforms({
            allPlatformsSupport: isChecked,
            windowsMacSupport: isChecked,
            windowsLinuxSupport: isChecked,
            macLinuxSupport: isChecked,
            windowsOnlySupport: isChecked,
            macOnlySupport: isChecked,
            linuxOnlySupport: isChecked,
        });
    };

    if (loading) {
        return <div className="loader"></div>;  // Optional: Loading state
    }

    return (
        <div className="w-3/4 flex flex-col self-center p-3">
            <div className="font-bold text-2xl py-5">Platform Support by Year (2013-2023)</div>

            {/* Platform checkbox group styled for the dark theme */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#ccc' }}>Select Platforms to Display:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {/* Select All checkbox */}
                    <div style={{
                        padding: '8px 12px',
                        border: '1px solid #444',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#151515',
                        cursor: 'pointer',
                        color: '#ccc'
                    }}>
                        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                                style={{ marginRight: '8px', accentColor: '#ccc' }}
                            />
                            Select All
                        </label>
                    </div>

                    {/* Individual platform checkboxes */}
                    {platformOptions.map((platform) => (
                        <div key={platform.value} style={{
                            padding: '8px 12px',
                            border: '1px solid #444',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#151515',  // Same as the dropdown background
                            cursor: 'pointer',
                            color: '#ccc'
                        }}>
                            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={selectedPlatforms[platform.value as keyof typeof selectedPlatforms]}
                                    onChange={(e) => handleCheckboxChange(e, platform.value)}
                                    style={{ marginRight: '8px', accentColor: '#ccc' }}
                                />
                                {platform.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shadcn-styled Card with Line Chart */}
            <Card>
                <CardHeader>
                    <CardTitle></CardTitle>
                </CardHeader>
                <CardContent>
                    {platformData.length > 0 ? (
                        <LineChartComponent data={platformData} selectedPlatforms={selectedPlatforms} />
                    ) : (
                        <div className="loader"></div>  // Shows a message if no data is available
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
            <div className="font-bold text-2xl pt-5">Average Playtime by Platform</div>

            {/* Year selection dropdown */}
            <div className="my-4">
                <label htmlFor="yearSelect" className="block mb-2 font-medium">Select Year</label>
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
            <div className="font-bold text-3xl">Platform Report</div>
            <div className="container mx-auto">
                <Report4_1 />  {/* Line Chart for Platform Support */}
                <Report4_2 />  {/* Bar Chart for Playtime */}
            </div>
        </div>
    );
}

