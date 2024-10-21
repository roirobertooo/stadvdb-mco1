import Link from 'next/link';

export default function OlapReports() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Link href="/report-1" className="flex items-center gap-4 p-4 text-primary rounded-lg border-2 border-primary hover:border-background
                    hover:bg-primary hover:text-background transition-all ease-linear duration-100">
          <span className="text-xl font-medium">Overview</span>
      </Link>
      <Link href="/report-2" className="flex items-center gap-4 p-4 text-primary rounded-lg border-2 border-primary hover:border-background
                    hover:bg-primary hover:text-background transition-all ease-linear duration-100">
          <span className="text-xl font-medium">Category Insights</span>
      </Link>
      <Link href="/report-3" className="flex items-center gap-4 p-4 text-primary rounded-lg border-2 border-primary hover:border-background
                    hover:bg-primary hover:text-background transition-all ease-linear duration-100">
          <span className="text-xl font-medium">CCU Analysis</span>
      </Link>
      <Link href="/report-4" className="flex items-center gap-4 p-4 text-primary rounded-lg border-2 border-primary hover:border-background
                    hover:bg-primary hover:text-background transition-all ease-linear duration-100">
          <span className="text-xl font-medium">Platform Report</span>
      </Link>
    </div>
  );
}