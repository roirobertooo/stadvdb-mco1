'use client';
import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import BarChartComponent from './barChart_component';

export default function Report3() {
  const [thresholdValue, setThresholdValue] = useState<number>(1); // Default threshold value
  const [averagePeakCcuPositive, setAveragePeakCcuPositive] = useState<number | null>(null);
  const [averagePeakCcuNegative, setAveragePeakCcuNegative] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCcu = async () => {
    setLoading(true);

    // Fetch average peak CCU for positive reviews
    const { data: positiveData, error: positiveError } = await supabase.rpc('get_avg_peakccu_positive', {
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
    const { data: negativeData, error: negativeError } = await supabase.rpc('get_avg_peakccu_negative', {
      threshold_value: thresholdValue,
    });

    if (negativeError) {
      console.error(negativeError);
      setError('Failed to fetch data for negative reviews.');
      setLoading(false);
      return;
    }

    setAveragePeakCcuNegative(negativeData);

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getCcu();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="threshold" className="mr-2">Enter Threshold Value:</label>
        <input id="threshold" type="number" value={thresholdValue} onChange={(e) => setThresholdValue(Number(e.target.value))} className="border rounded p-1" required/>
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">
          Enter
        </button>
      </form>

      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='w-full flex flex-col items-center'>
          <h2>Report 3: Average Peak CCU of Games whose positive reviews are greater than a threshold of {thresholdValue} compared to its negative counterpart.</h2>
          <BarChartComponent positiveAvg={averagePeakCcuPositive} negativeAvg={averagePeakCcuNegative} />
        </div>
      )}
    </div>
  );
}
