import { Box, Typography, Paper, Chip } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DevicesIcon from '@mui/icons-material/Devices';
import DnsIcon from '@mui/icons-material/Dns';
import StorageIcon from '@mui/icons-material/Storage';
import PaymentIcon from '@mui/icons-material/Payment';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import HubIcon from '@mui/icons-material/Hub';

function getLayerMetadata(layerText) {
  const lower = layerText.toLowerCase();
  if (lower.includes('react') || lower.includes('frontend') || lower.includes('storefront') || lower.includes('vite') || lower.includes('tailwind')) {
    return {
      role: 'Client & Presentation',
      icon: <DevicesIcon sx={{ fontSize: 18 }} />,
      color: '#38bdf8',
    };
  }
  if (lower.includes('express') || lower.includes('node') || lower.includes('django') || lower.includes('fastapi') || lower.includes('api') || lower.includes('rest')) {
    return {
      role: 'Backend API & Routing',
      icon: <DnsIcon sx={{ fontSize: 18 }} />,
      color: '#818cf8',
    };
  }
  if (lower.includes('mysql') || lower.includes('sequelize') || lower.includes('sqlite') || lower.includes('turso') || lower.includes('postgres') || lower.includes('db')) {
    return {
      role: 'Persistence & Database',
      icon: <StorageIcon sx={{ fontSize: 18 }} />,
      color: '#34d399',
    };
  }
  if (lower.includes('stripe') || lower.includes('webhook') || lower.includes('payment') || lower.includes('checkout')) {
    return {
      role: 'Payments & Verification',
      icon: <PaymentIcon sx={{ fontSize: 18 }} />,
      color: '#fbbf24',
    };
  }
  if (lower.includes('vercel') || lower.includes('hosting') || lower.includes('deploy') || lower.includes('cloud') || lower.includes('docker')) {
    return {
      role: 'Infrastructure & Edge',
      icon: <CloudQueueIcon sx={{ fontSize: 18 }} />,
      color: '#a78bfa',
    };
  }
  return {
    role: 'Operations & Workflow',
    icon: <HubIcon sx={{ fontSize: 18 }} />,
    color: '#94a3b8',
  };
}

/**
 * Visual architecture flow diagram.
 * Replaces raw monospace text with a clean, structured system pipeline
 * that Engineering Managers and Technical Recruiters can instantly parse.
 */
export default function ArchitectureFlow({ architecture = [] }) {
  if (!architecture || architecture.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={(theme) => ({
          p: { xs: 2.5, md: 3 },
          bgcolor: theme.custom.surfaces.navy,
          color: theme.custom.onDark.body,
          borderRadius: 3,
          borderColor: 'rgba(255, 255, 255, 0.1)',
        })}
      >
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.6)',
            mb: 2.5,
          }}
        >
          System Architecture &amp; Data Pipeline
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {architecture.map((layer, index) => {
            const meta = getLayerMetadata(layer);
            const isLast = index === architecture.length - 1;

            return (
              <Box key={layer} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.07)',
                      borderColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: 1.5,
                      bgcolor: 'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: meta.color,
                      flexShrink: 0,
                    }}
                  >
                    {meta.icon}
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                      <Chip
                        label={meta.role}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          color: meta.color,
                          bgcolor: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: 'rgba(255, 255, 255, 0.4)', fontWeight: 600 }}
                      >
                        Layer {String(index + 1).padStart(2, '0')}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.92)',
                        lineHeight: 1.55,
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                      }}
                    >
                      {layer}
                    </Typography>
                  </Box>
                </Box>

                {!isLast && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      py: 0.75,
                      color: 'rgba(255, 255, 255, 0.35)',
                    }}
                  >
                    <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}
