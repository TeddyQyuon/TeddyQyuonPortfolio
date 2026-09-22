import {
  Paper,
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  LinearProgress,
  Stack,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Renders the model comparison as a real table plus a proportional bar for the
// primary metric, so the reader can see the gap between models at a glance
// instead of parsing a run-on sentence of numbers.
//
// Bars are scaled against the WORST model (not the best), so the champion shows
// as the shortest bar and the spread is immediately obvious.
export default function ModelComparison({ comparison }) {
  if (!comparison || !comparison.rows?.length) return null;

  const { metric, secondaryMetric, validationRows, rows } = comparison;
  const worst = Math.max(...rows.map((row) => row.ase));
  const best = rows.find((row) => row.champion) || rows[0];

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 2.5 }, mb: 2 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Model comparison
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {metric} — lower is better
            {validationRows ? ` · ${validationRows} validation rows` : ''}
          </Typography>
        </Box>
        <Chip
          icon={<EmojiEventsIcon sx={{ fontSize: 16 }} />}
          label={`Best: ${best.model}`}
          color="primary"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      </Stack>

      {/* Scrolls horizontally on narrow screens instead of pushing the page wide. */}
      <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table size="small" aria-label={`Model comparison by ${metric}`} sx={{ minWidth: 480 }}>
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="col">Model</TableCell>
              <TableCell component="th" scope="col" align="right">
                {metric}
              </TableCell>
              {secondaryMetric && (
                <TableCell component="th" scope="col" align="right">
                  {secondaryMetric}
                </TableCell>
              )}
              <TableCell component="th" scope="col" sx={{ width: '34%', minWidth: 120 }}>
                Relative {metric}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.model}
                sx={row.champion ? { bgcolor: 'primary.light' } : undefined}
              >
                <TableCell component="th" scope="row">
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: row.champion ? 700 : 500 }}>
                      {row.model}
                    </Typography>
                    {row.champion && (
                      <EmojiEventsIcon color="primary" sx={{ fontSize: 16 }} aria-label="best result" />
                    )}
                    {row.note && (
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                        ({row.note})
                      </Typography>
                    )}
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                  {row.ase.toLocaleString('en-SG', { maximumFractionDigits: 4 })}
                </TableCell>
                {secondaryMetric && (
                  <TableCell align="right" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {row.rmse}
                  </TableCell>
                )}
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    // Shortest bar = best score, because the bar is scaled to the worst.
                    value={Math.max(4, (row.ase / worst) * 100)}
                    color={row.champion ? 'primary' : 'inherit'}
                    aria-label={`${row.model}: ${Math.round((row.ase / worst) * 100)}% of the worst score`}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
        Bars are scaled to the highest {metric}, so a shorter bar is a better model.
      </Typography>
    </Paper>
  );
}
