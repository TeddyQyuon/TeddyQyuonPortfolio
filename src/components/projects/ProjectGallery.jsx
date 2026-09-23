import { Box, Typography } from '@mui/material';

// Responsive figure gallery for case-study screenshots.
//
// Replaces MUI's ImageList, which forces every tile to a fixed row height and
// would crop chart axes and labels. These figures also have very different
// aspect ratios (a box plot is 1400x285, a partition diagram is 1400x870).
//
// Deliberately single column: these are dense data charts, and splitting the
// content column in two would render their labels too small to read. Each
// figure links to the full-size image for close inspection.
//
// Renders nothing when there are no images.
export default function ProjectGallery({ screenshots }) {
  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  return (
    <Box component="figure" sx={{ m: 0 }}>
      {screenshots.map((shot) => (
        <Box
          key={shot.src}
          component="figcaption"
          sx={{
            mb: 2.5,
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: 'background.paper',
          }}
        >
          <Box
            component="a"
            href={shot.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full-size figure: ${shot.alt}`}
            sx={{ display: 'block' }}
          >
            <Box
              component="img"
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                transition: 'opacity 0.15s ease',
                '&:hover': { opacity: 0.92 },
              }}
            />
          </Box>
          {shot.caption && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', px: 1.5, py: 1 }}
            >
              {shot.caption}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}