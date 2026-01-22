import { useEffect, useState } from 'react';
import { getTranslations, type Language } from '../i18n/translations';

interface YearProgressProps {
  lang: Language;
}

export default function YearProgress({ lang }: YearProgressProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const t = getTranslations(lang).yearProgress;
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const totalDays = isLeapYear ? 366 : 365;
  
  const diffTime = now.getTime() - startOfYear.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include today
  const daysRemaining = totalDays - diffDays;
  const percentage = Math.round((diffDays / totalDays) * 100);

  // Create grid: 20 columns, calculate rows needed
  const cols = 20;
  const rows = Math.ceil(totalDays / cols);

  return (
    <div className="year-progress">
      <div className="year-progress-content">
        <div className="year-progress-stats">
          <div className="year-number">{year}</div>
          <div className="year-day-info">{t.day} {diffDays}</div>
          <div className="year-days-left">{daysRemaining} {t.left}</div>
          <div className="year-percentage">{percentage}%</div>
        </div>
        <div className="year-progress-grid">
          {Array.from({ length: totalDays }).map((_, index) => {
            const dayNumber = index + 1;
            const isPassed = dayNumber <= diffDays;
            
            return (
              <div
                key={index}
                className={`year-dot ${isPassed ? 'year-dot-passed' : ''}`}
                style={{
                  animationDelay: `${0.8 + index * 0.003}s`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
