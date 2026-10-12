import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

/**
 * Visual GPA trend sparkline component.
 * Highlights the dramatic upward academic progression (3.00 → 2.80 → 3.70)
 * at a glance, giving recruiters immediate visual proof of academic excellence.
 */
export default function GpaTrendSparkline() {
  return (
    <Box sx={{ mt: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
        <TrendingUpIcon sx={{ fontSize: 18, color: 'inherit' }} />
        <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Trajectory: 3.00 → 2.80 → 3.70
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'rgba(255, 255, 255, 0.12)',
          borderRadius: 1.5,
          p: 1,
          px: 1.5,
        }}
      >
        <svg
          width="130"
          height="38"
          viewBox="0 0 130 38"
          fill="none"
          aria-label="GPA trend line: 3.00 in Y1S1, 2.80 in Y1S2, climbing to 3.70 in Y2S1"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d="M 14 26 L 65 34 L 116 8 L 116 38 L 14 38 Z"
            fill="url(#gpaGradient)"
          />

          {/* Trend line */}
          <path
            d="M 14 26 L 65 34 L 116 8"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Point 1: Y1S1 (3.00) */}
          <circle cx="14" cy="26" r="3.5" fill="#ffffff" />
          <text x="14" y="21" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="600" fontFamily="system-ui">
            3.00
          </text>

          {/* Point 2: Y1S2 (2.80) */}
          <circle cx="65" cy="34" r="3.5" fill="#ffffff" />
          <text x="65" y="30" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="600" fontFamily="system-ui">
            2.80
          </text>

          {/* Point 3: Y2S1 (3.70) Peak */}
          <circle cx="116" cy="8" r="4.5" fill="#ffffff" stroke="#245be1" strokeWidth="1.5" />
          <text x="116" y="3" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="700" fontFamily="system-ui">
            3.70
          </text>
        </svg>

        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption" sx={{ display: 'block', fontSize: '0.6875rem', opacity: 0.9, fontWeight: 500 }}>
            Y2S1 Record
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#ffffff' }}>
            +0.90 Leap
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
