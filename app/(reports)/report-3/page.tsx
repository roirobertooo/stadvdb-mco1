'use client';
import {supabase} from '@/utils/supabase/client';
import {useEffect, useState} from 'react';
import BarChartComponent from './barChart_component';
import BarLineChartComponent from './barAndLineChart_component';

function Report3_1() {
  const [thresholdValue, setThresholdValue] = useState<number>(1); // Default threshold value
  const [averagePeakCcuPositive, setAveragePeakCcuPositive] = useState<number | null>(null);
  const [averagePeakCcuNegative, setAveragePeakCcuNegative] = useState<number | null>(null);
  const [noSubmission, setNoSubmission] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCcu = async () => {
    setLoading(true);

    // Fetch average peak CCU for positive reviews
    const {data: positiveData, error: positiveError} = await supabase.rpc('get_avg_peakccu_positive', {
      threshold_value: thresholdValue,
    });

    if (positiveError) {
      console.error(positiveError);
      setError('Failed to fetch data for positive reviews.');
      setLoading(false);
      return;
    }

    setAveragePeakCcuPositive(positiveData);

    // Fetch average peak CCU for negative reviews
    const {data: negativeData, error: negativeError} = await supabase.rpc('get_avg_peakccu_negative', {
      threshold_value: thresholdValue,
    });

    if (negativeError) {
      console.error(negativeError);
      setError('Failed to fetch data for negative reviews.');
      setLoading(false);
      return;
    }

    // Check if thresholdValue is negative
    if (thresholdValue < 0) {
      setError('Threshold value cannot be negative.');
      setLoading(false);
      return;
    }

    // Clear error if value is valid and fetch CCU data
    setError(null);

    setAveragePeakCcuNegative(negativeData);

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNoSubmission(false);
    getCcu();
  };

  return (
    <div className="flex flex-col">
      <div className="font-bold text-2xl my-16">Average Peak CCU Analysis: Positive vs Negative Reviews</div>
      <form onSubmit={handleSubmit} className="mb-16">
        <label htmlFor="threshold" className="mr-2">Enter Threshold Value:</label>
        <input id="threshold" type="number" value={thresholdValue}
               onChange={(e) => setThresholdValue(Number(e.target.value))} className="border rounded p-1" required/>
        <button type="submit" className="ml-4 bg-blue-500 text-primary p-1 px-4 rounded">
          Enter
        </button>
      </form>

      {
        noSubmission ? (
          <p></p>
        ) : loading ? (
          <div className="loader"></div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className='w-full flex flex-col items-center'>
            <h2>Average Peak CCU of Games whose positive reviews are greater than a threshold
              of {thresholdValue} vs. negative counterpart</h2>
            <BarChartComponent positiveAvg={averagePeakCcuPositive} negativeAvg={averagePeakCcuNegative}/>
          </div>
        )}
    </div>
  );
}

function Report3_2() {
  const [quarterlyCcu, setQuarterlyCcu] = useState<Array<{ quarter: string, avg_peak_ccu: number }> | null>(null); // State for quarterly data
  const [yearInput, setYearInput] = useState<number | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [noSubmission, setNoSubmission] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAvailableYears = async () => {
    const {data, error} = await supabase.rpc('get_all_years');

    if (error) {
      console.error(error);
      setError('Failed to fetch available years.');
      return;
    }

    setYears(data);

    // selecting lowest possible year
    if (data && data.length > 0) {
      setYearInput(Math.min(...data));
    }
  };

  const getQuarterlyCcu = async () => {
    setLoading(true);

    // Fetch quarterly CCU average based on the year input
    const {data: quarterlyData, error: quarterlyCcuError} = await supabase.rpc('get_avg_peak_ccu', {
      year_input: yearInput,
    });

    if (quarterlyCcuError) {
      console.error(quarterlyCcuError);
      setError('Failed to fetch data for quarterly CCU average.');
      setLoading(false);
      return;
    }

    setQuarterlyCcu(quarterlyData);

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNoSubmission(false);
    getQuarterlyCcu();
  };

  useEffect(() => {
    getAvailableYears();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="font-bold text-2xl my-16">Quarterly Average Peak CCU Analysis Given A Year</div>
      <form onSubmit={handleSubmit} className="mb-16">
        <label htmlFor="year" className="mr-2">Select Year:</label>
        <select
          id="year"
          value={yearInput || ''} // Handle null case
          onChange={(e) => setYearInput(Number(e.target.value))}
          className="border rounded p-1"
          required
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button type="submit" className="ml-4 bg-blue-500 text-primary p-1 px-3 rounded">
          Enter
        </button>
      </form>

      {
        noSubmission ? (
          <p></p>
        ) : loading ? (
          <div className="loader"></div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="w-full flex flex-col items-center">
            {quarterlyCcu && quarterlyCcu.length > 0 && (
              <>
                <h2 className='mb-10'>Quarterly Average Peak CCU for {yearInput}</h2>
                <BarLineChartComponent quarterlyCcu={quarterlyCcu}/>
              </>
            )}
          </div>
        )}
    </div>
  );
}

export default function Report3() {
  return (
    <div className="w-3/4 flex flex-col self-center p-3">
      <div className="font-bold text-3xl">Peak Concurrent Players Analysis</div>
      <div className="container mx-auto">
        <Report3_1/>
        <Report3_2/>
      </div>
    </div>
  );
}