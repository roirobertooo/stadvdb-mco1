'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

interface GameMetric {
  avg_peak_ccu: number;
}

export function Page() {
  const [avgPeakCcu, setAvgPeakCcu] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getCcu = async () => {
      const thresholdValue = 1; // Replace with your desired threshold value

      const { data, error } = await supabase.rpc('get_avg_peakccu_positive', {
        threshold_value: thresholdValue,
      });

      console.log('Data:', data); // logger
      if (error) {
        console.error(error);
        return [];
      }

      if (Array.isArray(data) && data.length > 0) {
        setAvgPeakCcu(data[0]?.avg_peak_ccu || null); // Adjust based on actual data structure
      } else if (data && typeof data.avg_peak_ccu === 'number') {
        setAvgPeakCcu(data.avg_peak_ccu);
      } else {
        setAvgPeakCcu(null); // Handle unexpected data structure
      }
    };

    getCcu();
  }, [supabase]);

  return (
    <div>
      <h1>Average Peak CCU of Games with Positive greater than Threshold</h1>
      {avgPeakCcu !== null ? ( // Check if avgPeakCcu is not null
        <p>
          <strong>Average Peak CCU:</strong> {avgPeakCcu}
        </p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default function Report3() {
  return (
    <div>
      <h1>Report 3</h1>
      <Page />
    </div>
  );
}
