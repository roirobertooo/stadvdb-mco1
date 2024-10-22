"use client"
import React, {useEffect, useState} from "react";
import {DataTable} from "@/components/ui/data-table";
import {ArrowRight, ArrowUpDown, CalendarIcon} from "lucide-react"
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {addDays, format} from "date-fns";
import {DateRange} from "react-day-picker";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import {supabase} from "@/utils/supabase/client";
import {ColumnDef} from "@tanstack/react-table";

interface report1_interface {
    category: string;
    counts: number;
    average_rating: number;
    average_playtime: number;
}
interface report2_0_interface {
    dev: string,
    counts: number;
    dev_id: number;
}
interface report2_1_interface {
    game: string;
    release: string;
}
interface report4_interface {
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

interface dropdown{
    label: string;
    value: string;
}

const report1_columns: ColumnDef<report1_interface>[] = [
    {
        accessorKey: "category",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }
    },
    {
        accessorKey: "counts",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number of Games
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }
    },
    {
        accessorKey: "average_rating",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Average Rating
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }
    },
    {
        accessorKey: "average_playtime",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Average Total Playtime
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }
    },
]
const report2_1_columns: ColumnDef<report2_1_interface>[] = [
    {
        accessorKey: "game",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Game Title
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }

    },
    {
        accessorKey: "release",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Release Date
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }
    },
]
const report3_columns: ColumnDef<report1_interface>[] = [
    {
        accessorKey: "category",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }
    },
    {
        accessorKey: "counts",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number of Games
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }
    },
    {
        accessorKey: "average_rating",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Average Rating
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }
    },
    {
        accessorKey: "average_playtime",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Average Total Playtime
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }
    },
]
const report4_columns: ColumnDef<report4_interface>[] = [
    {
        accessorKey: "year",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Year
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as String}</ div>
        }
    },
    {
        accessorKey: "1",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    January
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }
    },
    {
        accessorKey: "2",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    February
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
        }
    },
    {
        accessorKey: "3",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    March
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
        }
    },
    {
        accessorKey: "4",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    April
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
        }
    },
    {
        accessorKey: "5",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    May
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
        }
    },
    {
        accessorKey: "6",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    June
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
        }
    },
    {
        accessorKey: "7",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    July
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
        }
    },
    {
        accessorKey: "8",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    August
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
        }
    },
    {
        accessorKey: "9",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    September
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
        }
    },
    {
        accessorKey: "10",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    October
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
        }
    },
    {
        accessorKey: "11",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    November
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
        }
    },
    {
        accessorKey: "12",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    December
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: props => {
            return <div className="flex justify-center text-center"> {props.getValue() as string}</div>
        }
    }
]

const Loader = ({data}:{data:boolean}) => {
    if (data) {
        return null
    }
    return (
        <div className="loader"></div>
    );
};

function Report2_1() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            let {data, error} = await supabase.rpc('report2_1');
            setIsLoading(false);

            if (error) {
                console.error(error);
            } else {
                setData(data);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="p-6 border rounded-lg drop-shadow-sm">
            <div className="flex items-center justify-center space-x-1">
                <h1 className="font-semibold text-2xl text-center"> Overview</h1>
                <Loader data={!isLoading}/>
            </div>
            <DataTable columns={report1_columns} data={data ? data : []}/>
        </div>
    );
}

function Report2_2() {
    const [selectedRow, setSelectedRow] = useState<undefined | number>(undefined);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            let {data, error} = await supabase.rpc('report2_2');
            setIsLoading(false);
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
            if(!selectedRow){
                return
            }
            setIsLoading(true)
            let {data, error} = await supabase
                .rpc('report2_2_2', {
                    param: selectedRow,
                })
            setIsLoading(false)
            if (error) {
                console.error(error);
            } else {
                setData2(data);
            }
        }
        fetchData();
    }, [selectedRow]);

    const report2_0_columns: ColumnDef<report2_0_interface>[] = [
        {
            accessorKey: "dev",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Game Developer
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
            }

        },
        {
            accessorKey: "counts",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Number of Games Released
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            cell: props => {
                return <div className="flex justify-center text-center"> {props.getValue() as string}</ div>
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

    return (
        <div className="p-6 border rounded-lg drop-shadow-sm">
            <div className="flex items-center justify-center space-x-1 p-5 pb-9">
                <h1 className="font-semibold text-2xl text-center"> Developer Productivity</h1>
                <Loader data={!isLoading}/>
            </div>
            <div className="flex justify-center">
                <div className="div border p-4 rounded-lg">
                    <DataTable columns={report2_0_columns} data={data1 ? data1 : []}/>
                </div>
                <div className={"div border p-4 rounded-lg min-h-max" + (data2 ? " " : "invisible")}>
                    <DataTable columns={report2_1_columns} data={data2 ? data2 : []}/>
                </div>
            </div>
        </div>
    );
}

function Report2_3() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [categories, setCategories] = useState<any[]>([])
    const [table, setTable] = useState()
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2015, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            let {data, error} = await supabase.rpc('report2_3');
            setIsLoading(false);
            if (error) {
                console.error(error);
            } else {
                const adjustedData = data.map((item: { label: string, value: number }) => ({
                    ...item,
                    value: item.value.toString(),
                }));
                setCategories(adjustedData);
            }
        }

        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            if (!value || !date?.from || !date.to) {
                return null
            }
            setIsLoading(true);
            let {data, error} = await supabase.rpc('report2_3_1_test', {
                    start_date: date.from.toISOString().split('T')[0],
                    end_date: date.to.toISOString().split('T')[0],
                    text_param: Number(value)
                }
            );
            setIsLoading(false)
            if (error) {
                console.error(error);
            } else {
                setTable(data);
            }
        }
        fetchData();
    }, [value, date]);

    return (
        <div className="p-6 border rounded-lg drop-shadow-sm">
            <div className="flex items-center justify-center space-x-1 p-5">
                <h1 className="font-semibold text-2xl text-center"> Category-Timeframe Analysis</h1>
                <Loader data={!isLoading}/>
            </div>
            <div className="flex">
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
            </div>
            <DataTable columns={report3_columns} data={table ? table : []}/>
        </div>
    )
        ;
}

function Report2_4() {
    const [open, setOpen] = React.useState(false)
    const [years, setYears] = useState<dropdown[]>([])
    const [value, setValue] = React.useState("")
    const [data, setData] = useState<report4_interface[]| null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            let {data, error} = await supabase.rpc('get_all_years');
            setIsLoading(false)
            if (error) {
                console.error(error);
            } else {
                const formattedData = data.map((year: {label: string, value: string}) => ({
                    label: String(year),
                    value: String(year)
                }));
                setYears(formattedData);
            }
            console.log(data);
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            if (!value) {
                setData(null)
                return
            }
            setIsLoading(true);
            let {data, error} = await supabase.rpc('report2_4', {
                year_param: Number(value)
            });
            setIsLoading(false);
            if (error) {
                console.error(error);
            } else {
                const transformedData = data.reduce((acc: { [x: string]: any; }, curr: { month: { toString: () => string | number; }; category_name: any; }) => {
                    const month = curr.month.toString();
                    if (acc[month]) {
                        acc[month] += `, ${curr.category_name}`;
                    } else {
                        acc[month] = curr.category_name;
                    }
                    return acc;
                }, {year: Number(value)});
                const tableData = [transformedData];
                setData(tableData)
            }
        }
        fetchData();
    }, [value]);

    return (
        <div className="p-6 border rounded-lg drop-shadow-sm">
            <div className="flex items-center justify-center space-x-1 p-5">
                <h1 className="font-semibold text-2xl text-center"> Year's Most Popular Category per Month</h1>
                <Loader data={!isLoading}/>
            </div>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            {value
                                ? years.find((framework:dropdown) => framework.value === value)?.label
                                : "Select Year..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search Year..."/>
                            <CommandList>
                                <CommandEmpty>Loading..</CommandEmpty>
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
            <DataTable columns={report4_columns} data={data ? data : []}/>
        </div>
    );
}


export default async function Report2() {
    return (
        <div className="w-3/4 flex flex-col self-center p-3">
            <div className="font-bold text-3xl pb-12">Category Insights</div>
            <div className="container space-y-8">
                <Report2_1/>
                <Report2_2/>
                <Report2_3/>
                <Report2_4/>
            </div>
        </div>
    );
}