"use client"
import React, {useEffect, useState} from "react";
import { ColumnDef } from "@tanstack/react-table"
import {DataTable} from "@/components/ui/data-table";
import {ArrowRight, ArrowUpDown, CalendarIcon} from "lucide-react"
import {Button} from "@/components/ui/button";

import { Check, ChevronsUpDown } from "lucide-react"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {addDays, format} from "date-fns";
import {DateRange} from "react-day-picker";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import {supabase} from "@/utils/supabase/client";

interface table1{
    category: string;
    counts: number;
    average_rating: number;
    average_playtime: number;
}
interface table2_0{
    dev: string,
    counts: number;
    dev_id: number;
}
interface table2_1{
    game: string;
    release: string;
}
interface table4 {
    year: number;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
    "7": string;
    "8": string;
    "9": string;
    "10": string;
    "11": string;
    "12": string;
}


const Loader = () => {
    return (
        <div className="loader"></div>
    );
};

function Report2_1() {
    const [data, setData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            let { data, error } = await supabase.rpc('report2_1');
            if (error) {
                console.error(error);
            } else {
                setData(data);
            }
        }
        fetchData();
    }, []);

    if(!data){
        return <>loading..</>
    }
    const columns: ColumnDef<table1>[] = [
        {
            accessorKey: "category",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
        {
            accessorKey: "counts",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Number of Games
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
        {
            accessorKey: "average_rating",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Average Rating
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
        {
            accessorKey: "average_playtime",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Average Total Playtime
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
    ]
    return (
        <div className="p-6 border rounded-lg">
            <div className="flex align-middle justify-center">
                <h1 className="font-semibold text-2xl text-center"> Overview</h1>
                <Loader/>
            </div>
            <DataTable columns={columns} data={data}/>
        </div>
    );
}

function Report2_2() {
    const [selectedRow, setSelectedRow] = useState<undefined| number>(undefined);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState()

    useEffect(() => {
        async function fetchData() {
            let { data, error } = await supabase.rpc('report2_2');
            if (error) {
                console.error(error);
            } else {
                setData1(data);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            let { data, error } = await supabase
                .rpc('report2_2_2', {
                    param: selectedRow,
                })
            if (error) {
                console.error(error);
            } else {
                setData2(data);
            }
        }
        fetchData();
    }, [selectedRow]);

    const columns: ColumnDef<table2_0>[] = [
        {
            accessorKey: "dev",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Game Developer
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }

        },
        {
            accessorKey: "counts",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Number of Games Released
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
        {
            header: "Select",
            cell: props => {
                return (
                    <div
                        onClick={() => setSelectedRow(props.row.original.dev_id)}
                        className="flex justify-center text-center border cursor-pointer"
                    >
                        <ArrowRight className="h-5 w-5"/>
                    </div>
                );
            }
            },
    ]

    const columns1: ColumnDef<table2_1>[] = [
        {
            accessorKey: "game",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Game Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }

        },
        {
            accessorKey: "release",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Release Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
    ]


    if(!data1){
        return <>loading..</>
    }
    return (
        <div className="py-16 border-b">
            <h1>Report 2_2</h1>
            <div className="flex">
                <div className="div">
                    <DataTable columns={columns} data={data1} />
                </div>
                <div className={"div" + data2? " " : "invisible"}>
                    <DataTable columns={columns1} data={data2? data2: []} />
                </div>
            </div>
        </div>
    );
}

function Report2_3() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [categories, setCategories] = useState<any[]>()
    const [table, setTable] = useState()
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2015, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    useEffect(() => {
        async function fetchData() {
            let { data, error } = await supabase.rpc('report2_3');
            if (error) {
                console.error(error);
            } else {
                const adjustedData = data.map(item => ({
                    ...item,
                    value: item.value.toString()
                }));
                setCategories(adjustedData);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            if(!value || !date?.from || !date.to){
                return null
            }
            let { data, error } = await supabase.rpc('report2_3_1_test',{
                start_date: date.from.toISOString().split('T')[0],
                end_date: date.to.toISOString().split('T')[0],
                text_param: Number(value)
                }
                );
            if (error) {
                console.error(error);
            } else {
                setTable(data);
            }
        }
        fetchData();
    }, [value,date]);

    const columns: ColumnDef<table1>[] = [
        {
            accessorKey: "category",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
        {
            accessorKey: "counts",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Number of Games
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
        {
            accessorKey: "average_rating",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Average Rating
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
        {
            accessorKey: "average_playtime",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Average Total Playtime
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
    ]

    if(!categories){
        return <>loading..</>
    }
    return (
        <div className="py-16 border-b">
            <h1>Report 2_3</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="min-w-[200px] max-w-full justify-between"
                    >
                        {value
                            ? categories.find((framework) => framework.value === value)?.label
                            : "Select Category..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 max-w-full">
                    <Command>
                        <CommandInput placeholder="Search Category..."/>
                        <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                                {categories.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <div className={cn("grid gap-2", "")}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon/>
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <DataTable columns={columns} data={table ? table : []}/>
            }
        </div>
    );
}

function Report2_4() {
    const [open, setOpen] = React.useState(false)
    const [years, setYears] = useState(null)
    const [value, setValue] = React.useState("")
    const [data, setData] = useState<table4>(null)
    useEffect(() => {
        async function fetchData() {
            let { data, error } = await supabase.rpc('get_all_years');
            if (error) {
                console.error(error);
            } else {
                const formattedData = data.map(year => ({
                    label: String(year),
                    value: String(year)
                }));
                console.log(formattedData);
                setYears(formattedData);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if(!value){
                setData([])
                return
            }
            let { data, error } = await supabase.rpc('report2_4',{
                year_param: Number(value)
            });
            if (error) {
                console.error(error);
            } else {
                const transformedData = data.reduce((acc, curr) => {
                    acc[curr.month.toString()] = curr.category_name;
                    return acc;
                }, { year: Number(value) });
                const tableData = [transformedData];
                setData(tableData)
            }
        }
        fetchData();
    }, [value]);

    const columns: ColumnDef<table4>[] = [
        {
            accessorKey: "year",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Year
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue()}</ div>
            }
        },
        {
            accessorKey: "1",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        January
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
        {
            accessorKey: "2",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        February
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return<div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }
        },
        {
            accessorKey: "3",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        March
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
            }
        },
        {
            accessorKey: "4",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        April
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
            }
        },
        {
            accessorKey: "5",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        May
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
            }
        },
        {
            accessorKey: "6",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        June
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
            }
        },
        {
            accessorKey: "7",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        July
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
            }
        },
        {
            accessorKey: "8",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        August
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
            }
        },
        {
            accessorKey: "9",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        September
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
            }
        },
        {
            accessorKey: "10",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        October
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
            }
        },
        {
            accessorKey: "11",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        November
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
            }
        },
        {
            accessorKey: "12",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        December
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
            }
        }
    ]
    console.log(data);
    if(!years){
        return <></>
    }
    return (
        <div className="py-16">
            <h1>Report 2_4</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? years.find((framework) => framework.value === value)?.label
                            : "Select Year..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search Year..."/>
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {years.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DataTable columns={columns} data={data ? data : []} />
        </div>
    );
}


export default function Report2() {
    // const [data, setData] = useState()
    // useEffect(() => {
    //     async function fetchData() {
    //         let { data, error } = await supabase
    //             .rpc('get_platform_support', {
    //                 end_date: "2010-12-1",
    //                 start_date: "2020-5-1",
    //                 text_param: 0
    //             })
    //         if (error) console.error(error)
    //         else setData(data)
    //     }
    //     fetchData()
    // }, []);

    // console.log(data);
    return (
        <div className="w-3/4 flex flex-col self-center p-3">
            <div className="font-bold text-3xl pb-12">Category Insights</div>
            <div className="container mx-auto">
                <Report2_1/>
                <Report2_2/>
                <Report2_3/>
                <Report2_4/>
            </div>
        </div>
    );
}